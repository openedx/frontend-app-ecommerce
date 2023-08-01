/* eslint-disable global-require */
import React from 'react';
import { render, screen } from '../testing';

import Subscriptions from './Subscriptions';

const storeMocks = require('../store/__mocks__/mockStore');

jest.mock('@edx/frontend-platform', () => ({
  getConfig: () => ({
    LMS_BASE_URL: 'https://example.com',
    SUBSCRIPTIONS_MINIMUM_PRICE: '$100',
    SUBSCRIPTIONS_TRIAL_LENGTH: '7',
    MARKETING_SITE_BASE_URL: 'https://example.marketing.com',
    SUBSCRIPTIONS_MARKETING_URL: '/subscriptions',
  }),
}));

const {
  getByText,
  getByTestId,
  getAllByText,
  getAllByTestId,
  queryByText,
  queryByTestId,
} = screen;

describe('<Subscriptions />', () => {
  describe('Renders correctly when user has subscriptions', () => {
    const {
      subscriptions: { subscriptions },
    } = storeMocks;

    beforeEach(() => {
      render(<Subscriptions />, storeMocks);
    });

    it('Renders appropriate subscription heading', () => {
      expect(getByText('Subscriptions')).toBeInTheDocument();
      expect(getByTestId('subscription-subtitle').textContent).toMatch(
        /You have 2 active subscriptions\. To view your receipts, change your payment method or cancel your subscription, click.*Manage my subscriptions/,
      );
      // Assert the button is rendered
      expect(getAllByText('Manage my subscriptions')).toHaveLength(2);
    });

    it('Renders subscription cards', () => {
      const sectionSubscriptionCards = getByTestId(
        'section-subscription-cards',
      );
      expect(sectionSubscriptionCards).toBeInTheDocument();

      // Assert the correct number of subscription cards are rendered
      const subscriptionCards = getAllByTestId('subscription-card');
      expect(subscriptionCards).toHaveLength(subscriptions.length);

      // Assert the correct text is rendered for each subscription card
      subscriptions.forEach((
        {
          uuid,
          title,
          organizations,
          status,
        },
        index,
      ) => {
        const card = subscriptionCards[index];

        expect(card).toHaveTextContent(title);
        expect(card).toHaveTextContent(new RegExp(status, 'i'));
        expect(card).toHaveTextContent(organizations.join(', '));

        // Assert the correct link is rendered for each subscription card
        const expectedUrl = `https://example.com/dashboard/programs/${uuid}`;
        expect(card).toHaveAttribute('href', expectedUrl);
      });
    });

    it('Does not render subscription upsell', () => {
      expect(queryByTestId('section-subscription-upsell')).toBeNull();
    });
  });

  describe('Renders correctly when user does not have subscriptions', () => {
    const storeMockWithoutSubscriptions = {
      ...storeMocks,
      subscriptions: {
        ...storeMocks.subscriptions,
        subscriptions: [],
      },
    };
    beforeEach(() => {
      render(<Subscriptions />, storeMockWithoutSubscriptions);
    });

    it('Renders appropriate subscription heading', () => {
      expect(getByText('Subscriptions')).toBeInTheDocument();
      expect(
        getByText('You do not have any active or previous subscriptions.'),
      ).toBeInTheDocument();
      // Assert the button is not rendered
      expect(queryByText('Manage my subscriptions')).toBeNull();
    });

    it('Renders subscription upsell', () => {
      const sectionSubscriptionUpsell = getByTestId(
        'section-subscription-upsell',
      );
      expect(sectionSubscriptionUpsell).toBeInTheDocument();

      // Assert the correct text is rendered for the subscription upsell
      expect(sectionSubscriptionUpsell).toHaveTextContent('New');
      expect(sectionSubscriptionUpsell).toHaveTextContent(
        'Monthly program subscriptions',
      );
      expect(sectionSubscriptionUpsell).toHaveTextContent(
        'Now available for many popular programs, affordable monthly subscription pricing can help you manage your budget more effectively. Subscriptions start at $100/month USD per program, after a 7-day full access free trial. Cancel at any time.',
      );

      const upsellButton = sectionSubscriptionUpsell.querySelector('a');
      expect(upsellButton).toHaveTextContent('Explore subscription options');
      expect(upsellButton).toHaveAttribute(
        'href',
        'https://example.marketing.com/subscriptions',
      );
    });

    it('Does not render subscription cards', () => {
      expect(queryByTestId('section-subscription-cards')).toBeNull();
    });
  });

  describe('Renders correctly when user does not have active subscriptions', () => {
    const storeMockWithoutActiveSubscriptions = {
      ...storeMocks,
      subscriptions: {
        ...storeMocks.subscriptions,
        subscriptions: storeMocks.subscriptions.subscriptions.filter(
          ({ status }) => status === 'inactive',
        ),
      },
    };
    beforeEach(() => {
      render(<Subscriptions />, storeMockWithoutActiveSubscriptions);
    });

    it('Renders appropriate subscription heading', () => {
      expect(getByText('Subscriptions')).toBeInTheDocument();
      expect(getByTestId('subscription-subtitle').textContent).toMatch(
        /You do not have an active subscription\. To view your past receipts, click.*Manage my subscriptions/,
      );
      // Assert the button is rendered
      expect(getAllByText('Manage my subscriptions')).toHaveLength(2);
    });

    it('Render subscription cards', () => {
      expect(getByTestId('section-subscription-cards')).toBeInTheDocument();
    });

    it('Does not render subscription upsell', () => {
      expect(queryByTestId('section-subscription-upsell')).toBeNull();
    });
  });
});
