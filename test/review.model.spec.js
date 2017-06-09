// const db = require('../server/db/db');
// const Review = require('../server/db/models/review.js');

// // import fsMisc from 'fs-misc';
// import chai from 'chai';
// // import chaiProperties from 'chai-properties';
// // import chaiThings from 'chai-things';
// // chai.use(chaiProperties);
// // chai.use(chaiThings);
// const expect = chai.expect;
// // import supertest from 'supertest-as-promised';
// // import sinon from 'sinon';

// describe('▒▒▒ Backend tests ▒▒▒', () => {

//     beforeEach('Synchronize and clear database', () => db.sync({force: true}));

//     after('Synchronize and clear database', () => db.sync({force: true}));

//     describe('Sequelize models', function () {

//         describe('Review Model', () => {

//             // *Assertion translation*:
//             // This assertion expects that the Review model will
//             // put an `title, description, and rating` columns in the review table.
//             it('has the expected schema definition', () => {
//                 expect(Review.attributes.title).to.be.an('object');
//                 expect(Review.attributes.description).to.be.an('object');
//                 expect(Review.attributes.rating).to.be.an('object');
//             });
//         });

//         describe('validations', () => {

//             // it('defaults subject to "No Subject"', () => {
//             //     // .build creates an instance of a model
//             //     // without saving the represented data to the database.
//             //     const message = Message.build();
//             //     expect(message.subject).to.be.equal('No Subject');
//             // });

//             it('requires a title', () => {
//                 const review = Review.build({description: 'new description', rating: 4});
//                 return review.validate()
//                     .then(err => {
//                         expect(err).to.be.an('object');
//                         expect(err.errors).to.contain.a.thing.with.properties({
//                             path: 'title',
//                             type: 'notNull Violation'
//                         });
//                     });
//             });

//             it('requires a rating', () => {
//                 const review = Review.build({title: 'new title', description: 'new description', rating: 4});
//                 return review.validate()
//                     .then(err => {
//                         expect(err).to.be.an('object');
//                         expect(err.errors).to.contain.a.thing.with.properties({
//                             path: 'rating',
//                             type: 'notNull Violation'
//                         });
//                     });
//             });

//             it('requires a rating cannot be greater than 5', () => {
//                 const review = Review.build({title: 'new title', description: 'new description', rating: 6});
//                 return review.validate()
//                     .then(err => {
//                         expect(err).to.be.an('object');
//                         expect(err.errors).to.contain.a.thing.with.properties({
//                             path: 'rating',
//                             type: 'range Violation'
//                         });
//                     });
//             });

//         });

//         // describe('functionality', () => {

//         //     let annaId;
//         //     let elsaId;
//         //     beforeEach('Seed users', () => {
//         //         const users = [
//         //             {email: 'anna@gmail.com'},
//         //             {email: 'elsa@gmail.com'}
//         //         ];
//         //         return User.bulkCreate(users, {returning: true})
//         //             .then(createdUsers => {
//         //                 annaId = createdUsers[0].id;
//         //                 elsaId = createdUsers[1].id;
//         //             });
//         //     });
//         // })
//     });
// });
// //     describe('HTTP Server', () => {

// //         let agent;
// //         beforeEach('Set up agent for testing', () => {
// //             agent = supertest(app);
// //         });
// //     })

// // }
