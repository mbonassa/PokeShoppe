const db = require('../server/db');
const orderProduct = require('../server/db/models/order_product');
const Order = require('../server/db/models/order');
const Product = require('../server/db/models/product');
const chai = require('chai');
const chaiProperties = require('chai-properties');
const chaiThings = require('chai-things');
chai.use(chaiProperties);
chai.use(chaiThings);
const expect = chai.expect;

describe('orderProduct Model', () => {

    before(() => {
        return db.sync({force: true})
        .then(() => Order.create({
            cart: true,
            status: null,
            address: '307 St Marks Pl'
        }))
        .then(() => Product.create({
            name: 'Pikachu',
            description: 'Very pika',
            inventory_qty: 3,
            price: 2.50,
            photo: 'pikachu.com' 
        }))
        .then(product => {
            Order.findById(1)
            .then(entry => {
                return entry.addProduct(product)
            })
            .then(entry => {
                entry.update({
                    price: 1,
                    quantity: 2
                })
            })
        })

    });

    describe('definition', () => {

        it('has a quantity field that is a number', () => {
        return orderProduct.findOne()
            .then(entry => {
            expect(entry.quantity).to.be.a('number');
            });
        });

        it('has a price field that is a number', () => {
        return orderProduct.findOne()
            .then(entry => {
            expect(entry.status).to.be.a('number');
            });
        });

        it('has an orderId field that is a number', () => {
        return orderProduct.findOne()
            .then(entry => {
            expect(entry.orderId).to.be.a('number');
            });
        });

        it('has an productId field that is a number', () => {
        return orderProduct.findOne()
            .then(entry => {
            expect(entry.productId).to.be.a('number');
            });
        });

    });
});