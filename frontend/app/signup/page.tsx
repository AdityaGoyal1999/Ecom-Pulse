import { Header } from "@/components/Header";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 pt-14 sm:px-6 lg:px-8">
        <h1 className="font-sans text-3xl font-bold text-foreground">Sign up</h1>
      </main>
    </div>
  );
}
