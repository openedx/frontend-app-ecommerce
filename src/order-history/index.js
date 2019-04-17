import ConnectedOrderHistoryPage from './OrderHistoryPage';
import reducer from './reducer';
import saga from './saga';
import { configureApiService } from './service';
import { storeName } from './selectors';

export {
  ConnectedOrderHistoryPage,
  reducer,
  saga,
  configureApiService,
  storeName,
};
