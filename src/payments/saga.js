import { call, put, takeEvery } from 'redux-saga/effects';

// Actions
import {
  FETCH_PAYMENTS,
  fetchPaymentsBegin,
  fetchPaymentsSuccess,
  fetchPaymentsReset,
} from './actions';

// Services
import * as PaymentsApiService from './service';


export function* handleFetchPayments() {
  yield put(fetchPaymentsBegin());
  const result = yield call(PaymentsApiService.getPayments);
  yield put(fetchPaymentsSuccess(result));
  yield put(fetchPaymentsReset());
}


export default function* paymentsSaga() {
  yield takeEvery(FETCH_PAYMENTS.BASE, handleFetchPayments);
}
