import pick from 'lodash.pick';

let config = {
  ACCOUNTS_API_BASE_URL: null,
  ECOMMERCE_API_BASE_URL: null,
  LMS_BASE_URL: null,
};

let apiClient = null;

function validateConfiguration(newConfig) {
  Object.keys(config).forEach((key) => {
    if (newConfig[key] === undefined) {
      throw new Error(`Service configuration error: ${key} is required.`);
    }
  });
}

export function configureApiService(newConfig, newApiClient) {
  validateConfiguration(newConfig);
  config = pick(newConfig, Object.keys(config));
  apiClient = newApiClient;
}

export async function getOrders(page = 0, pageSize = 100) {
  const { data } = await apiClient.get(`${config.ECOMMERCE_API_BASE_URL}/orders/`, {
    params: {
      page,
      page_size: pageSize,
    },
  });

  // const data = await new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
  //   // reject(new Error('test error'));

  //   // Temp delay
  //   setTimeout(() => {
  //     resolve(require('./mockOrdersResponse.json'));
  //   }, 500);
  // });

  const transformedResults = data.results.map(({
    total_excl_tax, // eslint-disable-line camelcase
    lines,
    number,
    currency,
    date_placed, // eslint-disable-line camelcase
  }) => {
    const lineItems = lines.map(({
      product,
      title,
      quantity,
      description,
    }) => ({
      itemId: product.id,
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
      receiptUrl: 'https://edx.org',
    };
  });

  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    orders: transformedResults,
  };
}
