"use client";

const STEPS = [
  { num: 1, title: "음료 레시피 숙지", body: "메뉴판 옆 레시피 북을 참고하세요. 모르는 메뉴는 선배에게 꼭 물어보세요." },
  { num: 2, title: "포스 사용법", body: "오픈 전 포스 켜기 → 영수증 용지 확인 → 카드단말기 연결 확인." },
  { num: 3, title: "청소 구역 안내", body: "오픈: 홀 테이블 닦기 / 마감: 에스프레소 머신 세척 + 바닥 청소." },
  { num: 4, title: "비상 연락망", body: "점장 010-1234-5678 / 부점장 010-8765-4321. 지각 시 반드시 30분 전 연락." },
  { num: 5, title: "주차 안내", body: "건물 지하 1층 직원 전용 구역. 시간당 1,000원 지원됩니다." },
];

export default function OnboardingOverlay({ onClose, storeName }: { onClose: () => void; storeName?: string }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 43, background: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center" }}>
    <div style={{ width: "100%", maxWidth: 430, background: "#fff", overflow: "hidden", animation: "fadeUp .3s ease", position: "relative" }}>
      <div style={{ height: 48 }} />
      <div style={{ height: "calc(100% - 134px)", overflowY: "auto", padding: "8px 24px 16px" }}>
        <div style={{ width: 54, height: 54, borderRadius: 16, background: "var(--p)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 22px rgba(20,16,40,0.18)" }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-7-7 18-2.5-7.5L3 11Z" /></svg>
        </div>
        <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: "-0.02em", color: "var(--text)", marginTop: 18 }}>{storeName ?? "매장"}에<br />오신 걸 환영해요!</div>
        <div style={{ fontWeight: 500, fontSize: 14, color: "var(--text-sub)", marginTop: 8, lineHeight: 1.55 }}>사장님이 준비한 가게 안내예요.<br />첫 근무 전에 꼭 한 번 읽어주세요.</div>

        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
          {STEPS.map(s => (
            <div key={s.num} style={{ display: "flex", gap: 14, background: "#fafafb", border: "1px solid var(--hairline)", borderRadius: 16, padding: 16 }}>
              <div style={{ width: 30, height: 30, flexShrink: 0, borderRadius: 10, background: "var(--p-soft)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "var(--p-tint)" }}>{s.num}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{s.title}</div>
                <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", marginTop: 5, lineHeight: 1.5 }}>{s.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 24px 28px", background: "#fff", borderTop: "1px solid var(--hairline)" }}>
        <button onClick={onClose} style={{ width: "100%", height: 54, border: "none", borderRadius: 15, background: "var(--p)", color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer" }}>
          확인했어요 →
        </button>
      </div>
    </div>
    </div>
  );
}
