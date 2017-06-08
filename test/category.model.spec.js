'use strict';

const db = require('../server/db');
const Category = require('../server/db/models/category');
const chai = require('chai');
const chaiProperties = require('chai-properties');
const chaiThings = require('chai-things');
chai.use(chaiProperties);
chai.use(chaiThings);
const expect = chai.expect;

console.log(process.env.DATABASE_URL);

describe('Category Model', () => {
  before(() => {
    return db.sync({force: true})
      .then(() => Category.create({
        name: 'Fire'
      }))
  });
  describe('definition', () => {
    it('has a name field that is a string', () => {
      Category.findOne()
        .then(category => {
          expect(category.name).to.be.a('string');
        });
    });
  });
  describe('validation', () => {
    it('requires a name field', () => {
      const category = Category.build();
      return category.validate()
        .then(err => {
          expect(err).to.be.an('object');
          expect(err.errors).to.contain.a.thing.with.properties({
            path: 'name',
            type: 'notNull Violation'
          })
        })
    });
  });
});
