import { FETCH_ORDERS } from './actions';

export const initialState = {
  loadingOrders: false,
  loadingOrdersError: null,
  orders: [],
};

const orderHistoryPage = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS.BEGIN:
      return {
        ...state,
        loadingOrdersError: null,
        loadingOrders: true,
      };
    case FETCH_ORDERS.SUCCESS:
      return {
        ...state,
        orders: action.payload.orders,
        loadingOrders: false,
      };
    case FETCH_ORDERS.FAILURE:
      return {
        ...state,
        loadingOrdersError: action.payload.error,
        loadingOrders: false,
      };
    case FETCH_ORDERS.RESET:
      return {
        ...state,
        loadingOrdersError: null,
        loadingOrders: false,
      };
    default:
      return state;
  }
};

export default orderHistoryPage;
