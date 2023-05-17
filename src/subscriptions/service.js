import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

const createURL = (url) => `${getConfig().SUBSCRIPTIONS_BASE_URL}/api/v1${url}`;

export async function getSubscriptions() {
  const httpClient = getAuthenticatedHttpClient();

  const stripeUserSubscriptionsUrl = createURL('/stripe-user-subscriptions/');
  const { data } = await httpClient.get(stripeUserSubscriptionsUrl);

  return data.result.map((subscription) => ({
    uuid: subscription.program_uuid,
    title: subscription.program_title,
    organizations: subscription.program_organization,
    status:
      subscription?.status === 'trialing'
        ? 'trial'
        : subscription.subscription_state,
  }));
}

export async function getStripeCustomerPortalURL() {
  const httpClient = getAuthenticatedHttpClient();

  const stripePortalURL = createURL('/stripe-portal/');

  const { data } = await httpClient.post(stripePortalURL);

  return data.portal_url;
}
