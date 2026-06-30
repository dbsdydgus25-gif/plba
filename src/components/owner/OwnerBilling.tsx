"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Store = {
  id: string;
  name: string;
  code: string;
  subscription_status: string;
  trial_ends_at: string | null;
};

export default function OwnerBilling({ storeId }: { storeId: string }) {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    supabase.from("stores").select("id,name,code,subscription_status,trial_ends_at").eq("id", storeId).single()
      .then(({ data }) => { setStore(data); setLoading(false); });
  }, [storeId]);

  async function startCheckout() {
    if (!store) return;
    setCheckoutLoading(true);
    const res = await fetch("/api/creem/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        storeId: store.id,
        storeName: store.name,
        successUrl: `${window.location.origin}/owner?billing=success`,
        cancelUrl: `${window.location.origin}/owner?billing=cancel`,
      }),
    });
    const { checkoutUrl, error } = await res.json();
    if (error) { alert("결제 오류: " + error); setCheckoutLoading(false); return; }
    window.location.href = checkoutUrl;
  }

  if (loading) return <div style={{ padding: 40, color: "#888" }}>로딩 중...</div>;
  if (!store) return <div style={{ padding: 40, color: "#888" }}>가게 정보를 불러올 수 없습니다.</div>;

  const isActive = store.subscription_status === "active";
  const isTrial = store.subscription_status === "trial";
  const isCanceled = store.subscription_status === "canceled";
  const trialEnd = store.trial_ends_at ? new Date(store.trial_ends_at) : null;
  const trialDaysLeft = trialEnd ? Math.max(0, Math.ceil((trialEnd.getTime() - Date.now()) / 86400000)) : 0;
  const trialExpired = trialDaysLeft === 0;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "32px 24px" }}>
      <h2 style={{ fontWeight: 800, fontSize: 22, color: "#111", marginBottom: 8 }}>구독 관리</h2>
      <p style={{ fontSize: 14, color: "#888", marginBottom: 32 }}>플바 서비스 이용 요금제를 관리해요.</p>

      {/* 상태 카드 */}
      <div style={{ background: isActive ? "#F0FDF4" : isTrial ? "#EEF2FF" : "#FFF7ED", border: `1.5px solid ${isActive ? "#86EFAC" : isTrial ? "#C7D2FE" : "#FED7AA"}`, borderRadius: 16, padding: "24px 20px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ fontSize: 22 }}>{isActive ? "✅" : isTrial ? "🎁" : "⚠️"}</span>
          <span style={{ fontWeight: 800, fontSize: 16, color: isActive ? "#15803D" : isTrial ? "#4338CA" : "#C2410C" }}>
            {isActive ? "구독 활성" : isTrial ? `무료 체험 중 (${trialDaysLeft}일 남음)` : "구독 만료"}
          </span>
        </div>
        {isTrial && !trialExpired && (
          <p style={{ fontSize: 13, color: "#6366F1", fontWeight: 600 }}>
            {trialEnd?.toLocaleDateString("ko-KR")}까지 무료로 이용하실 수 있어요.
          </p>
        )}
        {isActive && (
          <p style={{ fontSize: 13, color: "#16A34A", fontWeight: 600 }}>
            월 4,900원 · 다음 결제일에 자동 갱신됩니다.
          </p>
        )}
        {isCanceled && (
          <p style={{ fontSize: 13, color: "#EA580C", fontWeight: 600 }}>
            구독이 만료됐어요. 계속 이용하려면 결제해 주세요.
          </p>
        )}
      </div>

      {/* 요금제 카드 */}
      {!isActive && (
        <div style={{ background: "#fff", border: "1.5px solid #E5E7EB", borderRadius: 16, padding: "24px 20px", marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <p style={{ fontWeight: 800, fontSize: 18, color: "#111" }}>플바 스탠다드</p>
              <p style={{ fontSize: 13, color: "#888", marginTop: 2 }}>모든 기능 포함</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontWeight: 800, fontSize: 24, color: "#6B4DF6" }}>₩4,900</p>
              <p style={{ fontSize: 12, color: "#888" }}>/월</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
            {["QR 출퇴근 관리", "실시간 근태 대시보드", "급여 자동 계산", "직원 무제한", "스케줄 관리"].map(f => (
              <div key={f} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 14, color: "#444" }}>
                <span style={{ color: "#6B4DF6", fontWeight: 700 }}>✓</span> {f}
              </div>
            ))}
          </div>
          <button
            onClick={startCheckout}
            disabled={checkoutLoading}
            style={{ width: "100%", height: 52, borderRadius: 12, border: "none", background: "#6B4DF6", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", opacity: checkoutLoading ? 0.7 : 1 }}
          >
            {checkoutLoading ? "결제 페이지 이동 중..." : "💳 카드 등록하고 구독하기"}
          </button>
          <p style={{ textAlign: "center", fontSize: 12, color: "#aaa", marginTop: 8 }}>
            무료 체험 기간 이후 자동 결제됩니다. 언제든지 해지 가능해요.
          </p>
        </div>
      )}

      {/* QR 코드 */}
      <div style={{ background: "#fff", border: "1.5px solid #E5E7EB", borderRadius: 16, padding: "24px 20px", marginBottom: 24 }}>
        <p style={{ fontWeight: 700, fontSize: 15, color: "#333", marginBottom: 4 }}>출퇴근 QR 코드</p>
        <p style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>출력해서 가게에 붙여두면 알바생이 스캔해서 출퇴근해요.</p>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(`https://plba.co.kr/qr/${store.code}`)}&size=220x220&margin=10`}
            alt="QR 코드"
            width={220}
            height={220}
            style={{ borderRadius: 12, border: "1px solid #eee" }}
          />
        </div>
        <div style={{ background: "#f7f7fb", borderRadius: 10, padding: "10px 14px", fontFamily: "monospace", fontSize: 13, color: "#6B4DF6", wordBreak: "break-all", marginBottom: 12, textAlign: "center" }}>
          plba.co.kr/qr/{store.code}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => window.open(`https://plba.co.kr/qr/${store.code}`, "_blank")}
            style={{ flex: 1, height: 44, borderRadius: 10, border: "1.5px solid #6B4DF6", background: "#fff", color: "#6B4DF6", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
          >
            링크 테스트
          </button>
          <button
            onClick={() => window.open(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(`https://plba.co.kr/qr/${store.code}`)}&size=600x600&margin=20`, "_blank")}
            style={{ flex: 1, height: 44, borderRadius: 10, border: "none", background: "#6B4DF6", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
          >
            QR 크게 보기 / 인쇄
          </button>
        </div>
      </div>

      {isActive && (
        <p style={{ textAlign: "center", fontSize: 12, color: "#bbb" }}>
          구독 해지는 고객센터로 문의해 주세요.
        </p>
      )}
    </div>
  );
}
