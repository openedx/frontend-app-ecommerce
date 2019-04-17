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
    if (this.props.loadingError === null) return null;
    return (
      <div>
        {this.props.intl.formatMessage(messages['ecommerce.order.history.loading.error'], {
          error: this.props.loadingError,
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
        {this.props.loading ? this.renderLoading() : this.renderOrders()}
      </div>
    );
  }
}


OrderHistoryPage.propTypes = {
  intl: intlShape.isRequired,
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })),
  loading: PropTypes.bool,
  loadingError: PropTypes.string,
  fetchOrders: PropTypes.func.isRequired,
};

OrderHistoryPage.defaultProps = {
  orders: [],
  loadingError: null,
  loading: false,
};


export default connect(pageSelector, {
  fetchOrders,
})(injectIntl(OrderHistoryPage));
