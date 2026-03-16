 import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
 } from "@/components/ui/card";

 type FavoriteBook = {
   id: string;
   title: string;
   author: string;
   coverUrl?: string | null;
 };

 const placeholderFavorites: FavoriteBook[] = [
   {
     id: "1",
     title: "Your favorite books will appear here",
     author: "Start liking books to see them in this list",
   },
 ];

 export function FavoritesListSection({
   favorites,
 }: {
   favorites?: FavoriteBook[];
 }) {
   const items = favorites && favorites.length > 0 ? favorites : placeholderFavorites;

   return (
     <section aria-labelledby="favorites-list-heading" className="space-y-3">
       <div className="flex items-baseline justify-between gap-2">
         <div>
           <h2
             id="favorites-list-heading"
             className="font-sans text-lg font-semibold tracking-tight text-foreground sm:text-xl"
           >
             Previously liked books
           </h2>
           <p className="text-sm text-muted-foreground">
             These books help us understand your taste better.
           </p>
         </div>
         {favorites && favorites.length > 0 && (
           <p className="text-xs text-muted-foreground">
             {favorites.length}{" "}
             {favorites.length === 1 ? "book" : "books"}
           </p>
         )}
       </div>

       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
         {items.map((book) => (
           <Card
             key={book.id}
             className="group flex flex-col overflow-hidden border-border/60 bg-card/70 shadow-sm transition-shadow hover:shadow-md"
           >
             <CardHeader className="space-y-1 pb-2">
               <CardTitle className="line-clamp-2 text-sm font-semibold">
                 {book.title}
               </CardTitle>
               <CardDescription className="line-clamp-2 text-xs">
                 {book.author}
               </CardDescription>
             </CardHeader>
             {book.coverUrl && (
               <div className="relative mx-4 mb-3 aspect-[3/4] overflow-hidden rounded-md bg-muted" />
             )}
             <CardContent className="mt-auto pb-4 pt-0">
               <p className="text-xs text-muted-foreground">
                 Liked via What to read AI?
               </p>
             </CardContent>
           </Card>
         ))}
       </div>
     </section>
   );
 }

