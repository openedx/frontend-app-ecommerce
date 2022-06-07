import { all } from 'redux-saga/effects';
import { saga as orderHistorySaga } from './order-history';
import { saga as receiptSaga } from './receipt';

export default function* rootSaga() {
  yield all([
    orderHistorySaga(),
    receiptSaga(),
  ]);
}
