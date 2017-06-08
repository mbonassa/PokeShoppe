const db = require('../server/db/db');
const Review = require('../server/db/models/review.js');
const Product = require('../server/db/models/product.js');
const User = require('../server/db/models/user.js');
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

    describe('Review routes', function () {

        describe('HTTP Server', () => {

        let agent;
        beforeEach('Set up agent for testing', () => {
            agent = supertest(app);
        });

        describe('api routes', () => {

            let user1;
            let user2;
            let user3;
            beforeEach('Seed users', () => {
                const users = [
                  {name: 'Peter', email: 'peter.griffin.the2nd@gmail.com', password: 'peter'}, {name: 'Lois', email: 'lois.griffin.the2nd@gmail.com', password: 'lois'}, {name: 'Meg', email: 'meg.griffin.the2nd@gmail.com', password: 'meg'}
                ];
                return User.bulkCreate(users, {returning: true})
                    .then(createdUsers => {
                        user1 = createdUsers[0].dataValues.id;
                        user2 = createdUsers[1].dataValues.id;
                        user3 = createdUsers[2].dataValues.id
                    });

            });

            let product1;
            let product2;
            let product3;
            beforeEach('Seed products', () => {
                const products = [
                  {name: 'Pikachu', description:  'Pika-pika-pikachu', category: 'yellow', inventory_qty: 10, price: 99.99 },
                  {name: 'Celebi', description:  'Ce-celebi', category: 'greenish', inventory_qty: 20, price: 19.99 },
                  {name: 'Eevee', description:  'haha-Eevee', category: 'brown', inventory_qty: 30, price: 39.99 }
                ];
                return Product.bulkCreate(products, {returning: true})
                    .then(createdProducts => {
                        // console.log('CREATED PRODUCTS!!!!',createdProducts)
                        product1 = createdProducts[0].dataValues.id;
                        product2 = createdProducts[1].dataValues.id;
                        product3 = createdProducts[2].dataValues.id
                    });

            });


            let review1;
            let review2;
            let review3;
            beforeEach('Seed reviews', () => {
                const reviews = [
                  {title: 'Super cool product', description: 'I bought it for my son and he plays with it all the time', rating: 5, productId: 1},
                  {title: 'Bad product', description: 'I bought it for my son and he does not plays with it at all', rating: 1, productId: 1},
                  {title: 'Great product', description: 'I bought for myself', rating: 4, productId: 2},
                ];
                return Review.bulkCreate(reviews, {returning: true})
                    .then(createdReviews => {
                        // console.log('CREATED REVIEWS', createdReviews[0].dataValues)
                        review1 = createdReviews[0].dataValues.title;
                        review2 = createdReviews[1].dataValues.title;
                        review3 = createdReviews[2].dataValues.id
                        // console.log('REVIEW1',review1)
                    });

            });

            describe('get', () => {

                it('Get all reviews from a specific product — /:productId', () => {
                    return agent
                        .get('/api/reviews/1')
                        .expect(200)
                        .then(res => {
                            expect(res.body).to.be.an('array');
                            expect(res.body.length).to.be.equal(2);
                            expect(res.body[0]).to.be.an('object').that.includes({
                            title: 'Super cool product'
                            });
                            expect(res.body[1]).to.be.an('object').that.includes({
                            title: 'Bad product'
                            });
                        });
                });
            });

            describe('post', () => {

                it('Post a review to a specific product (from a specific user)  — /:productId', () => {
                    return agent
                        .post('/api/reviews/2')
                        .send({
                            title: 'good for me!',
                            description: "I like this thing... it is so useful I can't even take it",
                            rating: 4,
                            userId: 1
                        })
                        .expect(201)
                        .then(res => {
                            const createdReview = res.body;
                            return Review.findById(createdReview.id)
                        })
                        .then(foundReview => {
                            expect(foundReview.description).to.be.equal("I like this thing... it is so useful I can't even take it");
                        })
                });
            });
        });
      });
    });
});
