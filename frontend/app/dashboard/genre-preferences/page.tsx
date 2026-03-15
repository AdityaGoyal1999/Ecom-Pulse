export default function GenrePreferencesPage() {
  return (
    <div className="flex flex-1 flex-col px-4 py-8">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <div>
          <h1 className="font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Genre preferences
          </h1>
          <p className="mt-2 text-muted-foreground">
            Tell us which genres you like for better recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}
