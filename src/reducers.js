import { combineReducers } from 'redux';
import {
  reducer as orderHistoryReducer,
  storeName as orderHistoryStoreName,
} from './order-history';
import {
  reducer as receiptReducer,
} from './receipt';

const createRootReducer = () => combineReducers({
  [orderHistoryStoreName]: orderHistoryReducer,
  receipt: receiptReducer,
});

export default createRootReducer;
