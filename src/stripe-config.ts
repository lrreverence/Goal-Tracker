export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'subscription' | 'payment';
  price: string;
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_SU1Ei0qyBwfe6n',
    priceId: 'price_1RZ3C4Q2IpZFcELs42JVD0vk',
    name: 'Pro',
    description: 'Most popular for serious goal achievers',
    mode: 'subscription',
    price: '$9.99'
  },
  {
    id: 'prod_SU1EkUrjlsKSox',
    priceId: 'price_1RZ3CLQ2IpZFcELs5F33LRnT',
    name: 'Premium',
    description: 'For teams and power users',
    mode: 'subscription',
    price: '$19.99'
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};

export const getProductByName = (name: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.name.toLowerCase() === name.toLowerCase());
};