import { combineReducers } from 'redux';
import {
  reducer as orderHistoryReducer,
  storeName as orderHistoryStoreName,
} from '../order-history';
import {
  reducer as subscriptionsReducer,
  storeName as subscriptionsStoreName,
} from '../subscriptions';

const createRootReducer = () => combineReducers({
  [orderHistoryStoreName]: orderHistoryReducer,
  [subscriptionsStoreName]: subscriptionsReducer,
});

export default createRootReducer;
