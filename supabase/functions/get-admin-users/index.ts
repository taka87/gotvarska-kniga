//// <reference types="@supabase/functions-js" />

// import { serve } from "https://esm.sh/@supabase/functions-js@0.0.5";

// // import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// import { createClient } from "@supabase/supabase-js";
// import "dotenv/load.ts";
// import { environment } from "../../../src/config";

// import { serve } from "@supabase/functions-js";
// import { createClient } from "@supabase/supabase-js";
// import "dotenv/config";
// import { environment } from "../../../src/config";

// serve(async (req) => {
//   try {
//     // 🔹 Вземи Supabase URL и ключовете
//     const supabaseUrl = environment.SUPABASE_URL;
//     const supabaseAnonKey = environment.SUPABASE_ANON_KEY;
//     const supabase = createClient(supabaseUrl, supabaseAnonKey);

//     // 🔹 Извлечи токена от request-а
//     const authHeader = req.headers.get("Authorization");
//     const token = authHeader?.replace("Bearer ", "");

//     if (!token) {
//       return new Response("Unauthorized", { status: 401 });
//     }

//     // 🔹 Провери потребителя
//     const { data: { user }, error } = await supabase.auth.getUser(token);
//     if (error || !user) {
//       return new Response("Unauthorized", { status: 401 });
//     }

//     // 🔹 Провери ролята на потребителя
//     const { data: userInfo, error: userInfoError } = await supabase
//       .from("users")
//       .select("role")
//       .eq("id", user.id)
//       .single();

//     if (userInfoError) {
//       return new Response(JSON.stringify(userInfoError), { status: 500 });
//     }

//     // 🔹 Върни ролята на потребителя
//     return new Response(JSON.stringify({ role: userInfo?.role }), {
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     return new Response("Server error", { status: 500 });
//   }
// });
