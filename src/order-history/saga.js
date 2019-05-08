import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { logAPIErrorResponse } from '@edx/frontend-logging';

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
  try {
    yield put(fetchOrdersBegin());
    const result = yield call(OrdersApiService.getOrders, username, action.payload.pageToFetch);
    yield put(fetchOrdersSuccess(result));
    yield put(fetchOrdersReset());
  } catch (e) {
    logAPIErrorResponse(e);
    yield put(push('/error'));
  }
}


export default function* orderHistorySaga() {
  yield takeEvery(FETCH_ORDERS.BASE, handleFetchOrders);
}
