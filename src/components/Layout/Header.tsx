import React from 'react';
import { Target, Bell, Crown } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';

export const Header: React.FC = () => {
  const { getCurrentPlan } = useSubscription();
  const currentPlan = getCurrentPlan();

  const getPlanColor = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'pro':
        return 'from-blue-500 to-purple-600';
      case 'premium':
        return 'from-purple-500 to-pink-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">GoalTracker</h1>
            <p className="text-xs text-gray-400">Your AI Accountability Coach</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`px-3 py-1.5 bg-gradient-to-r ${getPlanColor(currentPlan)} rounded-full flex items-center space-x-2`}>
            {currentPlan.toLowerCase() !== 'free' && <Crown className="w-4 h-4 text-white" />}
            <span className="text-sm font-medium text-white">{currentPlan} Plan</span>
          </div>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};