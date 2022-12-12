module.exports = {
    basket_discounts: [
        {
            amount: 14.9,
            benefit_value: 10,
            code: "12345",
            condition_name: "Cart includes 1 item(s) from range for coupon [14]",
            contains_offer: true,
            currency: "USD",
            enterprise_customer_name: null,
            offer_type: "Voucher",
        }
    ],
    billing_address: {
        city: "Cambridge",
        country: "US",
        first_name: "Juliana",
        last_name: "Doe",
        line1: "123 Main Street",
        line2: "",
        postcode: "12346",
        state: "CA",
    },
    contains_credit_seat: false,
    currency: "USD",
    dashboard_url: "http://edx.devstack.lms:18000/dashboard",
    date_placed: "2022-06-21T16:43:02Z",
    discount: "14.90",
    enterprise_learner_portal_url: null,
    lines: [
        {
            course_organization: "edX",
            description: 'Seat in edX Demonstration Course with verified certificate',
            line_price_excl_tax: "134.10",
            product: {
                id: 3,
                is_available_to_buy: true,
                is_enrollment_code_product: false,
                price: "149.00",
            },
            title: "Seat in edX Demonstration Course with verified certificate",
            unit_price_excl_tax: "149.00",
        }
    ],
    number: "EDX-100005",
    order_product_ids: "3",
    payment_method: "Visa 411111XXXXXX1111",
    product_tracking: null,
    total_before_discounts_incl_tax: "149.00",
    total_excl_tax: "134.10",
    user: {
        email: "edx@example.com",
        username: "edx",
    },
    vouchers: [],
};
  