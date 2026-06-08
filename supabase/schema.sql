-- Habilitar extensões
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de exercícios
CREATE TABLE exercises (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sets INTEGER NOT NULL,
  reps TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('musculacao', 'corrida')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de treinos
CREATE TABLE workouts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de relação treino-exercício
CREATE TABLE workout_exercises (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workout_id UUID REFERENCES workouts(id) ON DELETE CASCADE,
  exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de alimentos
CREATE TABLE food_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  calories INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de consumo diário
CREATE TABLE daily_consumption (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_calories INTEGER DEFAULT 0,
  calorie_goal INTEGER DEFAULT 2000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, date)
);

-- Tabela de relação consumo-alimento
CREATE TABLE consumption_food_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  consumption_id UUID REFERENCES daily_consumption(id) ON DELETE CASCADE,
  food_item_id UUID REFERENCES food_items(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de dietas geradas por IA
CREATE TABLE diets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  content TEXT NOT NULL,
  prompt TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de eventos do calendário
CREATE TABLE calendar_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('workout', 'diet')),
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de perfil do usuário
CREATE TABLE user_profile (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  age INTEGER,
  weight DECIMAL(5,2),
  height DECIMAL(5,2),
  goal TEXT NOT NULL,
  workout_frequency INTEGER NOT NULL,
  running_frequency INTEGER NOT NULL,
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced')),
  limitations TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabela de conversas com IA
CREATE TABLE ai_conversations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  context TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Índices para melhorar performance
CREATE INDEX idx_workouts_date ON workouts(date);
CREATE INDEX idx_daily_consumption_date ON daily_consumption(date);
CREATE INDEX idx_diets_date ON diets(date);
CREATE INDEX idx_calendar_events_date ON calendar_events(date);
CREATE INDEX idx_ai_conversations_created ON ai_conversations(created_at);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_exercises_updated_at BEFORE UPDATE ON exercises
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workouts_updated_at BEFORE UPDATE ON workouts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_consumption_updated_at BEFORE UPDATE ON daily_consumption
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendar_events_updated_at BEFORE UPDATE ON calendar_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profile_updated_at BEFORE UPDATE ON user_profile
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_consumption ENABLE ROW LEVEL SECURITY;
ALTER TABLE diets ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

-- Políticas RLS (baseadas em user_id)
CREATE POLICY "Users can view their own exercises" ON exercises
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own exercises" ON exercises
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own exercises" ON exercises
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own exercises" ON exercises
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own workouts" ON workouts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own workouts" ON workouts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workouts" ON workouts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workouts" ON workouts
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own food_items" ON food_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own food_items" ON food_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own food_items" ON food_items
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own food_items" ON food_items
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own daily_consumption" ON daily_consumption
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own daily_consumption" ON daily_consumption
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own daily_consumption" ON daily_consumption
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own daily_consumption" ON daily_consumption
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own diets" ON diets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own diets" ON diets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own diets" ON diets
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own diets" ON diets
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own calendar_events" ON calendar_events
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own calendar_events" ON calendar_events
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own calendar_events" ON calendar_events
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own calendar_events" ON calendar_events
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own user_profile" ON user_profile
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own user_profile" ON user_profile
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own user_profile" ON user_profile
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own user_profile" ON user_profile
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own ai_conversations" ON ai_conversations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ai_conversations" ON ai_conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ai_conversations" ON ai_conversations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ai_conversations" ON ai_conversations
  FOR DELETE USING (auth.uid() = user_id);
