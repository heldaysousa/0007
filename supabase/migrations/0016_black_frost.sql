-- Add revenue goals to business_settings table
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'business_settings' AND column_name = 'daily_revenue_goal'
  ) THEN
    ALTER TABLE business_settings 
      ADD COLUMN daily_revenue_goal decimal(10,2) NOT NULL DEFAULT 1000.00,
      ADD COLUMN monthly_revenue_goal decimal(10,2) NOT NULL DEFAULT 30000.00;
  END IF;
END $$;

-- Create business_settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS business_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  daily_revenue_goal decimal(10,2) NOT NULL DEFAULT 1000.00,
  monthly_revenue_goal decimal(10,2) NOT NULL DEFAULT 30000.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (owner_id)
);

-- Enable RLS
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage own business settings"
  ON business_settings FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());
