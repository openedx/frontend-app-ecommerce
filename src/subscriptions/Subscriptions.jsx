import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConfig } from '@edx/frontend-platform';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import {
  ActionRow,
  AlertModal,
  Button,
  Hyperlink,
  StatefulButton,
} from '@edx/paragon';
import { SpinnerSimple, Info, Launch } from '@edx/paragon/icons';

import SubscriptionCardsView from './SubscriptionCardsView';
import SubscriptionUpsell from './SubscriptionUpsell';

import { clearStripeError, fetchStripeCustomerPortalURL } from './actions';
import { subscriptionsSelector } from './selectors';

const Subscriptions = () => {
  const dispatch = useDispatch();
  const {
    subscriptions,
    stripeCustomerPortalURL,
    stripeError,
    stripeLoading,
  } = useSelector(subscriptionsSelector);
  const hasSubscriptions = subscriptions.length > 0;

  const handleManageSubscriptionsClick = () => {
    sendTrackEvent('edx.bi.user.subscription.order-page.manage.clicked');
    dispatch(fetchStripeCustomerPortalURL());
  };

  const handeAlertClose = () => {
    dispatch(clearStripeError());
  };

  useEffect(() => {
    if (stripeCustomerPortalURL) {
      window.open(stripeCustomerPortalURL, '_blank', 'noopener,noreferrer');
    }
  }, [stripeCustomerPortalURL]);

  const buttonLabel = (
    <FormattedMessage
      id="ecommerce.order.history.subscriptions.manage.button"
      defaultMessage="Manage my subscriptions"
      description="Button text for managing subscriptions."
    />
  );

  const renderSpinner = () => (
    <div className="icon-spin">{SpinnerSimple()}</div>
  );

  const renderEmpty = () => (
    <>
      <FormattedMessage
        id="ecommerce.order.history.subscriptions.subtitle.empty"
        defaultMessage="You do not have any active or previous subscriptions."
        description="Subtitle for subscriptions section when there are no subscriptions."
      >
        {(text) => <span className="text-dark-900">{text}</span>}
      </FormattedMessage>
      <SubscriptionUpsell />
    </>
  );

  const renderSubscriptions = () => (
    <>
      <div className="section flex-md-row align-items-start align-items-md-center justify-content-between">
        <FormattedMessage
          id="ecommerce.order.history.subscriptions.subtitle"
          defaultMessage="To view your receipts, change your payment method or cancel your subscription, click {buttonLabel}."
          description="Subtitle for subscriptions section."
          values={{
            buttonLabel: <i>{buttonLabel}</i>,
          }}
        >
          {(text) => <span className="text-dark-900">{text}</span>}
        </FormattedMessage>
        <StatefulButton
          size="sm"
          className="text-nowrap"
          labels={{ default: buttonLabel }}
          icons={{ default: undefined }}
          iconAfter={stripeLoading ? renderSpinner : Launch}
          state={stripeLoading ? 'pending' : 'default'}
          onClick={handleManageSubscriptionsClick}
        />
      </div>
      <SubscriptionCardsView subscriptions={subscriptions} />
      <AlertModal
        variant="danger"
        title="Something went wrong."
        icon={Info}
        isOpen={stripeError}
        onClose={handeAlertClose}
        footerNode={(
          <ActionRow>
            <Button variant="tertiary" onClick={handeAlertClose}>
              Dismiss
            </Button>
          </ActionRow>
        )}
      >
        <FormattedMessage
          tagName="p"
          id="ecommerce.order.history.subscriptions.stripe.error"
          defaultMessage="Refresh this page and try again. If this problem persists, {supportLink}."
          description="Error message when Stripe subscription information fails to load."
          values={{
            supportLink: (
              <Hyperlink
                destination={`${getConfig().SUPPORT_URL}/hc/requests/new`}
              >
                <FormattedMessage
                  id="ecommerce.order.history.support.fragment"
                  defaultMessage="contact support"
                  description="The support link as in 'please {contact support}'"
                />
              </Hyperlink>
            ),
          }}
        />
      </AlertModal>
    </>
  );

  return (
    <section>
      <FormattedMessage
        tagName="h2"
        id="ecommerce.order.history.subscriptions.heading"
        defaultMessage="Subscriptions"
        description="Heading for subscriptions section."
      />
      {hasSubscriptions ? renderSubscriptions() : renderEmpty()}
    </section>
  );
};

export default Subscriptions;
