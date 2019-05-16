import ConnectedPaymentsPage from './PaymentsPage';
import reducer from './reducer';
import saga from './saga';
import { configureApiService } from './service';
import { storeName } from './selectors';

export {
  ConnectedPaymentsPage,
  reducer,
  saga,
  configureApiService,
  storeName,
};
