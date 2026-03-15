import {
  ScanLine,
  BookOpen,
  SlidersHorizontal,
  Sparkles,
  MapPin,
  Zap,
  type LucideIcon,
} from "lucide-react";

const features: {
  icon: LucideIcon;
  title: string;
  benefit: string;
}[] = [
  {
    icon: ScanLine,
    title: "Snap the shelf",
    benefit: "Point your phone at any bookstore shelf—we'll suggest which books you're most likely to enjoy from that very display.",
  },
  {
    icon: BookOpen,
    title: "Goodreads-powered taste",
    benefit: "Recommendations are tailored using your Goodreads history and ratings, so picks match what you actually like.",
  },
  {
    icon: SlidersHorizontal,
    title: "Your preferences",
    benefit: "Pre-set genres, moods, and length—so every suggestion fits your current vibe without extra filtering.",
  },
  {
    icon: Sparkles,
    title: "AI-personalized picks",
    benefit: "Our AI combines your profile and the shelf in front of you to surface the highest-ROI reads for you.",
  },
  {
    icon: MapPin,
    title: "Built for in-store discovery",
    benefit: "Designed for the moment you walk into a store—no more guessing or reading hundreds of blurbs.",
  },
  {
    icon: Zap,
    title: "Skip the endless browse",
    benefit: "Get a shortlist of books you'll love instead of scrolling through summaries—discover faster, read better.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border bg-background py-16 md:py-24">
      <div className="container px-4">
        <h2 className="font-sans text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          Discover your next read, not the whole shelf
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Snap a shelf, connect Goodreads, set your preferences—get AI-powered
          picks tailored to you so you spend less time browsing and more time reading.
        </p>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, benefit }) => (
            <div
              key={title}
              className="flex gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/30 hover:bg-card/80"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-sans font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
