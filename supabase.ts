import { createClient } from '@supabase/supabase-js';
import { environment } from './src/environments/environment';

const supabaseUrl = environment.supabaseUrl;
const supabaseKey = environment.supabaseKey;
if (!supabaseUrl || !supabaseKey) {
  throw new Error("❌ SUPABASE_URL или SUPABASE_ANON_KEY не са зададени!");
}

export const supabase = createClient(supabaseUrl, supabaseKey);