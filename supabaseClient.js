// supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// Your Supabase project URL and anon key
const SUPABASE_URL = 'https://exgyekfwnztnaawaueuu.supabase.co';  // Replace with your actual Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4Z3lla2Z3bnp0bmFhd2F1ZXV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzYzNDksImV4cCI6MjA1MjUxMjM0OX0.XecyfG2CsjzhVySSo7YfaTAEDBYRGmlAuKnl6KAX_YU';  // Replace with your actual anon key

// Create and export the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export default supabase;
