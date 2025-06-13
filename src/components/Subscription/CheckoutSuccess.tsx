import React, { useEffect } from 'react';
import { CheckCircle, ArrowRight, Target } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';

interface CheckoutSuccessProps {
  onContinue: () => void;
}

export const CheckoutSuccess: React.FC<CheckoutSuccessProps> = ({ onContinue }) => {
  const { refetch } = useSubscription();

  useEffect(() => {
    // Refresh subscription status
    refetch();

    // Auto-redirect after 5 seconds
    const timer = setTimeout(() => {
      // Preserve the price_id parameter when redirecting
      const urlParams = new URLSearchParams(window.location.search);
      const priceId = urlParams.get('price_id');
      if (priceId) {
        window.location.href = `/?price_id=${priceId}`;
      } else {
        onContinue();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [onContinue, refetch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-2xl text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-4">Payment Successful!</h1>
          <p className="text-gray-300 mb-6">
            Thank you for your subscription. Your account has been upgraded and you now have access to all premium features.
          </p>

          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-4 mb-6 border border-green-500/20">
            <div className="flex items-center justify-center space-x-2 text-green-400 mb-2">
              <Target className="w-5 h-5" />
              <span className="font-medium">Welcome to GoalTracker Pro!</span>
            </div>
            <p className="text-gray-300 text-sm">
              You can now access AI coaching, unlimited goals, and advanced analytics.
            </p>
          </div>

          <button
            onClick={() => {
              // Preserve the price_id parameter when clicking continue
              const urlParams = new URLSearchParams(window.location.search);
              const priceId = urlParams.get('price_id');
              if (priceId) {
                window.location.href = `/?price_id=${priceId}`;
              } else {
                onContinue();
              }
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>Continue to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-gray-400 text-sm mt-4">
            Redirecting automatically in 5 seconds...
          </p>
        </div>
      </div>
    </div>
  );
};