import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {  } from '../reducer/products';

/* -----------------    COMPONENT     ------------------ */

class ProductItem extends React.Component {
render() {
const product = this.props.product
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
                <p className="pull-right">15 reviews</p>
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
    );
  }
}


/* -----------------    CONTAINER     ------------------ */

const mapState = null;
const mapDispatch = { };

export default connect(mapState, mapDispatch)(ProductItem);


