import { createRoutine } from 'redux-saga-routines';

export const fetchSubscriptions = createRoutine('FETCH_SUBSCRIPTIONS');
export const fetchStripeCustomerPortalURL = createRoutine(
  'FETCH_STRIPE_CUSTOMER_PORTAL_URL',
);

export const clearStripeError = () => ({
  type: 'CLEAR_STRIPE_ERROR',
});

export const hideSubscriptionSection = () => ({
  type: 'HIDE_SUBSCRIPTION_SECTION',
});
