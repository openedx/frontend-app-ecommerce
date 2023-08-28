import React from 'react';
import { render } from '../testing';

import SupportLink from './SupportLink';

jest.mock('@edx/frontend-platform', () => ({
  getConfig: () => ({
    SUPPORT_URL: 'https://example.com/support',
  }),
}));

describe('<SupportLink />', () => {
  it('Renders support link', () => {
    const { getByText } = render(<SupportLink />);

    const contactSupportLink = getByText('contact support');
    expect(contactSupportLink).toBeInTheDocument();
    expect(contactSupportLink).toHaveAttribute(
      'href',
      'https://example.com/support/hc/requests/new',
    );
  });
});
