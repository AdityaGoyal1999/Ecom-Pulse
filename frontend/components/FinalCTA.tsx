import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="border-t border-border bg-muted/30 py-16 md:py-24">
      <div className="container px-4 text-center">
        <h2 className="font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          Start your free trial
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Detect failures before they hurt your business—downtime, broken
          checkouts, and missed orders—so you can fix them before customers
          notice.
        </p>
        <div className="mt-8">
          <Link
            href="/signup"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get started free
          </Link>
        </div>
      </div>
    </section>
  );
}
