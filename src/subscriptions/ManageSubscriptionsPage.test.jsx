/* eslint-disable global-require */
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import configureMockStore from 'redux-mock-store';

import ManageSubscriptionsPage from './ManageSubscriptionsPage';

const mockStore = configureMockStore();
const storeMocks = require('../store/__mocks__/mockEmptyStore');

describe('<ManageSubscriptions />', () => {
  describe('Renders correctly in various states', () => {
    it('navigates when url is fetched correctly', () => {
      const storeMocksWithURL = {
        ...storeMocks,
        subscriptions: {
          ...storeMocks.subscriptions,
          stripeCustomerPortalURL: 'http://edx.org',
        },
      };

      const mockHrefSetter = jest.fn();
      delete window.location;
      window.location = {
        ...window.location,
        set href(url) {
          mockHrefSetter(url);
        },
      };

      jest.useFakeTimers();
      const tree = renderer
        .create(
          <IntlProvider locale="en">
            <Provider store={mockStore(storeMocksWithURL)}>
              <ManageSubscriptionsPage />
            </Provider>
          </IntlProvider>,
        )
        .toJSON();
      act(() => {
        jest.runAllTimers();
      });
      expect(tree).toMatchSnapshot();
      expect(mockHrefSetter).toHaveBeenCalledWith('http://edx.org');
    });

    it('renders loading when url is being fetched', () => {
      const tree = renderer
        .create(
          <IntlProvider locale="en">
            <Provider store={mockStore(storeMocks)}>
              <ManageSubscriptionsPage />
            </Provider>
          </IntlProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders error ui when fetching url fails', () => {
      const storeMocksWithError = {
        ...storeMocks,
        subscriptions: {
          ...storeMocks.subscriptions,
          stripeError: true,
        },
      };

      const tree = renderer
        .create(
          <IntlProvider locale="en">
            <Provider store={mockStore(storeMocksWithError)}>
              <ManageSubscriptionsPage />
            </Provider>
          </IntlProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
