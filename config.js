
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://exgyekfwnztnaawaueuu.supabase.co'
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
const supabase = createClient( SUPABASE_URL,SUPABASE_ANON_KEY)