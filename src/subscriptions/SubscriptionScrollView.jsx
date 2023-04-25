import React from 'react';
import PropTypes from 'prop-types';

import { Card, Badge, Scrollable } from '@edx/paragon';

const SubscriptionScrollView = ({ subscriptions }) => (
  <Scrollable className="subscription-scrollable mx-n1">
    <div className="section section-gap-lg mx-1">
      {subscriptions.map(({
        uuid,
        title,
        organizations,
        status,
      }) => (
        <Card className="bg-light-200 p-3" key={uuid + status}>
          <div className="section flex-column-reverse flex-sm-row align-items-start align-items-sm-center">
            <h3 className="text-info-500 m-0">{title}</h3>
            <Badge className="text-capitalize" variant="light">
              {status.toLowerCase()}
            </Badge>
          </div>
          <p className="small text-gray-500 m-0">{organizations.join(', ')}</p>
        </Card>
      ))}
    </div>
  </Scrollable>
);

SubscriptionScrollView.propTypes = {
  subscriptions: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      organizations: PropTypes.arrayOf(PropTypes.string).isRequired,
      status: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default SubscriptionScrollView;
