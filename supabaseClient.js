// supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// Your Supabase project URL and anon key
const SUPABASE_URL = 'https://your-project-url.supabase.co';  // Replace with your actual Supabase URL
const SUPABASE_ANON_KEY = 'your-anon-key';  // Replace with your actual anon key

// Create and export the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export default supabase;
