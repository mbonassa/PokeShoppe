
// const db = require('./server/db');
const db = require('./server/db/db');
// const db = require('./server/db/models').db;
const blue = require('chalk').blue;

var Promise = require('bluebird');
// const blue = require('chalk').Blue;
const User = require('./server/db/models').User;
const Order = require('./server/db/models').Order;
const Product = require('./server/db/models').Product;
const Review = require('./server/db/models').Review;
const orderProduct = require('./server/db/models').orderProduct;
const Category = require('./server/db/models').Category;
const categoryProduct = require('./server/db/models').categoryProduct

const data = {
  users: [
    {name: 'Peter', email: 'peter.griffin.the2nd@gmail.com', password: 'peter'}, {name: 'Lois', email: 'lois.griffin.the2nd@gmail.com', password: 'lois'}, {name: 'Meg', email: 'meg.griffin.the2nd@gmail.com', password: 'meg'}, {name: 'Chris', email: 'chris.griffin.the2nd@gmail.com', password: 'chris'}, {name: 'Stewie', email: 'stewie.griffin.the2nd@gmail.com', password: 'stewie'}, {name: 'Brian', email: 'brian.griffin.the2nd@gmail.com', password: 'brian'}
  ],
  products: [
    {name: 'Pikachu', description:  'Pika-pika-pikachu', category: 'yellow', inventory_qty: 10, price: 99.99 },
    {name: 'Celebi', description:  'Ce-celebi', category: 'greenish', inventory_qty: 20, price: 19.99 },
    {name: 'Eevee', description:  'haha-Eevee', category: 'brown', inventory_qty: 30, price: 39.99 },
    {name: 'Snorlax', description:  'Snorlax snorlx', category: 'blue', inventory_qty: 40, price: 59.99 },
    {name: 'Ditto', description:  'Ditto-ditto', category: 'yellow', inventory_qty: 13, price: 9.99 }
  ],
  orders: [
    {cart: 'NO', status: 'PROCESSING', address: '560 west 40rd street', userId: 1 },
    {cart: 'NO', status: 'CANCELED', address: '560 west 34th street', userId: 2 },
    {cart: 'NO', status: 'COMPLETED', address: '560 west 23rd street', userId: 3 },
    {cart: 'NO', status: 'CREATED', address: '560 west 21st street', userId: 4 },
    {cart: 'YES', status: null, address: '560 west 43rd street', userId: 5 },
    {cart: 'YES', address: '560 west 43rd street' }
  ],
  categories: [
    {name: 'Grass'}, { name: 'Fire' }, { name: 'Water' }, { name: 'Bug' }, { name: 'Dark' }, { name: 'Ground' }, { name: 'Dragon' }, { name: 'Ice' }, { name: 'Electric' }, { name: 'Normal' }, { name: 'Fairy' }, { name: 'Poison' }, { name: 'Fighting' }, { name: 'Psychic' }, { name: 'Rock' }, { name: 'Flying' }, { name: 'Steel' }, { name: 'Ghost' }
  ],
  reviews: [
    {title: 'Super cool product', description: 'I bought it for my son and he plays with it all the time', rating: 5, productId: 2, userId: 2},
    {title: 'Bad product', description: 'I bought it for my son and he does not plays with it at all', rating: 1, productId: 3, userId: 1},
    {title: 'Great product', description: 'I bought for myself', rating: 4, productId: 1, userId: 5},
  ],
  orderProducts: [
    { quantity: 1, price: 99.99, productId: 1, orderId: 1 }, { quantity: 1, price: 19.99, productId: 2, orderId: 2 }, { quantity: 3, price: 39.99, productId: 3, orderId: 3 }, { quantity: 2, price: 59.99, productId: 1 , orderId: 4},
  ],
  categoryProducts: [
    { categoryId: 1, productId: 1 },{ categoryId: 3, productId: 1 },
    { categoryId: 4, productId: 1 },
    { categoryId: 5, productId: 3 },
    { categoryId: 14, productId: 2 },
    { categoryId: 13, productId: 4 },
    { categoryId: 11, productId: 5 }
  ]

}


db.sync({force: true})
.then(function () {
  console.log("Dropped old data, now inserting data");
  const addingUsers = Promise.map(data.users, function (user) {
    return User.create(user);
  });

  return  addingUsers;

})
.then(function () {
  console.log('Finished inserting Users');
  const addingProducts = Promise.map(data.products, function (product) {
    return Product.create(product);
  })
  return addingProducts;

})
.then(function () {
  console.log('Finished inserting Product');
  const addingOrders = Promise.map(data.orders, function (order) {
    return Order.create(order);
  })
  return addingOrders;

})
.then(function () {
  console.log('Finished inserting Orders');
  console.log(blue(data.categories));
  const addingCategories = Promise.map(data.categories, function (category) {
    console.dir(category);
    console.log(blue(category));
    return Category.create(category);
  })
  return addingCategories;

})
.then(function () {
  console.log('Finished inserting Categories');
  const addingReviews = Promise.map(data.reviews, function (review) {
    return Review.create(review);
  });
  return addingReviews;

})
.then(function () {
  console.log('Finished inserting Reviews');
  const addingOrderProducts = Promise.map(data.orderProducts, function (oProduct) {
    return orderProduct.create(oProduct);
  });
  return addingOrderProducts;

})
.then(function () {

  console.log('Finished inserting Order Products');
  const addingCategoryProducts = Promise.map(data.categoryProducts, function (cProduct) {
    return categoryProduct.create(cProduct);
  });
  return addingCategoryProducts;

})
.catch(function (err) {
  console.log('Finished inserting Category Products');

  console.error('There was totally a problem', err, err.stack);
})
.finally(function () {
  db.close(); // creates but does not return a promise
  return null; // stops bluebird from complaining about un-returned promise
});
