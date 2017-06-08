const db = require('../server/db');
const Order = require('../server/db/models/order');
const chai = require('chai');
const chaiProperties = require('chai-properties');
const chaiThings = require('chai-things');
chai.use(chaiProperties);
chai.use(chaiThings);
const expect = chai.expect;

describe('Order Model', () => {

    before(() => {
        return db.sync({force: true})
        .then(() => Order.create({
            cart: false,
            status: 'CREATED',
            address: '400 Maiden Lane'
        }))
    });

    describe('definition', () => {

        it('has a cart field that is a boolean', () => {
        return Order.findOne()
            .then(order => {
            expect(order.cart).to.be.a('boolean');
            });
        });

        it('has a status field that is a string', () => {
        return Order.findOne()
            .then(order => {
            expect(order.status).to.be.a('string');
            });
        });

        it('has an address field that is a string', () => {
        return Order.findOne()
            .then(order => {
            expect(order.address).to.be.a('string');
            });
        });

    });

    // describe('validation', () => {

    //     it('requires a truthy status field if cart field is false', () => {
    //     const order = Order.build({
    //         cart: false,
    //         status: null
    //     });
    //     return order.validate()
    //         .then(err => {
    //         expect(err).to.be.an('object');
    //         // expect(err.errors).to.contain.a.thing.with.properties({
    //         //     path: 'name',
    //         //     type: 'notNull Violation'
    //         })
    //     })
    // });
});
