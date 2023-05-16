import { all } from 'redux-saga/effects';
import { saga as orderHistorySaga } from '../order-history';
import { saga as subscriptionsSaga } from '../subscriptions';

export default function* rootSaga() {
  yield all([
    orderHistorySaga(),
    subscriptionsSaga(),
  ]);
}
