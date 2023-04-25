import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import Subscriptions from './Subscriptions';

describe('<Subscriptions />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <IntlProvider locale="en">
          <Subscriptions />
        </IntlProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
