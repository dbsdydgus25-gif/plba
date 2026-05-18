import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/admin-auth";
import { createServiceClient } from "@/lib/supabase/service";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  // JWT 검증
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  try {
    const supabase = createServiceClient();

    const { data, error } = await supabase
      .from("pre_registrations")
      .select("id, store_name, contact, email, category, email_sent, email_sent_at, admin_memo, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (err) {
    console.error("[admin/registrations] DB 조회 실패:", err);
    return NextResponse.json({ error: "데이터 조회에 실패했습니다." }, { status: 500 });
  }
}
