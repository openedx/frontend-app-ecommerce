/* eslint-disable global-require */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import configureMockStore from 'redux-mock-store';

import OrdersAndSubscriptionsPage from './OrdersAndSubscriptionsPage';

const mockStore = configureMockStore();
const storeMocks = {
  ordersLoaded: require('../order-history/__mocks__/ordersLoaded.mockStore'),
};

describe('<OrdersAndSubscriptions />', () => {
  describe('Renders correctly in various states', () => {
    it('renders with orders and subscriptions', () => {
      const tree = renderer
        .create(
          <IntlProvider locale="en">
            <Provider store={mockStore(storeMocks.ordersLoaded)}>
              <OrdersAndSubscriptionsPage />
            </Provider>
          </IntlProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
