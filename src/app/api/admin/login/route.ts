import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signAdminToken, COOKIE_NAME } from "@/lib/admin-auth";

// Node.js 전용 모듈(bcryptjs) 사용 — Edge Runtime 비활성화
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json({ error: "비밀번호를 입력해 주세요." }, { status: 400 });
    }

    // 환경변수에 저장된 bcrypt 해시와 비교
    const hashedPassword = process.env.ADMIN_PASSWORD_HASH;
    if (!hashedPassword) {
      return NextResponse.json({ error: "서버 설정 오류입니다." }, { status: 500 });
    }

    const isValid = await bcrypt.compare(password, hashedPassword);
    if (!isValid) {
      // 로그인 실패 — 구체적인 이유 노출 금지 (보안)
      return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
    }

    // JWT 발급
    const token = await signAdminToken();

    const res = NextResponse.json({ ok: true });
    // httpOnly 쿠키 — JS에서 접근 불가 (XSS 방지)
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 8, // 8시간
      path: "/",
    });

    return res;
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
