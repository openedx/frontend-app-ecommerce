import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import {
  APP_INIT_ERROR,
  APP_READY,
  initialize,
  subscribe,
  getConfig,
  mergeConfig,
} from '@edx/frontend-platform';

import Header from '@edx/frontend-component-header';
import Footer from '@edx/frontend-component-footer';

import messages from './i18n';
import configureStore from './store';
import { NotFoundPage } from './components';
import { OrdersAndSubscriptionsPage } from './orders-and-subscriptions';
import { ManageSubscriptionsPage } from './subscriptions';

import './index.scss';

/**
 * TEMPORARY
 *
 * Until we add the following keys in frontend-platform,
 * use mergeConfig to join it with the rest of the config items
 * (so we don't need to get it separately from process.env).
 * After we add the keys to frontend-platform, this mergeConfig can go away
 */
mergeConfig({
  COMMERCE_COORDINATOR_BASE_URL: process.env.COMMERCE_COORDINATOR_BASE_URL,
  ENABLE_B2C_SUBSCRIPTIONS: process.env.ENABLE_B2C_SUBSCRIPTIONS,
  SUBSCRIPTIONS_BASE_URL: process.env.SUBSCRIPTIONS_BASE_URL,
  SUBSCRIPTIONS_MARKETING_URL: process.env.SUBSCRIPTIONS_MARKETING_URL,
  SUPPORT_URL: process.env.SUPPORT_URL,
});

subscribe(APP_READY, () => {
  if (process.env.NODE_ENV === 'development') {
    global.analytics?.debug();
  }

  ReactDOM.render(
    <AppProvider store={configureStore()}>
      <Header />
      <main>
        <Switch>
          {getConfig().ENABLE_B2C_SUBSCRIPTIONS?.toLowerCase() === 'true' ? (
            <Route
              path="/manage-subscriptions"
              component={ManageSubscriptionsPage}
            />
          ) : null}
          <Route path="/orders" component={OrdersAndSubscriptionsPage} />
          <Route path="/notfound" component={NotFoundPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </main>
      <Footer />
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(
    <IntlProvider locale="en">
      <ErrorPage message={error.message} />
    </IntlProvider>,
    document.getElementById('root'),
  );
});

initialize({
  messages,
  requireAuthenticatedUser: true,
  hydrateAuthenticatedUser: true,
});
