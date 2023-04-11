import React, { useEffect } from 'react';
import { FormattedMessage } from '@edx/frontend-platform/i18n';

import Subscriptions from '../subscriptions';
import OrderHistory from '../order-history';

const OrdersAndSubscriptionsPage = () => {
  // TODO: get from waffle-flag
  const isB2CSubsEnabled = true;

  useEffect(() => {
    if (isB2CSubsEnabled) {
      document.title = 'Orders and Subscriptions | edX';
    }
  }, [isB2CSubsEnabled]);

  if (!isB2CSubsEnabled) {
    return (
      <div className="page__orders-and-subscriptions container-fluid py-5">
        <OrderHistory isB2CSubsEnabled={false} />
      </div>
    );
  }

  return (
    <div className="page__orders-and-subscriptions container-fluid py-4.5">
      <div className="section">
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
};

export default OrdersAndSubscriptionsPage;
