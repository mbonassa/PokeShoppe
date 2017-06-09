'use strict';

const db = require('../server/db');
const Product = require('../server/db/models/product');
const chai = require('chai');
const chaiProperties = require('chai-properties');
const chaiThings = require('chai-things');
chai.use(chaiProperties);
chai.use(chaiThings);
const expect = chai.expect;

describe('Product Model', () => {
  before(() => {
    return db.sync({force: true})
      .then(() => Product.create({
        name: 'Charizard',
        description: 'Awesome, powerful, fire-type pokemon! Super rare...',
        inventory_qty: 1,
        price: 123456.78,
        photo: 'http://www.charizard.com/image'
      }))
  });
  describe('definition', () => {
    it('has a name field that is a string', () => {
      return Product.findOne()
        .then(product => {
          expect(product.name).to.be.a('string');
          expect(product.name).to.equal('Charizard');
        });
    });
    it('has a description field that is a string', () => {
      return Product.findOne()
        .then(product => {
          expect(product.description).to.be.a('string');
          expect(product.description).to.equal('Awesome, powerful, fire-type pokemon! Super rare...');
        })
    });
    it('has an inventory_qty field that is a number', () => {
      return Product.findOne()
        .then(product => {
          expect(product.inventory_qty).to.be.a('number');
          expect(product.inventory_qty).to.equal(1);
        })
    });
    it('has a price field that is a number with two decimal places', () => {
      return Product.findOne()
        .then(product => {
          // expect(product.price).to.be.a('number');
          expect(+product.price).to.equal(123456.78);
        })
    });
    it('has a photo field that is a string', () => {
      return Product.findOne()
        .then(product => {
          expect(product.photo).to.be.a('string');
          expect(product.photo).to.equal('http://www.charizard.com/image');
        })
    });
  });
  describe('validation', () => {
    it('requires a name', () => {
      const product = Product.build({
        description: 'Awesome, small, fire-type pokemon! Super rare...',
        inventory_qty: 1,
        price: 123456.78,
        photo: 'http://www.charizard.com/image'
      });
      return product.validate()
        .then(err => {
          expect(err).to.be.an('object');
          expect(err.errors).to.contain.a.thing.with.properties({
            path: 'name',
            type: 'notNull Violation'
          })
        })
    });
    it('requires a price', () => {
      const product = Product.build({
        name: 'Charmander',
        description: 'Awesome, small, fire-type pokemon! Super rare...',
        inventory_qty: 1,
        photo: 'http://www.charizard.com/image'
      });
      return product.validate()
        .then(err => {
          expect(err).to.be.an('object');
          expect(err.errors).to.contain.a.thing.with.properties({
            path: 'price',
            type: 'notNull Violation'
          })
        })
    });
  });
});
