import { utils } from '../common';

const { AsyncActionType } = utils;

export const FETCH_ORDERS = new AsyncActionType('ORDER_HISTORY', 'FETCH_ORDERS');

// FETCH ORDERS ACTIONS

export const fetchOrders = () => ({
  type: FETCH_ORDERS.BASE,
});

export const fetchOrdersBegin = () => ({
  type: FETCH_ORDERS.BEGIN,
});

export const fetchOrdersSuccess = orders => ({
  type: FETCH_ORDERS.SUCCESS,
  payload: { orders },
});

export const fetchOrdersFailure = error => ({
  type: FETCH_ORDERS.FAILURE,
  payload: { error },
});

export const fetchOrdersReset = () => ({
  type: FETCH_ORDERS.RESET,
});
