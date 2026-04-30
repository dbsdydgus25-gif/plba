import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 프론트엔드 UI 구축을 위해 임시로 권한 체크 우회
  const mockRole = "worker"; // 또는 "owner"

  return (
    <>
      <main className="min-h-[100dvh] pb-[env(safe-area-inset-bottom)] bg-white text-black">
        {children}
      </main>
      <BottomNav role={mockRole} />
    </>
  );
}
