/*
  # Create goals table for goal tracking application

  1. New Tables
    - `goals`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, optional)
      - `category` (text, required) - fitness, career, personal, financial, education
      - `priority` (text, required) - low, medium, high
      - `target_date` (date, required)
      - `progress` (integer, default 0) - percentage 0-100
      - `status` (text, default 'active') - active, completed, paused
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `goals` table
    - Add policy for public access (since no auth is required per requirements)
*/

CREATE TABLE IF NOT EXISTS goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL CHECK (category IN ('fitness', 'career', 'personal', 'financial', 'education')),
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  target_date date NOT NULL,
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

-- Allow public access for all operations (no auth required)
CREATE POLICY "Allow public read access on goals"
  ON goals
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert on goals"
  ON goals
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update on goals"
  ON goals
  FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Allow public delete on goals"
  ON goals
  FOR DELETE
  TO public
  USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_goals_updated_at
  BEFORE UPDATE ON goals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data
INSERT INTO goals (title, description, category, priority, target_date, progress, status) VALUES
  ('Run 5K Daily', 'Build consistent running habit by completing 5K every morning', 'fitness', 'high', '2025-03-01', 75, 'active'),
  ('Learn TypeScript', 'Master TypeScript fundamentals and advanced concepts', 'education', 'medium', '2025-02-15', 60, 'active'),
  ('Save $10,000', 'Build emergency fund through consistent monthly savings', 'financial', 'high', '2025-12-31', 40, 'active'),
  ('Read 24 Books', 'Read 2 books per month to expand knowledge and perspective', 'personal', 'medium', '2025-12-31', 25, 'active');