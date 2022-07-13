import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { getConfig, initialize, mergeConfig } from '@edx/frontend-platform';

const { ECOMMERCE_BASE_URL } = getConfig();

// Temporary: until we add COMMERCE_COORDINATOR_BASE_URL in frontend-platform, use mergeConfig to join it
// with the rest of the config items (so we don't need to get it separately from process.env). After we add
// it to frontend-platform, we'll be able to set it like ECOMMERCE_BASE_URL above, and block below can go away.
initialize({
  handlers: {
    config: () => {
      mergeConfig({
        COMMERCE_COORDINATOR_BASE_URL: process.env.COMMERCE_COORDINATOR_BASE_URL || null,
      });
    },
  },
});

const ECOMMERCE_API_BASE_URL = `${ECOMMERCE_BASE_URL}/api/v2`;
const ECOMMERCE_RECEIPT_BASE_URL = `${ECOMMERCE_BASE_URL}/checkout/receipt/`;

// eslint-disable-next-line import/prefer-default-export
export async function getOrders(page = 1, pageSize = 20) {
  const httpClient = getAuthenticatedHttpClient();
  const { username } = getAuthenticatedUser();
  const { COMMERCE_COORDINATOR_BASE_URL } = getConfig();
  const orderFetchingUrl = `${COMMERCE_COORDINATOR_BASE_URL}/orders/order_history/`;

  // [START] TEMPORARY CODE for rollout testing/confirmation===========
  // Call ecommerce for order info including waffle flag
  let { data } = await httpClient.get(`${ECOMMERCE_API_BASE_URL}/orders/`, {
    params: {
      username,
      page,
      page_size: pageSize,
    },
  });

  let callCC = false;
  if (data.count > 0) {
    callCC = data.results[0].enable_hoist_order_history;
    console.log('REV-2577 LOG: ecommerce data.results', data.results);
  }
  console.log('REV-2577 LOG: enable_hoist_order_history flag is: ', callCC);

  if (callCC) {
    console.log('REV-2577 LOG: about to call commerce-coordinator');
    const newData = await httpClient.get(orderFetchingUrl, {
      params: {
        username,
        page,
        page_size: pageSize,
      },
    });
    data = newData.data;
    console.log('REV-2577 LOG: CC response', newData);
    console.log('REV-2577 LOG: CC response.data', data);
    console.log('REV-2577 LOG: CC response.data.results', data.results);
  }
  // [END] TEMPORARY CODE for rollout testing/confirmation===========

  // @TODO: after we've confirmed the above works in prod, we can replace with this:
  // let { data } = await httpClient.get(orderFetchingUrl, {
  //   params: {
  //     username,
  //     page,
  //     page_size: pageSize,
  //   },
  // });
  // data = newData.data;

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
