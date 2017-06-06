const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
    cart: {
        type: Sequelize.ENUM('YES', 'NO')
    },
    status: {
        type: Sequelize.ENUM('CREATED', 'PROCESSING', 'CANCELED', 'COMPLETED'),
        validate: {
            allowNull: this.cart === 'NO' ? false : true
        }
    },
    address: {
        type: Sequelize.STRING,
        validate: {
            allowNull: this.cart === 'NO' ? false : true
        }
    }
});

module.exports = Order;
