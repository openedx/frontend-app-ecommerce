import React from 'react';
import PropTypes from 'prop-types'; // eslint-disable-line no-unused-vars
import { injectIntl, intlShape } from 'react-intl';

import messages from './OrderHistoryPage.messages';


function OrderHistoryPage({ intl }) {
  return (
    <div className="container-fluid py-5">
      <h1>
        {intl.formatMessage(messages['ecommerce.order.history.page.heading'])}
      </h1>
      <p>
        {intl.formatMessage(messages['ecommerce.order.history.no.orders'])}
      </p>
    </div>
  );
}


OrderHistoryPage.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(OrderHistoryPage);
