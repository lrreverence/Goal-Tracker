export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      goals: {
        Row: {
          id: string
          title: string
          description: string | null
          category: 'fitness' | 'career' | 'personal' | 'financial' | 'education'
          priority: 'low' | 'medium' | 'high'
          target_date: string
          progress: number
          status: 'active' | 'completed' | 'paused'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category: 'fitness' | 'career' | 'personal' | 'financial' | 'education'
          priority?: 'low' | 'medium' | 'high'
          target_date: string
          progress?: number
          status?: 'active' | 'completed' | 'paused'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category?: 'fitness' | 'career' | 'personal' | 'financial' | 'education'
          priority?: 'low' | 'medium' | 'high'
          target_date?: string
          progress?: number
          status?: 'active' | 'completed' | 'paused'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}