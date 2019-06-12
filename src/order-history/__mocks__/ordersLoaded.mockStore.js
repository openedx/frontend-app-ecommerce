module.exports = {
  authentication: {
    userId: 9,
    username: 'staff'
  },
  configuration: {
    BASE_URL: 'localhost:1996',
    LMS_BASE_URL: 'http://localhost:18000',
    ECOMMERCE_BASE_URL: 'http://localhost:18130',
    CREDENTIALS_BASE_URL: 'http://localhost:18150',
    LOGIN_URL: 'http://localhost:18000/login',
    LOGOUT_URL: 'http://localhost:18000/login',
    CSRF_TOKEN_API_PATH: '/csrf/api/v1/token',
    REFRESH_ACCESS_TOKEN_ENDPOINT: 'http://localhost:18000/login_refresh',
    SEGMENT_KEY: null,
    ACCESS_TOKEN_COOKIE_NAME: 'edx-jwt-cookie-header-payload',
    USER_INFO_COOKIE_NAME: 'edx-user-info',
    CSRF_COOKIE_NAME: 'csrftoken',
    LANGUAGE_PREFERENCE_COOKIE_NAME: 'openedx-language-preference',
    SITE_NAME: 'edX',
    MARKETING_SITE_BASE_URL: 'http://localhost:18000',
    ENTERPRISE_MARKETING_URL: 'http://example.com',
    ENTERPRISE_MARKETING_UTM_CAMPAIGN: 'test_campaign',
    ENTERPRISE_MARKETING_UTM_SOURCE: 'orders',
    ENTERPRISE_MARKETING_FOOTER_UTM_MEDIUM: 'Footer',
    SUPPORT_URL: 'http://localhost:18000/support',
    CONTACT_URL: 'http://localhost:18000/contact',
    OPEN_SOURCE_URL: 'http://localhost:18000/openedx',
    TERMS_OF_SERVICE_URL: 'http://localhost:18000/terms-of-service',
    PRIVACY_POLICY_URL: 'http://localhost:18000/privacy-policy',
    FACEBOOK_URL: 'https://www.facebook.com',
    TWITTER_URL: 'https://twitter.com',
    YOU_TUBE_URL: 'https://www.youtube.com',
    LINKED_IN_URL: 'https://www.linkedin.com',
    REDDIT_URL: 'https://www.reddit.com',
    APPLE_APP_STORE_URL: 'https://www.apple.com/ios/app-store/',
    GOOGLE_PLAY_URL: 'https://play.google.com/store',
    ACCOUNT_SETTINGS_URL: 'http://localhost:18000/account/settings',
    SECURE_COOKIES: false,
    ENVIRONMENT: 'development',
    ACCOUNTS_API_BASE_URL: 'http://localhost:18000/api/user/v1/accounts',
    PREFERENCES_API_BASE_URL: 'http://localhost:18000/api/user/v1/preferences',
    CERTIFICATES_API_BASE_URL: 'http://localhost:18000/api/certificates/v0/certificates',
    VIEW_MY_RECORDS_URL: 'http://localhost:18150/records',
    ECOMMERCE_API_BASE_URL: 'http://localhost:18130/api/v2',
    ECOMMERCE_RECEIPT_BASE_URL: 'http://localhost:18130/checkout/receipt/'
  },
  userAccount: {
    loading: false,
    loaded: true,
    error: null,
    username: 'staff',
    email: 'staff@example.com',
    bio: 'skasldjaksjdlkksadasdasasd',
    name: 'Lemon Seltzer',
    country: 'AM',
    socialLinks: [
      {
        platform: 'facebook',
        socialLink: 'https://www.facebook.com/ljhl'
      }
    ],
    profileImage: {
      imageUrlFull: 'http://localhost:18000/static/images/profiles/default_500.png',
      imageUrlLarge: 'http://localhost:18000/static/images/profiles/default_120.png',
      imageUrlMedium: 'http://localhost:18000/static/images/profiles/default_50.png',
      imageUrlSmall: 'http://localhost:18000/static/images/profiles/default_30.png',
      hasImage: false
    },
    levelOfEducation: null,
    mailingAddress: null,
    extendedProfile: [],
    dateJoined: '2017-06-07T00:44:23Z',
    accomplishmentsShared: false,
    isActive: true,
    yearOfBirth: 1918,
    goals: null,
    languageProficiencies: [],
    courseCertificates: null,
    requiresParentalConsent: false,
    secondaryEmail: null,
    timeZone: null,
    gender: null,
    accountPrivacy: 'custom'
  },
  orderHistory: {
    loading: false,
    loadingError: null,
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
            description: 'Seat in Introduction to Urology with honor certificate'
          }
        ],
        receiptUrl: 'http://localhost:18130/checkout/receipt/?order_number=EDX-101706'
      },
      {
        datePlaced: '2015-12-02T21:43:08Z',
        total: '0.00',
        orderId: 'EDX-101403',
        currency: 'USD',
        lineItems: [
          {
            title: 'Seat in "Dracula" by Stoker: BerkeleyX Book Club with honor certificate',
            quantity: 1,
            description: 'Seat in "Dracula" by Stoker: BerkeleyX Book Club with honor certificate'
          }
        ],
        receiptUrl: 'http://localhost:18130/checkout/receipt/?order_number=EDX-101403'
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
            description: 'Seat in Demo Course with honor certificate'
          }
        ],
        receiptUrl: 'http://localhost:18130/checkout/receipt/?order_number=EDX-100784'
      }
    ],
    count: 100,
    pageCount: 10,
    currentPage: 2,
    next: null,
    previous: null
  },
  router: {
    location: {
      pathname: '/orders',
      search: '',
      hash: ''
    },
    action: 'POP'
  }
};
