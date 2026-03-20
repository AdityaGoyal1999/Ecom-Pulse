"use client";

import { Button } from "@/components/ui/button";

export function DashboardOnboardingTrigger() {
  const handleStartOnboarding = () => {
    window.dispatchEvent(new Event("book:onboarding-start"));
  };

  return (
    <div className="fixed right-4 top-3 z-50">
      <Button type="button" variant="outline" size="sm" onClick={handleStartOnboarding}>
        Demo App
      </Button>
    </div>
  );
}

