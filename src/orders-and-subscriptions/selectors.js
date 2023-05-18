import { storeName as orderHistoryStoreName } from '../order-history';
import { storeName as subscriptionsStoreName } from '../subscriptions';

export const loadingSelector = (state) => (
  state[orderHistoryStoreName].loading
  || state[subscriptionsStoreName].loading
);

export const errorSelector = (state) => (
  state[orderHistoryStoreName].loadingError
  || state[subscriptionsStoreName].loadingError
);
