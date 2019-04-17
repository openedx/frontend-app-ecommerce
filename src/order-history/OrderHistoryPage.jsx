import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedNumber, FormattedDate } from 'react-intl';
import { Table, Hyperlink } from '@edx/paragon';

import messages from './OrderHistoryPage.messages';

// Actions
import { fetchOrders } from './actions';
import { pageSelector } from './selectors';


class OrderHistoryPage extends React.Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  getTableData() {
    return this.props.orders.map(({
      lineItems,
      datePlaced,
      total,
      currency,
      orderId,
      receiptUrl,
    }) => ({
      description: this.renderLineItems(lineItems),
      datePlaced: <FormattedDate value={new Date(datePlaced)} />,
      // eslint-disable-next-line react/style-prop-object
      total: <FormattedNumber value={total} style="currency" currency={currency} />,
      receiptUrl: (
        <Hyperlink destination={receiptUrl}>
          {this.props.intl.formatMessage(messages['ecommerce.order.history.view.order.detail'])}
        </Hyperlink>
      ),
      orderId,
    }), this);
  }

  renderLineItems(lineItems) {
    return lineItems.map(({
      itemId,
      description,
      quantity,
    }) => (
      <p className="d-flex" key={itemId}>
        <span className="mr-3">{quantity}x</span>
        <span>{description}</span>
      </p>
    ));
  }

  renderOrdersTable() {
    if (this.props.loadingError !== null) return null;
    if (!this.props.loading && this.props.orders.length === 0) {
      return (
        <p>
          {this.props.intl.formatMessage(messages['ecommerce.order.history.no.orders'])}
        </p>
      );
    }

    return (
      <Table
        className="order-history"
        data={this.getTableData()}
        columns={[
          {
            label: this.props.intl.formatMessage(messages['ecommerce.order.history.table.column.items']),
            key: 'description',
          },
          {
            label: this.props.intl.formatMessage(messages['ecommerce.order.history.table.column.date.placed']),
            key: 'datePlaced',
          },
          {
            label: this.props.intl.formatMessage(messages['ecommerce.order.history.table.column.total.cost']),
            key: 'total',
          },
          {
            label: this.props.intl.formatMessage(messages['ecommerce.order.history.table.column.order.number']),
            key: 'orderId',
          },
          {
            label: '',
            key: 'receiptUrl',
          },
        ]}
      />
    );
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
    if (!this.props.loading) return null;
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
      <div className="page__order-history container-fluid py-5">
        <h1>
          {this.props.intl.formatMessage(messages['ecommerce.order.history.page.heading'])}
        </h1>
        {this.renderError()}
        {this.renderOrdersTable()}
        {this.renderLoading()}
      </div>
    );
  }
}


OrderHistoryPage.propTypes = {
  intl: intlShape.isRequired,
  orders: PropTypes.arrayOf(PropTypes.shape({
    datePlaced: PropTypes.string,
    total: PropTypes.string,
    orderId: PropTypes.string,
    receiptUrl: PropTypes.string,
    currency: PropTypes.string,
    lineItems: PropTypes.arrayOf(PropTypes.shape({
      itemId: PropTypes.number,
      title: PropTypes.string,
      quantity: PropTypes.number,
      description: PropTypes.string,
    })),
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
