"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function getMonthWindow(date: Date) {
  const start = new Date(date);
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);
  return { start, end };
}

function formatResetDate(date: Date) {
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function UsageMeter({
  used,
  limit,
}: {
  used: number;
  limit: number;
}) {
  const remaining = Math.max(0, limit - used);
  const percent = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>0</span>
        <span>{limit}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-300",
            used >= limit ? "bg-destructive" : "bg-primary"
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
      {used >= limit ? (
        <p className="text-sm font-medium text-destructive">You’ve reached your monthly limit.</p>
      ) : (
        <p className="text-sm text-muted-foreground">
          You can scan {remaining} more time{remaining === 1 ? "" : "s"} this month.
        </p>
      )}
    </div>
  );
}

function FreeUsageCard({
  used,
  resetOn,
}: {
  used: number;
  resetOn: Date;
}) {
  const limit = 5;
  const remaining = Math.max(0, limit - used);

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Plan</p>
          <p className="mt-1 text-base font-semibold text-foreground">Free</p>
          <p className="mt-1 text-sm text-muted-foreground">
            You have <span className="font-semibold text-foreground">{limit}</span> free credits/month.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">This month</p>
          <p className="mt-1 text-base font-semibold text-foreground">
            {used} / {limit} scans
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{remaining} remaining</p>
        </div>
      </div>

      <UsageMeter used={used} limit={limit} />

      <div className="rounded-lg border border-border/60 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
        Upgrade to Premium for <span className="font-semibold text-foreground">$5/month</span> to get{" "}
        <span className="font-semibold text-foreground">50 scans/month</span>.
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Button type="button" disabled className="sm:self-end">
          Upgrade to Premium
        </Button>
      </div>
    </div>
  );
}

function ProUsageCard({
  used,
  renewsOn,
}: {
  used: number;
  renewsOn: Date;
}) {
  const limit = 50;
  const remaining = Math.max(0, limit - used);

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Plan</p>
          <p className="mt-1 text-base font-semibold text-foreground">Premium</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Limit: <span className="font-semibold text-foreground">{limit}</span> scans/month
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">This month</p>
          <p className="mt-1 text-base font-semibold text-foreground">
            {used} / {limit} scans
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{remaining} remaining</p>
        </div>
      </div>

      <UsageMeter used={used} limit={limit} />

      <div className="rounded-lg border border-border/60 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
        Billing renews on <span className="font-semibold text-foreground">{formatResetDate(renewsOn)}</span>.
      </div>
    </div>
  );
}

export default function UsagePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPro, setIsPro] = useState<boolean | null>(null);
  const [numScans, setNumScans] = useState<number>(0);

  const { start, end } = useMemo(() => getMonthWindow(new Date()), []);

  useEffect(() => {
    const loadUsage = async () => {
      setLoading(true);
      setError(null);

      try {
        const supabase = createClient();
        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user ?? null;
        if (!user?.id) {
          setError("You must be signed in to view usage.");
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("is_pro, num_scans")
          .eq("id", user.id)
          .single();

        if (profileError) {
          setError(profileError.message || "Failed to load profile.");
          return;
        }

        setIsPro(typeof profileData?.is_pro === "boolean" ? profileData.is_pro : false);
        setNumScans(typeof profileData?.num_scans === "number" ? profileData.num_scans : 0);
      } catch {
        setError("Something went wrong while loading usage.");
      } finally {
        setLoading(false);
      }
    };

    void loadUsage();
  }, []);

  return (
    <div className="flex flex-1 flex-col px-4 py-8">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <div>
          <h1 className="font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Usage
          </h1>
        </div>

        {loading && (
          <div className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
            Loading usage...
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

        {!loading && !error && (
          isPro ? (
            <ProUsageCard used={numScans} renewsOn={end} />
          ) : (
            <FreeUsageCard used={numScans} resetOn={end} />
          )
        )}
      </div>
    </div>
  );
}

