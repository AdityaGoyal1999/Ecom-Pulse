 "use client";

 import { useState, FormEvent } from "react";
 import { Search } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
 } from "@/components/ui/card";

 export function FavoritesSearchSection() {
   const [query, setQuery] = useState("");

   function handleSubmit(event: FormEvent<HTMLFormElement>) {
     event.preventDefault();
     // TODO: Wire this up to your book search API.
     // For now this just prevents a full page reload.
     // You can lift this state up into the page when you are ready.
     // eslint-disable-next-line no-console
     console.log("Search favorites for:", query);
   }

   return (
     <section aria-labelledby="favorites-search-heading">
       <Card className="border-border/60 bg-card/70 shadow-sm backdrop-blur">
         <CardHeader className="space-y-1">
           <CardTitle
             id="favorites-search-heading"
             className="text-base font-semibold tracking-tight sm:text-lg"
           >
             Search for a book
           </CardTitle>
           <CardDescription className="text-sm">
             Find books to add to your favorites and improve your recommendations.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <form
             onSubmit={handleSubmit}
             className="flex flex-col gap-3 sm:flex-row sm:items-center"
           >
             <div className="flex-1">
               <Input
                 type="search"
                 placeholder="Search by title, author, or ISBN"
                 value={query}
                 onChange={(event) => setQuery(event.target.value)}
                 className="w-full"
               />
             </div>
             <Button
               type="submit"
               className="inline-flex items-center gap-2 whitespace-nowrap px-4"
             >
               <Search className="size-4" />
               <span className="hidden sm:inline">Search</span>
               <span className="sm:hidden">Go</span>
             </Button>
           </form>
           <p className="mt-3 text-xs text-muted-foreground">
             Tip: start with a few books you already love.{" "}
             We&apos;ll use them to fine-tune your recommendations.
           </p>
         </CardContent>
       </Card>
     </section>
   );
 }

