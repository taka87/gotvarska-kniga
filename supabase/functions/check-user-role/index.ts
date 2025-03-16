// import { createClient } from "@supabase/supabase-js";
// import "https://deno.land/x/dotenv@v3.2.0/load.ts";
// // import { serve } from"https://deno.land/x/supabase_functions@latest/mod.ts";
// // import { serve }from"https://deno.land/x/supabase_functions@1.0.0/mod.ts"; 
// // Импорт на serve
  


// // Инициализирай Supabase клиента
// const supabaseUrl = "https://gryzvkmsfnkbzswnzjyf.supabase.co";
// const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyeXp2a21zZm5rYnpzd256anlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzMDEwNjgsImV4cCI6MjA1Njg3NzA2OH0.R6uONRmOC-iSkBEcQddcmizHtBocNutL6ksIMdtXy1Q";
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // Функция за проверка на ролята на потребителя
// export async function checkUserRole(token: string) {
//   console.log("Received token:", token); // Лог на получения токен

//   if (!token) {
//     console.error("No token provided");
//     throw new Error("Unauthorized");
//   }

//   // Провери потребителя
//   const { data: { user }, error } = await supabase.auth.getUser(token);
//   if (error || !user) {
//     console.error("Error fetching user:", error);
//     throw new Error("Unauthorized");
//   }

//   console.log("Authenticated user:", user); // Лог на аутентицирания потребител

//   // Провери ролята на потребителя
//   const { data: userInfo, error: userInfoError } = await supabase
//     .from("users")
//     .select("role")
//     .eq("id", user.id)
//     .single();

//   if (userInfoError) {
//     console.error("Error fetching user role:", userInfoError);
//     throw new Error("Server error");
//   }

//   console.log("User role:", userInfo?.role); // Лог на ролята на потребителя

//   // Върни ролята на потребителя
//   return { role: userInfo?.role };
// }

// // Основна функция за обработка на заявките
// Deno.serve(async (req) => {
//   console.log("Received request:", req); // Лог на входящата заявка

//   try {
//     const authHeader = req.headers.get("Authorization");
//     const token = authHeader?.replace("Bearer ", "");

//     console.log("Received token:", token); // Лог на получения токен

//     if (!token) {
//       console.error("No token provided");
//       return new Response("Unauthorized", { status: 401 });
//     }

//     const userRole = await checkUserRole(token);
//     return new Response(JSON.stringify(userRole), { headers: { "Content-Type": "application/json" } });
//   } catch (err) {
//     console.error("Server error:", err);
//     return new Response("Server error", { status: 500 });
//   }
// });




//2
// import { createClient } from "@supabase/supabase-js";
// // import "dotenv/config";
// // Ново (работи в Deno):
// import "https://deno.land/x/dotenv@v3.2.0/load.ts";
// // import { environment } from "../../../src/config";
// // import{environment} from "../../../src/environments";
// // import{environmentVariables} from "../../../src/environments";
// // import{environment} from "../../../src/environments";
// // import "dotenv/load.ts";

// // Инициализирай Supabase клиента
// const supabaseUrl = "заместваш с реалните";
// const supabaseAnonKey = "заместваш с реалните";
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // Функция за проверка на ролята на потребителя
// export async function checkUserRole(token: string) {
//   if (!token) {
//     throw new Error("Unauthorized");
//   }

//   // Провери потребителя
//   const { data: { user }, error } = await supabase.auth.getUser(token);
//   if (error || !user) {
//     throw new Error("Unauthorized");
//   }

//   // Провери ролята на потребителя
//   const { data: userInfo, error: userInfoError } = await supabase
//     .from("users")
//     .select("role")
//     .eq("id", user.id)
//     .single();

//   if (userInfoError) {
//     throw new Error("Server error");
//   }

//   // Върни ролята на потребителя
//   return { role: userInfo?.role };
// }