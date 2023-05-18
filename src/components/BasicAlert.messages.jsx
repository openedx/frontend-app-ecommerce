import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  'ecommerce.order.history.basic.alert.title': {
    id: 'ecommerce.order.history.basic.alert.title',
    defaultMessage: 'Something went wrong.',
    description: 'Heading for basic error message.',
  },
  'ecommerce.order.history.basic.alert.body': {
    id: 'ecommerce.order.history.basic.alert.body',
    defaultMessage:
      'Refresh this page and try again. If this problem persists, {supportLink}.',
    description: 'Description for basic error message with the support link.',
  },
  'ecommerce.order.history.basic.alert.button': {
    id: 'ecommerce.order.history.basic.alert.button',
    defaultMessage: 'Dismiss',
    description: 'Dismiss button label for basic error message.',
  },
});

export default messages;
