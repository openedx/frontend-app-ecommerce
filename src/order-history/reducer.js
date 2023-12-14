import { fetchOrders } from './actions';

export const initialState = {
  loading: true,
  loadingError: false,
  orders: [],
  count: 0,
  pageCount: 0,
  currentPage: null,
  next: null,
  previous: null,
};

const orderHistoryPage = (state = initialState, action = {}) => {
  switch (action.type) {
    case fetchOrders.TRIGGER:
      return {
        ...state,
        loadingError: false,
      };
    case fetchOrders.SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        pageCount: action.payload.pageCount,
        currentPage: action.payload.currentPage,
      };
    case fetchOrders.FAILURE:
      return {
        ...state,
        loading: false,
        loadingError: true,
      };
    case fetchOrders.FULFILL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default orderHistoryPage;
