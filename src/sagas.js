import { all } from 'redux-saga/effects';
import { sagas as orderHistorySagas } from './order-history';

export default function* rootSaga() {
  yield all([
    orderHistorySagas(),
  ]);
}
