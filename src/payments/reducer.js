import { FETCH_PAYMENTS } from './actions';

export const initialState = {
  loading: false,
  loadingError: null,
  payments: {},
};

const paymentsPage = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAYMENTS.BEGIN:
      return {
        ...state,
        loadingError: null,
        loading: true,
      };
    case FETCH_PAYMENTS.SUCCESS:
      return {
        ...state,
        payments: action.payload.payments,
        loading: false,
      };
    case FETCH_PAYMENTS.RESET:
      return {
        ...state,
        loadingError: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default paymentsPage;
