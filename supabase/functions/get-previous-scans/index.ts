// @ts-nocheck
// Edge Function to fetch scans for the authenticated user.

import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2?dts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const authHeader = req.headers.get("Authorization") ?? "";

  const supabaseUserClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    {
      global: {
        headers: { Authorization: authHeader },
      },
    }
  );

  const {
    data: { user },
    error: userError,
  } = await supabaseUserClient.auth.getUser();

  if (userError || !user) {
    return new Response(
      JSON.stringify({ error: "Not authenticated" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data, error } = await supabaseAdmin
    .from("scans")
    .select(
      "id, created_at, user_id, object_path, status, detected_books, recommendations, bucket_id"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("get-previous-scans error", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch scans" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  return new Response(
    JSON.stringify({
      ok: true,
      scans: data ?? [],
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    }
  );
});
