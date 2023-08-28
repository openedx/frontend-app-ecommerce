import React from 'react';
import { render } from '../testing';

import NotFoundPage from './NotFoundPage';

describe('<NotFoundPage />', () => {
  it('Renders not found message', () => {
    const { getByText } = render(<NotFoundPage />);
    expect(
      getByText(
        "The page you're looking for is unavailable or there's an error in the URL. Please check the URL and try again.",
      ),
    ).toBeInTheDocument();
  });
});
