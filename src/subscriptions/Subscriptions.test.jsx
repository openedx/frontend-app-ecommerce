/* eslint-disable global-require */
import React from 'react';
import { render } from '../testing';

import Subscriptions from './Subscriptions';

const storeMocks = require('../store/__mocks__/mockStore');

const matchSnapshot = (store) => {
  const { container } = render(<Subscriptions />, store);
  expect(container.querySelector('section')).toMatchSnapshot();
};

describe('<Subscriptions />', () => {
  describe('Renders correctly in various states', () => {
    it('renders with subscriptions', () => {
      matchSnapshot(storeMocks);
    });

    it('renders with no subscriptions', () => {
      const storeMockWithoutSubscriptions = {
        ...storeMocks,
        subscriptions: {
          ...storeMocks.subscriptions,
          subscriptions: [],
        },
      };
      matchSnapshot(storeMockWithoutSubscriptions);
    });

    it('renders with no active subscriptions', () => {
      const storeMockWithoutActiveSubscriptions = {
        ...storeMocks,
        subscriptions: {
          ...storeMocks.subscriptions,
          subscriptions: storeMocks.subscriptions.subscriptions.filter(
            ({ status }) => status === 'inactive',
          ),
        },
      };

      matchSnapshot(storeMockWithoutActiveSubscriptions);
    });
  });
});
