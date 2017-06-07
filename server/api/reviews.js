const router = require('express').Router();
const Review = require('../db').model('review');
module.exports = router;

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

Router.post('/:productId', (req, res, next) => {
  Review.create(req.body, {returning: true})
    .then(createdRecord => {
      return Promise.all(
        createdRecord.setProduct(req.params.productId, {returning: true}),
        createdRecord.setUser(req.body.UserId, {returning: true})
      ) // do we need this??
    })
    .then(returnedArray => {
      if (!returnedArray[1]) res.sendStatus(404)
      else res.sendStatus(201)
    })
    .catch(next);
})
