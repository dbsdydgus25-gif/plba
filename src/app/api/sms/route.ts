import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// 인메모리 OTP 저장 (서버 재시작 시 초기화 — MVP용)
const otpStore = new Map<string, { code: string; expiresAt: number }>();

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function solapiAuth() {
  const apiKey = process.env.SOLAPI_API_KEY!;
  const apiSecret = process.env.SOLAPI_API_SECRET!;
  const date = new Date().toISOString();
  const salt = crypto.randomBytes(16).toString("hex");
  const signature = crypto
    .createHmac("sha256", apiSecret)
    .update(date + salt)
    .digest("hex");
  return {
    Authorization: `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`,
  };
}

// POST /api/sms  body: { phone, action: "send" | "verify", code? }
export async function POST(req: NextRequest) {
  const { phone, action, code } = await req.json();
  const digits = phone.replace(/\D/g, "");

  if (action === "send") {
    const otp = generateOtp();
    otpStore.set(digits, { code: otp, expiresAt: Date.now() + 5 * 60 * 1000 });

    const res = await fetch("https://api.solapi.com/messages/v4/send", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...solapiAuth() },
      body: JSON.stringify({
        message: {
          to: digits,
          from: process.env.SOLAPI_SENDER,
          text: `[플바] 인증번호: ${otp}\n5분 내 입력해주세요.`,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const msg = err?.errorMessage ?? err?.message ?? `솔라피 오류 (${res.status})`;
      return NextResponse.json({ ok: false, error: msg }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  }

  if (action === "verify") {
    const stored = otpStore.get(digits);
    if (!stored) return NextResponse.json({ ok: false, error: "코드 없음" });
    if (Date.now() > stored.expiresAt) {
      otpStore.delete(digits);
      return NextResponse.json({ ok: false, error: "만료됨" });
    }
    if (stored.code !== code) return NextResponse.json({ ok: false, error: "불일치" });
    otpStore.delete(digits);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: "unknown action" }, { status: 400 });
}
