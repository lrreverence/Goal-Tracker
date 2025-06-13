import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface CreateCheckoutSessionParams {
  priceId: string;
  mode: 'subscription' | 'payment';
  successUrl?: string;
  cancelUrl?: string;
}

export const createCheckoutSession = async ({
  priceId,
  mode,
  successUrl = `${window.location.origin}/success`,
  cancelUrl = `${window.location.origin}/subscription`,
}: CreateCheckoutSessionParams) => {
  try {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Failed to load Stripe');
    }

    // Add price_id to success URL
    const successUrlWithParams = `${successUrl}?success=true&price_id=${priceId}`;

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode,
      successUrl: successUrlWithParams,
      cancelUrl,
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error in createCheckoutSession:', error);
    throw error;
  }
};