import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts, fetchCart, loadCart } from '../reducer/product';
import { changeStatus } from '../reducer/order';
import { Link } from 'react-router';


class CartContainer extends React.Component {

  constructor (props) {
    super(props);
    this.changingStatus = props.changingStatus.bind(this);
  }

  componentDidMount() {
    this.props.fetchingCart(this.props.user.id);
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
               <td>{orderTotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <form onSubmit={() => {
          this.changingStatus(this.props.product.cart.id, 'PROCESSING');
          location.reload();
        }} name={name}>
          <div>
            <label htmlFor="address"><small>Address</small></label>
            <input name="address" type="text" />
          </div>
          <div>
            <label htmlFor="creditCard"><small>Credit Card</small></label>
            <input name="creditCard" type="text" />
          </div>
          <div>
            <button type="submit" className="btn btn-success">Submit Order!</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = (state) => state;

const mapDispatch = dispatch => ({
  onEnter: userId => {
    return dispatch(fetchProducts())
  },
  fetchingCart: userId => {
    return dispatch(fetchCart(userId))
  },
  loadingCart: userId => {
    return dispatch(loadCart(userId));
  },
  changingStatus: (orderId, status) => {
    return dispatch(changeStatus(orderId, status));
  }
});

export default connect(mapState, mapDispatch)(CartContainer);
