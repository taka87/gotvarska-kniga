import { createClient } from '@supabase/supabase-js';
// import { environment } from './environments/environment'; // Правилен път до environment
import { environment } from './src/environments/environment';

const supabaseUrl = environment.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = environment.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseKey || !supabaseUrl.startsWith('https://')) {
//     throw new Error("❌ Грешка: Supabase URL или ключът не са валидни!");
//   }
  
// // ✅ Добавяме валидация за URL-a
// if (!supabaseUrl || !supabaseKey || !supabaseUrl.startsWith('https://')) {
//   console.error("❌ Грешка: Supabase URL или ключът не са валидни!", {
//     supabaseUrl,
//     supabaseKey
//   });
// } else {
//   console.log("✅ Supabase Client се стартира успешно!");
// }

export const supabase = createClient(supabaseUrl, supabaseKey);

// пробвай да го позиционираш както googleMapsAPiKEY!!!
// локално влиза в ОК верселк вслиза в грешка

// const SUPABASE_URL = 'https://your-supabase-url.supabase.co';
// const SUPABASE_KEY = 'your-public-anon-key';

// // Проверяваме дали сме в браузър
// const isBrowser = typeof window !== 'undefined';

// export const supabase = isBrowser
//   ? createClient(SUPABASE_URL, SUPABASE_KEY)
//   : null;