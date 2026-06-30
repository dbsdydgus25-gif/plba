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

  if (!storeId) return NextResponse.json({ ok: true });

  if (type === "subscription.active" || type === "checkout.completed" || type === "payment.succeeded") {
    await supabase.from("stores").update({
      subscription_status: "active",
      creem_subscription_id: subscriptionId ?? null,
      creem_customer_id: customerId ?? null,
    }).eq("id", storeId);
  }

  if (type === "subscription.canceled" || type === "subscription.expired") {
    await supabase.from("stores").update({
      subscription_status: "canceled",
    }).eq("id", storeId);
  }

  return NextResponse.json({ ok: true });
}
