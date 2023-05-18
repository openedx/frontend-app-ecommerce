import { AsyncActionType } from '../utils';

export const FETCH_ORDERS = new AsyncActionType(
  'ORDER_HISTORY',
  'FETCH_ORDERS',
);

// FETCH ORDERS ACTIONS

export const fetchOrders = (pageToFetch) => ({
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

export const fetchOrdersReset = () => ({
  type: FETCH_ORDERS.RESET,
});
