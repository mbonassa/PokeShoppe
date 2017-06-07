const router = require('express').Router();
const Review = require('../db').model('review');
module.exports = router;

//Get all reviews from a specific product — /:productId
router.get('/:productId', (req, res, next) => {
  Review.findAll({
    where: {
      productId: req.params.productId
    }
  })
    .then(foundReviews => {
      res.json(foundReviews)
    })
    .catch(next)
})

//Post a review to a specific product (from a specific user)  — /:productId
Router.post('/:productId', (req, res, next) => {
  Review.create(req.body, {returning: true})
    .then(createdRecord => {
      return Promise.all(
        createdRecord.setProduct(req.params.productId, {returning: true}),
        createdRecord.setUser(req.body.userId, {returning: true})
      ) 
    })
    .then(returnedArray => {
      if (!returnedArray[1]) res.sendStatus(404)
      else res.sendStatus(201)
    })
    .catch(next);
})
