import { call, put, takeEvery } from 'redux-saga/effects';
// import { push } from 'connected-react-router';
import { logAPIErrorResponse } from '@edx/frontend-logging';

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
  try {
    yield put(fetchPaymentsBegin());
    const result = yield call(PaymentsApiService.getPayments);
    yield put(fetchPaymentsSuccess(result));
    yield put(fetchPaymentsReset());
  } catch (e) {
    logAPIErrorResponse(e);
    // TODO: Restore this once things are working better.
    // yield put(push('/error'));
  }
}


export default function* paymentsSaga() {
  yield takeEvery(FETCH_PAYMENTS.BASE, handleFetchPayments);
}
