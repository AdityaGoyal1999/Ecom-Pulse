"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs: { question: string; answer: string }[] = [
  {
    question: "How does the shelf snap work?",
    answer:
      "You take or upload a photo of a bookstore shelf. We identify the books in the image and combine that with your Goodreads profile and preferences to suggest which titles from that display you're most likely to enjoy.",
  },
  {
    question: "Do I need a Goodreads account?",
    answer:
      "Yes. Connecting Goodreads lets us tailor recommendations to your reading history and ratings. You can also set preferences in the app (genres, mood, length), but picks are more accurate with Goodreads linked.",
  },
  {
    question: "Is my Goodreads data secure?",
    answer:
      "Yes. We use your Goodreads data only to power your recommendations. We do not share it with third parties, and we use encryption in transit and at rest. We only access what is needed to personalize your picks.",
  },
  {
    question: "Can I use it without being in a store?",
    answer:
      "The main use case is in-store: snap a shelf and get picks. You can also use photos of shelves from elsewhere (e.g. a friend's photo or an online image) to get personalized recommendations from that set of books.",
  },
  {
    question: "What if I don't see my favorite genres?",
    answer:
      "You can set and update your preferences—genres, mood, length—in the app. Those are used together with Goodreads to filter and rank suggestions so you see picks that match your taste.",
  },
  {
    question: "How much does it cost?",
    answer:
      "We're focused on making discovery better for readers. Pricing details will be shared when we launch—there will be a free tier to get started, with optional upgrades for power users.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-border bg-background py-16 md:py-24">
      <div className="container px-4">
        <h2 className="font-sans text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Quick answers about how it works, Goodreads, and your data.
        </p>

        <div className="mx-auto mt-12 max-w-2xl space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-lg border border-border bg-card transition-colors hover:border-border/80"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded-lg"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  {faq.question}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`overflow-hidden transition-[height] duration-200 ease-out ${isOpen ? "visible" : "hidden"}`}
                >
                  <p className="border-t border-border px-5 py-4 text-sm text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
