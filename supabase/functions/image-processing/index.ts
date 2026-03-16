// @ts-nocheck
import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2?dts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  try {
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

    const payload = (await req.json().catch(() => null)) as
      | { bucket_id?: string; object_path?: string; status?: string }
      | null;

    const bucketId = payload?.bucket_id?.trim();
    const objectPath = payload?.object_path?.trim();
    const status = payload?.status?.trim() || "pending";

    if (!bucketId || !objectPath) {
      return new Response(
        JSON.stringify({
          error: "Invalid payload, expected { bucket_id, object_path }",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: inserted, error: insertError } = await supabaseAdmin
      .from("scans")
      .insert({
        user_id: user.id,
        bucket_id: bucketId,
        object_path: objectPath,
        status,
        detected_books: [],
        recommendations: [],
      })
      .select("id, user_id, bucket_id, object_path, status, created_at")
      .single();

    if (insertError) {
      console.error("image-processing insert error", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to create scan entry" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("image-processing created scan:", inserted);

    return new Response(
      JSON.stringify({
        message: "file uploaded",
        scan: inserted,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error in image-processing function:", error);

    return new Response(
      JSON.stringify({ error: "internal error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});

