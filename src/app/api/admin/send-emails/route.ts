import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/admin-auth";
import { createServiceClient } from "@/lib/supabase/service";

// Node.js 전용 모듈(resend) 사용 — Edge Runtime 비활성화
export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

// 선택한 등록자들에게 이메일 일괄 발송
export async function POST(req: NextRequest) {
  // JWT 검증
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  try {
    const { ids } = await req.json(); // 선택한 등록 id 배열
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "발송할 대상을 선택해 주세요." }, { status: 400 });
    }

    const supabase = createServiceClient();

    // 대상 조회
    const { data: targets, error } = await supabase
      .from("pre_registrations")
      .select("id, store_name, email")
      .in("id", ids);

    if (error || !targets) throw error;

    // 배치 발송 (순차 처리 — rate limit 방지)
    const results = [];
    for (const t of targets) {
      try {
        await resend.emails.send({
          from: "플바 <noreply@plba.co.kr>",
          to: t.email,
          subject: "[플바] 사전등록이 완료되었습니다 🎉",
          html: buildConfirmationEmail({ storeName: t.store_name }),
        });

        // 발송 완료 표시
        await supabase
          .from("pre_registrations")
          .update({ email_sent: true, email_sent_at: new Date().toISOString() })
          .eq("id", t.id);

        results.push({ id: t.id, email: t.email, ok: true });
      } catch (err) {
        results.push({ id: t.id, email: t.email, ok: false, error: String(err) });
      }
    }

    const successCount = results.filter(r => r.ok).length;
    return NextResponse.json({ ok: true, results, successCount, total: targets.length });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

// 이메일 템플릿 (register route와 동일 구조)
function buildConfirmationEmail({ storeName }: { storeName: string }) {
  return `
<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F4F6FA;font-family:'Apple SD Gothic Neo','Pretendard',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F6FA;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr><td style="background:linear-gradient(135deg,#5b5bd6,#7C6EE6);padding:36px 40px;text-align:center;">
          <span style="font-size:22px;font-weight:900;color:#fff;">plba.</span>
          <p style="color:rgba(255,255,255,0.8);font-size:13px;margin:8px 0 0;">성과형 소상공인 마케팅 플랫폼</p>
        </td></tr>
        <tr><td style="padding:40px;">
          <div style="text-align:center;margin-bottom:28px;">
            <div style="font-size:40px;margin-bottom:16px;">🎉</div>
            <h1 style="font-size:22px;font-weight:900;color:#191F28;margin:0 0 8px;">사전등록이 완료되었습니다!</h1>
            <p style="font-size:15px;color:#6B7684;margin:0;line-height:1.6;">
              <strong style="color:#191F28;">${storeName}</strong> 사장님, 담당자가 24시간 내 연락드립니다.
            </p>
          </div>
          <div style="background:linear-gradient(135deg,#5b5bd6,#7C6EE6);border-radius:16px;padding:20px 24px;text-align:center;">
            <p style="color:rgba(255,255,255,0.7);font-size:12px;margin:0 0 6px;font-weight:600;">초기 파트너 혜택</p>
            <p style="color:#fff;font-size:20px;font-weight:900;margin:0;">2만원 상당 포인트 무상 지원</p>
          </div>
        </td></tr>
        <tr><td style="background:#F4F6FA;padding:20px 40px;text-align:center;border-top:1px solid #E8EBF0;">
          <p style="font-size:11px;color:#8B95A1;margin:0;">주식회사 플바 · <a href="mailto:hello@plba.co.kr" style="color:#5b5bd6;">hello@plba.co.kr</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();
}
