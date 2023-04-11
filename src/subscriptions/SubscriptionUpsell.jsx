import React from 'react';
import { useMediaQuery } from 'react-responsive';

import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Alert, Badge, Button } from '@edx/paragon';
import { Search } from '@edx/paragon/icons';

const SubscriptionUpsell = () => (
  <Alert
    className="bg-light-200"
    actions={[
      <Button className="text-nowrap" iconBefore={Search}>
        <FormattedMessage
          id="ecommerce.order.history.subscription.upsell.button"
          defaultMessage="Explore subscription options"
          description="Button text for subscription upsell"
        />
      </Button>,
    ]}
    stacked={useMediaQuery({ query: '(max-width: 834px)' })}
  >
    <Alert.Heading
      as="h4"
      className="section section-gap-sm flex-sm-row align-items-start"
    >
      <Badge variant="warning">
        <FormattedMessage
          id="ecommerce.order.history.subscription.upsell.badge"
          defaultMessage="New"
          description="'New' Badge for subscription upsell"
        />
      </Badge>
      <FormattedMessage
        id="ecommerce.order.history.subscription.upsell.heading"
        defaultMessage="Monthly program subscriptions now available"
        description="Heading for subscription upsell"
      />
    </Alert.Heading>
    <FormattedMessage
      tagName="p"
      id="ecommerce.order.history.subscription.upsell.message"
      defaultMessage="An easier way to access popular programs with more control over how much you spend. Starting at {minSubscriptionPrice} per month after a {trialLength}-day free trial. Cancel anytime."
      description="Message body for subscription upsell"
      values={{
        minSubscriptionPrice: '$39',
        trialLength: 7,
      }}
    />
  </Alert>
);

export default SubscriptionUpsell;
