import React from 'react';
import { useMediaQuery } from 'react-responsive';

import { getConfig } from '@edx/frontend-platform';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { Alert, Badge, Button } from '@openedx/paragon';

const SubscriptionUpsell = () => (
  <Alert
    className="bg-light-200"
    data-testid="section-subscription-upsell"
    actions={[
      <Button
        href={
          getConfig().MARKETING_SITE_BASE_URL
          + getConfig().SUBSCRIPTIONS_MARKETING_URL
        }
        className="text-nowrap"
      >
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
        defaultMessage="Monthly program subscriptions {emDash} more flexible, more affordable"
        description="Heading for subscription upsell"
        values={{
          emDash: <>&mdash;</>,
        }}
      />
    </Alert.Heading>
    <FormattedMessage
      tagName="p"
      id="ecommerce.order.history.subscription.upsell.message"
      defaultMessage="Now available for many popular programs, affordable monthly subscription pricing can help you manage your budget more effectively. Subscriptions start at {minSubscriptionPrice}/month USD per program, after a {trialLength}-day full access free trial. Cancel at any time."
      description="Message body for subscription upsell"
      values={{
        minSubscriptionPrice: getConfig().SUBSCRIPTIONS_MINIMUM_PRICE,
        trialLength: getConfig().SUBSCRIPTIONS_TRIAL_LENGTH,
      }}
    />
  </Alert>
);

export default SubscriptionUpsell;
