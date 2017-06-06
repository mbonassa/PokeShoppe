const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
    status: Sequelize.ENUM('ACTIVE', 'CLOSED')
});

module.exports = Order;
