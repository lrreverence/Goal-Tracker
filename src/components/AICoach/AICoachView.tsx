import React, { useState } from 'react';
import { Bot, MessageCircle, Zap, Brain, TrendingUp, Star } from 'lucide-react';

export const AICoachView: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI accountability coach. I'm here to help you stay motivated and achieve your goals. How are you feeling about your progress today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "That's great progress! Remember, consistency is key. What's one small step you can take today toward your goal?",
        "I understand that can be challenging. Let's break it down into smaller, manageable tasks. What's the most important thing you need to focus on?",
        "You're doing amazing! Your dedication is inspiring. How about we set a mini-goal for this week?",
        "I can see you're committed to your growth. Let's analyze what's working well and what we can improve together."
      ];

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInputMessage('');
  };

  const quickActions = [
    { icon: TrendingUp, label: 'Progress Check', description: 'Review your recent achievements' },
    { icon: Brain, label: 'Strategy Session', description: 'Plan your next moves' },
    { icon: Zap, label: 'Motivation Boost', description: 'Get energized and focused' },
    { icon: Star, label: 'Goal Analysis', description: 'Analyze your goal performance' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bot className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">AI Accountability Coach</h2>
        <p className="text-gray-400">Your personal AI companion for achieving goals and staying motivated</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl border border-gray-700 h-96 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Coach AI</h3>
                  <p className="text-xs text-green-400">Online & Ready to Help</p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask your coach anything..."
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className="w-full p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="font-medium text-white text-sm">{action.label}</p>
                        <p className="text-xs text-gray-400">{action.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-lg font-semibold text-white mb-2">💡 Pro Tip</h3>
            <p className="text-gray-300 text-sm">
              Your AI coach learns from your patterns and preferences. The more you interact, the better the guidance becomes!
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">AI Coach Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-medium text-white mb-2">Smart Analysis</h4>
            <p className="text-gray-400 text-sm">Analyzes your patterns and provides personalized insights</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-medium text-white mb-2">Real-time Support</h4>
            <p className="text-gray-400 text-sm">Get instant motivation and guidance whenever you need it</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-medium text-white mb-2">Progress Tracking</h4>
            <p className="text-gray-400 text-sm">Monitors your journey and celebrates your achievements</p>
          </div>
        </div>
      </div>
    </div>
  );
};