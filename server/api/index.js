const router = require('express').Router();


router.use('/users', require('./users'));
router.use('/orders', require('./orders'));
router.use('/products', require('./products'));
router.use('/reviews', require('./reviews'));
router.use('/orderproducts', require('./order_products'));
router.use('/categories', require('./categories'));


router.use((req, res) => {
  res.status(404).send('Not found');
});

module.exports = router;
