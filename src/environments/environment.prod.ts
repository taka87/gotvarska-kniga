export const environment = {
  production: true,
  googleMapsApiKey: 'googleMapsApiKey',
  NEXT_PUBLIC_SUPABASE_URL: 'NEXT_PUBLIC_SUPABASE_URL',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
};

console.log("✅ Production environment loaded!");
console.log("🔍 Supabase URL:->", environment.googleMapsApiKey);
console.log("🔍 Supabase Key:->>", environment.NEXT_PUBLIC_SUPABASE_ANON_KEY);
console.log("🔍 Supabase Key: ->>>", environment.NEXT_PUBLIC_SUPABASE_URL);