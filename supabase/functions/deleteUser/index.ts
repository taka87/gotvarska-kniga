import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, DELETE",
        "Access-Control-Allow-Headers": "authorization, content-type",
      },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return new Response(JSON.stringify({ error: "Missing user ID" }), {
      status: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }

  // 1️⃣ Изтриваме всички рецепти на потребителя
  const { error: recipeError } = await supabase
    .from("user_recipes")
    .delete()
    .eq("user_id", userId);

  if (recipeError) {
    return new Response(JSON.stringify({ error: recipeError.message }), {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }

  // 2️⃣ Изтриваме потребителя
  const { error: userError } = await supabase.from("users").delete().eq("id", userId);

  if (userError) {
    return new Response(JSON.stringify({ error: userError.message }), {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }

  return new Response(JSON.stringify({ message: "User and related recipes deleted" }), {
    status: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
  });
});