import { NextRequest, NextResponse } from "next/server";

// POST /api/biz  body: { b_no: "1234567890" }
export async function POST(req: NextRequest) {
  const { b_no } = await req.json();
  const digits = b_no.replace(/\D/g, "");

  if (digits.length !== 10) {
    return NextResponse.json({ ok: false, error: "10자리 사업자번호를 입력하세요" });
  }

  const key = process.env.BIZ_API_KEY!;
  const url = `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${encodeURIComponent(key)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ b_no: [digits] }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "API 오류" }, { status: 500 });
  }

  const data = await res.json();
  const item = data?.data?.[0];

  if (!item) return NextResponse.json({ ok: false, error: "조회 결과 없음" });

  // tax_type에 "등록되지 않은" 포함 시 미등록 (문구가 버전마다 미세하게 다름)
  const isUnregistered = !item.tax_type || item.tax_type.includes("등록되지 않은");
  const valid = !isUnregistered;
  return NextResponse.json({
    ok: valid,
    error: valid ? undefined : "국세청에 등록되지 않은 사업자번호예요.",
    b_stt: item.b_stt,
    tax_type: item.tax_type,
    b_no: item.b_no,
  });
}
