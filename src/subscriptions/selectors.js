export const storeName = 'subscriptions';

// Pass everything in state as props for now
export const subscriptionsSelector = (state) => ({
  ...state[storeName],
});
