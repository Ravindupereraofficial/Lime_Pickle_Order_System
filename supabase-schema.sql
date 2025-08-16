-- USERS TABLE (simple, no auth)
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  whatsapp_number text not null,
  email text not null unique,
  password text not null,
  created_at timestamp with time zone default now()
);
-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  address TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  quantity TEXT NOT NULL,
  number_of_bottles INTEGER NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for orders table
CREATE POLICY "Allow anonymous insert on orders" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous select on orders" ON orders
  FOR SELECT USING (true);

-- Create policies for contact_messages table
CREATE POLICY "Allow anonymous insert on contact_messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous select on contact_messages" ON contact_messages
  FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
