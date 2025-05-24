import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthClient } from '@supabase/gotrue-js';
import { PostgrestClient } from '@supabase/postgrest-js';

const supabaseUrl = 'https://ikbwcgqloycayignsopk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrYndjZ3Fsb3ljYXlpZ25zb3BrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5Mzc1NTAsImV4cCI6MjA2MzUxMzU1MH0.6bYFrjzoEuuKynrU3p1LCyeBw5Lz5bjRJRj-BOmVxbs';

const auth = new AuthClient({
  url: `${supabaseUrl}/auth/v1`,
  autoRefreshToken: true,
  persistSession: true,
  storageKey: 'supabase.auth.token',
  storage: AsyncStorage,
  fetch,
  headers: {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
  },
});

const db = new PostgrestClient(`${supabaseUrl}/rest/v1`, {
  headers: {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
  },
  fetch,
});

const supabase = {
  auth,
  db,
};

export default supabase;
