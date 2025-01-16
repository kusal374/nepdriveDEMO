
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://exgyekfwnztnaawaueuu.supabase.co'
const SUPABASE_ANON_KEY = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
