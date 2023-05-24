module.exports = {
  store: {
    loading: false,
    loadingError: false,
    orders: [
      {
        datePlaced: '2016-01-26T22:26:50Z',
        total: '0.00',
        orderId: 'EDX-101706',
        currency: 'USD',
        lineItems: [
          {
            title: 'Seat in Introduction to Urology with honor certificate',
            quantity: 1,
            description:
              'Seat in Introduction to Urology with honor certificate',
          },
        ],
        receiptUrl:
          'http://localhost:18130/checkout/receipt/?order_number=EDX-101706',
      },
      {
        datePlaced: '2015-12-02T21:43:08Z',
        total: '0.00',
        orderId: 'EDX-101403',
        currency: 'USD',
        lineItems: [
          {
            title:
              'Seat in "Dracula" by Stoker: BerkeleyX Book Club with honor certificate',
            quantity: 1,
            description:
              'Seat in "Dracula" by Stoker: BerkeleyX Book Club with honor certificate',
          },
        ],
        receiptUrl:
          'http://localhost:18130/checkout/receipt/?order_number=EDX-101403',
      },
      {
        datePlaced: '2015-09-30T16:18:10Z',
        total: '0.00',
        orderId: 'EDX-100784',
        currency: 'USD',
        lineItems: [
          {
            title: 'Seat in Demo Course with honor certificate',
            quantity: 1,
            description: 'Seat in Demo Course with honor certificate',
          },
        ],
        receiptUrl:
          'http://localhost:18130/checkout/receipt/?order_number=EDX-100784',
      },
    ],
    count: 100,
    pageCount: 10,
    currentPage: 2,
    next: null,
    previous: null,
  },
};
