import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nhxtnqtcmjrzpgdqdeze.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oeHRucXRjbWpyenBnZHFkZXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxODgwNTEsImV4cCI6MjA3MDc2NDA1MX0.LjOpufteyB1KzNtNuGT0nJwBl5v28imD9G3TTwKphkc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Order {
  id?: string;
  full_name: string;
  address: string;
  delivery_address: string;
  whatsapp_number: string;
  quantity: string;
  number_of_bottles: number;
  total_amount: number;
  created_at?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}
