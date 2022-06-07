import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

const { ECOMMERCE_BASE_URL } = getConfig();

const ECOMMERCE_API_BASE_URL = `${ECOMMERCE_BASE_URL}/api/v2`;

// eslint-disable-next-line import/prefer-default-export
export async function getOrder(orderNumber) {
  const httpClient = getAuthenticatedHttpClient();

  const { data } = await httpClient.get(`${ECOMMERCE_API_BASE_URL}/orders/${orderNumber}`);
  return {
    order: data,
  };
}
