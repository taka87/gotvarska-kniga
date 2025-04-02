import { environmentVariables } from "./environment.variables";

export const environment = {
  production: false,
  googleMapsApiKey: environmentVariables.googleMapsApiKey ,
  NEXT_PUBLIC_SUPABASE_URL: environmentVariables.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: environmentVariables.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  apiFoodSearchUrl: environmentVariables.apiFoodSearchUrl,
  apiRecipeSearchUrl: environmentVariables.apiRecipeSearchUrl
};
