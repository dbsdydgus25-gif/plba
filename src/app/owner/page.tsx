"use client";
import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import OwnerWebLayout from "@/components/owner/OwnerWebLayout";
import OwnerMobileLayout from "@/components/owner/OwnerMobileLayout";

export type OwnerWebTab = "dashboard" | "attendance" | "payroll" | "schedule" | "staff" | "onboarding";

function OwnerInner() {
  const router = useRouter();
  const [webTab, setWebTab] = useState<OwnerWebTab>("dashboard");

  return (
    <>
      <div className="hidden md:flex" style={{ minHeight: "100vh", background: "#fafafb" }}>
        <OwnerWebLayout tab={webTab} onTabChange={setWebTab} onLogout={() => router.push("/login")} />
      </div>
      <div className="flex md:hidden min-h-screen" style={{ background: "#fff" }}>
        <OwnerMobileLayout onLogout={() => router.push("/login")} />
      </div>
    </>
  );
}

export default function OwnerPage() {
  return (
    <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>로딩 중...</div>}>
      <OwnerInner />
    </Suspense>
  );
}
