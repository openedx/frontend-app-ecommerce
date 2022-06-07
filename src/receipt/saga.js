import { call, put, takeEvery } from 'redux-saga/effects';

// Actions
import {
  FETCH_ORDER,
  fetchOrderBegin,
  fetchOrderSuccess,
  fetchOrderReset,
} from './actions';

// Services
import * as OrderApiService from './service';

export function* handleFetchOrder(action) {
  console.log('[Saga] 1.a) action', action);
  const { orderToFetch } = action.payload;
  // JK TODO: try and finally block? Remove console.log
  console.log('[Saga] 1.b) orderToFetch:', orderToFetch);
  yield put(fetchOrderBegin());
  const result = yield call(OrderApiService.getOrder, orderToFetch);
  console.log('[Saga] 1.c) result:', result);
  yield put(fetchOrderSuccess(result));
  console.log('[Saga] 1.d) success');
  yield put(fetchOrderReset());
}

export default function* receiptSaga() {
  yield takeEvery(FETCH_ORDER.BASE, handleFetchOrder);
}
