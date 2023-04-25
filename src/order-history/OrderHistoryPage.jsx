import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getConfig,
} from '@edx/frontend-platform';
import {
  injectIntl,
  intlShape,
  FormattedDate,
  FormattedNumber,
} from '@edx/frontend-platform/i18n';
import { Table, Hyperlink, Pagination } from '@edx/paragon';
import MediaQuery from 'react-responsive';

import messages from './OrderHistoryPage.messages';

// Actions
import { fetchOrders } from './actions';
import { pageSelector } from './selectors';
import { PageLoading } from '../common';

class OrderHistoryPage extends React.Component {
  constructor(props) {
    super(props);

    this.handlePageSelect = this.handlePageSelect.bind(this);
  }

  componentDidMount() {
    // TODO: We should fetch based on the route (ex: /orders/list/page/1)
    this.props.fetchOrders(1);
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
      <p className="d-flex" key={description}>
        <span className="mr-3">{quantity}&times;</span>
        <span>{description}</span>
      </p>
    ));
  }

  renderOrdersTable() {
    return (
      <Table
        className="order-history table-bordered"
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
            label: this.props.intl.formatMessage(messages['ecommerce.order.history.table.column.order.details']),
            key: 'receiptUrl',
          },
        ]}
      />
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

  renderError() {
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
      <PageLoading srMessage={this.props.intl.formatMessage(messages['ecommerce.order.history.loading.orders'])} />
    );
  }

  render() {
    const {
      loading,
      loadingError,
      orders,
    } = this.props;
    const loaded = !loading && !loadingError;
    const hasOrders = orders.length > 0;
    const heading = this.props.intl.formatMessage(
      messages['ecommerce.order.history.page.heading'],
    );

    return (
      <section className="page__order-history">
        {this.props.isB2CSubsEnabled ? <h2>{heading}</h2> : <h1>{heading}</h1>}
        <div>
          {loadingError ? this.renderError() : null}
          {loaded && hasOrders ? (
            <>
              <MediaQuery query="(max-width: 768px)">
                {this.renderMobileOrdersTable()}
              </MediaQuery>
              <MediaQuery query="(min-width: 769px)">
                {this.renderOrdersTable()}
              </MediaQuery>
              {this.renderPagination()}
            </>
          ) : null}
          {loaded && !hasOrders ? this.renderEmptyMessage() : null}
          {loading ? this.renderLoading() : null}
        </div>
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
  currentPage: PropTypes.number,
  loading: PropTypes.bool,
  loadingError: PropTypes.string,
  fetchOrders: PropTypes.func.isRequired,
};

OrderHistoryPage.defaultProps = {
  orders: [],
  loadingError: null,
  loading: false,
  pageCount: 0,
  currentPage: null,
};

export default connect(pageSelector, {
  fetchOrders,
})(injectIntl(OrderHistoryPage));
