import { call, put, takeEvery } from 'redux-saga/effects';

// Actions
import {
  FETCH_ORDERS,
  fetchOrdersBegin,
  fetchOrdersSuccess,
  fetchOrdersReset,
} from './actions';

// Services
import * as OrdersApiService from './service';


export function* handleFetchOrders(action) {
  const { username } = action.payload;
  yield put(fetchOrdersBegin());
  const result = yield call(OrdersApiService.getOrders, username, action.payload.pageToFetch);
  yield put(fetchOrdersSuccess(result));
  yield put(fetchOrdersReset());
}


export default function* orderHistorySaga() {
  yield takeEvery(FETCH_ORDERS.BASE, handleFetchOrders);
}
