/* eslint-disable global-require */
import React from 'react';
import { act, render } from '../testing';

import ManageSubscriptionsPage from './ManageSubscriptionsPage';

const storeMocks = require('../store/__mocks__/mockEmptyStore');

const matchSnapshot = (store) => {
  const { container } = render(<ManageSubscriptionsPage />, store);
  expect(container.querySelector('div')).toMatchSnapshot();
};

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
      const { container } = render(
        <ManageSubscriptionsPage />,
        storeMocksWithURL,
      );
      act(() => {
        jest.runAllTimers();
      });
      expect(container.querySelector('div')).toMatchSnapshot();
      expect(mockHrefSetter).toHaveBeenCalledWith('http://edx.org');
    });

    it('renders loading when url is being fetched', () => {
      matchSnapshot(storeMocks);
    });

    it('renders error ui when fetching url fails', () => {
      const storeMocksWithError = {
        ...storeMocks,
        subscriptions: {
          ...storeMocks.subscriptions,
          stripeError: true,
        },
      };

      matchSnapshot(storeMocksWithError);
    });
  });
});
