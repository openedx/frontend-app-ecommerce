import { takeEvery } from 'redux-saga/effects';

import { createFetchHandler } from '../utils';

import { fetchOrders } from './actions';
import { getOrders } from './service';

const handleFetchOrders = createFetchHandler(fetchOrders, getOrders);

export default function* orderHistorySaga() {
  yield takeEvery(fetchOrders.TRIGGER, handleFetchOrders);
}
