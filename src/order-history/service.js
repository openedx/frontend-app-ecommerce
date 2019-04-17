import pick from 'lodash.pick';

let config = {
  ACCOUNTS_API_BASE_URL: null,
  LMS_BASE_URL: null,
};

let apiClient = null; // eslint-disable-line no-unused-vars

function validateConfiguration(newConfig) {
  Object.keys(config).forEach((key) => {
    if (newConfig[key] === undefined) {
      throw new Error(`Service configuration error: ${key} is required.`);
    }
  });
}

export function configureApiService(newConfig, newApiClient) {
  validateConfiguration(newConfig);
  config = pick(newConfig, Object.keys(config));
  apiClient = newApiClient;
}

export async function getOrders() {
  // const { data } = await apiClient.get(`${config.ACCOUNTS_API_BASE_URL}/orders`);

  const data = await new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
    // reject(new Error('test error'));

    // Temp delay
    setTimeout(() => {
      resolve([
        {
          order_date: 'Jan 24, 2019',
          price: '41.65',
          lines: [
            {
              status: 'Complete',
              unit_price_excl_tax: '49.00',
              product: {
                attribute_values: [
                  {
                    code: 'certificate_type',
                    name: 'certificate_type',
                    value: 'verified',
                  },
                  {
                    code: 'course_key',
                    name: 'course_key',
                    value: 'course-v1:WageningenX+AB101x+3T2018',
                  },
                  {
                    code: 'id_verification_required',
                    name: 'id_verification_required',
                    value: true,
                  },
                ],
                stockrecords: [
                  {
                    price_currency: 'USD',
                    product: 27189,
                    partner_sku: 'B48291A',
                    partner: 1,
                    price_excl_tax: '49.00',
                    id: 19312,
                  },
                ],
                product_class: 'Seat',
                title: 'Seat in Introduction to Animal Behaviour with verified certificate (and ID verification)',
                url: 'https://ecommerce.edx.org/api/v2/products/27189/',
                price: '49.00',
                expires: '2019-08-29T23:00:00Z',
                is_available_to_buy: true,
                id: 27189,
                structure: 'child',
              },
              line_price_excl_tax: '41.65',
              description: 'Seat in Introduction to Animal Behaviour with verified certificate (and ID verification)',
              title: 'Seat in Introduction to Animal Behaviour with verified certificate (and ID verification)',
              quantity: 1,
            },
          ],
          number: 'EDX-34827343',
          receipt_url: 'https://ecommerce.edx.org/checkout/receipt/?order_number=EDX-34827343',
        },
      ]);
    }, 500);
  });

  const transformedOrdersData = data.map(({
    order_date, // eslint-disable-line camelcase
    price,
    lines,
    number,
    receipt_url, // eslint-disable-line camelcase
  }) => {
    const lineItems = lines.map(({
      product,
      status,
      description,
      title,
      expires,
      quantity,
    }) => ({
      itemId: product.id,
      status,
      description,
      title,
      expires,
      quantity,
    }));

    return {
      orderDate: order_date,
      total: price,
      orderId: number,
      receiptUrl: receipt_url,
      currency: lines[0].product.stockrecords[0].price_currency, // This is bad!
      lineItems,
    };
  });

  return transformedOrdersData;
}
