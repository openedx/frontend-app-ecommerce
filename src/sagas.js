import { all } from 'redux-saga/effects';
import { saga as orderHistorySaga } from './order-history';

export default function* rootSaga() {
  yield all([
    orderHistorySaga(),
  ]);
}
