import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { DashboardView } from './components/Dashboard/DashboardView';
import { GoalsView } from './components/Goals/GoalsView';
import { AICoachView } from './components/AICoach/AICoachView';
import { SubscriptionView } from './components/Subscription/SubscriptionView';
import { AchievementsView } from './components/Achievements/AchievementsView';
import { CheckoutSuccess } from './components/Subscription/CheckoutSuccess';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSuccess, setShowSuccess] = useState(false);

  // Check for success parameter in URL
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      setShowSuccess(true);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  if (showSuccess) {
    return <CheckoutSuccess onContinue={() => setShowSuccess(false)} />;
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'goals':
        return <GoalsView />;
      case 'ai-coach':
        return <AICoachView />;
      case 'achievements':
        return <AchievementsView />;
      case 'subscription':
        return <SubscriptionView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen">
          <div className="max-w-7xl mx-auto">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;