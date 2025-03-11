const fs = require('fs');
const path = require('path');

const envFilePath = path.join(__dirname, 'src', 'environments', 'environment.ts');

const envContent = `
export const environment = {
  production: ${process.env.NODE_ENV === 'production'},
  googleMapsApiKey: '${process.env.googleMapsApiKey}',
  supabaseUrl: '${process.env.NEXT_PUBLIC_SUPABASE_URL}',
  supabaseKey: '${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}'
};
`;

fs.writeFileSync(envFilePath, envContent);
console.log('Generated environment.ts');