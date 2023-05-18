import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  'ecommerce.order.history.subscriptions.subtitle.zero': {
    id: 'ecommerce.order.history.subscriptions.subtitle.zero',
    defaultMessage:
      'You do not have an active subscription. To view your past receipts, click {buttonLabel}.',
    description: 'Subtitle for zero active subscriptions',
  },
  'ecommerce.order.history.subscriptions.subtitle.one': {
    id: 'ecommerce.order.history.subscriptions.subtitle.one',
    defaultMessage:
      'You have {activeCount} active subscription. To view your receipts, change your payment method or cancel your subscription, click {buttonLabel}.',
    description: 'Subtitle for one active subscriptions ',
  },
  'ecommerce.order.history.subscriptions.subtitle.multiple': {
    id: 'ecommerce.order.history.subscriptions.subtitle.multiple',
    defaultMessage:
      'You have {activeCount} active subscriptions. To view your receipts, change your payment method or cancel your subscription, click {buttonLabel}.',
    description: 'Subtitle for multiple subscriptions',
  },
});

export default messages;
