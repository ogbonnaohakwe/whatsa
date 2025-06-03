export const STRIPE_PRODUCTS = {
  starter: {
    priceId: 'price_1RVxnQLZglVGNfX7co84RPHY',
    name: 'Starter Plan',
    description: 'Perfect for small businesses just getting started with WhatsApp automation',
    features: [
      'Up to 1,000 contacts',
      '500 messages per day',
      'Basic auto-responses',
      'Contact management',
      'Email support',
      '1 team member'
    ],
    mode: 'subscription' as const
  }
} as const;