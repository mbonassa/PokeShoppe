import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../reducer/product';
import ProductItem from '../components/ProductItem';

class ProductListContainer extends React.Component {

  constructor (props) {
    super(props);

  }

  componentDidMount() {
    this.props.onEnter()
  }

  render (props) {
    //const { children, handleClick, loggedIn } = props;
    return (
      <div>
        <ul>
          {
            this.props.product.listProducts
              .map(product => <ProductItem singleProduct={product} key={product.id} />)
          }
        </ul>
      </div>
    );
  }
}

const mapState = (state) => state;

const mapDispatch = dispatch => ({
  onEnter: () => {
    return dispatch(fetchProducts())
  },
});

export default connect(mapState, mapDispatch)(ProductListContainer);
