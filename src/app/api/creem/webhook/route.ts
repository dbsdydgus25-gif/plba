import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type, data } = body;

  const storeId = data?.object?.metadata?.storeId ?? data?.metadata?.storeId;
  const subscriptionId = data?.object?.id ?? data?.id;
  const customerId = data?.object?.customer ?? data?.customer;
  const currentPeriodEnd = data?.object?.current_period_end ?? data?.current_period_end ?? null;
  const startedAt = data?.object?.started_at ?? data?.started_at ?? null;

  if (!storeId) return NextResponse.json({ ok: true });

  if (type === "subscription.active" || type === "checkout.completed" || type === "payment.succeeded") {
    await supabase.from("stores").update({
      subscription_status: "active",
      creem_subscription_id: subscriptionId ?? null,
      creem_customer_id: customerId ?? null,
      subscription_cancel_at_period_end: false,
      subscription_current_period_end: currentPeriodEnd,
      subscription_started_at: startedAt,
    }).eq("id", storeId);
  }

  if (type === "subscription.updated") {
    await supabase.from("stores").update({
      subscription_current_period_end: currentPeriodEnd,
      subscription_cancel_at_period_end: false,
    }).eq("id", storeId);
  }

  // 취소 예약: 기간 만료 전이므로 status는 active 유지, cancel_at_period_end만 true
  if (type === "subscription.canceled") {
    await supabase.from("stores").update({
      subscription_cancel_at_period_end: true,
    }).eq("id", storeId);
  }

  // 실제 만료: status expired로 변경
  if (type === "subscription.expired") {
    await supabase.from("stores").update({
      subscription_status: "expired",
      subscription_cancel_at_period_end: true,
    }).eq("id", storeId);
  }

  return NextResponse.json({ ok: true });
}
