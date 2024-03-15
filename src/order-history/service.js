/* eslint-disable no-console */
// NOTE: console logs are intentionally added for REV-2577

import { getAuthenticatedHttpClient, getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

const { ECOMMERCE_BASE_URL, ENABLE_UNIFIED_ORDER_HISTORY } = getConfig();

const ECOMMERCE_API_BASE_URL = `${ECOMMERCE_BASE_URL}/api/v2`; // Legacy Ecomm-Only
let ECOMMERCE_RECEIPT_BASE_URL = `${ECOMMERCE_BASE_URL}/checkout/receipt/`; // Both Flows

if (ENABLE_UNIFIED_ORDER_HISTORY) {
  const { RECEIPT_URL } = getConfig();
  ECOMMERCE_RECEIPT_BASE_URL = `${RECEIPT_URL}`;
}

const decimalishMatcher = /^([0-9]*[.,]*)+[0-9]*$/;

function isNotDecimalish(num) {
  if (Number.isNaN(num)) {
    return true;
  }

  return !decimalishMatcher.test(num);
}

async function getUnifiedOrders(page = 1, pageSize = 20) {
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

async function getLegacyOrders(page = 1, pageSize = 20) {
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
      datePlaced: date_placed, // eslint-disable-line camelcase
      total: total_excl_tax, // eslint-disable-line camelcase
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

// eslint-disable-next-line import/prefer-default-export
export async function getOrders(page = 1, pageSize = 20) {
  if (ENABLE_UNIFIED_ORDER_HISTORY) {
    return getUnifiedOrders(page, pageSize);
  }
  return getLegacyOrders(page, pageSize);
}
