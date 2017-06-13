import axios from 'axios';

//------- ACTIONS -------
const GET_ORDERS = 'GET_ORDERS';
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER';

// ------ ACTION CREATORS -------
const init = orders => ({
  type: GET_ORDERS,
  orders
});
const singleOrder = order => ({
  type: GET_SINGLE_ORDER,
  order
});

// ------- INIT STATE --------
const initialState = {
  listOrders: [],
  order: {}
}


// ------- REDUCERS ------------
export default function reducer (state = initialState, action){

  const newState = Object.assign({}, state);

  switch (action.type) {
    case GET_ORDERS:
      newState.listOrders = action.orders;
      break;

    case GET_SINGLE_ORDER:
      newState.order = action.order;
      break;

    default:
      return state;
  }

  return newState;
}

// -------- DISPATCHERS -----------
export const fetchOrders = () => dispatch => {
  axios.get('/api/orders')
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error('Fetching orders unsuccessful', err));
};

export const fetchOrder = id => dispatch => {
  axios.get(`/api/orders/${id}`)
    .then(res => dispatch(singleOrder(res.data)))
    .catch(err => console.error('Fetching order by ID unsuccessful', err));
};

export const changeStatus = (orderId, status) => dispatch => {
  axios.put(`api/orders/status/${orderId}`, {status})
    .then(res => dispatch(singleOrder(res.data)))
    .catch(console.error.bind(console));
}
