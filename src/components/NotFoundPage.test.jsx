import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import NotFoundPage from './NotFoundPage';

describe('<NotFoundPage />', () => {
  describe('Renders NotFoundPage', () => {
    it('renders not found page', () => {
      const tree = renderer
        .create((
          <IntlProvider locale="en">
            <NotFoundPage />
          </IntlProvider>
        ))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
