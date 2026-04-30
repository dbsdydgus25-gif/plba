import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 프론트엔드 UI 구축을 위해 임시로 권한 체크 우회
  return <div className="bg-white text-black min-h-screen">{children}</div>;
}
