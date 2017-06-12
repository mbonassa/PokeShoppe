import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../reducer/user';
import Navbar from './Navbar';
import { fetchProducts, fetchCart } from '../reducer/product';
import ProductItem from './ProductItem';

// Component //

class Main extends React.Component {

  constructor () {
    super();
  }

  componentDidMount() {
    this.props.onEnter()
    //note: we're using a dummy userId before we finalize the logic
    this.props.fetchingCart(5)
  }

  render () {
    //const { children, handleClick, loggedIn } = props;

    return (
      <div>
        <Navbar />
        <ul>
          {
            this.props.product.listProducts
              .map(product => <ProductItem singleProduct={product} key={product.id} />)
          }
        </ul>
      </div>
    );
  };
}
// Main.propTypes = {
//   children: PropTypes.object,
//   handleClick: PropTypes.func.isRequired,
//   loggedIn: PropTypes.bool.isRequired
// };


// // Container //

const mapState = (state) => state;

const mapDispatch = dispatch => ({
  onEnter: () => {
    return dispatch(fetchProducts())
  },
  fetchingCart: userId => {
    return dispatch(fetchCart(userId))
  }
});

export default connect(mapState, mapDispatch)(Main);

