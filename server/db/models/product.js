'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  category: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  inventory_qty: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      isDecimal: true,
      notNull: true
    }
  },
  photo: {
    type: Sequelize.STRING
  }
});

module.exports = Product;