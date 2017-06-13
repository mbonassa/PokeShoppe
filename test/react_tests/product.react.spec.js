import React from 'react';
import {expect} from 'chai';
import {shallow, render, mount} from 'enzyme';
import { Provider } from 'react-redux';
import {spy} from 'sinon';
import store from '../../client/store'
import ProductList from '../../client/containers/ProductListContainer';
import ProductItem from '../../client/components/ProductItem';

describe('ProductList container', () => {

    // store.product = {
    //   listProducts: [
    //     {
    //       id: 1,
    //       photo: 'https://cdn.bulbagarden.net/upload/thumb/0/0d/025Pikachu.png/250px-025Pikachu.png',
    //       name: 'Pikachu',
    //       description: 'Pika-pika-pikachu'
    //     },
    //     {
    //       description: 'haha-Eevee',
    //       id: 4,
    //       name: 'Eevee',
    //       photo: 'https://cdn.bulbagarden.net/upload/thumb/e/e2/133Eevee.png/250px-133Eevee.png',
    //     }
    //   ]
    // }
    // console.log('STORE',store)

    const testProds = [
        {
          id: 1,
          photo: 'https://cdn.bulbagarden.net/upload/thumb/0/0d/025Pikachu.png/250px-025Pikachu.png',
          name: 'Pikachu',
          description: 'Pika-pika-pikachu'
        },
        {
          description: 'haha-Eevee',
          id: 4,
          name: 'Eevee',
          photo: 'https://cdn.bulbagarden.net/upload/thumb/e/e2/133Eevee.png/250px-133Eevee.png',
        },
         {
          description: 'lol-Haunter',
          id: 5,
          name: 'Haunter',
          photo: 'https://cdn.bulbagarden.net/upload/thumb/e/e2/133Eevee.png/250px-133Eevee.png',
        }
      ]

    const fakeStore = store; //Import reducer and call createStore seperately
    //var store = createStore();
    var CustomProvider;

    // let list, singleProductSpy;
    // singleProductSpy = spy();
    var component;
    beforeEach('Create component and onChange spy', () => {
        // CustomProvider = ({children}) => {
        //   return (
        //     <Provider store={store}>
        //         {children}
        //     </Provider>
        //   );
        // }
        component = shallow(
            <ProductList products={testProds} store={store} />
        )
    })


    it('Contains a ProductItem for each product passed as props', () => {
      // console.log('**', component.props());
      expect(component.props().products.length).to.be.equal(testProds.length)
      expect(component.props().products[1].id).to.be.equal(testProds[1].id)
  });

    // it('has min 0 and max 255', () => {
    //     const el = list.get(product);
    //     expect(el.props.min).to.be.equal('0');
    //     expect(el.props.max).to.be.equal('255');
    // });

    // it('calls passed in onChange prop with value of change event', () => {
    // slider.simulate('change', { target: { value: 13 } });
    // expect(onChangeSpy.called).to.be.true;
    // });

});



