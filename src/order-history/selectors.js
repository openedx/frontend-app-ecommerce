export const storeName = 'orderHistory';

// Pass everything in state as props for now
export const pageSelector = state => ({
  ...state[storeName],
});

export const loadingOrderHistorySelector = (state) => (
  state[storeName].loading
);
