import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchReviews } from '../reducer/reviews';
import RatingStar from './RatingStar';

/* -----------------    COMPONENT     ------------------ */

class ProductItem extends React.Component {

    constructor () {
        super()
    }

    componentDidMount() {
        this.props.getReviews(this.props.product.id);
    }

    render() {
    const product = this.props.product;
    console.log(this.props.reviews.reviews)

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
                    <p className="pull-right">{this.props.reviews.reviews.length}</p>
                </div>
                <RatingStar />
            </div>
        </div>
        );
    }
}


/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => state;

const mapDispatch = dispatch => ({
    getReviews: (id) => {
        return dispatch(fetchReviews(id))
    },
});

export default connect(mapState, mapDispatch)(ProductItem);





