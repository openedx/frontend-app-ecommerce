import { takeLatest } from 'redux-saga/effects';

import { createFetchHandler } from '../common/utils';

import { fetchSubscriptions, fetchStripeCustomerPortalURL } from './actions';
import { getSubscriptions, getStripeCustomerPortalURL } from './service';

const handleFetchSubscriptions = createFetchHandler(
  fetchSubscriptions,
  getSubscriptions,
);

const handleFetchStripeCustomerPortalURL = createFetchHandler(
  fetchStripeCustomerPortalURL,
  getStripeCustomerPortalURL,
);

export default function* subscriptionSaga() {
  yield takeLatest(fetchSubscriptions.TRIGGER, handleFetchSubscriptions);
  yield takeLatest(
    fetchStripeCustomerPortalURL.TRIGGER,
    handleFetchStripeCustomerPortalURL,
  );
}
