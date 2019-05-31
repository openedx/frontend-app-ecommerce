export const storeName = 'orderHistory';

// Pass everything in state as props for now
export const pageSelector = state => ({
  ...state[storeName],
  username: state.authentication.username,
});
