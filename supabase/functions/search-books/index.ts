// @ts-nocheck
import "@supabase/functions-js/edge-runtime.d.ts";
import Fuse from "https://esm.sh/fuse.js@7.1.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2?dts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

type OpenLibraryDoc = {
  key: string;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
};

type OpenLibrarySearchResponse = {
  docs?: OpenLibraryDoc[];
};

function tokensForOpenLibrarySearch(trimmed: string): string[] {
  const raw = trimmed.split(/\s+/).filter(Boolean);
  const significant = raw.filter((t) => t.length >= 2);
  return significant.length > 0 ? significant : raw;
}

async function fetchOpenLibraryDocsForToken(token: string): Promise<OpenLibraryDoc[]> {
  const url = new URL("https://openlibrary.org/search.json");
  url.searchParams.set("q", token);
  url.searchParams.set("limit", "10");

  const response = await fetch(url.toString(), { headers: { Accept: "application/json" } });
  if (!response.ok) {
    throw new Error(`Open Library search failed: ${response.status}`);
  }

  const data = (await response.json()) as OpenLibrarySearchResponse;
  const docs = Array.isArray(data.docs) ? data.docs : [];
  return docs.filter((d): d is OpenLibraryDoc => typeof d?.key === "string" && d.key.length > 0);
}

async function getAuthenticatedUser(authHeader: string) {
  const supabaseUserClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    {
      global: { headers: { Authorization: authHeader } },
    }
  );

  const {
    data: { user },
    error,
  } = await supabaseUserClient.auth.getUser();

  if (error || !user) throw new Error("Not authenticated");
  return user;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const authHeader = req.headers.get("Authorization") ?? "";
  const user = await getAuthenticatedUser(authHeader).catch(() => null);
  if (!user) {
    return jsonResponse({ error: "Not authenticated" }, 401);
  }

  const body = (await req.json().catch(() => null)) as { query?: unknown } | null;
  const query = typeof body?.query === "string" ? body.query.trim() : "";
  if (!query) {
    return jsonResponse({ error: "Invalid payload, expected { query: string }" }, 400);
  }

  try {
    const tokens = tokensForOpenLibrarySearch(query);

    const perTokenResults = await Promise.all(
      tokens.map((token) => fetchOpenLibraryDocsForToken(token))
    );

    const byKey = new Map<string, OpenLibraryDoc>();
    for (const docs of perTokenResults) {
      for (const doc of docs) {
        if (!byKey.has(doc.key)) byKey.set(doc.key, doc);
      }
    }

    const candidates = Array.from(byKey.values());
    if (candidates.length === 0) {
      return jsonResponse({ docs: [] }, 200);
    }

    type FuseRow = { key: string; title: string; authorsJoined: string; doc: OpenLibraryDoc };
    const rows: FuseRow[] = candidates.map((doc) => ({
      key: doc.key,
      title: doc.title?.trim() ?? "",
      authorsJoined: Array.isArray(doc.author_name) ? doc.author_name.join(" ") : "",
      doc,
    }));

    const fuse = new Fuse(rows, {
      keys: [
        { name: "title", weight: 0.55 },
        { name: "authorsJoined", weight: 0.45 },
      ],
      threshold: 0.42,
      ignoreLocation: true,
      includeScore: true,
    });

    const ranked = fuse.search(query);
    const topFive = ranked.slice(0, 5).map((r: any) => r.item.doc as OpenLibraryDoc);

    return jsonResponse({ docs: topFive }, 200);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to fetch results";
    return jsonResponse({ error: message }, 500);
  }
});

