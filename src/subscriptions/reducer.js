import { fetchSubscriptions } from './actions';

export const initialState = {
  loading: true,
  loadingError: false,
  subscriptions: [],
  stripeError: false,
  stripeLoading: false,
  shouldShowSubscriptionsSection: true,
};

const subscriptionsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case fetchSubscriptions.TRIGGER:
      return {
        ...state,
        loading: true,
        loadingError: false,
      };
    case fetchSubscriptions.SUCCESS:
      return {
        ...state,
        subscriptions: action.payload,
      };
    case fetchSubscriptions.FAILURE:
      return {
        ...state,
        loadingError: true,
      };
    case fetchSubscriptions.FULFILL:
      return {
        ...state,
        loading: false,
      };
    case 'CLEAR_STRIPE_ERROR':
      return {
        ...state,
        stripeError: false,
      };
    case 'HIDE_SUBSCRIPTION_SECTION':
      return {
        ...state,
        shouldShowSubscriptionsSection: false,
      };
    default:
      return state;
  }
};

export default subscriptionsReducer;
