const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: Sequelize.TEXT,
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    }
});

module.exports = Review;
