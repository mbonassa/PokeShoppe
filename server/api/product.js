const router = require('express').Router();
const Product = require('../db').model('product');
const Category = require('../db').model('category');

module.exports = router;

// All products
router.get('/', (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.json(products);
  })
  .catch(next);
});


// Specific product
router.get('/:id', (req, res, next) => {
  const id = req.params.id ? req.params.id : res.sendStatus(500);
  Product.findById(id)
  .then(product => {
    product ?    // checking if the given id return a real product from the DB
    res.json(product) :  // if so it will send it back
    res.sendStatus(404);  // page not found
  })
  .catch(next);
});

// Create a new product
router.post('/', (req, res, next) => {
  Product.create(req.body)
  .then(createdProduct => {
    res.json(createdProduct);
  })
  .catch(next);
});

// Update an existing product
router.put('/:id', (req, res, next) => {
  const id = req.params.id ? req.params.id : res.sendStatus(500);
  Product.update(id)
  .then(updatedProduct => {
    res.json(updatedProduct);
  })
  .catch(next);
});

// Get all products with this categoryId
router.get('/:categoryId', (req, res, next) => {
    const id = req.params.categoryId ? req.params.categoryId : res.sendStatus(500);
    Product.findAll({
      where: {categoryId: id}
    })
    .then(products => {
      res.json(products);
    })
    .catch(next);
});




