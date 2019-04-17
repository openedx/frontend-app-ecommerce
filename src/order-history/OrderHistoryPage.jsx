import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';

import messages from './OrderHistoryPage.messages';

// Actions
import { fetchOrders } from './actions';
import { pageSelector } from './selectors';


class OrderHistoryPage extends React.Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  renderOrder(order) {
    return (
      <div key={order.id}>ORDER ID: {order.id}</div>
    );
  }

  renderOrders() {
    if (this.props.orders.length === 0) {
      return (
        <p>
          {this.props.intl.formatMessage(messages['ecommerce.order.history.no.orders'])}
        </p>
      );
    }
    return this.props.orders.map(this.renderOrder);
  }

  renderError() {
    if (this.props.loadingOrdersError === null) return null;
    return (
      <div>
        {this.props.intl.formatMessage(messages['ecommerce.order.history.loading.error'], {
          error: this.props.loadingOrdersError,
        })}
      </div>
    );
  }

  renderLoading() {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">
          {this.props.intl.formatMessage(messages['ecommerce.order.history.loading.orders'])}
        </span>
      </div>
    );
  }

  render() {
    return (
      <div className="container-fluid py-5">
        <h1>
          {this.props.intl.formatMessage(messages['ecommerce.order.history.page.heading'])}
        </h1>
        {this.renderError()}
        {this.props.loadingOrders ? this.renderLoading() : this.renderOrders()}
      </div>
    );
  }
}


OrderHistoryPage.propTypes = {
  intl: intlShape.isRequired,
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })),
  loadingOrders: PropTypes.bool,
  loadingOrdersError: PropTypes.string,
  fetchOrders: PropTypes.func.isRequired,
};

OrderHistoryPage.defaultProps = {
  orders: [],
  loadingOrdersError: null,
  loadingOrders: false,
};


export default connect(pageSelector, {
  fetchOrders,
})(injectIntl(OrderHistoryPage));
