import React from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';

import { fetchProduct, addToCart, fetchCart } from '../reducer/product';
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
    const product = this.props.selectedProduct;
    return(
      <div className="container">

        <div className="row">

            <div className="col-md-3">
                <p className="lead">Shop Name</p>
                <div className="list-group">
                    <a href="#" className="list-group-item active">Category 1</a>
                    <a href="#" className="list-group-item">Category 2</a>
                    <a href="#" className="list-group-item">Category 3</a>
                </div>
            </div>

            <div className="col-md-9">

                <div className="thumbnail">
                    <img className="img-responsive" src={product.photo} alt="http://placehold.it/320x150" />
                    <div className="caption-full">
                        <h4 className="pull-right">${product.price}</h4>
                        <h4><a href="#">{product.name}</a>
                        </h4>
                        <p className="pull-right">3 reviews</p>
                        <p>{product.description}</p>
                    </div>
                    <button onClick={this.onProductClick} type="button" className="btn btn-primary btn-xs pull-right">Buy {product.name}!</button>
                    <div className="ratings">

                        <p>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star-empty"></span>
                            4.0 stars
                        </p>
                    </div>
                </div>

                <div className="well">

                    <div className="text-right">
                        <a className="btn btn-success">Leave a Review</a>
                    </div>

                    <hr />

                    <div className="row">
                        <div className="col-md-12">
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star-empty"></span>
                            Anonymous
                            <span className="pull-right">10 days ago</span>
                            <p>This product was great in terms of quality. I would definitely buy another!</p>
                        </div>
                    </div>

                    <hr />

                    <div className="row">
                        <div className="col-md-12">
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star-empty"></span>
                            Anonymous
                            <span className="pull-right">12 days ago</span>
                            <p>Ive alredy ordered another one!</p>
                        </div>
                    </div>

                    <hr />

                    <div className="row">
                        <div className="col-md-12">
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star-empty"></span>
                            Anonymous
                            <span className="pull-right">15 days ago</span>
                            <p>Ive seen some better than this, but not at this price. I definitely recommend this item.</p>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </div>
    )}

    onProductClick(){
        this.props.buyProduct(this.props.stateProps.product.cart.id, this.props.selectedProduct.id, 1)

    }

    componentDidMount(){
        this.props.onEnter(this.props.stateProps.user.id)
        this.props.loadProduct(this.props.params.id);
    }

}


/* -----------------    CONTAINER     ------------------ */
function mapStateToProps(state){
  return {
    selectedProduct: state.product.product,
    stateProps: state
  }
}

function mapDispatchToProps(dispatch){
  return {
    onEnter: userId => {
      dispatch(fetchCart(userId))
  },
    loadProduct: (id) => {
      dispatch(fetchProduct(id));
    },
    buyProduct: (cartId, productId, quantity) => {
      dispatch(addToCart(cartId, productId, quantity))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
