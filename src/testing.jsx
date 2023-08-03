/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { IntlProvider } from '@edx/frontend-platform/i18n';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockStore = configureMockStore();

jest.mock('@edx/frontend-platform/analytics', () => ({
  sendTrackEvent: jest.fn(),
  sendPageEvent: jest.fn(),
}));

const renderWithProviders = (component, store = null) => render(
  <IntlProvider locale="en">
    {store ? (
      <Provider store={mockStore(store)}>
        {component}
      </Provider>
    ) : (
      component
    )}
  </IntlProvider>,
);

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithProviders as render };
