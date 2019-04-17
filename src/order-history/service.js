import pick from 'lodash.pick';

let config = {
  ACCOUNTS_API_BASE_URL: null,
  LMS_BASE_URL: null,
};

let apiClient = null; // eslint-disable-line no-unused-vars

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

export async function getOrders() {
  // const { data } = await apiClient.get(`${config.ACCOUNTS_API_BASE_URL}/orders`);

  const data = await new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
    // reject(new Error('test error'));

    // Temp delay
    setTimeout(() => {
      resolve([
        {
          id: 2,
          order_date: 'date',
          total: 41.65,
          currency: 'USD',
          detailsUrl: 'http://edx.org',
          description: 'Seat in Introduction to Animal Behaviour with verified certificate (and ID verification)',
        },
        {
          id: 3,
          order_date: 'date',
          total: 41.65,
          currency: 'USD',
          detailsUrl: 'http://edx.org',
          description: 'Seat in Introduction to Animal Behaviour with verified certificate (and ID verification)',
        },
        {
          id: 4,
          order_date: 'date',
          total: 41.65,
          currency: 'USD',
          detailsUrl: 'http://edx.org',
          description: 'Seat in Introduction to Animal Behaviour with verified certificate (and ID verification)',
        },
      ]);
    }, 500);
  });
  return data;
}
