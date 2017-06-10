import axios from 'axios';

//------- ACTIONS -------
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT';
// const GET_REVIEWS = 'GET_REVIEWS';
// const GET_SINGLE_REVIEW = 'GET_REVIEW';

// ------ ACTION CREATORS -------
const getProducts = products => ({ type: GET_PRODUCTS, products });
const singleProduct = product => ({type: GET_SINGLE_PRODUCT, product});
// const getReviews = reviews => ({ type: GET_REVIEWS, reviews });
// const singleReview = review => ({ type: GET_SINGLE_REVIEW, review });

// ------- INIT STATE --------
const initialProductState = {
  listProducts: [],
  product: {},
  // listReviews: [],
  // review: {}
}


// ------- REDUCERS ------------
export default function reducer (state = initialProductState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {
    case GET_PRODUCTS:
      newState.listProducts = action.products;
      break;

    case GET_SINGLE_PRODUCT:
      newState.product = action.product;
      break;

    // case GET_REVIEWS:
    //   newState.listReviews = action.reviews;
    //   break;

    // case GET_SINGLE_REVIEW:
    //   newState.singleReview = action.review;
    //   break

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

// export const fetchReviews = () => dispatch => {
//   axios.get(`/api/reviews`)
//     .then(res => dispatch(getReviews(res.data)))
//     .catch(err => console.error('Fetching reviews unsuccessful', err));
// };

// export const fetchReview = id => dispatch => {
//   axios.get(`/api/reviews/${id}`)
//     .then(res => dispatch(singleReview(res.data)))
//     .catch(err => console.error('Fetching review by id unsuccessful', err));
// };


