import { call, put, takeEvery } from 'redux-saga/effects';

// Actions
import {
  FETCH_ORDERS,
  fetchOrdersBegin,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  fetchOrdersReset,
} from './actions';

// Services
import * as OrdersApiService from './service';


export function* handleFetchOrders(action) {
  const { username } = action.payload;
  try {
    yield put(fetchOrdersBegin());

    const result = yield call(OrdersApiService.getOrders, username, action.payload.pageToFetch);
    yield put(fetchOrdersSuccess(result));
    yield put(fetchOrdersReset());
  } catch (e) {
    // LoggingService.logAPIErrorResponse(e);
    yield put(fetchOrdersFailure(e.message));
  }
}


export default function* orderHistorySaga() {
  yield takeEvery(FETCH_ORDERS.BASE, handleFetchOrders);
}
