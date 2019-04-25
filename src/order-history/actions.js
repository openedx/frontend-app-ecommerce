import { utils } from '../common';

const { AsyncActionType } = utils;

export const FETCH_ORDERS = new AsyncActionType('ORDER_HISTORY', 'FETCH_ORDERS');

// FETCH ORDERS ACTIONS

export const fetchOrders = (username, pageToFetch) => ({
  type: FETCH_ORDERS.BASE,
  payload: { username, pageToFetch },
});

export const fetchOrdersBegin = () => ({
  type: FETCH_ORDERS.BEGIN,
});

export const fetchOrdersSuccess = result => ({
  type: FETCH_ORDERS.SUCCESS,
  payload: result,
});

export const fetchOrdersReset = () => ({
  type: FETCH_ORDERS.RESET,
});
