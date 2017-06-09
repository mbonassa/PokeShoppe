const router = require('express').Router();
const Category = require('../db').model('category');
module.exports = router;

//get all categories (admin should be able to)
router.get('/', (req, res, next) => {
  Category.findAll()
    .then(foundCategories => {
      res.json(foundCategories)
    })
    .catch(next);
})


router.get('/:categoryId', (req, res, next) => {
  Category.findById(req.params.categoryId)
    .then(foundCategory => {
      res.json(foundCategory)
    })
    .catch(next);
})


router.post('/', (req, res, next) => {
  Category.create(req.body, {returning: true})
    .then(createdRecord => {
      if (!createdRecord) res.sendStatus(400)
      else res.status(201).json(createdRecord)
    })
    .catch(next);
})


router.put('/:categoryId', (req, res, next) => {
  Category.update(req.body, {where:
      {id: req.params.categoryId}
    })
    .then(affectedCount => {
      if (!affectedCount[0]) res.sendStatus(400)
      else res.sendStatus(201)
    })
    .catch(next);
})


router.delete('/:categoryId', (req, res, next) => {
  Category.destroy({where: {id: req.params.categoryId} })
    .then(deletedCount => {
      if (!deletedCount) res.sendStatus(400)
      else res.sendStatus(200)
    })
    .catch(next);
})
