import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  'ecommerce.order.history.page.heading': {
    id: 'ecommerce.order.history.page.heading',
    defaultMessage: 'Order History',
    description: 'Page heading for order history.',
  },
  'ecommerce.order.history.no.orders': {
    id: 'ecommerce.order.history.no.orders',
    defaultMessage: 'Orders you place with {siteName} will appear here.',
    description: 'The message displayed when there are no orders.',
  },
  'ecommerce.order.history.loading.orders': {
    id: 'ecommerce.order.history.loading.orders',
    defaultMessage: 'Loading orders...',
    description: 'Message when orders are being loaded',
  },
  'ecommerce.order.history.view.order.detail': {
    id: 'ecommerce.order.history.view.order.detail',
    defaultMessage: 'View Order Details',
    description: 'Link to an order receipt',
  },
  'ecommerce.order.history.table.column.items': {
    id: 'ecommerce.order.history.table.column.items',
    defaultMessage: 'Items',
    description: 'The column label for Items in the order history table.',
  },
  'ecommerce.order.history.table.column.date.placed': {
    id: 'ecommerce.order.history.table.column.date.placed',
    defaultMessage: 'Date placed',
    description: 'The column label for Date placed in the order history table.',
  },
  'ecommerce.order.history.table.column.total.cost': {
    id: 'ecommerce.order.history.table.column.total.cost',
    defaultMessage: 'Total cost',
    description: 'The column label for Total cost in the order history table.',
  },
  'ecommerce.order.history.table.column.order.number': {
    id: 'ecommerce.order.history.table.column.order.number',
    defaultMessage: 'Order number',
    description: 'The column label for Order number in the order history table.',
  },
  'ecommerce.order.history.table.column.order.details': {
    id: 'ecommerce.order.history.table.column.order.details',
    defaultMessage: 'Order details',
    description: 'The column label for Order details in the order history table.',
  },
});

export default messages;
