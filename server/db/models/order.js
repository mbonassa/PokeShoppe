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
    },
    total_price: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0.00
    }
},{
  instanceMethods: {
    addProductToOrder: function(product, price, qty){
      return OrderProduct.findOrCreate({where: {
        orderId: this.id,
        productId: product.id,
        price: price,
      }})
        .then(itemArr => {
          if(qty) itemArr[0].update({quantity: itemArr[0].quantity + qty})
        })
    },
  },
});

module.exports = Order;
