import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConfig } from '@edx/frontend-platform';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';

import { BasicAlert, PageLoading } from '../components';

import Subscriptions, { fetchSubscriptions } from '../subscriptions';
import OrderHistory, { fetchOrders } from '../order-history';

import { errorSelector, loadingSelector } from './selectors';

const OrdersAndSubscriptionsPage = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const isLoading = useSelector(loadingSelector);
  const hasError = useSelector(errorSelector);

  const isB2CSubsEnabled = (
    getConfig().ENABLE_B2C_SUBSCRIPTIONS?.toLowerCase() === 'true'
  );

  useEffect(() => {
    if (isB2CSubsEnabled) {
      document.title = 'Orders and Subscriptions | edX';
      sendTrackEvent('edx.bi.user.subscription.order-page.viewed');
      dispatch(fetchSubscriptions());
    }
    // TODO: We should fetch based on the route (ex: /orders/?orderPage=1)
    dispatch(fetchOrders(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderLoading = () => (
    <PageLoading
      srMessage={formatMessage({
        id: 'ecommerce.order.history.loading',
        defaultMessage: 'Loading orders and subscriptions...',
        description: 'Message when orders and subscriptions page is loading.',
      })}
    />
  );

  const renderOrdersandSubscriptions = () => (
    <>
      <Subscriptions />
      <OrderHistory isB2CSubsEnabled />
    </>
  );

  if (!isB2CSubsEnabled) {
    return (
      <div className="page__orders-and-subscriptions container-fluid container-mw-xl py-5">
        <OrderHistory isB2CSubsEnabled={false} />
      </div>
    );
  }

  return (
    <div className="page__orders-and-subscriptions container-fluid container-mw-xl py-4.5">
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
      {isLoading ? renderLoading() : renderOrdersandSubscriptions()}
    </div>
  );
};

export default OrdersAndSubscriptionsPage;
