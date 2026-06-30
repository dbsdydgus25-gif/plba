"use client";

const KPIs = [
  { label: "오늘 출근", value: "3/4", delta: "1명 미출근", bg: "var(--p-soft)", col: "var(--p-tint)", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg> },
  { label: "지각", value: "1", delta: "김민지 14:17", bg: "#FEF4E6", col: "var(--cautionary)", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg> },
  { label: "결근", value: "1", delta: "박준혁", bg: "var(--negative-bg)", col: "var(--negative)", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6 6 18" /></svg> },
  { label: "이번달 인건비", value: "₩4.82M", delta: "전월 대비 +3%", bg: "#f1f1f3", col: "rgba(55,56,60,0.6)", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="5" width="22" height="14" rx="2" /><path d="M1 10h22" /></svg> },
];

const TODAY_STAFF = [
  { initial: "민", name: "김민지", role: "바리스타", shift: "14:00–22:00", status: "근무 중", inT: "출근 14:17", bg: "var(--positive-bg)", col: "var(--positive)", avBg: "#e8e2fd", avCol: "var(--p-tint)" },
  { initial: "수", name: "이수현", role: "카운터", shift: "10:00–18:00", status: "퇴근", inT: "출근 10:02", bg: "#f1f1f3", col: "rgba(55,56,60,0.6)", avBg: "#fef4e6", avCol: "#d47800" },
  { initial: "지", name: "박지우", role: "바리스타", shift: "10:00–18:00", status: "근무 중", inT: "출근 10:00", bg: "var(--positive-bg)", col: "var(--positive)", avBg: "#eafce0", avCol: "#2e7a00" },
  { initial: "준", name: "박준혁", role: "홀 서빙", shift: "14:00–22:00", status: "결근", inT: "–", bg: "var(--negative-bg)", col: "var(--negative)", avBg: "#f0f0f2", avCol: "rgba(55,56,60,0.5)" },
];

const WEEK_BARS = [
  { dow: "일", h: "60px", fill: "#f1f1f3" },
  { dow: "월", h: "110px", fill: "var(--p)" },
  { dow: "화", h: "95px", fill: "var(--p)" },
  { dow: "수", h: "130px", fill: "var(--p)", today: true },
  { dow: "목", h: "80px", fill: "#f1f1f3" },
  { dow: "금", h: "120px", fill: "#f1f1f3" },
  { dow: "토", h: "70px", fill: "#f1f1f3" },
];

export default function OwnerDashboard() {
  return (
    <div style={{ animation: "fadeUp .3s ease" }}>
      {/* KPI cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {KPIs.map((k, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 16, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 600, fontSize: 13, color: "var(--text-sub)" }}>{k.label}</span>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: k.bg, color: k.col, display: "flex", alignItems: "center", justifyContent: "center" }}>{k.icon}</div>
            </div>
            <div style={{ fontWeight: 800, fontSize: 26, color: "var(--text)", marginTop: 12 }}>{k.value}</div>
            <div style={{ fontWeight: 500, fontSize: 12, color: k.col, marginTop: 2 }}>{k.delta}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, marginTop: 18 }}>
        {/* Today attendance */}
        <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontWeight: 700, fontSize: 16, color: "var(--text)" }}>오늘 실시간 근태</span>
            <span style={{ fontWeight: 600, fontSize: 12, color: "var(--p)" }}>● 실시간</span>
          </div>
          {TODAY_STAFF.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 0", borderBottom: i < TODAY_STAFF.length - 1 ? "1px solid rgba(112,115,124,0.1)" : "none" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: s.avBg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, color: s.avCol }}>{s.initial}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{s.name}</div>
                <div style={{ fontWeight: 500, fontSize: 12, color: "var(--text-sub)" }}>{s.role} · {s.shift}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 9999, background: s.bg, color: s.col, fontWeight: 600, fontSize: 12 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.col }} />{s.status}
                </div>
                <div style={{ fontWeight: 500, fontSize: 11, color: "rgba(55,56,60,0.45)", marginTop: 4 }}>{s.inT}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Week chart */}
        <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 20 }}>
          <span style={{ fontWeight: 700, fontSize: 16, color: "var(--text)" }}>주간 근무시간</span>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8, height: 150, marginTop: 20 }}>
            {WEEK_BARS.map((b, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, height: "100%", justifyContent: "flex-end" }}>
                <div style={{ width: "100%", maxWidth: 26, borderRadius: "7px 7px 4px 4px", background: b.today ? "var(--p)" : b.fill, height: b.h }} />
                <span style={{ fontWeight: b.today ? 700 : 600, fontSize: 11, color: b.today ? "var(--p)" : "rgba(55,56,60,0.5)" }}>{b.dow}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(112,115,124,0.1)", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)" }}>주간 합계</span>
            <span style={{ fontWeight: 800, fontSize: 15, color: "var(--text)" }}>186.5 시간</span>
          </div>
        </div>
      </div>

      {/* Closing report */}
      <div style={{ marginTop: 16, background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{ fontWeight: 700, fontSize: 16, color: "var(--text)" }}>오늘 마감 리포트</span>
          <span style={{ fontWeight: 700, fontSize: 12, color: "var(--cautionary)" }}>대기 중</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "8px 0" }}>
          <div style={{ width: 48, height: 48, borderRadius: 13, background: "var(--cautionary-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cautionary)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L8 6H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-4z" /><circle cx="12" cy="13" r="3.6" /></svg>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>아직 마감 사진이 없어요</div>
            <div style={{ fontWeight: 500, fontSize: 12, color: "var(--text-sub)", marginTop: 2 }}>마감 담당자가 앱에서 사진을 전송하면 여기에 표시돼요.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
