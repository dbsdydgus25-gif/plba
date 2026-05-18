import { createClient } from "@supabase/supabase-js";

// service_role key — RLS 우회, 서버 전용
// 절대 클라이언트에 노출하면 안 됨
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!url || !key) {
    throw new Error("Supabase service role 환경변수가 설정되지 않았습니다.");
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
