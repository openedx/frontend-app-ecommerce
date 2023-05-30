module.exports = {
  store: {
    loading: false,
    loadingError: false,
    stripeLoading: false,
    stripeError: false,
    stripeCustomerPortalURL: null,
    subscriptions: [
      {
        uuid: 'a87e5eac-3c93-45a1-a8e1-4c79ca8401c8',
        title: 'Blockchain Fundamentals',
        organizations: ['University of California', 'Berkeley'],
        status: 'trial',
      },
      {
        uuid: '0c6e5fa2-96e8-40b2-9ebe-c8b0df2a3b22',
        title: 'Critical Thinking',
        organizations: ['Simmons University'],
        status: 'active',
      },
      {
        uuid: 'a87e5eac-3c93-45a1-a8e1-4c79ca8401c8',
        title: 'Blockchain Fundamentals',
        organizations: ['University of California', 'Berkeley'],
        status: 'inactive',
      },
      {
        uuid: '0c6e5fa2-96e8-40b2-9ebe-c8b0df2a3b22',
        title: 'Critical Thinking',
        organizations: ['Simmons University'],
        status: 'inactive',
      },
    ],
  },
};
