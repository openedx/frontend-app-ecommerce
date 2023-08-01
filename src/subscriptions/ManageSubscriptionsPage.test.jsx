/* eslint-disable global-require */
import React from 'react';
import { act, render, screen } from '../testing';

import ManageSubscriptionsPage from './ManageSubscriptionsPage';

const storeMocks = require('../store/__mocks__/mockEmptyStore');

const { getByText, getAllByText } = screen;

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

      render(<ManageSubscriptionsPage />, storeMocksWithURL);

      act(() => {
        jest.runAllTimers();
      });
      expect(mockHrefSetter).toHaveBeenCalledWith('http://edx.org');
      expect(getByText('Loading manage subscriptions...')).toBeInTheDocument();
    });

    it('renders loading when url is being fetched', () => {
      render(<ManageSubscriptionsPage />, storeMocks);

      expect(getByText('Loading manage subscriptions...')).toBeInTheDocument();
    });

    it('renders error ui when fetching url fails', () => {
      const storeMocksWithError = {
        ...storeMocks,
        subscriptions: {
          ...storeMocks.subscriptions,
          stripeError: true,
        },
      };

      render(<ManageSubscriptionsPage />, storeMocksWithError);

      expect(getByText('Something went wrong')).toBeInTheDocument();
      expect(getByText('contact support')).toBeInTheDocument();
      expect(getAllByText('Orders and subscriptions')).toHaveLength(2);
    });
  });
});
