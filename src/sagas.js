import { all } from 'redux-saga/effects';
import { saga as orderHistorySaga } from './order-history';
import { saga as paymentsSaga } from './payments';

export default function* rootSaga() {
  yield all([
    orderHistorySaga(),
    paymentsSaga(),
  ]);
}
