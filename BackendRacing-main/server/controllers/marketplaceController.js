const sequelize = require('../src/config/database');

// Listar autos en venta
const getListings = async (req, res) => {
  const [rows] = await sequelize.query(`
    SELECT l.*, c.*
    FROM car_market_transactions l
    JOIN "Cars" c ON l.car_id = c.id
    WHERE l.status = 'pending' OR l.status = 'en_venta'
  `);
  res.json(rows);
};

// Comprar un auto
const buyCar = async (req, res) => {
  const { listingId, buyerId } = req.body;
  // Lógica: verificar saldo, transferir NFT, actualizar UserCars, registrar transacción, etc.
  // Aquí deberías llamar a exchangeController.exchangeNFT y actualizar los registros.
  res.json({ status: 'ok', message: 'Compra realizada (implementa la lógica real aquí)' });
};

// Vender un auto (listar)
const sellCar = async (req, res) => {
  const { carId, sellerId, price, currency } = req.body;
  await sequelize.query(`
    INSERT INTO car_market_transactions (car_id, seller_id, price, currency, status, tx_type)
    VALUES (?, ?, ?, ?, 'en_venta', 'sell')
  `, { replacements: [carId, sellerId, price, currency] });
  res.json({ status: 'ok', message: 'Auto listado para venta' });
};

module.exports = {
  getListings,
  buyCar,
  sellCar
};