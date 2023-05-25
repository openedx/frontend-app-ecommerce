import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from '@edx/frontend-platform/i18n';

import { NotFoundPage, PageLoading } from '../components';

import { fetchStripeCustomerPortalURL } from './actions';
import { subscriptionsSelector } from './selectors';

const ManageSubscriptionsPage = () => {
  const { formatMessage } = useIntl();
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

  return stripeError ? (
    <NotFoundPage />
  ) : (
    <PageLoading
      srMessage={formatMessage({
        id: 'ecommerce.order.history.loading.manage.subscriptions',
        defaultMessage: 'Loading manage subscriptions...',
        description: 'Message when loading the manage subscriptions page.',
      })}
    />
  );
};

export default ManageSubscriptionsPage;
