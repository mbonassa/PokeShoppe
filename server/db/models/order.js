const Sequelize = require('sequelize');
const db = require('../db');
const OrderProduct = require('./order_product');

const Order = db.define('order', {
    cart: {
        type: Sequelize.BOOLEAN
    },
    status: {
        type: Sequelize.ENUM('CREATED', 'PROCESSING', 'CANCELED', 'COMPLETED'),
        validate: {
            cartValidation: function () {
                if (this.cart === false && this.type === null) {
                    return new Error ('If cart is false, there must be a status');
                }
            }
        }
    },
    address: {
        type: Sequelize.STRING
    }
},{
  instanceMethods: {
    addProductToOrder: function(product, price){
      return OrderProduct.create({
        orderId: this.id,
        productId: product.id,
        price: price
      })
    },
  },
});

module.exports = Order;
