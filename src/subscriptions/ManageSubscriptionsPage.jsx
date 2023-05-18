import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NotFoundPage, PageLoading } from '../components';

import { fetchStripeCustomerPortalURL } from './actions';
import { subscriptionsSelector } from './selectors';

const ManageSubscriptionsPage = () => {
  const dispatch = useDispatch();
  const { stripeCustomerPortalURL, stripeError } = useSelector(
    subscriptionsSelector,
  );

  useEffect(() => {
    dispatch(fetchStripeCustomerPortalURL());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (stripeCustomerPortalURL) {
      window.location.href = stripeCustomerPortalURL;
    }
  }, [stripeCustomerPortalURL]);

  return stripeError ? <NotFoundPage /> : <PageLoading />;
};

export default ManageSubscriptionsPage;
