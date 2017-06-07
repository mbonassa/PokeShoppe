const router = require('express').Router();
const User = require('../db/models/user');
const Order = require('../db/models/order');

module.exports = router;

router.param('userId', (req, res, next, id) => {
  User.findById(id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
});


/****-----   Root    -----*****/
router.get('/', (req, res, next) => {
  //login -- to revise later
  if(Object.keys(req.query).length){
    User.findOne({
      where: {
        email: req.query[email],
        password: req.query[password]
      }
    })
      .then(user => res.status(200).json(user))
      .catch(next);
  //get all users
  } else{
    User.findAll()
      .then(users => res.status(200).json(users))
      .catch(next);
  }
});

/****-----   Create User    -----*****/
router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
});


/****-----   Delete User    -----*****/
router.delete('/:userId', (req, res, next) => {
  req.user.destroy()
    .then(() => res.status(204).send('User Deleted!'))
    .catch(next);
})


/****-----   Orders    -----*****/
router.get('/orders/:userId', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.user.id,
      cart: 'NO'
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
      cart: 'YES'
    }
  })
    .then(orderList => res.status(200).json(orderList))
    .catch(next);
});


/****-----   User Info    -----*****/
// // get user's name
// router.get('/name/:userId', (req, res, next) => {
//   res.status(200).json(req.user.name);
// });

// // get user's email
// router.get('/email/:userId', (req, res, next) => {
//   res.status(200).json(req.user.email);
// });


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

// pasword_reset
router.put('/passwordreset/:userId', (req, res, next) => {
//!!! Only admin can do that -- need to make sure that's the case !!!
  req.user.update({
    password_reset: req.body.password_reset
  })
    .then(() => res.status(204).send('Updated Successfully'))
    .catch(next);
});
