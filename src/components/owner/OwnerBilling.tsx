"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type StoreInfo = {
  id: string;
  name: string;
  code: string;
  subscription_status: string | null;
  trial_ends_at: string | null;
  creem_subscription_id: string | null;
  creem_customer_id: string | null;
  subscription_current_period_end: string | null;
  subscription_cancel_at_period_end: boolean | null;
  subscription_started_at: string | null;
};

type SubState = "TRIAL" | "ACTIVE" | "CANCEL_SCHEDULED" | "EXPIRED" | "NONE";

function getSubState(store: StoreInfo): SubState {
  const s = store.subscription_status;
  if (!s) return "NONE";
  if (s === "trial") return "TRIAL";
  if (s === "expired" || s === "canceled") return "EXPIRED";
  if (s === "active") {
    return store.subscription_cancel_at_period_end ? "CANCEL_SCHEDULED" : "ACTIVE";
  }
  return "NONE";
}

function formatDate(iso: string | null): string {
  if (!iso) return "-";
  const d = new Date(iso);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

// 아이콘 컴포넌트
function CheckIcon({ color = "var(--positive)", size = 22 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5 10 17.5 19 7" />
    </svg>
  );
}
function CardIcon({ color = "#fff", size = 17 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="5" width="22" height="14" rx="2" />
      <path d="M1 10h22" />
    </svg>
  );
}
function StarIcon({ color = "var(--p-tint)", size = 22 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
    </svg>
  );
}

// 기능 목록 공통
const FEATURES = ["QR 출퇴근 관리", "실시간 근태 대시보드", "급여 자동 계산", "직원 무제한", "스케줄 관리", "가게 온보딩 설정"];

export default function OwnerBilling({ storeId }: { storeId: string }) {
  const [store, setStore] = useState<StoreInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    supabase
      .from("stores")
      .select("id,name,code,subscription_status,trial_ends_at,creem_subscription_id,creem_customer_id,subscription_current_period_end,subscription_cancel_at_period_end,subscription_started_at")
      .eq("id", storeId)
      .single()
      .then(({ data }) => { setStore(data as StoreInfo); setLoading(false); });
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

  async function handleCancel() {
    if (!store) return;
    setCancelLoading(true);
    setShowCancelModal(false);
    const res = await fetch("/api/creem/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ storeId: store.id }),
    });
    const json = await res.json();
    if (json.error) {
      alert("취소 오류: " + json.error);
      setCancelLoading(false);
      return;
    }
    // UI 반영
    setStore(prev => prev ? { ...prev, subscription_cancel_at_period_end: true } : prev);
    setCancelLoading(false);
  }

  async function handlePortal() {
    if (!store) return;
    setPortalLoading(true);
    const res = await fetch("/api/creem/customer-portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ storeId: store.id }),
    });
    const { portalUrl, error } = await res.json();
    setPortalLoading(false);
    if (error) { alert("오류: " + error); return; }
    window.open(portalUrl, "_blank");
  }

  if (loading) return <div style={{ padding: 40, color: "var(--text-sub)", fontSize: 14 }}>불러오는 중...</div>;
  if (!store) return <div style={{ padding: 40, color: "var(--text-sub)", fontSize: 14 }}>가게 정보를 불러올 수 없습니다.</div>;

  const subState = getSubState(store);
  const trialEnd = store.trial_ends_at ? new Date(store.trial_ends_at) : null;
  const trialDaysLeft = trialEnd ? Math.max(0, Math.ceil((trialEnd.getTime() - Date.now()) / 86400000)) : 0;
  const periodEnd = store.subscription_current_period_end;

  return (
    <div style={{ maxWidth: 680, animation: "fadeUp .3s ease" }}>

      {/* ── TRIAL ── */}
      {subState === "TRIAL" && (
        <>
          {/* 상태 카드 */}
          <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 24, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: "var(--p-soft)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <StarIcon />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: "var(--p-tint)" }}>무료 체험 중 · {trialDaysLeft}일 남음</div>
                <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", marginTop: 2 }}>
                  {trialEnd ? `${trialEnd.toLocaleDateString("ko-KR")}까지 무료로 이용하실 수 있어요.` : "무료 체험 기간 중입니다."}
                </div>
              </div>
            </div>
          </div>
          {/* 요금제 카드 */}
          <PlanCard onCheckout={startCheckout} loading={checkoutLoading} buttonLabel="카드 등록하고 구독하기" />
        </>
      )}

      {/* ── ACTIVE ── */}
      {subState === "ACTIVE" && (
        <>
          {/* 상태 카드 */}
          <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 24, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: "var(--positive-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <CheckIcon />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: "var(--positive)" }}>구독 중</div>
                <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", marginTop: 2 }}>
                  다음 결제일: {formatDate(periodEnd)} · ₩4,900
                </div>
              </div>
              <span style={{ padding: "5px 12px", background: "var(--positive-bg)", borderRadius: 9999, fontWeight: 700, fontSize: 12, color: "var(--positive)", border: "1px solid var(--positive)", flexShrink: 0 }}>활성</span>
            </div>
          </div>

          {/* 결제 수단 카드 */}
          <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 24, marginBottom: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: "var(--text)", marginBottom: 4 }}>결제 수단</div>
            <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", marginBottom: 16 }}>등록된 카드 정보를 변경할 수 있어요.</div>
            <button
              onClick={handlePortal}
              disabled={portalLoading}
              style={{ height: 44, padding: "0 20px", borderRadius: 11, border: "1.5px solid var(--hairline)", background: "#fff", color: "var(--text)", fontSize: 14, fontWeight: 700, cursor: "pointer", opacity: portalLoading ? 0.6 : 1 }}
            >
              {portalLoading ? "이동 중..." : "결제 카드 변경"}
            </button>
          </div>

          {/* 구독 관리 카드 */}
          <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 24, marginBottom: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: "var(--text)", marginBottom: 16 }}>구독 정보</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <InfoRow label="구독 시작일" value={formatDate(store.subscription_started_at)} />
              <InfoRow label="다음 결제일" value={formatDate(periodEnd)} />
              <InfoRow label="월 구독료" value="₩4,900" />
            </div>
          </div>

          {/* 취소 버튼 */}
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <button
              onClick={() => setShowCancelModal(true)}
              disabled={cancelLoading}
              style={{ background: "none", border: "none", fontSize: 13, color: "var(--negative)", fontWeight: 600, cursor: "pointer", textDecoration: "underline", opacity: cancelLoading ? 0.5 : 1 }}
            >
              {cancelLoading ? "처리 중..." : "구독 취소"}
            </button>
          </div>
        </>
      )}

      {/* ── CANCEL_SCHEDULED ── */}
      {subState === "CANCEL_SCHEDULED" && (
        <>
          {/* 상태 카드 */}
          <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 24, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: "var(--cautionary-bg, #FFF7E6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--cautionary, #F59E0B)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 9v4M12 17h.01" /><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: "var(--cautionary, #F59E0B)" }}>구독 해지 예약됨</div>
                <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", marginTop: 2 }}>
                  {formatDate(periodEnd)}까지 모든 기능을 이용하실 수 있어요.
                </div>
              </div>
              <span style={{ padding: "5px 12px", background: "var(--cautionary-bg, #FFF7E6)", borderRadius: 9999, fontWeight: 700, fontSize: 12, color: "var(--cautionary, #F59E0B)", border: "1px solid var(--cautionary, #F59E0B)", flexShrink: 0 }}>해지 예약</span>
            </div>
          </div>

          {/* 배너 */}
          <div style={{ background: "var(--cautionary-bg, #FFF7E6)", border: "1px solid var(--cautionary, #F59E0B)", borderRadius: 14, padding: "14px 18px", marginBottom: 16, fontWeight: 600, fontSize: 13, color: "var(--cautionary, #F59E0B)" }}>
            {formatDate(periodEnd)}까지 모든 기능 이용 가능합니다.
          </div>

          {/* 해지 취소 버튼 */}
          <button
            onClick={startCheckout}
            disabled={checkoutLoading}
            style={{ width: "100%", height: 52, borderRadius: 13, border: "none", background: "var(--p)", color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", opacity: checkoutLoading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 }}
          >
            {checkoutLoading ? "처리 중..." : "해지 취소하기"}
          </button>
        </>
      )}

      {/* ── EXPIRED / NONE ── */}
      {(subState === "EXPIRED" || subState === "NONE") && (
        <>
          {/* 상태 카드 */}
          <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 24, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: "var(--negative-bg, #FFF0F0)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--negative, #EF4444)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="m15 9-6 6M9 9l6 6" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: "var(--negative, #EF4444)" }}>
                  {subState === "EXPIRED" ? "구독이 만료되었습니다" : "구독이 필요합니다"}
                </div>
                <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", marginTop: 2 }}>
                  계속 이용하려면 구독을 시작해 주세요.
                </div>
              </div>
              <span style={{ padding: "5px 12px", background: "var(--negative-bg, #FFF0F0)", borderRadius: 9999, fontWeight: 700, fontSize: 12, color: "var(--negative, #EF4444)", border: "1px solid var(--negative, #EF4444)", flexShrink: 0 }}>만료</span>
            </div>
          </div>
          {/* 요금제 카드 */}
          <PlanCard onCheckout={startCheckout} loading={checkoutLoading} buttonLabel="다시 구독하기" />
        </>
      )}

      {/* ── QR 코드 (공통) ── */}
      <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 24, marginTop: (subState === "ACTIVE" || subState === "CANCEL_SCHEDULED") ? 0 : 0 }}>
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

      {/* ── 하단 정책 문구 (공통) ── */}
      <div style={{ marginTop: 20, padding: "0 4px", fontSize: 11, color: "var(--text-sub)", lineHeight: 1.7 }}>
        구독 취소 시 현재 구독 기간 만료일까지 이용 가능 · 이미 결제된 금액은 환불되지 않음<br />
        결제일 7일 이내 미이용 시 고객센터 환불 요청 가능 · afterm001@gmail.com
      </div>

      {/* ── 취소 확인 모달 ── */}
      {showCancelModal && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={() => setShowCancelModal(false)}
        >
          <div
            style={{ background: "#fff", borderRadius: 20, padding: 28, maxWidth: 380, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.18)" }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontWeight: 800, fontSize: 18, color: "var(--text)", marginBottom: 12 }}>구독을 취소하시겠어요?</div>
            <div style={{ fontWeight: 500, fontSize: 14, color: "var(--text-sub)", lineHeight: 1.6, marginBottom: 24 }}>
              취소 후에도 <strong style={{ color: "var(--text)" }}>{formatDate(periodEnd)}</strong>까지 모든 기능을 이용하실 수 있어요.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setShowCancelModal(false)}
                style={{ flex: 1, height: 48, borderRadius: 12, border: "1.5px solid var(--hairline)", background: "#fff", color: "var(--text)", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
              >
                취소하지 않기
              </button>
              <button
                onClick={handleCancel}
                style={{ flex: 1, height: 48, borderRadius: 12, border: "none", background: "var(--negative, #EF4444)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
              >
                구독 취소 확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 요금제 카드 공통 컴포넌트
function PlanCard({ onCheckout, loading, buttonLabel }: { onCheckout: () => void; loading: boolean; buttonLabel: string }) {
  return (
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
        {FEATURES.map(f => (
          <div key={f} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, fontWeight: 500, color: "var(--text)" }}>
            <CheckIcon color="var(--p-tint)" size={15} />
            {f}
          </div>
        ))}
      </div>
      <button
        onClick={onCheckout}
        disabled={loading}
        style={{ width: "100%", height: 52, borderRadius: 13, border: "none", background: "var(--p)", color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
      >
        <CardIcon />
        {loading ? "결제 페이지 이동 중..." : buttonLabel}
      </button>
      <div style={{ textAlign: "center", fontSize: 12, color: "var(--text-sub)", marginTop: 8 }}>
        무료 체험 후 자동 결제 · 언제든지 해지 가능
      </div>
    </div>
  );
}

// 구독 정보 행
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
      <span style={{ color: "var(--text-sub)", fontWeight: 500 }}>{label}</span>
      <span style={{ color: "var(--text)", fontWeight: 700 }}>{value}</span>
    </div>
  );
}
