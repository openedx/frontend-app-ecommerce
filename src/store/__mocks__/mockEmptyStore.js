module.exports = {
  orderHistory: {
    loading: false,
    loadingError: false,
    orders: [],
    count: 0,
    pageCount: 0,
    currentPage: null,
    next: null,
    previous: null,
  },
  subscriptions: {
    loading: false,
    loadingError: false,
    subscriptions: [],
    stripeCustomerPortalURL: null,
    stripeError: false,
    stripeLoading: false,
    shouldShowSubscriptionsSection: true,
  },
};
