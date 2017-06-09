import React from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';

//import { buyProduct } from '../reducers/singleProduct';


/* -----------------    COMPONENT     ------------------ */
class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }
  render(){
    return(
    <div className="row clearfix">

      <div className="col-sm-4 col-lg-4 col-md-4">
          <div className="thumbnail">
              <img src="http://placehold.it/320x150" alt="" />
              <div className="caption">
                  <h4 className="pull-right">$24.99</h4>
                  <h4><a href="#">First Product</a>
                  </h4>
                  <p>See more snippets like this online store item at <a target="_blank" href="http://www.bootsnipp.com">Bootsnipp - http://bootsnipp.com</a>.</p>
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
    </div>
    )}
  onProductClick(){
    this.props.purchaseItem(this.props.selectedCampus.id);

  }
}


/* -----------------    CONTAINER     ------------------ */
function mapStateToProps(state){
  //console.log('STATE',state.products)
  return {
    //selectedProduct: state.products.selectedProduct
  }
}

function mapDispatchToProps(dispatch){
  return {
    // purchaseItem: (id, user) => {
    //   dispatch(buyProduct(id, user))
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
