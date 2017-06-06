const db = require('../db');

const Order = require('./order');
const Product = require('./product');
const Review = require('./review');
const User = require('./user');
const orderProduct = require('./order_product');

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(Product, {through: orderProduct});
Product.hasMany(Order, {through: orderProduct});

Review.belongsTo(Product);
Product.hasMany(Review);

Review.belongsTo(User);
User.hasMany(Review);

module.exports = {
	db,
	Order,
	Product,
	Review,
	User
};
