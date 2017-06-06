'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('product', {
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
  }
});
