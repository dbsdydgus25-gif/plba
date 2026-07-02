import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const CREEM_API_KEY = process.env.CREEM_API_KEY!;
const CREEM_API_URL = process.env.CREEM_API_URL ?? "https://test-api.creem.io/v1";

export async function POST(req: NextRequest) {
  const { storeId } = await req.json();
  if (!storeId) return NextResponse.json({ error: "storeId 필요" }, { status: 400 });

  // stores에서 creem_subscription_id 조회
  const { data: store, error: storeErr } = await supabase
    .from("stores")
    .select("creem_subscription_id")
    .eq("id", storeId)
    .single();

  if (storeErr || !store?.creem_subscription_id) {
    return NextResponse.json({ error: "구독 정보를 찾을 수 없습니다." }, { status: 404 });
  }

  const subId = store.creem_subscription_id;

  // Creem DELETE /v1/subscriptions/{id} 시도
  let creemOk = false;
  try {
    const res = await fetch(`${CREEM_API_URL}/subscriptions/${subId}`, {
      method: "DELETE",
      headers: { "x-api-key": CREEM_API_KEY },
    });
    if (res.ok) creemOk = true;
  } catch {
    // fallthrough
  }

  // fallback: POST /v1/subscriptions/{id}/cancel
  if (!creemOk) {
    try {
      const res = await fetch(`${CREEM_API_URL}/subscriptions/${subId}/cancel`, {
        method: "POST",
        headers: { "x-api-key": CREEM_API_KEY, "Content-Type": "application/json" },
      });
      if (res.ok) creemOk = true;
    } catch {
      // Creem API 실패해도 DB는 업데이트 (webhook이 나중에 올 수 있음)
    }
  }

  // stores 업데이트: cancel_at_period_end = true
  const { error: updateErr } = await supabase
    .from("stores")
    .update({ subscription_cancel_at_period_end: true })
    .eq("id", storeId);

  if (updateErr) {
    return NextResponse.json({ error: "DB 업데이트 실패" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, creemOk });
}
