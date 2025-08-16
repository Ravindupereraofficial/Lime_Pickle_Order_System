import { supabase } from './supabase';

// Simple password hashing (in production, use bcrypt or similar)
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (userData: { email: string; password: string }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const authUtils = {
  // Sign up a new user
  async signup(userData: { email: string; password: string }) {
    try {
      // Check if user already exists
      const { data: existing, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('email', userData.email)
        .limit(1);

      if (checkError) {
        return { success: false, message: 'Signup failed. Please try again.' };
      }

      if (existing && existing.length > 0) {
        return { success: false, message: 'Email already registered. Please login.' };
      }

      // Hash the password
      const passwordHash = await hashPassword(userData.password);

      // Insert new user
      const { error } = await supabase
        .from('users')
        .insert({
          email: userData.email,
          password_hash: passwordHash
        });

      if (error) {
        console.error('Signup error:', error);
        return { success: false, message: 'Signup failed. Please try again.' };
      }

      return { success: true, message: 'Signup successful! You can now login.' };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'Signup failed. Please try again.' };
    }
  },

  // Login user
  async login(email: string, password: string) {
    try {
      // Hash the password for comparison
      const passwordHash = await hashPassword(password);

      // Query users table for matching email and password hash
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password_hash', passwordHash)
        .limit(1);

      if (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Login failed. Please try again.' };
      }

      if (!users || users.length === 0) {
        return { success: false, message: 'Invalid email or password.' };
      }

      const user = users[0];
      
      // Remove password_hash from user object before storing
      const { password_hash, ...userWithoutPassword } = user;
      
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return { success: true, message: 'Login successful!', user: userWithoutPassword };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
        return null;
      }
    }
    return null;
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
};
