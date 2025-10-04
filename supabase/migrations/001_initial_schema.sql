-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  type VARCHAR(20) NOT NULL CHECK (type IN ('smell', 'wastewater', 'waste', 'noise', 'air', 'water', 'other')),
  description TEXT,
  lat DECIMAL(10, 7) NOT NULL,
  lng DECIMAL(10, 7) NOT NULL,
  address VARCHAR(200),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'resolved', 'rejected')),
  empathy_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Report media table
CREATE TABLE report_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  media_type VARCHAR(10) CHECK (media_type IN ('image', 'video')),
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Report empathy table
CREATE TABLE report_empathy (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(report_id, user_id)
);

-- Report AI analysis table
CREATE TABLE report_ai_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  keywords TEXT[],
  detailed_type VARCHAR(50),
  severity VARCHAR(10) CHECK (severity IN ('low', 'medium', 'high')),
  recommended_department VARCHAR(50),
  image_description TEXT,
  confidence_score DECIMAL(3, 2),
  analyzed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Report status history table
CREATE TABLE report_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL,
  comment TEXT,
  department VARCHAR(50),
  updated_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Air quality history table
CREATE TABLE air_quality_history (
  id BIGSERIAL PRIMARY KEY,
  station_name VARCHAR(50) NOT NULL,
  measured_at TIMESTAMPTZ NOT NULL,
  pm10_value DECIMAL(5,1),
  pm25_value DECIMAL(5,1),
  o3_value DECIMAL(5,3),
  no2_value DECIMAL(5,3),
  so2_value DECIMAL(5,3),
  co_value DECIMAL(5,1),
  pm10_grade INTEGER,
  pm25_grade INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User points table
CREATE TABLE user_points (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  total_points INTEGER DEFAULT 0,
  available_points INTEGER DEFAULT 0,
  used_points INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Point transactions table
CREATE TABLE point_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  type VARCHAR(30) NOT NULL CHECK (type IN (
    'signup_bonus',
    'report_submitted',
    'report_empathized',
    'empathy_given',
    'monthly_bonus',
    'challenge_completed',
    'point_used',
    'point_refund'
  )),
  amount INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  reference_id UUID,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partner stores table
CREATE TABLE partner_stores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) CHECK (category IN (
    'zero_waste', 'local_food', 'eco_restaurant',
    'secondhand', 'eco_cafe', 'other'
  )),
  address VARCHAR(200),
  lat DECIMAL(10, 7),
  lng DECIMAL(10, 7),
  phone VARCHAR(20),
  business_hours JSONB,
  description TEXT,
  logo_url TEXT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store benefits table
CREATE TABLE store_benefits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_id UUID REFERENCES partner_stores(id) ON DELETE CASCADE,
  title VARCHAR(100),
  description TEXT,
  point_cost INTEGER NOT NULL,
  discount_type VARCHAR(20) CHECK (discount_type IN ('percent', 'fixed')),
  discount_value DECIMAL(10, 2),
  max_usage_per_user INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_reports_status ON reports(status, created_at DESC);
CREATE INDEX idx_reports_location ON reports(lat, lng);
CREATE INDEX idx_reports_type ON reports(type);
CREATE INDEX idx_reports_user ON reports(user_id);
CREATE INDEX idx_station_measured ON air_quality_history(station_name, measured_at DESC);
CREATE INDEX idx_point_tx_user ON point_transactions(user_id, created_at DESC);
CREATE INDEX idx_stores_location ON partner_stores(lat, lng);
CREATE INDEX idx_stores_category ON partner_stores(category);

-- Trigger function for empathy count
CREATE OR REPLACE FUNCTION update_empathy_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE reports SET empathy_count = empathy_count + 1 WHERE id = NEW.report_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE reports SET empathy_count = empathy_count - 1 WHERE id = OLD.report_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER empathy_count_trigger
  AFTER INSERT OR DELETE ON report_empathy
  FOR EACH ROW EXECUTE FUNCTION update_empathy_count();

-- Trigger function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to add user points
CREATE OR REPLACE FUNCTION add_user_points(
  p_user_id UUID,
  p_type VARCHAR,
  p_amount INTEGER,
  p_reference_id UUID DEFAULT NULL,
  p_description TEXT DEFAULT NULL
)
RETURNS void AS $$
DECLARE
  v_new_balance INTEGER;
BEGIN
  -- Update user_points
  UPDATE user_points
  SET
    total_points = total_points + p_amount,
    available_points = available_points + p_amount,
    updated_at = NOW()
  WHERE user_id = p_user_id
  RETURNING available_points INTO v_new_balance;

  -- If user doesn't exist, insert new record
  IF NOT FOUND THEN
    INSERT INTO user_points (user_id, total_points, available_points)
    VALUES (p_user_id, p_amount, p_amount)
    RETURNING available_points INTO v_new_balance;
  END IF;

  -- Insert transaction record
  INSERT INTO point_transactions (
    user_id, type, amount, balance_after, reference_id, description
  ) VALUES (
    p_user_id, p_type, p_amount, v_new_balance, p_reference_id, p_description
  );
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (RLS) policies
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_empathy ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;

-- Reports: Anyone can read, only authenticated users can insert
CREATE POLICY "Reports are viewable by everyone"
  ON reports FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert reports"
  ON reports FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own reports"
  ON reports FOR UPDATE
  USING (auth.uid() = user_id);

-- Report empathy: Anyone can read, only authenticated users can insert
CREATE POLICY "Empathy is viewable by everyone"
  ON report_empathy FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can empathize"
  ON report_empathy FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

-- User points: Users can only see their own points
CREATE POLICY "Users can view their own points"
  ON user_points FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own transactions"
  ON point_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- Storage bucket for report media
INSERT INTO storage.buckets (id, name, public)
VALUES ('report-media', 'report-media', true)
ON CONFLICT DO NOTHING;

-- Storage policy
CREATE POLICY "Anyone can view report media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'report-media');

CREATE POLICY "Authenticated users can upload report media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'report-media' AND auth.role() = 'authenticated');
