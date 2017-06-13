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
          .then(() => Promise.all([
            Order.create({
                cart: true,
                status: null,
                address: '307 St Marks Pl'
            }),
            Product.create({
                name: 'Pikachu',
                description: 'Very pika',
                inventory_qty: 3,
                price: 2.50,
                photo: 'pikachu.com'
            })
          ]))
          .then(() => Promise.all([
            Order.findOne(),
            Product.findOne()
          ]))
          .then(([order, product]) => {
            // console.log(order.id);
            // console.log(product.id);
            // console.log(order.addProduct.toString())
            return order.addProductToOrder(product, product.price);
          })
          // .then(entry => entry.update({
          //     price: 1,
          //     quantity: 2
          // }))
    });

    describe('definition', () => {

        it('has a quantity field that is a number', () => {
          return orderProduct.findOne()
            .then(entry => {
              expect(entry.quantity).to.be.a('number');
            });
        });

        it('has a price field that is a string representaion of a number', () => {
        return orderProduct.findOne()
            .then(entry => {
            expect(entry.price).to.be.a('string');
            expect(+entry.price).to.equal(2.50)
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

    describe('Associations', () => {
      it('order.getProducts correctly returns all associated products', () => {
        return Order.findOne()
          .then(order => order.getProducts())
          .then(productList => {
            expect(productList).to.be.an('array');
            expect(productList).to.have.a.lengthOf(1);
            expect(productList[0].id).to.equal(1);
          })
      })
    })
});
