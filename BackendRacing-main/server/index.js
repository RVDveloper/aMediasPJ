const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/config/database.js');
const authRoutes = require('./src/routes/auth.js');
const billingRoutes = require('./src/routes/billingRoutes.js');
const dashboardRoutes = require('./src/routes/dashboardRoutes.js');
const raceRoutes = require('./src/routes/race');

dotenv.config();

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/', raceRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Racing Game funcionando correctamente' });
});

app.get('/health', (req, res) => res.send('ok'));

// Iniciar servidor
async function startServer() {
  try {
    // Probar conexión a la base de datos
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();