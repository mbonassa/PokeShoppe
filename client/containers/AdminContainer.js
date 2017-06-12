import  React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../reducer/product';
import ProductItem from '../components/ProductItem';

class AdminContainer extends Component {
  constructor (props) {
    super(props);

  }

  render() {
      console.log(this.props);
      return (
        <div> HIH</div>
      )
  }
}

export default AdminContainer;
