import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';

import { IntlProvider } from '@edx/frontend-platform/i18n';

import ConnectedReceiptPage from './ReceiptPage';

const mockStore = configureMockStore();
const initialState = {
  receipt: {
    loadingReceipt: false,
    loadingReceiptError: null,
    order: {
    },
  },
};

const loadedOrderMock = {
  // eslint-disable-next-line global-require
  order: require('./__mocks__/orderLoaded.mockStore'),
};

const renderWithProviders = children => renderer.create((
  <IntlProvider locale="en">
    <Provider store={mockStore(initialState)}>
      {children}
    </Provider>
  </IntlProvider>
));

describe('<ReceiptPage />', () => {
  it('renders error view if there is an error loading the order', () => {
    const mockHistory = createMemoryHistory('/receipt');
    const store = mockStore({
      ...initialState,
      receipt: {
        ...initialState.receipt,
        loadingReceiptError: 'Error!',
      },
    });
    const tree = renderWithProviders(<ConnectedReceiptPage history={mockHistory} store={store} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders a receipt page', () => {
    const mockHistory = createMemoryHistory('/receipt');
    const store = mockStore({
      ...initialState,
      receipt: {
        ...initialState.receipt,
        order: loadedOrderMock.order,
      },
    });
    const tree = renderWithProviders(<ConnectedReceiptPage history={mockHistory} store={store} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders discount information', () => {
    const mockHistory = createMemoryHistory('/receipt');
    const store = mockStore({
      ...initialState,
      receipt: {
        ...initialState.receipt,
        order: {
          ...loadedOrderMock.order,
          vouchers: [
            {
              benefit: {
                type: 'Percentage',
                value: 10,
              },
              code: '12345',
              id: 2,
              redeem_url: 'http://localhost:18130/coupons/offer/?code=12345',
              total_discount: '14.90',
            },
          ],
        },
      },
    });
    const tree = renderWithProviders(<ConnectedReceiptPage history={mockHistory} store={store} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders credit messaging', () => {
    const mockHistory = createMemoryHistory('/receipt');
    const store = mockStore({
      ...initialState,
      receipt: {
        ...initialState.receipt,
        order: {
          ...loadedOrderMock.order,
          contains_credit_seat: true,
        },
      },
    });
    const tree = renderWithProviders(<ConnectedReceiptPage history={mockHistory} store={store} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders enterprise message banner', () => {
    const mockHistory = createMemoryHistory('/receipt');
    const store = mockStore({
      ...initialState,
      receipt: {
        ...initialState.receipt,
        order: {
          ...loadedOrderMock.order,
          enterprise_learner_portal_url: 'http://www.enterprise.com',
        },
      },
    });
    const tree = renderWithProviders(<ConnectedReceiptPage history={mockHistory} store={store} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
