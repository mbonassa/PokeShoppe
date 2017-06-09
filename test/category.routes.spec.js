const db = require('../server/db/db');
const Category = require('../server/db/models/category.js');
//const app = require('../server/api')

import app from '../server';

// import fsMisc from 'fs-misc';
import chai from 'chai';
// import chaiProperties from 'chai-properties';
// import chaiThings from 'chai-things';
// chai.use(chaiProperties);
// chai.use(chaiThings);
const expect = chai.expect;
import supertest from 'supertest';
// import sinon from 'sinon';



describe('▒▒▒ Backend tests ▒▒▒', () => {

    beforeEach('Synchronize and clear database', () => db.sync({force: true}));

    after('Synchronize and clear database', () => db.sync({force: true}));

    describe('Category routes', function () {

        describe('HTTP Server', () => {

        let agent;
        beforeEach('Set up agent for testing', () => {
            agent = supertest(app);
        });

        describe('api routes', () => {

            let category1;
            let category2;
            let category3;
            beforeEach('Seed categories', () => {
                const categories = [
                  {name: 'Grass'}, { name: 'Fire' }, { name: 'Water' }
                ];
                return Category.bulkCreate(categories, {returning: true})
                    .then(createdCategories => {
                        category1 = createdCategories[0].dataValues.id;
                        category2 = createdCategories[1].dataValues.id;
                        category3 = createdCategories[2].dataValues.id
                    });

            });

            describe('categories CRUD routes', () => {

                it('Get all categories', () => {
                    return agent
                        .get('/api/categories')
                        .expect(200)
                        .then(res => {
                            expect(res.body).to.be.an('array');
                            expect(res.body.length).to.be.equal(3);
                            expect(res.body[0]).to.be.an('object').that.includes({
                            name: 'Grass'
                            });
                        });
                });

                it('Get a specific category', () => {
                    return agent
                        .get('/api/categories/1')
                        .expect(200)
                        .then(res => {
                            expect(res.body).to.be.an('object').that.includes({
                            id: 1
                            });
                        });
                });

                it('Post a new category', () => {
                    return agent
                        .post('/api/categories')
                        .send({
                            name: 'superPoke!'
                        })
                        .expect(201)
                        .then(res => {
                            const createdReview = res.body;
                            return Category.findById(createdReview.id)
                        })
                        .then(foundCategory => {
                            expect(foundCategory.name).to.be.equal('superPoke!');
                        })
                });


                it('Update a specific category  — /:categoryId', () => {
                    return agent
                        .put('/api/categories/2')
                        .send({
                            name: 'cloudPokeman'
                        })
                        .expect(201)
                        .then(res => {
                            return Category.findById(2)
                        })
                        .then(foundCategory => {
                            expect(foundCategory.name).to.be.equal('cloudPokeman');
                        })
                });

                it('Delete a specific category  — /:categoryId', () => {
                    return agent
                        .delete('/api/categories/3')
                        .expect(200)
                        .then(res => {
                            return Category.findById(3)
                        })
                        .then(foundCategory => {
                            expect(foundCategory).to.be.equal(null);
                        })
                });
            });
        });
      });
    });
});
