import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchReviews } from '../reducer/review.js';
import { addToCart } from '../reducer/product';
import RatingStar from './RatingStar';
import {Component} from 'react';
import AlertContainer from 'react-alert';

/* -----------------    COMPONENT     ------------------ */

class ProductItem extends React.Component {

    constructor (props) {
        super(props)
        this.getReviews = props.getReviews.bind(this);
        this.handleClick = props.handleClick.bind(this);

    }

    componentDidMount() {
        this.getReviews(this.props.singleProduct.id);
    }

    alertOptions = {
        offset: 14,
        position: 'bottom left',
        theme: 'dark',
        time: 5000,
        transition: 'scale'
    }
    
    showAlert = () => {
        this.msg.show('Product added to cart', {
        time: 5000,
        type: 'success'
        })
    }


    render() {
    const product = this.props.singleProduct;

    return (
        <div className="col-sm-4 col-lg-4 col-md-4">
            <div className="thumbnail">
                <img src={product.photo} alt=""></img>
                <div className="caption">
                    <h4 className="pull-right">{}</h4>
                    <h4><Link to={`/products/${product.id}`}>{product.name}</Link>
                    </h4>
                    <p>{product.description}</p>
                </div>
                <div className="ratings">
                    <p className="pull-right">{this.props.review.reviews.length}</p>
                </div>
                <RatingStar />
                <div>
                    <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                    <h4><button onClick={() => {
                        this.showAlert();
                        this.handleClick(this.props.product.cart.id, product.id, 1)}}>Add to Cart</button></h4>
                </div>
            </div>
        </div>
        );
    }
}


/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => state;

const mapDispatch = dispatch => ({
    getReviews: productId => {
        return dispatch(fetchReviews(productId))
    },
    handleClick: (cartId, productId, quantity) => {
        return dispatch(addToCart(cartId, productId, quantity))
    },
    showAlert: () => {
        this.msg.show('Product added to cart', {time: 5000, type: 'success'})
    }
});

export default connect(mapState, mapDispatch)(ProductItem);
