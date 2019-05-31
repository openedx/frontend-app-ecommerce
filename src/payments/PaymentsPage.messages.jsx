import { defineMessages } from '@edx/frontend-i18n';

const messages = defineMessages({
  'ecommerce.payments.page.heading': {
    id: 'ecommerce.payments.page.heading',
    defaultMessage: 'Payments',
    description: 'The page heading for payments.',
  },
  'ecommerce.payments.empty.basket': {
    id: 'ecommerce.payments.empty.basket',
    defaultMessage: 'Payments you place with edX will appear here.',
    description: 'The message displayed when there are no payments.',
  },
  'ecommerce.payments.loading.payments': {
    id: 'ecommerce.payments.loading.payments',
    defaultMessage: 'Loading payments...',
    description: 'Message when payments are being loaded',
  },
  'ecommerce.payments.loading.error': {
    id: 'ecommerce.payments.loading.error',
    defaultMessage: 'Error: {error}',
    description: 'Message when payments failed to load',
  },
});

export default messages;
