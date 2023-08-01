/* eslint-disable global-require */
import React from 'react';
import { render, screen } from '../testing';

import OrdersAndSubscriptionsPage from './OrdersAndSubscriptionsPage';

const storeMocks = require('../store/__mocks__/mockStore');
const emptyStoreMocks = require('../store/__mocks__/mockEmptyStore');

const {
  getByText,
  getByTestId,
  queryByText,
  queryByTestId,
} = screen;

const testHeadings = (hasSections = true) => {
  // Assert the main heading
  expect(getByText('My orders and subscriptions')).toBeInTheDocument();
  expect(
    getByText('Manage your program subscriptions and view your order history.'),
  ).toBeInTheDocument();

  if (hasSections) {
    // Assert Subscription and Order History sections are rendered
    expect(getByText('Subscriptions')).toBeInTheDocument();
    expect(getByText('Order History')).toBeInTheDocument();
  } else {
    // Assert Subscription and Order History sections are not rendered
    expect(queryByText('Subscriptions')).toBeNull();
    expect(queryByText('Order History')).toBeNull();
  }
};

describe('<OrdersAndSubscriptions />', () => {
  describe('Renders correctly in various states', () => {
    it('renders with orders and subscriptions', () => {
      render(<OrdersAndSubscriptionsPage />, storeMocks);
      testHeadings();

      // Assert alerts are not rendered
      expect(queryByTestId('basic-alert')).toBeNull();
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

      render(<OrdersAndSubscriptionsPage />, storeMocksWithErrors);
      testHeadings();

      expect(getByTestId('basic-alert')).toBeInTheDocument();

      // Assert Subscription section renders empty state
      expect(queryByTestId('section-subscription-cards')).toBeNull();
      expect(getByTestId('section-subscription-upsell')).toBeInTheDocument();
    });

    it('renders with loading', () => {
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

      render(<OrdersAndSubscriptionsPage />, storeMocksWithLoading);
      testHeadings(false);

      // Assert loading message is rendered
      expect(getByText('Loading orders and subscriptions...'))
        .toBeInTheDocument();

      // Assert alerts are not rendered
      expect(queryByTestId('basic-alert')).toBeNull();
    });
  });
});
