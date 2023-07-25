/* eslint-disable global-require */
import React from 'react';
import { render } from '../testing';

import OrdersAndSubscriptionsPage from './OrdersAndSubscriptionsPage';

const storeMocks = require('../store/__mocks__/mockStore');
const emptyStoreMocks = require('../store/__mocks__/mockEmptyStore');

const matchSnapshot = (store) => {
  const { container } = render(<OrdersAndSubscriptionsPage />, store);
  expect(container.querySelector('div')).toMatchSnapshot();
};

describe('<OrdersAndSubscriptions />', () => {
  describe('Renders correctly in various states', () => {
    it('renders with orders and subscriptions', () => {
      matchSnapshot(storeMocks);
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

      matchSnapshot(storeMocksWithErrors);
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

      matchSnapshot(storeMocksWithLoading);
    });
  });
});
