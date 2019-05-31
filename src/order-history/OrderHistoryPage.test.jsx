/* eslint-disable global-require */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { IntlProvider } from '@edx/frontend-i18n';
import configureMockStore from 'redux-mock-store';

import ConnectedOrderHistoryPage from './OrderHistoryPage';

const mockStore = configureMockStore();
const storeMocks = {
  ordersLoaded: require('./__mocks__/ordersLoaded.mockStore.js'),
};
const requiredOrderHistoryPageProps = {
  fetchOrders: () => {},
};

// Match all media queries. This will result in rendering
// both the desktop and mobile views at the same time.
global.matchMedia = media => ({ // eslint-disable-line no-unused-vars
  addListener: () => {},
  removeListener: () => {},
  matches: true,
});

describe('<OrderHistoryPage />', () => {
  describe('Renders correctly in various states', () => {
    it('renders orders table with pagination', () => {
      const tree = renderer
        .create((
          <IntlProvider locale="en">
            <Provider store={mockStore(storeMocks.ordersLoaded)}>
              <ConnectedOrderHistoryPage {...requiredOrderHistoryPageProps} />
            </Provider>
          </IntlProvider>
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
