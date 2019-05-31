import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from '@edx/frontend-i18n';

import messages from './PaymentsPage.messages';

// Actions
import { fetchPayments } from './actions';
import { paymentsSelector } from './selectors';
import { PageLoading } from '../common';


class PaymentsPage extends React.Component {
  componentDidMount() {
    this.props.fetchPayments();
  }

  renderEmptyMessage() {
    return (
      <p>
        {this.props.intl.formatMessage(messages['ecommerce.payments.empty.basket'])}
      </p>
    );
  }

  renderError() {
    return (
      <div>
        {this.props.intl.formatMessage(messages['ecommerce.payments.loading.error'], {
          error: this.props.loadingError,
        })}
      </div>
    );
  }

  renderLoading() {
    return (
      <PageLoading srMessage={this.props.intl.formatMessage(messages['ecommerce.payments.loading.payments'])} />
    );
  }

  render() {
    const {
      loading,
      loadingError,
      payments,
    } = this.props;
    const loaded = !loading && !loadingError;
    const hasPayments = payments.total;

    return (
      <div className="page__payments container-fluid py-5">
        <h1>
          {this.props.intl.formatMessage(messages['ecommerce.payments.page.heading'])}
        </h1>
        {loadingError ? this.renderError() : null}
        {loaded && hasPayments ? (
          <React.Fragment>
            <h2>Total</h2>
            <p>{this.props.payments.total}</p>
          </React.Fragment>
        ) : null}
        {loaded && !hasPayments ? this.renderEmptyMessage() : null}
        {loading ? this.renderLoading() : null}
      </div>
    );
  }
}


PaymentsPage.propTypes = {
  intl: intlShape.isRequired,
  payments: PropTypes.shape({
    total: PropTypes.number,
  }),
  loading: PropTypes.bool,
  loadingError: PropTypes.string,
  fetchPayments: PropTypes.func.isRequired,
};

PaymentsPage.defaultProps = {
  payments: {},
  loadingError: null,
  loading: false,
};


export default connect(paymentsSelector, {
  fetchPayments,
})(injectIntl(PaymentsPage));
