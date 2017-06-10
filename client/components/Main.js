import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../reducer/user';
import Navbar from './Navbar';
import { fetchProducts } from '../reducer/products';
import ProductItem from './ProductItem';

// Component //

class Main extends React.Component {

  constructor () {
    super();
  }

  componentDidMount() {
    this.props.onEnter()
  }

  render () {
    //const { children, handleClick, loggedIn } = props;
    return (
      <div>
        <Navbar />
        <ul>
          {
            this.props.products.listProducts
              .map(product => <ProductItem product={product} key={product.id} />)
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
});

export default connect(mapState, mapDispatch)(Main);

