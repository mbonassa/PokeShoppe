const router = require('express').Router();
const Order = require('../db/models/order');
const Product = require('../db/models/product');
const OrderProduct = require('../db/models/order_product');
const Promise = require('bluebird');

module.exports = router;

// create if not exist, then send instance
router.put('/:userId', (req, res, next) => {
  Order.findOrCreate({where: {
    cart: true,
    userId: req.params.userId
  }})
  .then(instance => {
    return res.json(instance[0])
  })
  .catch(next);
})

router.get('/', (req, res, next) => {
  Order.findAll({
    where: req.query.status ?
      {status: req.query.status} :
      {}
  })
    .then(orderList => res.status(200).json(orderList))
    .catch(next);
});

router.put('/products/:orderId/:productId', (req, res, next) => {
  Order.findById(req.params.orderId)
  .then(order => {
    Product.findById(req.params.productId)
    .then(product => {
      order.addProductToOrder(product, product.price, req.body.quantity)
      .then(() => {
        res.json(product)
      })
    })
  })
  .catch(next)
});

//DELETE FROM CART ROUTE through orderId and product id
router.delete('/products/:orderId/:productId', (req, res, next) => {
  OrderProduct.findOne({where: {
    productId: req.params.productId,
    orderId: req.params.orderId
  }})
  .then(instance => {
    const myInstance = instance; 
    instance.destroy();
    res.json(myInstance)
  })
  .catch(next);
});


router.get('/products/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => OrderProduct.findAll({where: {orderId: order.id}}))
    .then(orderItems => {
      return Promise.map(
        orderItems,
        item => Product.findById(item.productId)
      )
        .then(productList => {
          const productInfo = [];
          orderItems.forEach((item, idx) => {
            productInfo.push(Object.assign({}, {
              id: item.id,
              price: item.price,
              quantity: item.quantity,
              productId: item.productId,
              orderId: item.orderId
            }, {
              name: productList[idx].name
            }))
          });
          res.status(200).json(productInfo)
        })
    })
    .catch(next);
})


  // req.ord.addProduct(req.body.product)
  //   .then(() => {
  //     res.status(201);
  //     Product.findOne({where: req.body.product});
  //   })
  //   .then(product => {
  //     res.json(product);
  //   })
  //   .catch(next);


/****-----   Order Specific    -----*****/
// router.param('orderId', (req, res, next, id) => {
//   Order.findById(id)
//     .then(order => {
//       req.order = order;
//       // next();
//     })
//     .catch(next);
// });

// // :orderId => get order
// router.get('/:orderId', (req, res, next) => {
//   res.status(200).json(req.order);
// });

// status/:orderId => get/update address
router.get('/status/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => res.status(200).json(order.status))
    .catch(next);
});
router.put('/status/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
  .then(order => {
    const isCart = req.body.status === 'CREATED' ? true : false
    return order.update({
      status: req.body.status,
      address: req.body.address,
      total_price: req.body.total_price,
      cart: isCart
    })
      .then(cart => res.status(201).json(cart))
  })
  .catch(next);
});

// // address/:orderId => get/update address
// router.get('/address/:orderId', (req, res, next) => {
//   res.status(200).json(req.order.address);
// });
// router.put('/address/:orderId', (req, res, next) => {
//   req.order.update({
//     address: req.body.address
//   })
//     .then(() => res.status(204).send('Updated Successfully!'))
//     .catch(next);
// });

// // products/:orderId => get/update/delete product
// router.get('/products/:orderId', (req, res, next) => {
//   req.order.getProducts()
//     .then(productList => res.status(200).json(productList))
//     .catch(next);
// });
// router.put('/products/:orderId', (req, res, next) => {
//   req.order.addProduct(req.body.product)
//     .then(() => {
//       res.status(201);
//       Product.findOne({where: req.body.product});
//     })
//     .then(product => {
//       res.json(product);
//     })
//     .catch(next);
// });
// router.delete('/products/:orderId/:productId', (req, res, next) => {
//   Product.findById(req.params.productId)
//     .then(product => req.order.removeTask(product))
//     .then(() => res.status(201).json(req.order))
//     .catch(next);
// });

// // date/:orderId => get orderDate
// router.get('/date/:orderId', (req, res, next) => {
//   res.status(200).json(req.order.createdAt);
// });
