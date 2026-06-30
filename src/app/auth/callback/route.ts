import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const role = searchParams.get("role") ?? "alba";

  if (!code) {
    return NextResponse.redirect(`${origin}/login`);
  }

  const response = NextResponse.redirect(`${origin}/login`); // placeholder

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/login`);
  }

  const kakaoId = data.user.id;
  const nickname =
    data.user.user_metadata?.name ??
    data.user.user_metadata?.full_name ??
    "카카오 사용자";

  // 기존 유저 확인
  const { data: existing } = await supabase
    .from("users")
    .select("id, name, role")
    .eq("id", kakaoId)
    .maybeSingle();

  if (existing && existing.role === role) {
    // 로그인 성공 → 홈으로
    const dest = role === "owner" ? "/owner" : "/app/alba";
    const url = `${origin}${dest}?uid=${existing.id}&name=${encodeURIComponent(existing.name)}`;
    const res = NextResponse.redirect(url);
    response.cookies.getAll().forEach(({ name, value, ...opts }) => {
      res.cookies.set(name, value, opts as Parameters<typeof res.cookies.set>[2]);
    });
    return res;
  }

  // 신규 유저 → 회원가입
  const dest = role === "owner" ? "/owner-signup" : "/join";
  const url = `${origin}${dest}?kakao_id=${encodeURIComponent(kakaoId)}&kakao_name=${encodeURIComponent(nickname)}`;
  const res = NextResponse.redirect(url);
  response.cookies.getAll().forEach(({ name, value, ...opts }) => {
    res.cookies.set(name, value, opts as Parameters<typeof res.cookies.set>[2]);
  });
  return res;
}
