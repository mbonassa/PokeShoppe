const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/order', require('./order'));
router.use('/product', require('./product'));
router.use('/review', require('./review'));
router.use('/orderproduct', require('./order_product'));
router.use('/category', require('./category'));

router.use((req, res) => {
  res.status(404).send('Not found');
});

module.exports = router;
