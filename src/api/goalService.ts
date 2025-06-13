import { supabase } from '../lib/supabase';
import { Goal } from '../types';

// Supabase-powered goal service
class GoalService {
  async getAllGoals(): Promise<Goal[]> {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching goals:', error);
      throw new Error('Failed to fetch goals');
    }

    return data.map(this.mapSupabaseGoalToGoal);
  }

  async createGoal(goalData: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Goal> {
    const { data, error } = await supabase
      .from('goals')
      .insert({
        title: goalData.title,
        description: goalData.description,
        category: goalData.category,
        priority: goalData.priority,
        target_date: goalData.targetDate,
        progress: goalData.progress,
        status: goalData.status
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating goal:', error);
      throw new Error('Failed to create goal');
    }

    return this.mapSupabaseGoalToGoal(data);
  }

  async updateGoal(id: string, updates: Partial<Goal>): Promise<Goal> {
    const updateData: any = {};
    
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.category !== undefined) updateData.category = updates.category;
    if (updates.priority !== undefined) updateData.priority = updates.priority;
    if (updates.targetDate !== undefined) updateData.target_date = updates.targetDate;
    if (updates.progress !== undefined) updateData.progress = updates.progress;
    if (updates.status !== undefined) updateData.status = updates.status;

    const { data, error } = await supabase
      .from('goals')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating goal:', error);
      throw new Error('Failed to update goal');
    }

    return this.mapSupabaseGoalToGoal(data);
  }

  async deleteGoal(id: string): Promise<void> {
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting goal:', error);
      throw new Error('Failed to delete goal');
    }
  }

  private mapSupabaseGoalToGoal(supabaseGoal: any): Goal {
    return {
      id: supabaseGoal.id,
      title: supabaseGoal.title,
      description: supabaseGoal.description || '',
      category: supabaseGoal.category,
      priority: supabaseGoal.priority,
      targetDate: supabaseGoal.target_date,
      progress: supabaseGoal.progress,
      status: supabaseGoal.status,
      createdAt: supabaseGoal.created_at,
      updatedAt: supabaseGoal.updated_at
    };
  }
}

export const goalService = new GoalService();