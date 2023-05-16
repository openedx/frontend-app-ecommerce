/* eslint-disable global-require */
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import configureMockStore from 'redux-mock-store';

import ManageSubscriptionsPage from './ManageSubscriptionsPage';

const mockStore = configureMockStore();
const storeMocks = require('../store/__mocks__/mockStore');

describe('<ManageSubscriptions />', () => {
  describe('Renders correctly in various states', () => {
    it('renders when url is fetched correctly', () => {
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
  });
});
