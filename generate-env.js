const fs = require('fs');
const path = require('path');

const envFilePath = path.join(__dirname, 'src', 'environments', 'environment.ts');

const envContent = `
export const environment = {
  production: ${process.env.NODE_ENV === 'production'},
  googleMapsApiKey: '${process.env.GOOGLE_MAPS_API_KEY}',
  apiUrl: '${process.env.API_URL}',
  supabaseUrl: '${process.env.SUPABASE_URL}',
  supabaseKey: '${process.env.SUPABASE_KEY}'
};
`;

fs.writeFileSync(envFilePath, envContent);
console.log('Generated environment.ts');