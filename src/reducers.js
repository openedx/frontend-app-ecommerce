import { combineReducers } from 'redux';
import {
  reducer as orderHistoryReducer,
  storeName as orderHistoryStoreName,
} from './order-history';

const createRootReducer = () => combineReducers({
  [orderHistoryStoreName]: orderHistoryReducer,
});

export default createRootReducer;
