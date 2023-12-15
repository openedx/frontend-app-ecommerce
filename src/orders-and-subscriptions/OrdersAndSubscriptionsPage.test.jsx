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

const testHeadings = (hasSections = true, hasSubscriptions = true) => {
  if (hasSections && hasSubscriptions) {
    // Assert the main heading is present
    expect(getByText('My orders and subscriptions')).toBeInTheDocument();
    expect(
      getByText('Manage your program subscriptions and view your order history.'),
    ).toBeInTheDocument();
    // Assert Subscription and Order History sections are rendered
    expect(getByText('Subscriptions')).toBeInTheDocument();
    expect(getByText('Order History')).toBeInTheDocument();
  } else if (!hasSections && !hasSubscriptions) {
    // Assert only Order History section is rendered
    expect(queryByText('My orders and subscriptions')).toBeNull();
    expect(
      queryByText('Manage your program subscriptions and view your order history.'),
    ).toBeNull();
    expect(getByText('Order History')).toBeInTheDocument();
    expect(queryByText('Subscriptions')).toBeNull();
  }
};

const testHeadingsLoading = (hasSections = true, hasSubscriptions = true) => {
  if (!hasSections && !hasSubscriptions) {
    // Assert loading, nothing is rendered
    expect(queryByText('My orders and subscriptions')).toBeNull();
    expect(
      queryByText('Manage your program subscriptions and view your order history.'),
    ).toBeNull();
    expect(queryByText('Subscriptions')).toBeNull();
    expect(queryByText('Order History')).toBeNull();
  }
};

const testHeadingsError = (hasSections = true, hasSubscriptions = true) => {
  if (!hasSections && !hasSubscriptions) {
    // Error with no subscriptions
    // Assert only Order History sections is rendered
    expect(queryByText('My orders and subscriptions')).toBeNull();
    expect(
      queryByText('Manage your program subscriptions and view your order history.'),
    ).toBeNull();
    expect(queryByText('Subscriptions')).toBeNull();
    expect(getByText('Order History')).toBeInTheDocument();
  } else if (hasSections && hasSubscriptions) {
    // Error but has subscriptions
    // Assert the main heading is present
    expect(getByText('My orders and subscriptions')).toBeInTheDocument();
    expect(
      getByText('Manage your program subscriptions and view your order history.'),
    ).toBeInTheDocument();
    // Assert Subscription and Order History sections are rendered
    expect(getByText('Subscriptions')).toBeInTheDocument();
    expect(getByText('Order History')).toBeInTheDocument();
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

    it('renders with orders only', () => {
      const ordersOnlyMocks = {
        orderHistory: {
          ...storeMocks.orderHistory,
        },
        subscriptions: {
          ...emptyStoreMocks.subscriptions,
        },
      };
      render(<OrdersAndSubscriptionsPage />, ordersOnlyMocks);
      testHeadings(false, false);

      // Assert alerts are not rendered
      expect(queryByTestId('basic-alert')).toBeNull();
    });

    it('renders alerts on errors no subscriptions', () => {
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
      testHeadingsError(false, false);

      expect(getByTestId('basic-alert')).toBeInTheDocument();

      // Assert Subscription section renders empty state
      expect(queryByTestId('section-subscription-cards')).toBeNull();
      expect(queryByTestId('section-subscription-upsell')).toBeNull();
    });

    it('renders alerts on errors with subscriptions', () => {
      const storeMocksWithErrors = {
        orderHistory: {
          ...emptyStoreMocks.orderHistory,
          loadingError: true,
        },
        subscriptions: {
          ...storeMocks.subscriptions,
          loadingError: false,
        },
      };

      render(<OrdersAndSubscriptionsPage />, storeMocksWithErrors);
      testHeadingsError(true, true);

      expect(getByTestId('basic-alert')).toBeInTheDocument();

      expect(getByTestId('section-subscription-cards')).toBeInTheDocument();
      expect(queryByTestId('section-subscription-upsell')).toBeNull();
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
      testHeadingsLoading(false, false);

      // Assert loading message is rendered
      expect(getByText('Loading orders...'))
        .toBeInTheDocument();

      // Assert alerts are not rendered
      expect(queryByTestId('basic-alert')).toBeNull();
    });
  });
});
