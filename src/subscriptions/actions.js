import { createRoutine } from 'redux-saga-routines';

export const fetchSubscriptions = createRoutine('FETCH_SUBSCRIPTIONS');

export const clearStripeError = () => ({
  type: 'CLEAR_STRIPE_ERROR',
});

export const hideSubscriptionSection = () => ({
  type: 'HIDE_SUBSCRIPTION_SECTION',
});
