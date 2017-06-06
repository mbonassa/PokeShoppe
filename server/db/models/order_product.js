const Sequelize = require('sequelize');
const db = require('../db');

const orderProduct = db.define('orderProduct', {
    product_qty: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})

module.exports = orderProduct; 
