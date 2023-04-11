import React from 'react';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Button } from '@edx/paragon';
import { Launch } from '@edx/paragon/icons';

import SubscriptionUpsell from './SubscriptionUpsell';
import SubscriptionScrollView from './SubscriptionScrollView';

const Subscriptions = () => {
  // TODO: get from api
  const subscriptions = [
    {
      uuid: 'a87e5eac-3c93-45a1-a8e1-4c79ca8401c8',
      title: 'Blockchain Fundamentals',
      organizations: ['University of California', 'Berkeley'],
      status: 'trial',
    },
    {
      uuid: '0c6e5fa2-96e8-40b2-9ebe-c8b0df2a3b22',
      title: 'Critical Thinking',
      organizations: ['Simmons University'],
      status: 'active',
    },
    {
      uuid: 'a87e5eac-3c93-45a1-a8e1-4c79ca8401c8',
      title: 'Blockchain Fundamentals',
      organizations: ['University of California', 'Berkeley'],
      status: 'inActive',
    },
    {
      uuid: '0c6e5fa2-96e8-40b2-9ebe-c8b0df2a3b22',
      title: 'Critical Thinking',
      organizations: ['Simmons University'],
      status: 'inactive',
    },
  ];
  const hasSubscriptions = subscriptions.length > 0;

  const buttonLabel = (
    <FormattedMessage
      id="ecommerce.order.history.subscriptions.manage.button"
      defaultMessage="Manage my subscription"
      description="Button text for managing subscriptions."
    />
  );

  const renderEmpty = () => (
    <>
      <FormattedMessage
        id="ecommerce.order.history.subscriptions.subtitle.empty"
        defaultMessage="You do not have any active or previous subscriptions."
        description="Subtitle for subscriptions section when there are no subscriptions."
      >
        {(text) => <span className="text-dark-900">{text}</span>}
      </FormattedMessage>
      <SubscriptionUpsell />
    </>
  );

  const renderSubscriptions = () => (
    <>
      <div className="section flex-md-row align-items-start align-items-md-center justify-content-between">
        <FormattedMessage
          id="ecommerce.order.history.subscriptions.subtitle"
          defaultMessage="To view your receipts, change your payment method or cancel your subscription, click {buttonLabel}."
          description="Subtitle for subscriptions section."
          values={{
            buttonLabel: <i>{buttonLabel}</i>,
          }}
        >
          {(text) => <span className="text-dark-900">{text}</span>}
        </FormattedMessage>
        <Button className="text-nowrap" size="sm" iconAfter={Launch}>
          {buttonLabel}
        </Button>
      </div>
      <SubscriptionScrollView subscriptions={subscriptions} />
    </>
  );

  return (
    <section>
      <FormattedMessage
        tagName="h2"
        id="ecommerce.order.history.subscriptions.heading"
        defaultMessage="Subscriptions"
        description="Heading for subscriptions section."
      />
      {hasSubscriptions ? renderSubscriptions() : renderEmpty()}
    </section>
  );
};

export default Subscriptions;
