import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Extracted from your PostgreSQL connection string
const SUPABASE_URL = 'https://akpdwhgeeaqwrsncvjly.supabase.co';
// You need to get the anon key from Supabase dashboard
// Go to: Settings → API → Project API keys → anon public
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrcGR3aGdlZWFxd3JzbmN2amx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNjYzODgsImV4cCI6MjA4NjY0MjM4OH0.M_xgJhi9nSmJ86V4vXxIJAB9pZg7VwL0MkZGjTxS75I';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auth service
export const AuthService = {
  // Sign up with email and password
  signUp: async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Sign out
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return { user, error: null };
    } catch (error) {
      return { user: null, error };
    }
  },

  // Get current session
  getSession: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return { session, error: null };
    } catch (error) {
      return { session: null, error };
    }
  },

  // Listen to auth state changes
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },

  // Reset password
  resetPassword: async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};
