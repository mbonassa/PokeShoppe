import React from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../reducer/order';
import { Link } from 'react-router';


class OrderHistoryContainer extends React.Component {

  constructor (props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchingOrders(this.props.user.id);
  }

  render (props) {
    let counter = 0;
    return (
      <div className="col-md-10">
        <table className="table table-striped">
          <tbody>

            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Address</th>
              <th>Price</th>
              <th></th>
            </tr>
            {
              this.props.order.listOrders.map(item => {
               return (
                <tr key={item.name}>
                  <td>{counter++}</td>
                  <td>{item.status}</td>
                  <td>{item.address}</td>
                  <td>{item.total_price}</td>
                  <td></td>
                </tr>
               )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapState = (state) => state;

const mapDispatch = dispatch => ({
  fetchingOrders: userId => {
    return dispatch(fetchOrders(userId))
  },
});

export default connect(mapState, mapDispatch)(OrderHistoryContainer);
