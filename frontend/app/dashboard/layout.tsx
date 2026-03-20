import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardOnboardingTrigger } from "@/components/dashboard-onboarding-trigger";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardOnboardingTrigger />
      <DashboardSidebar>{children}</DashboardSidebar>
    </>
  );
}
