import { FETCH_ORDERS } from './actions';

export const initialState = {
  loading: false,
  loadingError: null,
  orders: [],
  count: 0,
  next: null,
  previous: null,
};

const orderHistoryPage = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS.BEGIN:
      return {
        ...state,
        loadingError: null,
        loading: true,
      };
    case FETCH_ORDERS.SUCCESS:
      return {
        ...state,
        orders: action.payload.orders,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        loading: false,
      };
    case FETCH_ORDERS.FAILURE:
      return {
        ...state,
        loadingError: action.payload.error,
        loading: false,
      };
    case FETCH_ORDERS.RESET:
      return {
        ...state,
        loadingError: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default orderHistoryPage;
