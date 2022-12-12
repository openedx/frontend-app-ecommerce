import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import {
  getConfig,
} from '@edx/frontend-platform';
import {
  injectIntl,
  intlShape,
  FormattedMessage,
  FormattedNumber,
} from '@edx/frontend-platform/i18n';
import {
  ActionRow, Alert, Badge, DataTable, Hyperlink, MailtoLink, PageBanner,
} from '@edx/paragon';
import { Info } from '@edx/paragon/icons';

import messages from './ReceiptPage.messages';

// Actions
import { fetchOrder } from './actions';
import { receiptSelector } from './selectors';
import { PageLoading } from '../common';

const { LMS_BASE_URL } = getConfig();
const DASHBOARD_URL = `${LMS_BASE_URL}/dashboard`;
const FIND_COURSES_URL = `${LMS_BASE_URL}/courses`;
class ReceiptPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  componentDidMount() {
    const orderNumber = this.props.history.location.search.split('=')[1];
    this.props.fetchOrder(orderNumber);
  }

  getConfirmMessage() {
    return this.props.order.lines.map(({
      product,
    }) => (
      product.is_enrollment_code_product ? (
        <span key={product.id}>
          {this.props.intl.formatMessage(messages['ecommerce.receipt.confirm.message.enrollment.code'])}
          <MailtoLink data-hj-suppress to={this.props.order.user.email}>{this.props.order.user.email}</MailtoLink>
        </span>
      ) : (
        <span key={product.id}>
          {this.props.intl.formatMessage(messages['ecommerce.receipt.confirm.message'])}
        </span>
      )
    ));
  }

  getProductTrackingVariable() {
    const productTracking = this.props.order.product_tracking;
    return `var awinProductTrackingData = ${productTracking}`;
  }

  renderDiscountByType(discounts) {
    return discounts.map(discount => {
      const discountAmount = (
        <FormattedNumber
          value={-Math.abs(discount.amount)}
          style="currency" // eslint-disable-line react/style-prop-object
          currency={discount.currency}
        />
      );
      if (discount.code) {
        return (
          <>
            <span data-hj-suppress>{discount.code}</span>
            <ActionRow.Spacer />
            <span>{discount.benefit_value}% off</span>
            <ActionRow.Spacer />
            <span>{discountAmount}</span>
          </>
        );
      }
      if (discount.contains_offer) {
        if (discount.enterprise_customer_name) {
          return (
            <>
              <FormattedMessage
                id="ecommerce.receipt.table.order.discount.message.enterprise"
                defaultMessage="Discount of type {offerType} provided by {enterpriseCustomer}"
                key={discount.id}
                values={{
                  offerType: discount.offer_type,
                  enterpriseCustomer: discount.enterprise_customer_name,
                }}
              />
              <ActionRow.Spacer />
              <span>{discountAmount}</span>
            </>
          );
        // eslint-disable-next-line no-else-return
        } else if (discount.condition_name === 'dynamic_discount_condition') {
          return (
            <>
              <span key={discount.id}>{this.props.intl.formatMessage(messages['ecommerce.receipt.table.order.discount.message.fpd'])}</span>
              <ActionRow.Spacer />
              <span>{discountAmount}</span>
            </>
          );
        } else {
          return (
            <>
              <FormattedMessage
                id="ecommerce.receipt.table.order.discount.message"
                defaultMessage="Discount of type {offerType} is provided"
                key={discount.id}
                values={{
                  offerType: discount.offer_type,
                }}
              />
              <ActionRow.Spacer />
              <span>{discountAmount}</span>
            </>
          );
        }
      }
      return <span>{discountAmount}</span>;
    });
  }

  renderCreditMessaging() {
    const dashboardLink = (
      <Hyperlink className="inline-link-underline" destination={DASHBOARD_URL}>
        <FormattedMessage
          id="ecommerce.receipt.credit.messaging.message.link"
          defaultMessage="dashboard"
        />
      </Hyperlink>
    );
    return (
      <Alert
        variant="warning"
        icon={Info}
        className="credit-messaging"
      >
        <Alert.Heading>
          <FormattedMessage
            id="ecommerce.receipt.credit.messaging.header"
            defaultMessage="Get Your Course Credit"
          />
        </Alert.Heading>
        <p>
          <FormattedMessage
            id="ecommerce.receipt.credit.messaging.message"
            defaultMessage="To receive academic credit for this course, you must apply for credit at the organization that offers the credit. You can find a link to the organization’s website on your {dashboardLink}, next to the course name."
            values={{ dashboardLink }}
          />
        </p>
      </Alert>
    );
  }

  renderEnterpriseMessage() {
    const learnerPortalLink = (
      <Hyperlink className="inline-link-underline" destination={this.props.order.enterprise_learner_portal_url}>
        <FormattedMessage
          id="ecommerce.receipt.page.banner.enterprise.message.link"
          defaultMessage="your learner portal"
        />
      </Hyperlink>
    );

    // eslint-disable-next-line no-unused-expressions
    return (
      <div className="enterprise-message">
        <PageBanner
          show={this.state.show}
          dismissible
          onDismiss={() => this.setState({ show: false })}
        >
          <FormattedMessage
            id="ecommerce.receipt.page.banner.enterprise.message"
            defaultMessage="Your company, {enterpriseCustomerName}, has a dedicated page where you can see all of your sponsored courses. Go to {learnerPortalUrl}."
            values={{
              enterpriseCustomerName: this.props.order.basket_discounts[0].enterprise_customer_name,
              learnerPortalUrl: learnerPortalLink,
            }}
          />
        </PageBanner>
      </div>
    );
  }

  renderError() {
    const { ORDER_HISTORY_URL } = getConfig();
    const orderHistoryLink = (
      <Hyperlink className="inline-link-underline" destination={ORDER_HISTORY_URL}>
        <FormattedMessage
          id="ecommerce.receipt.loading.error.link"
          defaultMessage="order history"
        />
      </Hyperlink>
    );
    return (
      <div id="receipt-container" className="page__receipt receipt container content-container pt-5 pb-5">
        <span>
          <FormattedMessage
            id="ecommerce.receipt.loading.error"
            defaultMessage="The specified order could not be located. Please ensure that the URL is correct, and try again. You may also view your previous orders on the {orderHistoryLink} page."
            values={{ orderHistoryLink }}
          />
        </span>
      </div>
    );
  }

  renderLoading() {
    return (
      <PageLoading srMessage={this.props.intl.formatMessage(messages['ecommerce.receipt.loading.order'])} />
    );
  }

  renderOrderTable() {
    const courseDescriptionAndId = ({ row }) => (
      <>
        <span className="course-description-title">
          {row.values.description}
        </span>
        <span className="course-description-subtitle" data-course-id={row.values.course_organization}>
          {row.values.course_organization}
        </span>
      </>
    );
    return this.props.order.lines.map(line => (
      <DataTable
        aria-hidden="true"
        itemCount="1"
        data={[
          {
            quantity: line.quantity,
            description: line.description,
            item_price: <FormattedNumber
              value={this.props.order.total_before_discounts_incl_tax}
              style="currency" // eslint-disable-line react/style-prop-object
              currency={this.props.order.currency}
            />,
          },
        ]}
        columns={[
          {
            Header: this.props.intl.formatMessage(messages['ecommerce.receipt.table.column.quantity']),
            accessor: 'quantity',
          },
          {
            Header: this.props.intl.formatMessage(messages['ecommerce.receipt.table.column.description']),
            accessor: 'description',
            Cell: courseDescriptionAndId,
          },
          {
            Header: this.props.intl.formatMessage(messages['ecommerce.receipt.table.column.price']),
            accessor: 'item_price',
          },
        ]}
      >
        <DataTable.Table />
      </DataTable>
    ));
  }

  render() {
    const {
      loadingReceipt,
      loadingReceiptError,
      order,
    } = this.props;
    const loaded = !loadingReceipt && !loadingReceiptError;
    const fetchingError = loaded && !order;

    return (
      <>
        {loadingReceiptError || fetchingError ? this.renderError() : null}
        {loadingReceipt ? this.renderLoading() : null}
        {loaded && order ? (
          <div
            id="receipt-container"
            className="page__receipt receipt container content-container"
            data-currency={order.currency}
            data-order-id={order.number}
            data-total-amount={order.total_before_discounts_incl_tax}
            data-product-ids={order.order_product_ids}
            // data-back-button="{{ disable_back_button | default:0 }}"
          >
            <Helmet>
              <script type="text/javascript">
                {this.getProductTrackingVariable()}
              </script>
            </Helmet>
            {order.enterprise_learner_portal_url ? this.renderEnterpriseMessage() : null}
            <div className="list-info">
              <h2 className="thank-you text-primary-500">{this.props.intl.formatMessage(messages['ecommerce.receipt.heading'])}</h2>
              <div className="info-item payment-info row">
                <div className="copy col-md-8">
                  <div className="confirm-message">
                    {this.getConfirmMessage()}
                  </div>
                  {order.billing_address && (
                    <address className="billing-address" data-hj-suppress>
                      {order.billing_address.first_name} {order.billing_address.last_name}<br />
                      {order.billing_address.line1}<br />
                      {order.billing_address.city}<br />
                      {order.billing_address.state}<br />
                      {order.billing_address.postcode}<br />
                      {order.billing_address.country}<br />
                    </address>
                  )}
                </div>
                <div className="order-summary col-md-4">
                  <dl>
                    <dt>{this.props.intl.formatMessage(messages['ecommerce.receipt.order.summary.order.number'])}</dt>
                    <dd>{order.number}</dd>
                    {order.payment_method && (
                      <>
                        <dt>{this.props.intl.formatMessage(messages['ecommerce.receipt.order.summary.payment.method'])}</dt>
                        <dd>{order.payment_method}</dd>
                      </>
                    )}
                    <dt>{this.props.intl.formatMessage(messages['ecommerce.receipt.order.summary.order.date'])}</dt>
                    <dd>{new Date(order.date_placed).toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' })}</dd>
                  </dl>
                </div>
              </div>
              <h2 className="text-primary-500">{this.props.intl.formatMessage(messages['ecommerce.receipt.table.order.information'])}</h2>
              <div className="info-table">{this.renderOrderTable()}</div>
              <div className="row">
                <div className="order-total col-6 ml-auto">
                  <ActionRow className="order-total-item border-divider">
                    <span className="description">{this.props.intl.formatMessage(messages['ecommerce.receipt.table.order.subtotal'])}</span>
                    <ActionRow.Spacer />
                    <FormattedNumber
                      value={this.props.order.total_before_discounts_incl_tax}
                      style="currency" // eslint-disable-line react/style-prop-object
                      currency={this.props.order.currency}
                    />
                  </ActionRow>
                  {order.vouchers && (
                    <>
                      <ActionRow className="order-total-item">
                        <Badge variant="success">{this.props.intl.formatMessage(messages['ecommerce.receipt.table.order.discount'])}</Badge>
                        <ActionRow.Spacer />
                        {this.renderDiscountByType(order.basket_discounts)}
                      </ActionRow>
                      {order.enterprise_learner_portal_url && (
                        <div className="enterprise-customer">
                          <FormattedMessage
                            id="ecommerce.receipt.table.order.discount.message.enterprise.secondary"
                            defaultMessage="Courtesy of {enterpriseName} is provided"
                            values={{
                              enterpriseName: order.basket_discounts[0].enterprise_customer_name,
                            }}
                          />
                        </div>
                      )}
                      <ActionRow className="border-divider" />
                    </>
                  )}
                  <ActionRow className="order-total-item">
                    <span>{this.props.intl.formatMessage(messages['ecommerce.receipt.table.order.total'])}</span>
                    <ActionRow.Spacer />
                    <FormattedNumber
                      value={this.props.order.total_excl_tax}
                      style="currency" // eslint-disable-line react/style-prop-object
                      currency={this.props.order.currency}
                    />
                  </ActionRow>
                </div>
              </div>
              {order.contains_credit_seat && this.renderCreditMessaging()}
              <ActionRow id="cta-nav-links">
                <Hyperlink className="dashboard-link" destination={DASHBOARD_URL}>{this.props.intl.formatMessage(messages['ecommerce.receipt.link.dashboard'])}</Hyperlink>
                <Hyperlink destination={FIND_COURSES_URL}>{this.props.intl.formatMessage(messages['ecommerce.receipt.link.find.courses'])}</Hyperlink>
              </ActionRow>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

ReceiptPage.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  order: PropTypes.shape({
    basket_discounts: PropTypes.arrayOf(PropTypes.shape({
      amount: PropTypes.number,
      benefit: PropTypes.number,
      code: PropTypes.string,
      condition_name: PropTypes.string,
      contains_offer: PropTypes.bool,
      currency: PropTypes.string,
      enterprise_customer_name: PropTypes.string,
      offer_type: PropTypes.string,
    })),
    billing_address: PropTypes.shape({
      city: PropTypes.string,
      country: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      line1: PropTypes.string,
      line2: PropTypes.string,
      postcode: PropTypes.string,
      state: PropTypes.string,
    }),
    contains_credit_seat: PropTypes.bool,
    currency: PropTypes.string,
    date_placed: PropTypes.string,
    discount: PropTypes.string,
    enterprise_learner_portal_url: PropTypes.string,
    lines: PropTypes.arrayOf(PropTypes.shape({
      course_organization: PropTypes.string,
      description: PropTypes.string,
      linePriceExclTax: PropTypes.string,
      quantity: PropTypes.number,
      unitPriceExclTax: PropTypes.string,
    })),
    number: PropTypes.string,
    order_product_ids: PropTypes.string,
    payment_method: PropTypes.string,
    product_tracking: PropTypes.string,
    total_before_discounts_incl_tax: PropTypes.string,
    total_excl_tax: PropTypes.string,
    user: PropTypes.shape({
      email: PropTypes.string,
      username: PropTypes.string,
    }),
    vouchers: PropTypes.arrayOf(PropTypes.shape({
      benefit: PropTypes.shape({
        type: PropTypes.string,
        value: PropTypes.number,
      }),
      code: PropTypes.string,
      total_discount: PropTypes.string,
    })),
  }),
  loadingReceipt: PropTypes.bool,
  loadingReceiptError: PropTypes.string,
  fetchOrder: PropTypes.func.isRequired,
};

ReceiptPage.defaultProps = {
  order: null,
  loadingReceiptError: null,
  loadingReceipt: false,
};

export default connect(receiptSelector, {
  fetchOrder,
})(injectIntl(ReceiptPage));
