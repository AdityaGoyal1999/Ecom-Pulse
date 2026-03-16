import Link from "next/link";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center overflow-hidden rounded-3xl px-6 pt-14 text-center">
      {/* Background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[url('/hero-image.jpg')] bg-cover bg-center"
      />

      {/* Dreamy overlays */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-background/30 via-background/65 to-background"
      />
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 bg-[radial-gradient(closest-side,rgba(255,255,255,0.35),rgba(255,255,255,0)_70%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 backdrop-blur-[2px]"
      />

      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="font-sans text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Personalized book recommendations in no time
        </h1>
        <p className="text-lg text-muted-foreground sm:text-xl">
          Ever visited a bookstore and struggled to find which book you might read?
          Searching through summaries of all the books is cumbersome and not possible.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/signup"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get started
          </Link>
          <Link
            href="#"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
          >
            See how it works
          </Link>
        </div>
      </div>
    </section>
  );
}
