import { storeName as orderHistoryStoreName } from '../order-history';
import { storeName as subscriptionsStoreName } from '../subscriptions';

// eslint-disable-next-line import/prefer-default-export
export const loadingSelector = (state) => (
  state[orderHistoryStoreName].loading || state[subscriptionsStoreName].loading
);
