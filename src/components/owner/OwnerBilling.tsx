"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Store = { id: string; name: string; code: string; subscription_status: string; trial_ends_at: string | null; };

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
      body: JSON.stringify({ storeId: store.id, storeName: store.name, successUrl: `${window.location.origin}/owner?billing=success` }),
    });
    const { checkoutUrl, error } = await res.json();
    if (error) { alert("결제 오류: " + error); setCheckoutLoading(false); return; }
    window.location.href = checkoutUrl;
  }

  if (loading) return <div style={{ padding: 40, color: "var(--text-sub)", fontSize: 14 }}>불러오는 중...</div>;
  if (!store) return <div style={{ padding: 40, color: "var(--text-sub)", fontSize: 14 }}>가게 정보를 불러올 수 없습니다.</div>;

  const isActive = store.subscription_status === "active";
  const isTrial = store.subscription_status === "trial";
  const trialEnd = store.trial_ends_at ? new Date(store.trial_ends_at) : null;
  const trialDaysLeft = trialEnd ? Math.max(0, Math.ceil((trialEnd.getTime() - Date.now()) / 86400000)) : 0;

  return (
    <div style={{ maxWidth: 680, animation: "fadeUp .3s ease" }}>
      {/* 현재 상태 */}
      <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 24, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 46, height: 46, borderRadius: 14, background: isActive ? "var(--positive-bg)" : "var(--p-soft)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {isActive ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--positive)" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5 10 17.5 19 7" /></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--p-tint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" /></svg>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: isActive ? "var(--positive)" : "var(--p-tint)" }}>
              {isActive ? "구독 활성 중" : isTrial ? `무료 체험 중 · ${trialDaysLeft}일 남음` : "구독 만료"}
            </div>
            <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", marginTop: 2 }}>
              {isActive ? "월 ₩4,900 · 다음 결제일에 자동 갱신됩니다." : isTrial && trialEnd ? `${trialEnd.toLocaleDateString("ko-KR")}까지 무료로 이용하실 수 있어요.` : "계속 이용하려면 구독을 시작해 주세요."}
            </div>
          </div>
          {isActive && (
            <span style={{ padding: "5px 12px", background: "var(--positive-bg)", borderRadius: 9999, fontWeight: 700, fontSize: 12, color: "var(--positive)", border: "1px solid var(--positive)", flexShrink: 0 }}>활성</span>
          )}
        </div>
      </div>

      {/* 요금제 */}
      {!isActive && (
        <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 24, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, color: "var(--text)" }}>플바 스탠다드</div>
              <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", marginTop: 2 }}>모든 기능 무제한 이용</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 900, fontSize: 28, color: "var(--p-tint)", lineHeight: 1 }}>₩4,900</div>
              <div style={{ fontWeight: 500, fontSize: 12, color: "var(--text-sub)", marginTop: 2 }}>/월</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 22 }}>
            {["QR 출퇴근 관리", "실시간 근태 대시보드", "급여 자동 계산", "직원 무제한", "스케줄 관리", "가게 온보딩 설정"].map(f => (
              <div key={f} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, fontWeight: 500, color: "var(--text)" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--p-tint)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5 10 17.5 19 7" /></svg>
                {f}
              </div>
            ))}
          </div>
          <button onClick={startCheckout} disabled={checkoutLoading} style={{ width: "100%", height: 52, borderRadius: 13, border: "none", background: "var(--p)", color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", opacity: checkoutLoading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="5" width="22" height="14" rx="2" /><path d="M1 10h22" /></svg>
            {checkoutLoading ? "결제 페이지 이동 중..." : "카드 등록하고 구독하기"}
          </button>
          <div style={{ textAlign: "center", fontSize: 12, color: "var(--text-sub)", marginTop: 8 }}>
            무료 체험 후 자동 결제 · 언제든지 해지 가능
          </div>
        </div>
      )}

      {/* QR 코드 */}
      <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 24 }}>
        <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text)", marginBottom: 4 }}>출퇴근 QR 코드</div>
        <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", marginBottom: 22 }}>출력해서 가게에 붙여두면 알바생이 스캔해서 출퇴근해요.</div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(`https://plba.co.kr/qr/${store.code}`)}&size=200x200&margin=10`} alt="QR" width={200} height={200} style={{ borderRadius: 12, border: "1px solid var(--hairline)" }} />
        </div>
        <div style={{ background: "#f7f7fb", borderRadius: 10, padding: "10px 14px", fontFamily: "monospace", fontSize: 13, color: "var(--p-tint)", textAlign: "center", marginBottom: 14 }}>
          plba.co.kr/qr/{store.code}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => window.open(`https://plba.co.kr/qr/${store.code}`, "_blank")} style={{ flex: 1, height: 44, borderRadius: 11, border: "1.5px solid var(--hairline)", background: "#fff", color: "var(--text)", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            링크 테스트
          </button>
          <button onClick={() => window.open(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(`https://plba.co.kr/qr/${store.code}`)}&size=600x600&margin=20`, "_blank")} style={{ flex: 1, height: 44, borderRadius: 11, border: "none", background: "var(--p)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            QR 크게 보기 / 인쇄
          </button>
        </div>
      </div>

      {isActive && (
        <div style={{ textAlign: "center", fontSize: 12, color: "var(--text-sub)", marginTop: 16 }}>
          구독 해지는 고객센터로 문의해 주세요.
        </div>
      )}
    </div>
  );
}
