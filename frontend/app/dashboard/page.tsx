export default function DashboardPage() {
  // Note: In Next.js app router, `redirect` throws to perform a server redirect.
  // This makes /dashboard behave as the app's landing page for logged-in users.
  const { redirect } = require("next/navigation");
  redirect("/dashboard/new-image");
}
