import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/admin-auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /admin/dashboard 이상 접근 시 JWT 검증
  if (pathname.startsWith("/admin/dashboard")) {
    const token = req.cookies.get(COOKIE_NAME)?.value;

    if (!token || !(await verifyAdminToken(token))) {
      // 미인증 → 로그인 페이지로 리다이렉트
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
