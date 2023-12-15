import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConfig } from '@edx/frontend-platform';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';

import { BasicAlert, PageLoading } from '../components';

import OrderHistory, { fetchOrders } from '../order-history';
import Subscriptions, { fetchSubscriptions } from '../subscriptions';

import { subscriptionsSelector } from '../subscriptions/selectors';
import {
  errorSelector,
  loadingSelector,
  showSubscriptionSelector,
} from './selectors';
import { loadingOrderHistorySelector } from '../order-history/selectors';
import messages from './OrdersAndSubscriptionsPage.messages';

const OrdersAndSubscriptionsPage = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const isLoading = useSelector(loadingSelector);
  const isLoadingOrderHistoryOnly = useSelector(loadingOrderHistorySelector);
  const hasError = useSelector(errorSelector);
  const { subscriptions } = useSelector(subscriptionsSelector);

  /**
   * TODO: PON-299 - Remove this selector after the MVP.
   */
  const shouldShowSubscriptionSection = useSelector(showSubscriptionSelector);

  const isB2CSubsEnabled = (
    getConfig().ENABLE_B2C_SUBSCRIPTIONS?.toLowerCase() === 'true'
  );

  const hasSubscriptions = subscriptions.length > 0;
  const isSubscriptionDisabled = !isB2CSubsEnabled || !shouldShowSubscriptionSection;
  const shouldShowOrderHistoryOnly = isSubscriptionDisabled || (!isLoading && !hasSubscriptions);

  useEffect(() => {
    if (isB2CSubsEnabled) {
      dispatch(fetchSubscriptions());
    }
    if (!isSubscriptionDisabled && hasSubscriptions) {
      document.title = 'Orders and Subscriptions | edX';
      sendTrackEvent('edx.bi.user.subscription.order-page.viewed');
    }
    // TODO: We should fetch based on the route (ex: /orders/?orderPage=1)
    dispatch(fetchOrders(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderLoading = () => (
    <PageLoading
      srMessage={formatMessage(messages['ecommerce.order.history.loading'])}
    />
  );

  const renderOrdersandSubscriptions = () => (
    <div className="page__orders-and-subscriptions container-fluid py-4.5">
      <div className="section">
        <BasicAlert isVisible={hasError} />
        <FormattedMessage
          id="ecommerce.order.history.main.heading"
          defaultMessage="My orders and subscriptions"
          description="Heading for orders and subscriptions page."
        >
          {(text) => <h1 className="text-primary-700">{text}</h1>}
        </FormattedMessage>
        <FormattedMessage
          id="ecommerce.order.history.main.subtitle"
          defaultMessage="Manage your program subscriptions and view your order history."
          description="Subtitle of Heading for orders and subscriptions page."
        >
          {(text) => <span className="text-dark-900">{text}</span>}
        </FormattedMessage>
      </div>
      <Subscriptions />
      <OrderHistory isB2CSubsEnabled />
    </div>
  );

  const renderOrderHistoryOnly = () => (
    <div className="page__orders-and-subscriptions container-fluid py-5">
      <BasicAlert isVisible={hasError} />
      <OrderHistory isB2CSubsEnabled={false} />
    </div>
  );

  // Now that loading initial state is true, if subscriptions is not enabled,
  // it will never fetch subscriptions, want to prevent from local infinite loading
  if (isSubscriptionDisabled) {
    if (isLoadingOrderHistoryOnly) {
      return renderLoading();
    }
  } else if (isLoading) {
    return renderLoading();
  }

  if (shouldShowOrderHistoryOnly) {
    return renderOrderHistoryOnly();
  }
  return renderOrdersandSubscriptions();
};

export default OrdersAndSubscriptionsPage;
