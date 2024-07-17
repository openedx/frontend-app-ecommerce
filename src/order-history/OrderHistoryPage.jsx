import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getConfig, mergeConfig } from '@edx/frontend-platform';
import {
  injectIntl,
  intlShape,
  FormattedDate,
  FormattedNumber,
} from '@edx/frontend-platform/i18n';
import { DataTable, Hyperlink, Pagination } from '@edx/paragon';
import MediaQuery from 'react-responsive';

import { PageLoading } from '../components';

import messages from './OrderHistoryPage.messages';

// Actions
import { fetchOrders } from './actions';
import { pageSelector } from './selectors';

/**
 * TEMPORARY
 *
 * Until we add the following keys in frontend-platform,
 * use mergeConfig to join it with the rest of the config items
 * (so we don't need to get it separately from process.env).
 * After we add the keys to frontend-platform, this mergeConfig can go away
 */
mergeConfig({
  ORDER_HISTORY_URL: process.env.ORDER_HISTORY_URL,
  RECEIPT_URL: process.env.RECEIPT_URL,
});

class OrderHistoryPage extends React.Component {
  constructor(props) {
    super(props);

    this.handlePageSelect = this.handlePageSelect.bind(this);
  }

  handlePageSelect(page) {
    // TODO: We should update the url and trigger this fetching based on the route
    this.props.fetchOrders(page);
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

  renderPagination() {
    const {
      pageCount,
      currentPage,
    } = this.props;

    if (pageCount <= 1) { return null; }

    return (
      <Pagination
        paginationLabel="pagination navigation"
        className="pagination-margin"
        pageCount={pageCount}
        currentPage={currentPage}
        onPageSelect={this.handlePageSelect}
      />
    );
  }

  renderLineItems(lineItems) {
    return lineItems.map(({
      description,
      quantity,
    }) => (
      <p className="d-flex m-0" key={description}>
        <span className="mr-3">{quantity}&times;</span>
        <span>{description}</span>
      </p>
    ));
  }

  renderOrdersTable() {
    return (
      <DataTable
        data={this.getTableData()}
        itemCount={this.props.count}
        columns={[
          {
            Header: this.props.intl.formatMessage(messages['ecommerce.order.history.table.column.items']),
            accessor: 'description',
          },
          {
            Header: this.props.intl.formatMessage(messages['ecommerce.order.history.table.column.date.placed']),
            accessor: 'datePlaced',
          },
          {
            Header: this.props.intl.formatMessage(messages['ecommerce.order.history.table.column.total.cost']),
            accessor: 'total',
          },
          {
            Header: this.props.intl.formatMessage(messages['ecommerce.order.history.table.column.order.number']),
            accessor: 'orderId',
          },
          {
            Header: this.props.intl.formatMessage(messages['ecommerce.order.history.table.column.order.details']),
            accessor: 'receiptUrl',
          },
        ]}
      >
        <DataTable.Table />
      </DataTable>
    );
  }

  renderMobileOrdersTable() {
    return this.getTableData().map(({
      description, datePlaced, total, orderId, receiptUrl,
    }) => (
      <div className="border-bottom py-3" key={orderId}>
        <dl>
          <dt>
            {this.props.intl.formatMessage(messages['ecommerce.order.history.table.column.items'])}
          </dt>
          <dd>{description}</dd>
          <dt>
            {this.props.intl.formatMessage(messages['ecommerce.order.history.table.column.date.placed'])}
          </dt>
          <dd>{datePlaced}</dd>
          <dt>
            {this.props.intl.formatMessage(messages['ecommerce.order.history.table.column.total.cost'])}
          </dt>
          <dd>{total}</dd>
          <dt>
            {this.props.intl.formatMessage(messages['ecommerce.order.history.table.column.order.number'])}
          </dt>
          <dd>{orderId}</dd>
        </dl>
        <p>{receiptUrl}</p>
      </div>
    ));
  }

  renderEmptyMessage() {
    return (
      <p>
        {this.props.intl.formatMessage(messages['ecommerce.order.history.no.orders'], {
          siteName: getConfig().SITE_NAME,
        })}
      </p>
    );
  }

  renderLoading() {
    return (
      <PageLoading
        srMessage={this.props.intl.formatMessage(
          messages['ecommerce.order.history.loading.orders'],
        )}
      />
    );
  }

  renderOrders() {
    const hasOrders = this.props.orders.length > 0;

    return hasOrders ? (
      <>
        <MediaQuery query="(max-width: 768px)">
          {this.renderMobileOrdersTable()}
        </MediaQuery>
        <MediaQuery query="(min-width: 769px)">
          {this.renderOrdersTable()}
        </MediaQuery>
        {this.renderPagination()}
      </>
    ) : (
      this.renderEmptyMessage()
    );
  }

  render() {
    const { loading, intl, isB2CSubsEnabled } = this.props;

    const heading = intl.formatMessage(
      messages['ecommerce.order.history.page.heading'],
    );

    return (
      <section className="page__order-history">
        {isB2CSubsEnabled ? <h2>{heading}</h2> : <h1>{heading}</h1>}
        <div>{loading ? this.renderLoading() : this.renderOrders()}</div>
      </section>
    );
  }
}

OrderHistoryPage.propTypes = {
  intl: intlShape.isRequired,
  isB2CSubsEnabled: PropTypes.bool.isRequired,
  orders: PropTypes.arrayOf(PropTypes.shape({
    datePlaced: PropTypes.string,
    total: PropTypes.string,
    orderId: PropTypes.string,
    receiptUrl: PropTypes.string,
    currency: PropTypes.string,
    lineItems: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      quantity: PropTypes.number,
      description: PropTypes.string,
    })),
  })),
  pageCount: PropTypes.number,
  count: PropTypes.number,
  currentPage: PropTypes.number,
  loading: PropTypes.bool,
  fetchOrders: PropTypes.func.isRequired,
};

OrderHistoryPage.defaultProps = {
  orders: [],
  loading: false,
  pageCount: 0,
  count: 0,
  currentPage: null,
};

export default connect(pageSelector, {
  fetchOrders,
})(injectIntl(OrderHistoryPage));
