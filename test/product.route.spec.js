const db = require('../server/db/db');
const expect = require('chai').expect;
const Product = require('../server/db/models/product');
const Category = require('../server/db/models/category');
const CategoryProduct = require('../server/db/models/category_product');
var supertest = require('supertest');
var agent = supertest.agent(require('../server'));

// name: {
// description: {
// inventory_qty: {
// price: {
// photo: {

describe('Product Routes', () => {
  const productOne = {
    name: 'Charizard',
    description: 'Awesome, powerful, fire-type pokemon! Super rare...',
    inventory_qty: 1,
    price: 123456.78,
    photo: 'http://www.charizard.com/image'
  };
  const productTwo = {
    name: 'Squirtle',
    description: 'Small, water-type pokemon!',
    inventory_qty: 4,
    price: 50.00,
    photo: 'http://www.squirtle.com/image'
  };
  const productThree = {
    name: 'Magikarp',
    description: 'Terrible... just terrible....',
    inventory_qty: 50,
    price: 0.01,
    photo: 'http://www.magikarp.com/image'
  };
  const categoryOne = {
    name: 'water'
  };
  const categoryTwo = {
    name: 'fire'
  };
  before(() => {
    return db.sync({force: true})
      .then(() => Promise.all([
        Product.create(productOne),
        Product.create(productTwo),
        Product.create(productThree),
        Category.create(categoryOne),
        Category.create(categoryTwo)
      ]))
      .then(([prodOne, prodTwo, prodThree, catOne, catTwo]) => {
        prodOne.addCategory(catTwo);
        prodTwo.addCategory(catOne);
        prodThree.addCategory(catOne);
      });
  });
  after(() => {
    return db.sync({force:true});
  });
  describe('root (api/products)', () => {
    it('GET method returns all products', done => {
      agent.get('/api/products/')
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.a.lengthOf(3);
          done();
        });
    });
    it('GET allows for query strings', done => {
      agent.get('/api/products?name=Squirtle')
        .expect(200)
        .end(function(err, res){
          if(err) return done(err);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.a.lengthOf(1);
          expect(res.body[0].name).to.equal('Squirtle');
          done();
        });
    });
    it('POST sets a product correctly', done => {
      const newProd = {
        name: 'Zapdos',
        description: 'electric, flying type',
        inventory_qty: 1,
        price: 1234.78,
        photo: 'http://www.zapdos.com/image'
      }
      agent.post('/api/products')
        .send(newProd)
        .expect(201)
        .end(function(err, res){
          if(err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.equal('Zapdos');
          done();
        })
    })
  });
  describe('/category/:categoryId', () => {
    it('GET returns all products in a category', done => {
      Category.findOne({
        where: {
          name: 'water'
        }
      })
        .then(category => {
          agent.get(`/api/products/category/${category.id}`)
            .expect(200)
            .end(function(err, res){
              if(err) return done(err);
              expect(res.body).to.be.an('array');
              expect(res.body).to.have.a.lengthOf(2);
              expect(res.body.map(el => el.name)).to.deep.equal([productTwo.name, productThree.name]);
              done();
            })
        })
    });
    it('PUT adds a product to a category', done => {
      Promise.all([
        Category.findOne({
          where: {
            name: 'water'
          }
        }),
        Product.create({
          name: 'Blastoise',
          description: 'sweeeett!',
          inventory_qty: 4,
          price: 50.00,
          photo: 'http://www.blastoise.com/image'
        })
      ])
        .then(([category, product]) => {
          agent.put(`/api/products/category/${category.id}`)
            .send(product)
            .expect(200)
            .end(function(err, res){
              if(err) return done(err);
              product.getCategories()
                .then(categories => {
                  expect(categories).to.be.an('array');
                  expect(categories).to.have.a.lengthOf(1);
                  expect(categories[0].id).to.equal(category.id);
                  done()
                })
            })
        })
    });
  });

  describe('/:productId', () => {
    it('GET returns a product based on it\'s id', done => {
      Product.findOne({where: productTwo})
        .then(product => {
          agent.get(`/api/products/${product.id}`)
            .expect(200)
            .end(function(err, res){
              if(err) return done(err);
              expect(res.body).to.be.an('object');
              expect(res.body.name).to.equal(productTwo.name)
              done();
            })
        })
    });
    it('PUT correctly updates a product', done => {
      Product.findOne({where: productTwo})
        .then(product => {
          agent.put(`/api/products/${product.id}`)
            .send({name: 'Pikachu'})
            .expect(200)
            .end(function(err, res){
              if(err) return done(err);
              expect(res.body).to.be.an('array');
              expect(res.body).to.have.a.lengthOf(2);
              expect(res.body[0]).to.equal(1);
              expect(res.body[1]).to.be.an('array');
              expect(res.body[1]).to.have.a.lengthOf(1);
              expect(res.body[1][0].name).to.equal('Pikachu');
              expect(res.body[1][0].id).to.equal(product.id);
              done();
            })
        })
    });
  });
});
