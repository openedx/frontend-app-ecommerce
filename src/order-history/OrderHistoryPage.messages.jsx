import { defineMessages } from 'react-intl';

const messages = defineMessages({
  'ecommerce.order.history.page.heading': {
    id: 'ecommerce.order.history.page.heading',
    defaultMessage: 'Order History',
    description: 'The page heading for order history.',
  },
  'ecommerce.order.history.no.orders': {
    id: 'ecommerce.order.history.no.orders',
    defaultMessage: 'Orders you place with edX will appear here.',
    description: 'The message displayed when there are no orders.',
  },
  'ecommerce.order.history.loading.orders': {
    id: 'ecommerce.order.history.loading.orders',
    defaultMessage: 'Loading orders...',
    description: 'Message when orders are being loaded',
  },
});

export default messages;
