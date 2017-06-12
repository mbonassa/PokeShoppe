const Sequelize = require('sequelize');
const db = require('../db');

const orderProduct = db.define('order_product', {
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true
        }
    }
})

module.exports = orderProduct;
