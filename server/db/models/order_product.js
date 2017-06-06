const Sequelize = require('sequelize');
const db = require('../db');

const orderProduct = db.define('orderProduct', {
    product_qty: Sequelize.INTEGER
})

module.exports = orderProduct; 