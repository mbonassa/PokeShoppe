const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
    cart: {
        type: Sequelize.ENUM('YES', 'NO')
    },
    status: {
        type: Sequelize.ENUM('CREATED', 'PROCESSING', 'CANCELED', 'COMPLETED'),
        // allowNull: this.cart === 'NO' ? false : true,
        // validate: {
        //     isNull: this.cart === 'YES' ? true : false
        // }
    },
    address: {
        type: Sequelize.STRING,
        // allowNull: this.cart === 'NO' ? false : true
        // validate: {
        //     isNull: this.cart === 'YES' ? true : false
        // }
        // validate: {
        //     allowNull: this.cart === 'NO' ? false : true
        // }
    }
});

module.exports = Order;
