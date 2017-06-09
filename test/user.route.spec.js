const db = require('../server/db');
const User = db.model('user');
const app = require('../server');
const blue = require('chalk').blue;
import chai from 'chai';
const expect = chai.expect;
import chaiProperties from 'chai-properties';
import chaiThings from 'chai-things';
chai.use(chaiProperties);
chai.use(chaiThings);

import supertest from 'supertest-as-promised';


describe('▒▒▒ Backend tests user route ▒▒▒', () => {

    before('Synchronize and clear database', () => db.sync({force: true}));

    after('Synchronize and clear database', () => db.sync({force: true}));

    describe('`/users` route', function() {
        it('GET responds with an empty array at first', function() {
          // when we make requests to `/users` we will get back an empty array
          return supertest(app) // supertest object lets us make & test HTTP req/res
            .get('/api/users')      // makes an HTTP request: GET '/users'
            .expect(200)     // tests response status code
            .expect('Content-Type', /json/) // tests response header

            .expect(function(res) {

              expect(res.body).to.eql([]); // tests response body
            });
        });

    });


    describe('POST create users', function () {
      let peter;
      // let lois;

      beforeEach('Seeding users', () => {
        peter = { name: 'Peter', email: 'peter.griffin.the2nd@gmail.com', password: 'peter'}
        ;
      });

      it('Post a user to the db', function() {

        return supertest(app)
          .post('/api/users')
          .send(peter)
          .expect(201)
          .expect('Content-Type', /json/)
          .expect(function(res) {
          console.log(blue("RESRES", res));

          // expecting to recive back only the name and email (since we salted password )
            expect(res.body).to.include({name: 'Peter', email: 'peter.griffin.the2nd@gmail.com'});
          });
       });


       it('GET responds with  the all the user in our DB', function() {
          // when we make requests to `/users` we will get back an all the users (peter)
          return supertest(app)
            .get('/api/users')      // makes an HTTP request: GET '/users'
            .expect(200)     // tests response status code
            .expect('Content-Type', /json/) // tests response header

            .expect(function(res) {
              console.log(blue("RESRES", res.body));
              expect(res.body).to.have.length(1); // tests response body
            });
        });


        // it('GET a single user by id', function() {
        //   // when we make requests to `/users` we will get back an all the users (peter)
        //   return supertest(app)
        //     .get('/api/users?email=peter.griffin.the2nd@gmail.com&password=peter')  // makes an HTTP request: GET '/users'
        //     .expect(200)     // tests response status code
        //     .expect('Content-Type', /json/) // tests response header

        //     .expect(function(res) {
        //       console.log(blue("RESRES", res.body));
        //       expect(res.body.email).to.equal('peter.griffin.the2nd@gmail.com')
        //       .expect(res.body.password).to.e // tests response body
        //     });
        // });
    });
});
