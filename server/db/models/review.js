const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
    description: Sequelize.TEXT,
    rating: SEQUELIZE.INTEGER
})

module.exports = Review; 