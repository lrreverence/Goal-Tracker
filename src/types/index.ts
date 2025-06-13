export interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'fitness' | 'career' | 'personal' | 'financial' | 'education';
  priority: 'low' | 'medium' | 'high';
  targetDate: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  subscription: 'free' | 'pro' | 'premium';
  streak: number;
  totalGoals: number;
  completedGoals: number;
}