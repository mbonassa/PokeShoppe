import axios from 'axios';

//------- ACTIONS -------
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';

// ------ ACTION CREATORS -------
const init = products => ({ type: GET_PRODUCTS, products});
const singleProduct = product => ({type: GET_SINGLE_PRODUCT, product});

// ------- INIT STATE --------
const initialProductState = {
  listProducts: [],
  product: {}
}


// ------- REDUCERS ------------
export default function reducer (state = initialProductState, action){

  const newState = Object.assign({}, state);

  switch (action.type) {
    case GET_PRODUCTS:
      newState.listProducts = action.products;
      break;

    case GET_SINGLE_PRODUCT:
      newState.product = action.product;
      break;

    default:
      return state;
  }

  return newState;
}

// -------- DISPATCHERS -----------
export const fetchProducts = () => dispatch => {
  axios.get('/api/products')
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error('Fetching products unsuccessful', err));
};

export const fetchProduct = id => dispatch => {
  axios.get(`/api/products/${id}`)
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error('Fetching product by ID unsuccessful', err));
};



