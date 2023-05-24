import React from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';

import { Badge, Card, Hyperlink } from '@edx/paragon';

const STATUS_VARIANT_MAP = {
  active: 'success',
  trial: 'warning',
  inactive: 'light',
};

const SubscriptionCardsView = ({ subscriptions }) => (
  <div className="section section-gap-lg">
    {subscriptions.map(({
      uuid,
      title,
      organizations,
      status,
    }) => (
      <Hyperlink
        key={uuid + status}
        destination={`${getConfig().LMS_BASE_URL}/dashboard/programs/${uuid}`}
      >
        <Card className="bg-light-200 p-3">
          <div className="section flex-column-reverse flex-sm-row align-items-start align-items-sm-center">
            <h3 className="text-info-500 m-0">{title}</h3>
            <Badge
              className="text-capitalize"
              variant={STATUS_VARIANT_MAP[status]}
            >
              {status}
            </Badge>
          </div>
          <p className="small text-gray-500 m-0">{organizations.join(', ')}</p>
        </Card>
      </Hyperlink>
    ))}
  </div>
);

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
