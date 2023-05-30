/* eslint-disable global-require */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import configureMockStore from 'redux-mock-store';

import OrdersAndSubscriptionsPage from './OrdersAndSubscriptionsPage';

jest.mock('@edx/frontend-platform/analytics', () => ({
  sendTrackEvent: jest.fn(),
}));

const mockStore = configureMockStore();
const storeMocks = require('../store/__mocks__/mockStore');
const emptyStoreMocks = require('../store/__mocks__/mockEmptyStore');

describe('<OrdersAndSubscriptions />', () => {
  describe('Renders correctly in various states', () => {
    it('renders with orders and subscriptions', () => {
      const tree = renderer
        .create(
          <IntlProvider locale="en">
            <Provider store={mockStore(storeMocks)}>
              <OrdersAndSubscriptionsPage />
            </Provider>
          </IntlProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders alerts on errors', () => {
      const storeMocksWithErrors = {
        orderHistory: {
          ...emptyStoreMocks.orderHistory,
          loadingError: true,
        },
        subscriptions: {
          ...emptyStoreMocks.subscriptions,
          loadingError: true,
        },
      };

      const tree = renderer
        .create(
          <IntlProvider locale="en">
            <Provider store={mockStore(storeMocksWithErrors)}>
              <OrdersAndSubscriptionsPage />
            </Provider>
          </IntlProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders with loadingErrors', () => {
      const storeMocksWithLoading = {
        orderHistory: {
          ...emptyStoreMocks.orderHistory,
          loading: true,
        },
        subscriptions: {
          ...emptyStoreMocks.subscriptions,
          loading: true,
        },
      };

      const tree = renderer
        .create(
          <IntlProvider locale="en">
            <Provider store={mockStore(storeMocksWithLoading)}>
              <OrdersAndSubscriptionsPage />
            </Provider>
          </IntlProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
