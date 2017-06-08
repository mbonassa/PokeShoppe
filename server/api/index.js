const router = require('express').Router();

router.use('/user', require('./users'));
router.use('/order', require('./orders'));
router.use('/product', require('./products'));
router.use('/review', require('./reviews'));
router.use('/orderproduct', require('./order_products'));
router.use('/category', require('./categories'));

router.use((req, res) => {
  res.status(404).send('Not found');
});

module.exports = router;
