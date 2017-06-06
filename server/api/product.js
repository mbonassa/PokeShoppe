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
  Product.findById(req.params.id)
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
    res.status(201).json(createdProduct);
  })
  .catch(next);
});

// Update an existing product
router.put('/:id', (req, res, next) => {
  Product.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(result => {
    res.json(result);
  })
  .catch(next);
});

// Get all products with this categoryId
router.get('/:categoryId', (req, res, next) => {
    Category.findById(req.params.categoryId)
    .then(category => {
      return category.getProducts()
    })
    .then(products => {
      res.json(products);
    })
    .catch(next);
});




