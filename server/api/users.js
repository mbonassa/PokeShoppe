const router = require('express').Router();
const User = require('../db/models/user');
const Order = require('../db/models/order');

module.exports = router;

router.params('userId', (req, res, next, id) => {
  User.findById(id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
});


/****-----   Root    -----*****/
router.get('/', (req, res, next) => {
  if(Object.keys(req.query).length){
    User.findOne({
      where: req.query
    })
      .then(user => res.status(200).json(user))
      .catch(next);
  } else{
    User.findAll()
      .then(users => res.status(200).json(users))
      .catch(next);
  }
});
router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
});


/****-----   Delete User    -----*****/
router.delete('/:userId', (req, res, next) => {
  req.user.delete()
    .then(() => res.status(204).send('User Deleted!'))
    .catch(next);
})


/****-----   Orders    -----*****/
router.get('/orders/:userId', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.user.id,
      status: 'CLOSED'
    }
  })
    .then(orderList => res.status(200).json(orderList))
    .catch(next);
});


/****-----   Cart    -----*****/
router.get('/orders/:userId', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.user.id,
      status: 'ACTIVE'
    }
  })
    .then(orderList => res.status(200).json(orderList))
    .catch(next);
});


/****-----   User Info    -----*****/
// name
router.get('/name/:userId', (req, res, next) => {
  res.status(200).json(req.user.name);
});

// email
router.get('/email/:userId', (req, res, next) => {
  res.status(200).json(req.user.email);
});
router.put('/email/:userId', (req, res, next) => {
  req.user.update({
    email: req.body.email
  })
    .then(() => res.status(204).send('Updated Successfully'))
    .catch(next);
});

// status
router.put('/status/:userId', (req, res, next) => {
  req.user.update({
    status: req.body.status
  })
    .then(() => res.status(204).send('Updated Successfully'))
    .catch(next);
});

// paswordReset
router.put('/passwordreset/:userId'(req, res, next) => {
  req.user.update({
    passwordreset: req.body.passwordreset
  })
    .then(() => res.status(204).send('Updated Successfully'))
    .catch(next);
});
