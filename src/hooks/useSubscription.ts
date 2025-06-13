import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { getProductByPriceId } from '../stripe-config';

interface SubscriptionData {
  subscription_status: string;
  price_id: string | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      // If we're on the success page, set Pro plan
      if (window.location.pathname === '/success') {
        setSubscription({
          subscription_status: 'active',
          price_id: 'price_1RZ3C4Q2IpZFcELs42JVD0vk', // Pro plan price ID
          current_period_end: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
          cancel_at_period_end: false
        });
      } else {
        // For unauthenticated users, we'll just return the free plan
        setSubscription({
          subscription_status: 'not_started',
          price_id: null,
          current_period_end: null,
          cancel_at_period_end: false
        });
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentPlan = () => {
    if (!subscription || !subscription.price_id) {
      return 'Free';
    }

    const product = getProductByPriceId(subscription.price_id);
    return product?.name || 'Unknown';
  };

  const isActive = () => {
    return subscription?.subscription_status === 'active';
  };

  return {
    subscription,
    loading,
    getCurrentPlan,
    isActive,
    refetch: fetchSubscription,
  };
};