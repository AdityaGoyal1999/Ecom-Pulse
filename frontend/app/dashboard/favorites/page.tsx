import { FavoritesSearchSection } from "@/components/dashboard-favorites-search";
import { FavoritesListSection } from "@/components/dashboard-favorites-list";

export default function FavoritesPage() {
  return (
    <div className="flex flex-1 flex-col px-4 py-8">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <header className="space-y-2">
          <h1 className="font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            My favorites
          </h1>
          <p className="text-sm text-muted-foreground">
            Add books you love, then use them to power smarter recommendations.
          </p>
        </header>

        <FavoritesSearchSection />
        <FavoritesListSection />
      </div>
    </div>
  );
}
