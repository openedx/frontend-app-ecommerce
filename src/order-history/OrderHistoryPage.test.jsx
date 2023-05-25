/* eslint-disable global-require */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import configureMockStore from 'redux-mock-store';

import ConnectedOrderHistoryPage from './OrderHistoryPage';

const mockStore = configureMockStore();
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

describe('<OrderHistoryPage />', () => {
  describe('Renders correctly in various states', () => {
    it('renders orders table with pagination', () => {
      const tree = renderer
        .create(
          <IntlProvider locale="en">
            <Provider store={mockStore(storeMocks)}>
              <ConnectedOrderHistoryPage {...requiredOrderHistoryPageProps} />
            </Provider>
          </IntlProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
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

      const tree = renderer
        .create(
          <IntlProvider locale="en">
            <Provider store={mockStore(storeMockWithoutOrders)}>
              <ConnectedOrderHistoryPage {...requiredOrderHistoryPageProps} />
            </Provider>
          </IntlProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
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

      const tree = renderer
        .create(
          <IntlProvider locale="en">
            <Provider store={mockStore(storeMockWithLoading)}>
              <ConnectedOrderHistoryPage {...requiredOrderHistoryPageProps} />
            </Provider>
          </IntlProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
