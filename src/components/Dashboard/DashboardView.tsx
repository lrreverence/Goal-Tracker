import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, Flame, Calendar, Trophy, Star, Zap, Coins, Clock, Users } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { goalService } from '../../api/goalService';
import { Goal } from '../../types';

export const DashboardView: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const fetchedGoals = await goalService.getAllGoals();
      setGoals(fetchedGoals);
    } catch (error) {
      console.error('Failed to load goals:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const activeGoals = goals.filter(goal => goal.status === 'active').length;
  const completedGoals = goals.filter(goal => goal.status === 'completed').length;
  const totalGoals = goals.length;
  const completionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;
  const avgProgress = goals.length > 0 ? Math.round(
    goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length
  ) : 0;

  const recentAchievements = [
    { id: 1, goal: 'Daily Workout', points: 250, time: '2 mins ago', streak: '7 days' },
    { id: 2, goal: 'Read 30 Pages', points: 120, time: '15 mins ago', streak: '3 days' },
    { id: 3, goal: 'Meditation', points: 500, time: '1 hour ago', streak: '14 days' },
  ];

  const activeChallenges = [
    { id: 1, name: 'Fitness Challenge', participants: 128, reward: 1000, deadline: '3 days left' },
    { id: 2, name: 'Reading Marathon', participants: 85, reward: 800, deadline: '5 days left' },
    { id: 3, name: 'Study Sprint', participants: 64, reward: 1200, deadline: '2 days left' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Points"
          value="12,450"
          icon={Coins}
          trend="up"
          trendValue="15%"
        />
        <StatsCard
          title="Today's Progress"
          value="2,850"
          icon={Trophy}
          trend="up"
          trendValue="32%"
        />
        <StatsCard
          title="Active Goals"
          value={activeGoals}
          icon={Users}
          trend="up"
          trendValue="8%"
        />
        <StatsCard
          title="Success Rate"
          value={`${completionRate}%`}
          icon={Star}
          trend="up"
          trendValue="5%"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Challenges */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Active Challenges</h2>
            <div className="space-y-4">
              {activeChallenges.map(challenge => (
                <div key={challenge.id} className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{challenge.name}</h3>
                        <p className="text-gray-400 text-sm">{challenge.participants} participants</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{challenge.reward} points</p>
                      <p className="text-yellow-400 text-sm">{challenge.deadline}</p>
                      <button className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200">
                        Join Challenge
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200">
                <Zap className="w-5 h-5 inline-block mr-2" />
                Start New Goal
              </button>
              <button className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200">
                <Clock className="w-5 h-5 inline-block mr-2" />
                Track Progress
              </button>
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Recent Achievements</h2>
          <div className="space-y-4">
            {recentAchievements.map(achievement => (
              <div key={achievement.id} className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{achievement.goal}</span>
                  <span className="text-green-400 font-bold">+{achievement.points} pts</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{achievement.time}</span>
                  <span className="text-yellow-400">🔥 {achievement.streak}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 p-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors">
            View All Achievements
          </button>
        </div>
      </div>

      {/* Weekly Challenge Banner */}
      <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-6 border border-purple-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">🎯 Weekly Challenge!</h2>
            <p className="text-gray-300">Complete 5 goals this week and earn 1000 bonus points</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200">
            Join Challenge
          </button>
        </div>
      </div>
    </div>
  );
};