"use client";

const MORE_ITEMS = [
  {
    label: "가게 온보딩",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-7-7 18-2.5-7.5L3 11Z" /></svg>,
  },
  {
    label: "업무 가이드",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3 8-8" /><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" /></svg>,
  },
  {
    label: "알림 설정",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0" /></svg>,
  },
  {
    label: "고객센터",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 8v4.5M12 16v.5" /></svg>,
  },
  {
    label: "로그아웃",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M15 17l5-5-5-5M20 12H9M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" /></svg>,
  },
];

export default function AlbaMore({ userName, storeName, onLogout }: { userName?: string; storeName?: string; onLogout: () => void }) {
  const initial = userName?.[0] ?? "?";
  return (
    <div style={{ padding: "14px 20px 24px", animation: "fadeUp .35s ease" }}>
      <div style={{ fontWeight: 800, fontSize: 22, color: "var(--text)", padding: "4px 0 16px" }}>내 정보</div>

      {/* Profile card */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#fff", border: "1px solid var(--hairline)", borderRadius: 20, padding: 18 }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(150deg,var(--p),var(--p-strong))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 22, color: "#fff" }}>{initial}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 18, color: "var(--text)" }}>{userName ?? "이름 없음"}</div>
          <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", marginTop: 2 }}>{storeName ?? ""}</div>
        </div>
      </div>

      {/* Menu items */}
      <div style={{ marginTop: 14, background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: "6px 6px" }}>
        {MORE_ITEMS.map((item, i) => (
          <button
            key={i}
            onClick={item.label === "로그아웃" ? onLogout : undefined}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "15px 14px", background: "none", border: "none", borderRadius: 12, cursor: "pointer", textAlign: "left" }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--p-soft)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--p-tint)" }}>
              {item.icon}
            </div>
            <span style={{ flex: 1, fontWeight: 600, fontSize: 15, color: item.label === "로그아웃" ? "var(--negative)" : "var(--text)" }}>{item.label}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(55,56,60,0.3)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        ))}
      </div>
    </div>
  );
}
