import React, { useState } from 'react';
import { Crown, Check, Star, Zap, Target, Bot, CreditCard, Loader } from 'lucide-react';
import { stripeProducts } from '../../stripe-config';
import { createCheckoutSession } from '../../api/stripeService';
import { useSubscription } from '../../hooks/useSubscription';

export const SubscriptionView: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const { getCurrentPlan, isActive } = useSubscription();

  const currentPlan = getCurrentPlan().toLowerCase();

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Up to 3 active goals',
        'Basic progress tracking',
        'Goal templates',
        'Mobile app access',
        'Community support'
      ],
      color: 'from-gray-500 to-gray-600',
      popular: false,
      stripeProduct: null
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'Most popular for serious goal achievers',
      features: [
        'Unlimited goals',
        'AI accountability coach',
        'Advanced analytics',
        'Goal sharing & collaboration',
        'Priority support',
        'Custom reminders',
        'Export data'
      ],
      color: 'from-blue-500 to-purple-600',
      popular: true,
      stripeProduct: stripeProducts.find(p => p.name === 'Pro')
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$19.99',
      period: 'per month',
      description: 'For teams and power users',
      features: [
        'Everything in Pro',
        'Team management',
        'Advanced AI coaching',
        'Custom integrations',
        'White-label options',
        'Dedicated support',
        'Advanced reporting',
        'API access'
      ],
      color: 'from-purple-500 to-pink-600',
      popular: false,
      stripeProduct: stripeProducts.find(p => p.name === 'Premium')
    }
  ];

  const handleSubscribe = async (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (!plan?.stripeProduct) return;

    setLoading(planId);
    setError('');

    try {
      const { url } = await createCheckoutSession({
        priceId: plan.stripeProduct.priceId,
        mode: plan.stripeProduct.mode,
      });

      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create checkout session');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Crown className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Upgrade Your Journey</h2>
        <p className="text-gray-400 text-lg">Choose the plan that fits your goals and unlock your potential</p>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => {
          const isCurrentPlan = plan.name.toLowerCase() === currentPlan;
          const isLoadingPlan = loading === plan.id;
          
          return (
            <div
              key={plan.id}
              className={`relative bg-gray-800 rounded-xl p-6 border transition-all duration-300 hover:shadow-xl ${
                selectedPlan === plan.id
                  ? 'border-blue-500 shadow-blue-500/20'
                  : 'border-gray-700 hover:border-gray-600'
              } ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {isCurrentPlan && (
                <div className="absolute -top-3 right-4">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Current Plan
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${plan.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  {plan.id === 'free' && <Target className="w-6 h-6 text-white" />}
                  {plan.id === 'pro' && <Zap className="w-6 h-6 text-white" />}
                  {plan.id === 'premium' && <Crown className="w-6 h-6 text-white" />}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-1">/{plan.period}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedPlan(plan.id);
                  handleSubscribe(plan.id);
                }}
                disabled={plan.id === 'free' || isCurrentPlan || isLoadingPlan}
                className={`w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  plan.id === 'free' || isCurrentPlan
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : `bg-gradient-to-r ${plan.color} text-white hover:shadow-lg hover:shadow-blue-500/25`
                } ${isLoadingPlan ? 'opacity-75' : ''}`}
              >
                {isLoadingPlan ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>
                    {plan.id === 'free' 
                      ? 'Free Plan' 
                      : isCurrentPlan 
                        ? 'Current Plan' 
                        : 'Subscribe Now'
                    }
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <CreditCard className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Secure Payment with Stripe</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>256-bit SSL encryption</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>PCI DSS compliant</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
        <div className="flex items-center space-x-3 mb-3">
          <Bot className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">AI-Powered Success</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Our AI accountability coach uses advanced machine learning to provide personalized guidance, 
          track your patterns, and help you achieve your goals faster than ever before.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center p-3 bg-gray-800/50 rounded-lg">
            <div className="text-2xl font-bold text-blue-400 mb-1">94%</div>
            <div className="text-gray-400">Success Rate</div>
          </div>
          <div className="text-center p-3 bg-gray-800/50 rounded-lg">
            <div className="text-2xl font-bold text-green-400 mb-1">3.2x</div>
            <div className="text-gray-400">Faster Achievement</div>
          </div>
          <div className="text-center p-3 bg-gray-800/50 rounded-lg">
            <div className="text-2xl font-bold text-purple-400 mb-1">50K+</div>
            <div className="text-gray-400">Happy Users</div>
          </div>
        </div>
      </div>
    </div>
  );
};