"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import OwnerWebLayout from "@/components/owner/OwnerWebLayout";
import OwnerMobileLayout from "@/components/owner/OwnerMobileLayout";

export type OwnerWebTab = "dashboard" | "attendance" | "payroll" | "schedule" | "staff" | "onboarding";

export default function OwnerPage() {
  const router = useRouter();
  const [webTab, setWebTab] = useState<OwnerWebTab>("dashboard");

  return (
    <>
      {/* Web layout (md+) — full screen */}
      <div className="hidden md:flex" style={{ minHeight: "100vh", background: "#fafafb" }}>
        <OwnerWebLayout tab={webTab} onTabChange={setWebTab} onLogout={() => router.push("/login")} />
      </div>

      {/* Mobile layout (<md) */}
      <div className="flex md:hidden min-h-screen" style={{ background: "#fff" }}>
        <OwnerMobileLayout onLogout={() => router.push("/login")} />
      </div>
    </>
  );
}
