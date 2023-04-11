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
} from '@edx/frontend-platform';

import Header, { messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';
import { messages as paragonMessages } from '@edx/paragon';
import messages from './i18n';
import configureStore from './store';
import NotFoundPage from './components/NotFoundPage';
import { OrdersAndSubscriptionsPage } from './orders-and-subscriptions';

import './index.scss';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={configureStore()}>
      <Header />
      <main>
        <Switch>
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
  ReactDOM.render(<IntlProvider locale="en"><ErrorPage message={error.message} /></IntlProvider>, document.getElementById('root'));
});

initialize({
  messages: [
    messages,
    headerMessages,
    footerMessages,
    paragonMessages,
  ],
  requireAuthenticatedUser: true,
  hydrateAuthenticatedUser: true,
});
