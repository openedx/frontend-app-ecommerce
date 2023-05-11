import OrderHistoryPage from './OrderHistoryPage';
import { fetchOrders } from './actions';
import reducer from './reducer';
import saga from './saga';
import { storeName } from './selectors';

export default OrderHistoryPage;
export {
  fetchOrders,
  reducer,
  saga,
  storeName,
};
