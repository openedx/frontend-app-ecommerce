import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  'ecommerce.receipt.heading': {
    id: 'ecommerce.receipt.heading',
    defaultMessage: 'Thank you for your order!',
    description: 'Page heading for receipt.',
  },
  'ecommerce.receipt.confirm.message': {
    id: 'ecommerce.receipt.confirm.message',
    defaultMessage: 'Your order is complete. If you need a receipt, you can print this page.',
    description: 'Receipt order confirmation message',
  },
  'ecommerce.receipt.confirm.message.enrollment.code': {
    id: 'ecommerce.receipt.confirm.message.enrollment.code',
    defaultMessage: 'Your order is complete. If you need a receipt, you can print this page.You will also receive a confirmation message with this information at ',
    description: 'Receipt order confirmation message for enrollment code product',
  },
  'ecommerce.receipt.table.order.information': {
    id: 'ecommerce.receipt.table.order.information',
    defaultMessage: 'Order Information',
    description: 'Order information heading for order table',
  },
  'ecommerce.receipt.table.order.discount': {
    id: 'ecommerce.receipt.table.order.discount',
    defaultMessage: 'Discount',
    description: 'Order table title for order discount',
  },
  'ecommerce.receipt.table.order.discount.message.fpd': {
    id: 'ecommerce.receipt.table.order.discount.message.fpd',
    defaultMessage: 'Discount for your first upgrade',
    description: 'Message on discount section for first purchase discount',
  },
  'ecommerce.receipt.table.order.subtotal': {
    id: 'ecommerce.receipt.table.order.subtotal',
    defaultMessage: 'Subtotal',
    description: 'Order table title for order subtotal',
  },
  'ecommerce.receipt.table.order.total': {
    id: 'ecommerce.receipt.table.order.total',
    defaultMessage: 'Total',
    description: 'Order table title for order total',
  },
  'ecommerce.receipt.order.summary.order.date': {
    id: 'ecommerce.receipt.order.summary.order.date',
    defaultMessage: 'Order Date:',
    description: 'Order summary heading for order date',
  },
  'ecommerce.receipt.order.summary.order.number': {
    id: 'ecommerce.receipt.order.summary.order.number',
    defaultMessage: 'Order Number:',
    description: 'Order summary heading for order number',
  },
  'ecommerce.receipt.order.summary.payment.method': {
    id: 'ecommerce.receipt.order.payment.method',
    defaultMessage: 'Payment Method:',
    description: 'Order summary heading for payment method',
  },
  'ecommerce.receipt.table.column.quantity': {
    id: 'ecommerce.receipt.table.column.quantity',
    defaultMessage: 'Quantity',
    description: 'Column quantity title for order info table',
  },
  'ecommerce.receipt.table.column.description': {
    id: 'ecommerce.receipt.table.column.description',
    defaultMessage: 'Description',
    description: 'Column description title for order info table',
  },
  'ecommerce.receipt.table.column.price': {
    id: 'ecommerce.receipt.table.column.price',
    defaultMessage: 'Item Price',
    description: 'Column item price title for order info table',
  },
  'ecommerce.receipt.loading.order': {
    id: 'ecommerce.receipt.loading.order',
    defaultMessage: 'Loading order...',
    description: 'Message when order is being loaded',
  },
  'ecommerce.receipt.link.dashboard': {
    id: 'ecommerce.receipt.link.dashboard',
    defaultMessage: 'Go to dashboard',
    description: 'Link to learner dashboard',
  },
  'ecommerce.receipt.link.find.courses': {
    id: 'ecommerce.receipt.link.find.courses',
    defaultMessage: 'Find more courses',
    description: 'Link to search for courses',
  },
});

export default messages;
