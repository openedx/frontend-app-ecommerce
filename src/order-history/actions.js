import { utils } from '../common';

const { AsyncActionType } = utils;

export const FETCH_ORDERS = new AsyncActionType('ORDER_HISTORY', 'FETCH_ORDERS');

// FETCH ORDERS ACTIONS

export const fetchOrders = pageToFetch => ({
  type: FETCH_ORDERS.BASE,
  payload: { pageToFetch },
});

export const fetchOrdersBegin = () => ({
  type: FETCH_ORDERS.BEGIN,
});

export const fetchOrdersSuccess = result => ({
  type: FETCH_ORDERS.SUCCESS,
  payload: result,
});

export const fetchOrdersFailure = error => ({
  type: FETCH_ORDERS.FAILURE,
  payload: { error },
});

export const fetchOrdersReset = () => ({
  type: FETCH_ORDERS.RESET,
});
