import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';
import { Button } from '@openedx/paragon';

import { PageLoading, SupportLink } from '../components';

import { fetchStripeCustomerPortalURL } from './actions';
import { subscriptionsSelector } from './selectors';
import messages from './ManageSubscriptionsPage.messages';

const ManageSubscriptionsPage = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const { stripeCustomerPortalURL, stripeError } = useSelector(
    subscriptionsSelector,
  );

  const buttonLabel = formatMessage(
    messages['ecommerce.order.history.manage.subscriptions.button'],
  );

  useEffect(() => {
    dispatch(fetchStripeCustomerPortalURL());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (stripeCustomerPortalURL) {
      window.location.href = stripeCustomerPortalURL;
    }
  }, [stripeCustomerPortalURL]);

  const renderLoading = () => (
    <PageLoading
      srMessage={formatMessage(
        messages['ecommerce.order.history.manage.subscriptions.loading'],
      )}
    />
  );

  const renderError = () => (
    <div className="container-fluid d-flex py-5 justify-content-center align-items-start text-center">
      <div className="py-5 text-gray-700" style={{ maxWidth: '32em' }}>
        <FormattedMessage
          id="ecommerce.order.history.manage.subscriptions.error.heading"
          defaultMessage="Something went wrong"
          description="Heading when there is an error loading the manage subscriptions page."
        >
          {(text) => <h3 className="text-gray-700 mb-3">{text}</h3>}
        </FormattedMessage>
        <FormattedMessage
          id="ecommerce.order.history.manage.subscriptions.error.body"
          defaultMessage="The page you’re looking for is unavailable or there was an error. Visit the {buttonLabel} page to manage your subscription."
          description="Message when there is an error loading the manage subscriptions page."
          values={{
            buttonLabel: <i className="text-lowercase">{buttonLabel}</i>,
          }}
        >
          {(text) => <p className="lead">{text}</p>}
        </FormattedMessage>
        <FormattedMessage
          tagName="p"
          id="ecommerce.order.history.manage.subscriptions.error.support"
          defaultMessage="If this problem persists, {supportLink}."
          description="Support Message when there is an error loading the manage subscriptions page."
          values={{
            supportLink: <SupportLink />,
          }}
        />
        <Button size="sm" href="/orders">
          {buttonLabel}
        </Button>
      </div>
    </div>
  );

  return stripeError ? renderError() : renderLoading();
};

export default ManageSubscriptionsPage;
