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

  // stores에서 creem_customer_id 조회
  const { data: store, error: storeErr } = await supabase
    .from("stores")
    .select("creem_customer_id")
    .eq("id", storeId)
    .single();

  if (storeErr || !store?.creem_customer_id) {
    return NextResponse.json({ error: "고객 정보를 찾을 수 없습니다." }, { status: 404 });
  }

  const customerId = store.creem_customer_id;

  // Creem POST /v1/customers/{id}/portal 시도
  try {
    const res = await fetch(`${CREEM_API_URL}/customers/${customerId}/portal`, {
      method: "POST",
      headers: { "x-api-key": CREEM_API_KEY, "Content-Type": "application/json" },
    });
    if (res.ok) {
      const json = await res.json();
      const portalUrl = json.portal_url ?? json.url ?? json.portalUrl;
      if (portalUrl) return NextResponse.json({ portalUrl });
    }
  } catch {
    // fallthrough
  }

  // fallback: Creem 대시보드 URL
  const fallbackUrl = `https://www.creem.io/dashboard`;
  return NextResponse.json({ portalUrl: fallbackUrl });
}
