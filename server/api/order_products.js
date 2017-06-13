const router = require('express').Router();
const orderProduct = require('../db').model('order_product');

module.exports = router;

//Get quantity for a specific product and a specific order
router.get('/quantity/:productId/:orderId', (req, res, next) => {
    orderProduct.findOne({where: {
        productId: req.params.productId,
        orderId: req.params.orderId
    }})
    .then(instance => {
        if (!instance) return res.sendStatus(404)
        res.json(instance.getDataValue(quantity))
    })
    .catch(next)
});

//Get price for a specific product and a specific order — /price
router.get('/price/:productId/:orderId', (req, res, next) => {
    orderProduct.findOne({where: {
        productId: req.params.productId,
        orderId: req.params.orderId
    }})
    .then(instance => {
        if (!instance) return res.sendStatus(404)
        res.json(instance.getDataValue(price))
    })
    .catch(next)
});

//Post/put quantity for a specific product and a specific order  — /quantity
router.put('/quantity/:productId/:orderId', (req, res, next) => {
    orderProduct.update({quantity: req.body.quantity}, {where: {
        productId: req.params.productId,
        orderId: req.params.orderId
    }})
    .then(() => {
        res.sendStatus(204)
    })
    .catch(next)
});

//Post/put price for a specific product and a specific order — /price
router.put('/price/:productId/:orderId', (req, res, next) => {
    orderProduct.update({price: req.body.price}, {where: {
        productId: req.params.productId,
        orderId: req.params.orderId
    }})
    .then(() => {
        res.sendStatus(204)
    })
    .catch(next)
});
