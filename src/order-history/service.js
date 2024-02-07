/* eslint-disable no-console */
// NOTE: console logs are intentionally added for REV-2577

import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

const { ECOMMERCE_BASE_URL } = getConfig();

const ECOMMERCE_RECEIPT_BASE_URL = `${ECOMMERCE_BASE_URL}/checkout/receipt/`;

const decimalishMatcher = /^([0-9]*[.,]*)+[0-9]*$/;

function isNotDecimalish(num) {
  if (Number.isNaN(num)) {
    return true;
  }

  return !decimalishMatcher.test(num);
}

// eslint-disable-next-line import/prefer-default-export
export async function getOrders(page = 1, pageSize = 20) {
  const httpClient = getAuthenticatedHttpClient();
  const { username } = getAuthenticatedUser();
  const { ORDER_HISTORY_URL } = getConfig();

  const { data } = await httpClient.get(`${ORDER_HISTORY_URL}`, {
    params: {
      username,
      page,
      page_size: pageSize,
    },
  });

  const transformedResults = data.map(({
    total_excl_tax, // eslint-disable-line camelcase
    lines,
    number,
    currency,
    date_placed, // eslint-disable-line camelcase
  }) => {
    const lineItems = lines.map(({
      title,
      quantity,
      description,
    }) => ({
      title,
      quantity,
      description,
    }));

    return {
      datePlaced: date_placed, // eslint-disable-line camelcase
      total: isNotDecimalish(total_excl_tax) ? total_excl_tax : `$${total_excl_tax}`, // eslint-disable-line camelcase
      orderId: number,
      currency,
      lineItems,
      receiptUrl: `${ECOMMERCE_RECEIPT_BASE_URL}?order_number=${number}`,
    };
  });

  return {
    count: data.count,
    pageCount: 0, // Math.ceil(data.count / pageSize),
    currentPage: 1,
    next: false,
    previous: false,
    orders: transformedResults,
  };
}
