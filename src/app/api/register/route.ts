import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

// Node.js 전용 모듈(resend) 사용 — Edge Runtime 비활성화
export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

// anon key 사용 — RLS INSERT 정책으로 허용
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { store_name, contact, email, category } = await req.json();

    // 입력값 검증
    if (!store_name?.trim() || !contact?.trim() || !email?.trim() || !category) {
      return NextResponse.json({ error: "모든 항목을 입력해 주세요." }, { status: 400 });
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "올바른 이메일 형식을 입력해 주세요." }, { status: 400 });
    }

    // 1. Supabase에 저장
    const { data: reg, error: dbError } = await supabase
      .from("pre_registrations")
      .insert({
        store_name: store_name.trim(),
        contact: contact.trim(),
        email: email.trim().toLowerCase(),
        category,
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("[register] DB 저장 실패:", dbError);
      return NextResponse.json({ error: "등록에 실패했습니다. 잠시 후 다시 시도해 주세요." }, { status: 500 });
    }

    // 2. 확인 이메일 발송 (Resend API)
    let emailSent = false;
    try {
      await resend.emails.send({
        from: "플바 <noreply@plba.co.kr>",  // Resend에서 도메인 인증 후 변경
        to: email.trim(),
        subject: "[플바] 사전등록이 완료되었습니다 🎉",
        html: buildConfirmationEmail({ storeName: store_name.trim() }),
      });
      emailSent = true;

      // 이메일 발송 완료 표시 업데이트
      await supabase
        .from("pre_registrations")
        .update({ email_sent: true, email_sent_at: new Date().toISOString() })
        .eq("id", reg.id);
    } catch (emailErr) {
      // 이메일 발송 실패해도 등록 자체는 성공 처리
      console.error("[register] 이메일 발송 실패:", emailErr);
    }

    return NextResponse.json({
      ok: true,
      emailSent,
      message: emailSent
        ? "등록이 완료되었습니다! 확인 이메일을 발송했습니다."
        : "등록이 완료되었습니다! (이메일 발송에 실패했으나 등록은 완료됨)",
    });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

// 사전등록 확인 이메일 HTML 템플릿
function buildConfirmationEmail({ storeName }: { storeName: string }) {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>플바 사전등록 완료</title>
</head>
<body style="margin:0;padding:0;background:#F4F6FA;font-family:'Apple SD Gothic Neo','Pretendard',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F6FA;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- 헤더 -->
          <tr>
            <td style="background:linear-gradient(135deg,#5b5bd6,#7C6EE6);padding:36px 40px;text-align:center;">
              <div style="display:inline-flex;align-items:center;gap:8px;">
                <div style="width:36px;height:36px;background:rgba(255,255,255,0.2);border-radius:10px;display:inline-block;line-height:36px;text-align:center;font-size:18px;font-weight:900;color:#fff;">P</div>
                <span style="font-size:22px;font-weight:900;color:#fff;letter-spacing:-0.5px;">plba.</span>
              </div>
              <p style="color:rgba(255,255,255,0.8);font-size:13px;margin:8px 0 0;">성과형 소상공인 마케팅 플랫폼</p>
            </td>
          </tr>

          <!-- 본문 -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <div style="text-align:center;margin-bottom:28px;">
                <div style="font-size:40px;margin-bottom:16px;">🎉</div>
                <h1 style="font-size:24px;font-weight:900;color:#191F28;margin:0 0 8px;letter-spacing:-0.5px;">사전등록이 완료되었습니다!</h1>
                <p style="font-size:15px;color:#6B7684;margin:0;line-height:1.6;">
                  <strong style="color:#191F28;">${storeName}</strong> 사장님,<br>
                  플바 초기 파트너로 등록해 주셔서 감사합니다.
                </p>
              </div>

              <!-- 다음 단계 -->
              <div style="background:#F4F6FA;border-radius:16px;padding:24px;margin-bottom:28px;">
                <p style="font-size:12px;font-weight:700;color:#8B95A1;text-transform:uppercase;letter-spacing:1px;margin:0 0 16px;">다음 단계</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${[
                    ["📞", "01", "담당자가 24시간 내 연락드립니다"],
                    ["⚙️", "02", "가게 정보 확인 후 앱 세팅을 도와드립니다"],
                    ["🚀", "03", "혜택 등록하고 파트너 홍보 시작!"],
                  ].map(([icon, step, text]) => `
                  <tr>
                    <td style="padding:8px 0;">
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="width:36px;height:36px;background:#5b5bd6;border-radius:10px;text-align:center;vertical-align:middle;font-size:16px;">${icon}</td>
                          <td style="width:12px;"></td>
                          <td>
                            <span style="font-size:10px;font-weight:700;color:#5b5bd6;margin-right:6px;">${step}</span>
                            <span style="font-size:14px;font-weight:600;color:#191F28;">${text}</span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>`).join("")}
                </table>
              </div>

              <!-- 혜택 강조 -->
              <div style="background:linear-gradient(135deg,#5b5bd6,#7C6EE6);border-radius:16px;padding:20px 24px;text-align:center;margin-bottom:28px;">
                <p style="color:rgba(255,255,255,0.7);font-size:12px;margin:0 0 6px;font-weight:600;">초기 파트너 혜택</p>
                <p style="color:#ffffff;font-size:20px;font-weight:900;margin:0;letter-spacing:-0.3px;">2만원 상당 포인트 무상 지원</p>
              </div>

              <p style="font-size:14px;color:#6B7684;line-height:1.7;text-align:center;margin:0;">
                문의 사항이 있으시면 아래 이메일로 연락해 주세요.<br>
                <a href="mailto:hello@plba.co.kr" style="color:#5b5bd6;font-weight:600;text-decoration:none;">hello@plba.co.kr</a>
              </p>
            </td>
          </tr>

          <!-- 푸터 -->
          <tr>
            <td style="background:#F4F6FA;padding:20px 40px;text-align:center;border-top:1px solid #E8EBF0;">
              <p style="font-size:11px;color:#8B95A1;margin:0;line-height:1.6;">
                주식회사 플바 · 서울특별시<br>
                본 메일은 플바 사전등록 신청에 따라 발송된 메일입니다.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
