import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

const { ECOMMERCE_BASE_URL } = getConfig();
const ECOMMERCE_API_BASE_URL = `${ECOMMERCE_BASE_URL}/api/v2`;
const ECOMMERCE_RECEIPT_BASE_URL = `${ECOMMERCE_BASE_URL}/checkout/receipt/`;

// eslint-disable-next-line import/prefer-default-export
export async function getOrders(page = 1, pageSize = 20) {
  const httpClient = getAuthenticatedHttpClient();
  const { username } = getAuthenticatedUser();

  let data;
  if (getConfig().ENABLE_HOIST_ORDER_HISTORY === 'true') {
    console.log('ENABLE_HOIST_ORDER_HISTORY is true');
    // TODO: add GET request with Commerce Coordinator URL
    // and add the URL to edx-internal repo
  } else {
    // If ENABLE_HOIST_ORDER_HISTORY is set to anything other than 'true' or is null,
    // the order history page will fetch order data from ecommerce API
    data = await httpClient.get(`${ECOMMERCE_API_BASE_URL}/orders/`, {
      params: {
        username,
        page,
        page_size: pageSize,
      },
    }).data;
  }

  const transformedResults = data.results.map(({
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
      datePlaced: date_placed,
      total: total_excl_tax,
      orderId: number,
      currency,
      lineItems,
      receiptUrl: `${ECOMMERCE_RECEIPT_BASE_URL}?order_number=${number}`,
    };
  });

  return {
    count: data.count,
    pageCount: Math.ceil(data.count / pageSize),
    currentPage: page,
    next: data.next,
    previous: data.previous,
    orders: transformedResults,
  };
}
