import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {spy} from 'sinon';

import ProductList from '../../client/containers/ProductListContainer';

describe('Palette component', () => {
    const product = {
      listProducts: [
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
        }
      ]
    }
    let list, singleProductSpy;
    beforeEach('Create component and onChange spy', () => {
        singleProductSpy = spy();
        list = shallow(<ProductList singleProduct={singleProductSpy} />);
    });

    it('has min 0 and max 255', () => {
        const el = list.get(product);
        expect(el.props.min).to.be.equal('0');
        expect(el.props.max).to.be.equal('255');
    });

    it('calls passed in onChange prop with value of change event', () => {
    slider.simulate('change', { target: { value: 13 } });
    expect(onChangeSpy.called).to.be.true;
    });

});



