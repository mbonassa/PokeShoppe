const db = require('../server/db/db');
const Review = require('../server/db/models/review.js');
import app from '../server/api';

// import fsMisc from 'fs-misc';
import chai from 'chai';
// import chaiProperties from 'chai-properties';
// import chaiThings from 'chai-things';
// chai.use(chaiProperties);
// chai.use(chaiThings);
const expect = chai.expect;
import supertest from 'supertest-as-promised';
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

            let review1;
            let review2;
            let review3;
            beforeEach('Seed reviews', () => {
                const reviews = [
                  {title: 'Super cool product', description: 'I bought it for my son and he plays with it all the time', rating: 5},
                  {title: 'Bad product', description: 'I bought it for my son and he does not plays with it at all', rating: 1},
                  {title: 'Great product', description: 'I bought for myself', rating: 4},
                ];
                return Review.bulkCreate(reviews, {returning: true})
                    .then(createdReviews => {
                        // console.log('CREATED REVIEWS', createdReviews)
                        review1 = createdReviews[0].id;
                        review2 = createdReviews[1].id;
                        review3 = createdReviews[1].id
                    });

            });

            describe('reviews', () => {

                it('Get all reviews from a specific product — /:productId', () => {
                    // console.log('HERE!!!')
                    return agent
                        .get('/reviews/1')
                        .expect(200)
                        .then(res => {
                            console.log('HERE!!!',res)
                            expect(res.body).to.be.an('array');
                            expect(res.body.length).to.be.equal(3);
                            expect(res.body).to.contain.a.thing.with('id', review1);
                            expect(res.body).to.contain.a.thing.with('id', review2);
                        });
                });
            })

        })
      })
    })
})
