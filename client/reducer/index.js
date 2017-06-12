import { combineReducers } from 'redux';
import user from './user';
import order from './order';
import product from './product';
import review from './review';

export default combineReducers({
   user,
   order,
   product,
   review
  });
