import React from 'react';
import { Calendar, Target, Trash2, Edit3, PlayCircle, PauseCircle } from 'lucide-react';
import { Goal } from '../../types';

interface GoalCardProps {
  goal: Goal;
  onUpdate: (id: string, updates: Partial<Goal>) => void;
  onDelete: (id: string) => void;
  onEdit: (goal: Goal) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onUpdate, onDelete, onEdit }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      fitness: 'from-green-500 to-emerald-600',
      career: 'from-blue-500 to-indigo-600',
      personal: 'from-purple-500 to-pink-600',
      financial: 'from-yellow-500 to-orange-600',
      education: 'from-cyan-500 to-blue-600'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };
    return colors[priority as keyof typeof colors];
  };

  const toggleStatus = () => {
    const newStatus = goal.status === 'active' ? 'paused' : 'active';
    onUpdate(goal.id, { status: newStatus });
  };

  const updateProgress = (increment: number) => {
    const newProgress = Math.max(0, Math.min(100, goal.progress + increment));
    onUpdate(goal.id, { progress: newProgress });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${getPriorityColor(goal.priority)}`}></div>
          <div>
            <h3 className="text-lg font-semibold text-white">{goal.title}</h3>
            <p className="text-gray-400 text-sm capitalize">{goal.category}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleStatus}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title={goal.status === 'active' ? 'Pause goal' : 'Resume goal'}
          >
            {goal.status === 'active' ? <PauseCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onEdit(goal)}
            className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
            title="Edit goal"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(goal.id)}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
            title="Delete goal"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{goal.description}</p>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Progress</span>
          <span className="text-sm font-medium text-white">{goal.progress}%</span>
        </div>
        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${getCategoryColor(goal.category)} transition-all duration-500 ease-out`}
            style={{ width: `${goal.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <Calendar className="w-4 h-4" />
          <span>Due: {formatDate(goal.targetDate)}</span>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          goal.status === 'active' ? 'bg-green-900 text-green-300' :
          goal.status === 'completed' ? 'bg-blue-900 text-blue-300' :
          'bg-yellow-900 text-yellow-300'
        }`}>
          {goal.status}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => updateProgress(-5)}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
            disabled={goal.progress <= 0}
          >
            -5%
          </button>
          <button
            onClick={() => updateProgress(5)}
            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
            disabled={goal.progress >= 100}
          >
            +5%
          </button>
        </div>
        <div className="flex items-center space-x-1 text-gray-400 text-xs">
          <Target className="w-3 h-3" />
          <span>Updated {formatDate(goal.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};