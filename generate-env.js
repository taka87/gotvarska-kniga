const fs = require('fs');
const path = require('path');

const envFilePath = path.join(__dirname, 'src', 'environments', 'environment.ts');

const envContent = `
export const environment = {
  production: ${process.env.NODE_ENV === 'production'},
  googleMapsApiKey: '${process.env.googleMapsApiKey}',
  NEXT_PUBLIC_SUPABASE_URL: '${process.env.NEXT_PUBLIC_SUPABASE_URL}',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: '${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}',
  apiRecipeSearchUrl: '${process.env.apiRecipeSearchUrl}'
};
`;

fs.writeFileSync(envFilePath, envContent);
console.log('Generated environment.ts');