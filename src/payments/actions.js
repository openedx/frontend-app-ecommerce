import { utils } from '../common';

const { AsyncActionType } = utils;

export const FETCH_PAYMENTS = new AsyncActionType('PAYMENTS', 'FETCH_PAYMENTS');

// FETCH PAYMENTS ACTIONS

export const fetchPayments = () => ({
  type: FETCH_PAYMENTS.BASE,
  payload: {},
});

export const fetchPaymentsBegin = () => ({
  type: FETCH_PAYMENTS.BEGIN,
});

export const fetchPaymentsSuccess = result => ({
  type: FETCH_PAYMENTS.SUCCESS,
  payload: result,
});

export const fetchPaymentsReset = () => ({
  type: FETCH_PAYMENTS.RESET,
});
