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

export function configureServices({ configuration: newConfig, apiClient: newApiClient }) {
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
        { id: 2 },
        { id: 3 },
        { id: 4 },
      ]);
    }, 500);
  });
  return data;
}
