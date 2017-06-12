import React from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';

import { fetchProduct } from '../reducer/product';
//import { buyProduct } from '???';


/* -----------------    COMPONENT     ------------------ */
class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.onProductClick = this.onProductClick.bind(this);
  }
  render(){
    console.log('PRODUCT.PRODUCT', this.props.selectedProduct)
    const product = this.props.selectedProduct;
    return(
    <div className="row clearfix">

      <div className="col-sm-4 col-lg-4 col-md-4">
          <div className="thumbnail">
              <img src={product.photo} alt="http://placehold.it/320x150" />
              <div className="caption">
                  <h4 className="pull-right">{product.price}</h4>
                  <h4><a href="#">{product.name}</a>
                  </h4>
                  <p>{product.description}</p>
                  <button onClick={this.onProductClick} type="button" class="btn btn-primary btn-sm pull-right">Buy {product.name}!</button>
              </div>
              <div className="ratings">
                  <p className="pull-right">? reviews</p>
                  <p>
                      <span className="glyphicon glyphicon-star"></span>
                      <span className="glyphicon glyphicon-star"></span>
                      <span className="glyphicon glyphicon-star"></span>
                      <span className="glyphicon glyphicon-star"></span>
                      <span className="glyphicon glyphicon-star"></span>
                  </p>
              </div>
          </div>
      </div>
    </div>
    )}
  onProductClick(){
    // this.props.purchaseItem(this.props.selectedProduct.id);

  }

  componentDidMount(){
    this.props.loadProduct(this.props.params.id);
  }

}


/* -----------------    CONTAINER     ------------------ */
function mapStateToProps(state){
  console.log('SINGLE PRODUCT STATE',state.product)
  return {
    selectedProduct: state.product.product
  }
}

function mapDispatchToProps(dispatch){
  return {
    loadProduct: (id) => {
      dispatch(fetchProduct(id));
    },
    // purchaseItem: (id) => {
    //   dispatch(buyProduct(id));
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
