const router = require('express').Router();
const Order = require('../db/models/order');
const Product = require('../db/models/product');

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orderList => res.status(200).json(orderList))
    .catch(next);
});

/****-----   Oder Specific    -----*****/
router.params('orderId', (req, res, next, id) => {
  Order.findById(id)
    .then(order => {
      req.order = order;
      next();
    })
    .catch(next);
});


// :orderId => get order
router.get('/:orderId', (req, res, next) => {
  res.status(200).json(req.order);
});

// status/:orderId => get/update address
router.get('/status/:orderId', (req, res, next) => {
  res.status(200).json(req.order.status);
});
router.put('/status/:oderId', (req, res, next) => {
  req.order.update({
    status: req.body.status
  })
    .then(() => res.status(204).send('Updated Successfully!'))
    .catch(next);
});

// address/:orderId => get/update address
router.get('/address/:orderId', (req, res, next) => {
  res.status(200).json(req.order.address);
});
router.put('/address/:orderId', (req, res, next) => {
  req.order.update({
    address: req.body.address
  })
    .then(() => res.status(204).send('Updated Successfully!'))
    .catch(next);
});

// products/:orderId => get/update/delete product
router.get('/products/:orderId', (req, res, next) => {
  req.order.getProducts()
    .then(productList => res.status(200).json(productList))
    .catch(next);
});
router.put('/products/:orderId', (req, res, next) => {
  req.order.addProduct(req.body.product)
    .then(() => res.status(201).json(req.order))
    .catch(next);
});
router.delete('/products/:orderId/:productId', (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => req.order.removeTask(product))
    .then(() => res.status(201).json(req.order))
    .catch(next);
});
