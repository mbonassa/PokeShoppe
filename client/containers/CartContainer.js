import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts, fetchCart, loadCart } from '../reducer/product';
import { Link } from 'react-router';


class CartContainer extends React.Component {

  constructor (props) {
    super(props);

  }

  componentDidMount() {
    this.props.onEnter();
    this.props.loadingCart(this.props.user.id);
  }

  render (props) {
    let counter = 1;
    let orderTotal = 0.00;
    let quantityTotal = 0;
    return (
      <div className="col-md-10">
        <table className="table table-striped">
          <tbody>

            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Sub Total</th>
            </tr>
            {
              this.props.product.cartProducts.map(item => {
                orderTotal += (+item.price) * (+item.quantity);
               return (
                <tr key={item.name}>
                  <td>{counter++}</td>
                  <td><Link to={`/products/${item.productId}`}>{item.name}</Link></td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{(+item.price) * (+item.quantity)}</td>
                </tr>
               )
              })
            }
            <tr>
               <td>
                 <strong>###</strong>
               </td>
               <td>
                 <strong>Total</strong>
               </td>
               <td></td>
               <td></td>
               <td>{orderTotal}</td>
            </tr>)

          </tbody>
        </table>
      </div>
    );
  }
}

const mapState = (state) => state;

const mapDispatch = dispatch => ({
  onEnter: userId => {
    return dispatch(fetchProducts())
  },
  loadingCart: userId => {
    return dispatch(loadCart(userId));
  }
});

export default connect(mapState, mapDispatch)(CartContainer);
