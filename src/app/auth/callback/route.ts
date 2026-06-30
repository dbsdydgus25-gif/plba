import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl;
  const code = searchParams.get("code");
  const role = searchParams.get("role") ?? "alba";

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=no_code`);
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 1. Supabase가 code를 토큰으로 교환
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !data.user) {
    console.error("[auth/callback] exchangeCodeForSession error:", error);
    return NextResponse.redirect(`${origin}/login?error=auth_fail`);
  }

  const authUser = data.user;
  const kakaoId = authUser.id; // Supabase user UUID (카카오 연동)
  const nickname =
    authUser.user_metadata?.name ??
    authUser.user_metadata?.full_name ??
    "카카오 사용자";

  // 2. 기존 유저 조회 (kakao_id)
  const { data: existing } = await supabase
    .from("users")
    .select("id, name, phone")
    .eq("kakao_id", kakaoId)
    .maybeSingle();

  if (existing) {
    // 기존 유저 → 바로 홈으로
    const dest = role === "owner" ? "/app/owner" : "/app/alba";
    const url = new URL(dest, origin);
    url.searchParams.set("uid", existing.id);
    url.searchParams.set("name", encodeURIComponent(existing.name));
    const res = NextResponse.redirect(url);
    res.cookies.set("plba_uid", existing.id, { path: "/", maxAge: 60 * 60 * 24 * 30 });
    res.cookies.set("plba_name", existing.name, { path: "/", maxAge: 60 * 60 * 24 * 30 });
    return res;
  }

  // 3. 신규 유저 → 회원가입 폼으로 (카카오 정보 전달)
  const dest = role === "owner" ? "/owner-signup" : "/join";
  const url = new URL(dest, origin);
  url.searchParams.set("kakao_id", kakaoId);
  url.searchParams.set("kakao_name", encodeURIComponent(nickname));
  return NextResponse.redirect(url);
}
