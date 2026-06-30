import { NextRequest, NextResponse } from "next/server";

const CREEM_API_KEY = process.env.CREEM_API_KEY!;
const CREEM_PRODUCT_ID = process.env.CREEM_PRODUCT_ID!;
const CREEM_API_URL = process.env.CREEM_API_URL ?? "https://test-api.creem.io/v1";

export async function POST(req: NextRequest) {
  const { storeId, storeName, ownerEmail, successUrl } = await req.json();

  const body: Record<string, unknown> = {
    product_id: CREEM_PRODUCT_ID,
    success_url: successUrl,
    metadata: { storeId, storeName },
  };
  if (ownerEmail) body.customer = { email: ownerEmail };

  const res = await fetch(`${CREEM_API_URL}/checkouts`, {
    method: "POST",
    headers: {
      "x-api-key": CREEM_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({ error: JSON.stringify(data) }, { status: 500 });
  }

  const checkoutUrl = data.checkout_url ?? data.url ?? data.payment_url ?? data.checkout?.url;
  return NextResponse.json({ checkoutUrl });
}
