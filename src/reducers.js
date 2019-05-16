import { combineReducers } from 'redux';
import { userAccount } from '@edx/frontend-auth';
import { connectRouter } from 'connected-react-router';
import {
  reducer as orderHistoryReducer,
  storeName as orderHistoryStoreName,
} from './order-history';
import {
  reducer as paymentsReducer,
  storeName as paymentsStoreName,
} from './payments';


const identityReducer = (state) => {
  const newState = { ...state };
  return newState;
};

const createRootReducer = history =>
  combineReducers({
    // The authentication state is added as initialState when
    // creating the store in data/store.js.
    authentication: identityReducer,
    configuration: identityReducer,
    userAccount,
    [orderHistoryStoreName]: orderHistoryReducer,
    [paymentsStoreName]: paymentsReducer,
    router: connectRouter(history),
  });

export default createRootReducer;
