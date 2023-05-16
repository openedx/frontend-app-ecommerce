/* eslint-disable global-require */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import configureMockStore from 'redux-mock-store';

import Subscriptions from './Subscriptions';

const mockStore = configureMockStore();
const storeMocks = require('../store/__mocks__/mockStore');

describe('<Subscriptions />', () => {
  describe('Renders correctly in various states', () => {
    it('renders with subscriptions', () => {
      const tree = renderer
        .create(
          <IntlProvider locale="en">
            <Provider store={mockStore(storeMocks)}>
              <Subscriptions />
            </Provider>
          </IntlProvider>,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
