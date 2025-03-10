import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://your-supabase-url.supabase.co';
const SUPABASE_KEY = 'your-public-anon-key';

// Проверяваме дали сме в браузър
const isBrowser = typeof window !== 'undefined';

export const supabase = isBrowser
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;