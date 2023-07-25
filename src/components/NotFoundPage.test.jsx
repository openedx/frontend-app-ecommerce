import React from 'react';
import { render } from '../testing';

import NotFoundPage from './NotFoundPage';

describe('<NotFoundPage />', () => {
  describe('Renders NotFoundPage', () => {
    it('renders not found page', () => {
      const { asFragment } = render(<NotFoundPage />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
