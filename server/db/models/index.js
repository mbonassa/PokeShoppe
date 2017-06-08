const db = require('../db');

const Order = require('./order');
const Product = require('./product');
const Review = require('./review');
const User = require('./user');
const Category = require('./category');
const orderProduct = require('./order_product');
const categoryProduct = require('./category_product');

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, {through: orderProduct});
Product.belongsToMany(Order, {through: orderProduct});

Review.belongsTo(Product);
Product.hasMany(Review);

Review.belongsTo(User);
User.hasMany(Review);

Category.belongsToMany(Product, {through: categoryProduct});
Product.belongsToMany(Category, {through: categoryProduct});


module.exports = {
	db,
	Order,
	Product,
	Review,
	User,
	Category,
	orderProduct,
	categoryProduct
};
