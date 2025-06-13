import React from 'react';
import { Trophy, Award, Star, Target, Flame, Calendar } from 'lucide-react';

export const AchievementsView: React.FC = () => {
  const achievements = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Created your first goal',
      icon: Target,
      color: 'from-green-500 to-emerald-600',
      earned: true,
      date: '2025-01-01'
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Maintained a 7-day streak',
      icon: Flame,
      color: 'from-orange-500 to-red-600',
      earned: true,
      date: '2025-01-08'
    },
    {
      id: '3',
      title: 'Goal Getter',
      description: 'Completed 5 goals',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-600',
      earned: true,
      date: '2025-01-12'
    },
    {
      id: '4',
      title: 'Consistency King',
      description: 'Maintained a 30-day streak',
      icon: Calendar,
      color: 'from-blue-500 to-purple-600',
      earned: false,
      progress: 70
    },
    {
      id: '5',
      title: 'Perfectionist',
      description: 'Achieved 100% on 3 goals',
      icon: Star,
      color: 'from-purple-500 to-pink-600',
      earned: false,
      progress: 33
    },
    {
      id: '6',
      title: 'Legend',
      description: 'Completed 25 goals',
      icon: Award,
      color: 'from-pink-500 to-red-600',
      earned: false,
      progress: 20
    }
  ];

  const stats = [
    { label: 'Total Achievements', value: '3', icon: Trophy },
    { label: 'Current Streak', value: '7 days', icon: Flame },
    { label: 'Goals Completed', value: '8', icon: Target },
    { label: 'Success Rate', value: '87%', icon: Star }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Achievements</h2>
        <p className="text-gray-400">Track your progress and celebrate your wins</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map(achievement => {
          const Icon = achievement.icon;
          return (
            <div
              key={achievement.id}
              className={`bg-gray-800 rounded-xl p-6 border transition-all duration-300 ${
                achievement.earned
                  ? 'border-yellow-500/50 shadow-yellow-500/20 shadow-lg'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-lg flex items-center justify-center ${
                  !achievement.earned ? 'opacity-50' : ''
                }`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {achievement.earned && (
                  <div className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                    EARNED
                  </div>
                )}
              </div>

              <h3 className={`text-lg font-semibold mb-2 ${
                achievement.earned ? 'text-white' : 'text-gray-400'
              }`}>
                {achievement.title}
              </h3>
              
              <p className={`text-sm mb-4 ${
                achievement.earned ? 'text-gray-300' : 'text-gray-500'
              }`}>
                {achievement.description}
              </p>

              {achievement.earned ? (
                <div className="flex items-center space-x-2 text-yellow-400 text-sm">
                  <Star className="w-4 h-4" />
                  <span>Earned on {new Date(achievement.date).toLocaleDateString()}</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-gray-300">{achievement.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full">
                    <div 
                      className={`h-2 bg-gradient-to-r ${achievement.color} rounded-full transition-all duration-500`}
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl p-6 border border-yellow-500/20">
        <div className="flex items-center space-x-3 mb-4">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">Achievement System</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Unlock achievements by completing goals, maintaining streaks, and reaching milestones. 
          Each achievement brings you closer to becoming the best version of yourself!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <div className="text-lg font-bold text-yellow-400 mb-1">🏆</div>
            <div className="text-gray-300">Performance Based</div>
          </div>
          <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <div className="text-lg font-bold text-orange-400 mb-1">🔥</div>
            <div className="text-gray-300">Streak Rewards</div>
          </div>
          <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="text-lg font-bold text-purple-400 mb-1">⭐</div>
            <div className="text-gray-300">Milestone Celebrations</div>
          </div>
        </div>
      </div>
    </div>
  );
};