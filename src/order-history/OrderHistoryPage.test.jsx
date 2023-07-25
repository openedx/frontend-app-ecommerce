/* eslint-disable global-require */
import React from 'react';
import { render } from '../testing';

import ConnectedOrderHistoryPage from './OrderHistoryPage';

const storeMocks = require('../store/__mocks__/mockStore');

const requiredOrderHistoryPageProps = {
  isB2CSubsEnabled: false,
  fetchOrders: () => {},
};

// Match all media queries. This will result in rendering
// both the desktop and mobile views at the same time.
// eslint-disable-next-line no-unused-vars
global.matchMedia = (media) => ({
  addListener: () => {},
  removeListener: () => {},
  matches: true,
});

const matchSnapshot = (store) => {
  const { container } = render(
    <ConnectedOrderHistoryPage {...requiredOrderHistoryPageProps} />,
    store,
  );
  expect(container.querySelector('section')).toMatchSnapshot();
};

describe('<OrderHistoryPage />', () => {
  describe('Renders correctly in various states', () => {
    it('renders orders table with pagination', () => {
      matchSnapshot(storeMocks);
    });

    it('renders empty orders', () => {
      const storeMockWithoutOrders = {
        ...storeMocks,
        orderHistory: {
          ...storeMocks.orders,
          orders: [],
          count: 0,
          pageCount: 0,
          currentPage: null,
        },
      };

      matchSnapshot(storeMockWithoutOrders);
    });

    it('renders loading state', () => {
      const storeMockWithLoading = {
        ...storeMocks,
        orderHistory: {
          ...storeMocks.orders,
          loading: true,
          loadingError: false,
          orders: [],
          count: 0,
          pageCount: 0,
          currentPage: null,
        },
      };

      matchSnapshot(storeMockWithLoading);
    });
  });
});
