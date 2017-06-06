const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
    cart: {
        type: Sequelize.ENUM('YES', 'NO')
    },
    status: {
        type: Sequelize.ENUM('CREATED', 'PROCESSING', 'CANCELED', 'COMPLETED'),
        allowNull: false,
        defaultValue: 'CREATED'
    },
    address: {
        type: Sequelize.TEXT,
        validate: {
            allowNull: this.cart === 'YES' ? true : false
        }
    }
});

module.exports = Order;