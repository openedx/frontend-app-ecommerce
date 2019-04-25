import { FETCH_ORDERS } from './actions';

export const initialState = {
  loading: false,
  loadingError: null,
  orders: [],
  count: 0,
  pageCount: 0,
  currentPage: null,
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
        pageCount: action.payload.pageCount,
        currentPage: action.payload.currentPage,
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
