import { createClient } from '@supabase/supabase-js';
import { environment } from './src/environments/environment';

const supabaseUrl = environment.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = environment.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);


// const SUPABASE_URL = 'https://your-supabase-url.supabase.co';
// const SUPABASE_KEY = 'your-public-anon-key';

// // Проверяваме дали сме в браузър
// const isBrowser = typeof window !== 'undefined';

// export const supabase = isBrowser
//   ? createClient(SUPABASE_URL, SUPABASE_KEY)
//   : null;