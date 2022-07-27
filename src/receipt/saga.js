import { call, put, takeEvery } from 'redux-saga/effects';
import { history } from '@edx/frontend-platform';
import { logError } from '@edx/frontend-platform/logging';

// Actions
import {
  FETCH_ORDER,
  fetchOrderBegin,
  fetchOrderSuccess,
  fetchOrderFailure,
  fetchOrderReset,
} from './actions';

// Services
import * as OrderApiService from './service';

export function* handleFetchOrder(action) {
  try {
    const { orderToFetch } = action.payload;
    yield put(fetchOrderBegin());
    const result = yield call(OrderApiService.getOrder, orderToFetch);
    yield put(fetchOrderSuccess(result));
  } catch (error) {
    if (error.response.status === 404) {
      history.push('/notfound');
    } else {
      yield put(fetchOrderFailure(error.message));
      logError(error);
    }
  }
  yield put(fetchOrderReset());
}

export default function* receiptSaga() {
  yield takeEvery(FETCH_ORDER.BASE, handleFetchOrder);
}
