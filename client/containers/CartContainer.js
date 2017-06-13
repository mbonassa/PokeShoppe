import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts, fetchCart, loadCart } from '../reducer/product';
import { changeStatus } from '../reducer/order';
import { Link } from 'react-router';


class CartContainer extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      address: '',
      creditCard: ''
    }
    this.changingStatus = props.changingStatus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchingCart(this.props.user.id);
    this.props.loadingCart(this.props.user.id);
  }

  handleChange(name){
    return (e) => {
      this.setState({
        [name]: e.target.value
      });
    };
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
          this.changingStatus(this.props.product.cart.id, 'PROCESSING', this.state.address, this.state.creditCard);
          location.reload();
        }} name={name}>
          <div>
            <label htmlFor="address"><small>Address</small></label>
            <input onChange={this.handleChange('address')} name="address" type="text" value={this.state.address} />
          </div>
          <div>
            <label htmlFor="creditCard"><small>Credit Card</small></label>
            <input onChange={this.handleChange('creditCard')} name="creditCard" type="text" value={this.state.creditCard} />
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
  changingStatus: (orderId, status, address, creditCard) => {
    return dispatch(changeStatus(orderId, status, address, creditCard));
  }
});

export default connect(mapState, mapDispatch)(CartContainer);
