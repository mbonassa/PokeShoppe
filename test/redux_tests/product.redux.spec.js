import {expect} from 'chai';
import {createStore} from 'redux';

import productReducer from '../../client/reducer/product';
import {getProducts, singleProduct, fetchingCart, addingToCart} from '../../client/reducer/product';

// -------- actions -------- //
describe('Color actions', () => {

    describe('setFirst', () => {

        it('returns properly formatted action', () => {

            const testColor = [0, 255, 0];

            expect(setFirst(testColor)).to.be.deep.equal({
                type: 'SET_FIRST_COLOR',
                color: testColor
            });

        });

    });


// --------- reducer tests ---------- //


    describe('Main reducer', () => {

        let testStore;
        beforeEach('Create testing store', () => {
            testStore = createStore(mainReducer);
        });

        it('has expected initial state', () => {
            expect(testStore.getState()).to.be.deep.equal({
                firstColor: [0, 0, 0],
                secondColor: [0, 0, 0],
                thirdColor: [0, 0, 0]
            });
        });
    })


})
