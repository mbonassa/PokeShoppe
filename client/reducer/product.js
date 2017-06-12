import axios from 'axios';

//------- ACTIONS -------
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';

// ------ ACTION CREATORS -------
export const getProducts = products => ({ type: GET_PRODUCTS, products });
export const singleProduct = product => ({ type: GET_SINGLE_PRODUCT, product });
export const fetchingCart = cart => ({ type: GET_CART, cart });
export const addingToCart = product => ({ type: ADD_TO_CART, product })

// ------- INIT STATE --------
const initialProductState = {
  listProducts: [],
  product: {},
  cart: {},
  cartProducts: []
}


// ------- REDUCERS ------------
export default function reducer (state = initialProductState, action) {

  const newState = Object.assign({}, state);
  newState.cartProducts = newState.cartProducts.slice();

  switch (action.type) {
    case GET_PRODUCTS:
      newState.listProducts = action.products;
      break;

    case GET_SINGLE_PRODUCT:
      newState.product = action.product;
      break;

    case GET_CART:
      newState.cart = action.cart;
      break;

    case ADD_TO_CART:
      newState.cartProducts.push(action.product)
      break;

    default:
      return state;
  }

  return newState;
}

// -------- DISPATCHERS -----------
export const fetchProducts = () => dispatch => {
  axios.get('/api/products')
    .then(res => dispatch(getProducts(res.data)))
    .catch(err => console.error('Fetching products unsuccessful', err));
};

export const fetchProduct = id => dispatch => {
  axios.get(`/api/products/${id}`)
    .then(res => dispatch(singleProduct(res.data)))
    .catch(err => console.error('Fetching product by id unsuccessful', err));
};

export const fetchCart = userId => dispatch => {
  axios.put(`/api/orders/${userId}`)
    .then(res => dispatch(fetchingCart(res.data)))
    .catch(err => console.error('Fetching cart unsuccessful', err));
};

export const addToCart = (cartId, productId) => dispatch => {
  axios.put(`/api/orders/products/${cartId}/${productId}`)
    .then(res => dispatch(addingToCart(res.data)))
    .catch(err => console.error('Adding to cart unsuccessful', err));
};



