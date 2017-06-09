const db = require('../server/db');
const User = db.model('user');

import chai from 'chai';
const expect = chai.expect;
import chaiProperties from 'chai-properties';
import chaiThings from 'chai-things';
chai.use(chaiProperties);
chai.use(chaiThings);



describe('▒▒▒ Backend tests for user model ▒▒▒', () => {

    describe('Sequelize models', function () {

        describe('User Model attributes', () => {

            // *Assertion translation*:
            // This assertion expects that the User model will
            // put an `email` column in the users table.
            it('has the expected name definition', () => {
                expect(User.attributes.name).to.be.an('object');
            });

            it('has the expected schema definition', () => {
                expect(User.attributes.type).to.be.an('object');
            });

            it('has the expected email definition', () => {
                expect(User.attributes.email).to.be.an('object');
            });

            it('has the expected password definition', () => {
                expect(User.attributes.password).to.be.an('object');
            });

            it('has the expected salt definition', () => {
                expect(User.attributes.salt).to.be.an('object');
            });

            it('has the expected googleId definition', () => {
                expect(User.attributes.googleId).to.be.an('object');
            });

            it('has the expected photo definition', () => {
                expect(User.attributes.photo).to.be.an('object');
            });

            it('has the expected password_resetma definition', () => {
                expect(User.attributes.password_reset).to.be.an('object');
            });
        });
    });


            describe('validations', () => {

                // *Assertion translation*:
                // The `email` column should be a required field.
                it('type has default value of "BASIC" ', () => {
                    const user = User.build();
                    expect(user.type).to.be.equal('BASIC');
                });



                it('require email', () => {
                    const user = User.build();
                    return user.validate()
                        .then(err => {
                            expect(err).to.be.an('object');
                            expect(err.errors).to.contain.a.thing.with.properties({
                                path: 'email',
                                type: 'notNull Violation'
                            });
                        });
                });

                it('password_reset has default value of false ', () => {
                    const user = User.build();
                    expect(user.password_reset).to.be.equal(false);
                });

            });
});

