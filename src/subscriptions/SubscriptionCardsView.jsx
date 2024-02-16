import React from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Badge, Card, Hyperlink } from '@openedx/paragon';

import messages from './SubscriptionCardsView.messages';

const STATUS_VARIANT_MAP = {
  active: 'success',
  trial: 'warning',
  inactive: 'light',
};

const STATUS_MESSAGE_ID_MAP = {
  active: 'ecommerce.order.history.subscriptions.badge.active',
  trial: 'ecommerce.order.history.subscriptions.badge.trial',
  inactive: 'ecommerce.order.history.subscriptions.badge.inactive',
};

const SubscriptionCardsView = ({ subscriptions }) => {
  const { formatMessage } = useIntl();

  const renderItem = ({
    uuid,
    title,
    organizations,
    status,
  }) => {
    const url = getConfig().LMS_BASE_URL;

    const key = uuid + status;
    const destination = `${url}/dashboard/programs/${uuid}`;
    const variant = STATUS_VARIANT_MAP[status];
    const message = STATUS_MESSAGE_ID_MAP[status];

    return (
      <Hyperlink
        key={key}
        destination={destination}
        data-testid="subscription-card"
      >
        <Card className="bg-light-200 p-3">
          <div className="section flex-column-reverse flex-sm-row align-items-start align-items-sm-center">
            <h3 className="text-info-500 m-0">{title}</h3>
            <Badge className="text-capitalize" variant={variant}>
              {message ? formatMessage(messages[message]) : status}
            </Badge>
          </div>
          <p className="small text-gray-500 m-0">{organizations.join(', ')}</p>
        </Card>
      </Hyperlink>
    );
  };

  return (
    <div
      className="section section-gap-lg"
      data-testid="section-subscription-cards"
    >
      {subscriptions.map(renderItem)}
    </div>
  );
};

SubscriptionCardsView.propTypes = {
  subscriptions: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      organizations: PropTypes.arrayOf(PropTypes.string).isRequired,
      status: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default SubscriptionCardsView;
