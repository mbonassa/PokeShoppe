import axios from 'axios';

//------- ACTIONS -------
const GET_REVIEWS = 'GET_REVIEWS';

// ------ ACTION CREATORS -------
const getReviews = reviews => ({ type: GET_REVIEWS, reviews });

// ------- INIT STATE --------
const initialProductState = {
  reviews: []
}


// ------- REDUCERS ------------
export default function reducer (state = initialProductState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {

    case GET_REVIEWS:
      newState.reviews = action.reviews;
      break;

    default:
      return state;
  }

  return newState;
}

// -------- DISPATCHERS -----------

export const fetchReviews = id => dispatch => {
  axios.get(`/api/reviews/${id}`)
    .then(res => dispatch(getReviews(res.data)))
    .catch(err => console.error('Fetching reviews by id unsuccessful', err));
};


