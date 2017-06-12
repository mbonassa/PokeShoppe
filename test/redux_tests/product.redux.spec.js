import {expect} from 'chai';
import {createStore} from 'redux';
import productReducer, { getProducts, singleProduct, fetchingCart, addingToCart} from '../../client/reducer/product';
//console.log('PRODUCTS', products)
// -------- actions -------- //
describe('Product actions', () => {

    describe('getProducts', () => {

        it('returns properly formatted action', () => {

          const products = [{
            description: 'Pika-pika-pikachu',
            id: 2,
            inventory_qty: 10,
            name: 'Pikachu',
            photo: 'https://cdn.bulbagarden.net/upload/thumb/0/0d/025Pikachu.png/250px-025Pikachu.png',
            price: '99.99'
          },{
            description: 'haha-Eevee',
            id: 4,
            inventory_qty: 30,
            name: 'Eevee',
            photo: 'https://cdn.bulbagarden.net/upload/thumb/e/e2/133Eevee.png/250px-133Eevee.png',
            price: '39.99'
          }];

            expect(getProducts(products)).to.be.deep.equal({
                type: 'GET_PRODUCTS',
                products: products
            });
        })

    describe('singleProduct', () => {

        it('returns properly formatted action', () => {

            const product = {
            description: 'Pika-pika-pikachu',
            id: 2,
            inventory_qty: 10,
            name: 'Pikachu',
            photo: 'https://cdn.bulbagarden.net/upload/thumb/0/0d/025Pikachu.png/250px-025Pikachu.png',
            price: '99.99'
          }

            expect(singleProduct(product)).to.be.deep.equal({
                type: 'GET_SINGLE_PRODUCT',
                product: product
            });
        })
    })

    describe('fetchingCart', () => {

        it('returns properly formatted action', () => {

            const cart = {
            id: 1,
            cart: true,
            status: null,
            address: null,
            userId: 1
          }

            expect(fetchingCart(cart)).to.be.deep.equal({
                type: 'GET_CART',
                cart: cart
            });
        })
    })

    describe('addingToCart', () => {

        it('returns properly formatted action', () => {

            const product = {
            description: 'Pika-pika-pikachu',
            id: 2,
            inventory_qty: 10,
            name: 'Pikachu',
            photo: 'https://cdn.bulbagarden.net/upload/thumb/0/0d/025Pikachu.png/250px-025Pikachu.png',
            price: '99.99'
          }

            expect(addingToCart(product)).to.be.deep.equal({
                type: 'ADD_TO_CART',
                product: product
            });
        })
    })
  });

})
// --------- reducer tests ---------- //


describe('Product reducer', () => {

    let testStore;
    beforeEach('Create testing store', () => {
        testStore = createStore(productReducer);
    });

    const initialProductState = {
      listProducts: [],
      product: {},
      cart: {},
      cartProducts: []
    }

    it('has expected initial state', () => {
        expect(testStore.getState()).to.be.deep.equal(initialProductState);
    });

    describe('GET_PRODUCTS', () => {

      const products = [{
        description: 'Pika-pika-pikachu',
        id: 2,
        inventory_qty: 10,
        name: 'Pikachu',
        photo: 'https://cdn.bulbagarden.net/upload/thumb/0/0d/025Pikachu.png/250px-025Pikachu.png',
        price: '99.99'
      },{
        description: 'haha-Eevee',
        id: 4,
        inventory_qty: 30,
        name: 'Eevee',
        photo: 'https://cdn.bulbagarden.net/upload/thumb/e/e2/133Eevee.png/250px-133Eevee.png',
        price: '39.99'
        }];

        it('sets the listProducts attribute', () => {
            testStore.dispatch({ type: 'GET_PRODUCTS', products });
            const newState = testStore.getState();
            expect(newState.listProducts).to.be.deep.equal(products);
            expect(newState.product).to.be.deep.equal(initialProductState.product);
            expect(newState.cart).to.be.deep.equal(initialProductState.cart);
            expect(newState.cartProducts).to.be.deep.equal(initialProductState.cartProducts);

        });

    });

    describe('GET_SINGLE_PRODUCT', () => {

        const product = {
        description: 'Pika-pika-pikachu',
        id: 2,
        inventory_qty: 10,
        name: 'Pikachu',
        photo: 'https://cdn.bulbagarden.net/upload/thumb/0/0d/025Pikachu.png/250px-025Pikachu.png',
        price: '99.99'
        }

        it('sets the product attribute', () => {
            testStore.dispatch({ type: 'GET_SINGLE_PRODUCT', product });
            const newState = testStore.getState();
            expect(newState.listProducts).to.be.deep.equal(initialProductState.listProducts);
            expect(newState.product).to.be.deep.equal(product);
            expect(newState.cart).to.be.deep.equal(initialProductState.cart);
            expect(newState.cartProducts).to.be.deep.equal(initialProductState.cartProducts);

        });

    });

    describe('GET_CART', () => {
        const cart = {
          id: 1,
          cart: true,
          status: null,
          address: null,
          userId: 1
        }

        it('sets the cart attribute', () => {
            testStore.dispatch({ type: 'GET_CART', cart });
            const newState = testStore.getState();
            expect(newState.listProducts).to.be.deep.equal(initialProductState.listProducts);
            expect(newState.product).to.be.deep.equal(initialProductState.product);
            expect(newState.cart).to.be.deep.equal(cart);
            expect(newState.cartProducts).to.be.deep.equal(initialProductState.cartProducts);

        });

    });

    describe('ADD_TO_CART', () => {

        const product = {
          description: 'Pika-pika-pikachu',
          id: 2,
          inventory_qty: 10,
          name: 'Pikachu',
          photo: 'https://cdn.bulbagarden.net/upload/thumb/0/0d/025Pikachu.png/250px-025Pikachu.png',
          price: '99.99'
        }

        it('sets the cartProducts attribute', () => {
            testStore.dispatch({ type: 'ADD_TO_CART', product });
            const newState = testStore.getState();
            expect(newState.listProducts).to.be.deep.equal(initialProductState.listProducts);
            expect(newState.product).to.be.deep.equal(initialProductState.product);
            expect(newState.cart).to.be.deep.equal(initialProductState.cart);
            expect(newState.cartProducts[0]).to.be.deep.equal(product);

        });

    });


})
