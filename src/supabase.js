import { createClient } from '@supabase/supabase-js'
import { supabaseAnonKey, supabaseUrl } from '@/constant/index'



export const supabase = createClient(supabaseUrl, supabaseAnonKey)

