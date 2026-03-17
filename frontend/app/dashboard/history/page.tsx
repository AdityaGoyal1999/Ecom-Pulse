"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ChevronRight } from "lucide-react";

type ScanItem = {
  id: number;
  created_at: string;
  status: string;
};

export default function HistoryPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scans, setScans] = useState<ScanItem[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      setError(null);

      try {
        const supabase = createClient();
        const { data, error } = await supabase.functions.invoke("get-previous-scans");

        if (error) {
          setError(error.message || "Failed to load history.");
          return;
        }

        const rawScans = Array.isArray(data?.scans) ? data.scans : [];
        const parsed = rawScans.filter((scan: unknown): scan is ScanItem => {
          const s = scan as Partial<ScanItem>;
          return (
            typeof s.id === "number" &&
            typeof s.created_at === "string" &&
            typeof s.status === "string"
          );
        });

        setScans(parsed);
      } catch {
        setError("Something went wrong while loading history.");
      } finally {
        setLoading(false);
      }
    };

    void loadHistory();
  }, []);

  return (
    <div className="flex flex-1 flex-col px-4 py-8">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div>
          <h1 className="font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            History
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your previous scans and recommendations.
          </p>
        </div>

        {loading && (
          <div className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
            Loading history...
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {error}
          </div>
        )}

        {!loading && !error && scans.length === 0 && (
          <div className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
            No scans found yet.
          </div>
        )}

        {!loading && !error && scans.length > 0 && (
          <div className="space-y-4">
            {scans.map((scan) => (
              <button
                key={scan.id}
                type="button"
                onClick={() => {}}
                className="w-full rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-muted/40 sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-foreground">
                    {new Date(scan.created_at).toLocaleString()}
                  </p>
                  <ChevronRight className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Status: {scan.status}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
