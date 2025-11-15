import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://bmrjhswztnjbsjiaporo.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcmpoc3d6dG5qYnNqaWFwb3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMTc1NTYsImV4cCI6MjA3ODY5MzU1Nn0.M7L3vu7EoB31obu5m5RCYRhrnwngLc1qNNEbT8ns_Uw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});
