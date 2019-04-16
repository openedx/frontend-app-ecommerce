import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';

import messages from './OrderHistoryPage.messages';


function OrderHistoryPage({ intl, ...others }) {
  return (
    <div className="container-fluid py-5">
      <h1>
        {intl.formatMessage(messages['ecommerce.order.history.page.heading'])}
      </h1>
      <p>
        {intl.formatMessage(messages['ecommerce.order.history.no.orders'])}
      </p>
      <pre>{JSON.stringify(others, null, 4)}</pre>
    </div>
  );
}


OrderHistoryPage.propTypes = {
  intl: intlShape.isRequired,
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })),
};

OrderHistoryPage.defaultProps = {
  orders: [],
};

export default connect(state => ({ // eslint-disable-line no-unused-vars
  orders: [{ id: 1 }],
}))(injectIntl(OrderHistoryPage));
