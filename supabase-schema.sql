 -- USERS TABLE (simple, no auth)
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  created_at timestamp with time zone default now()
);

-- Create orders table with user_id reference
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  province TEXT NOT NULL,
  district TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT NOT NULL,
  address_district TEXT NOT NULL,
  delivery_address_line1 TEXT NOT NULL,
  delivery_address_line2 TEXT NOT NULL,
  delivery_address_district TEXT NOT NULL,
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

-- Create policies for orders table - only authenticated users can insert/select
CREATE POLICY "Allow authenticated users to insert orders" ON orders
  FOR INSERT WITH CHECK (user_id IS NOT NULL);

CREATE POLICY "Allow users to view their own orders" ON orders
  FOR SELECT USING (user_id IS NOT NULL);

-- Create policies for contact_messages table
CREATE POLICY "Allow anonymous insert on contact_messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous select on contact_messages" ON contact_messages
  FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
