import { combineReducers } from 'redux';
import user from './user';
import order from './order';
import products from './products';
import reviews from './reviews';

export default combineReducers({
   user,
   order,
   products,
   reviews,
  });
