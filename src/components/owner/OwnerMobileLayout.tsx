"use client";
import { useState } from "react";
import MobileFrame from "@/components/common/MobileFrame";

type OMTab = "home" | "attendance" | "schedule" | "more";
type SubScreen = null | "payroll" | "staff" | "onboarding";

const TODAY_STAFF = [
  { initial: "민", name: "김민지", role: "바리스타", shift: "14:00–22:00", status: "근무 중", inT: "14:17", bg: "var(--positive-bg)", col: "var(--positive)", avBg: "#e8e2fd", avCol: "var(--p-tint)" },
  { initial: "수", name: "이수현", role: "카운터", shift: "10:00–18:00", status: "퇴근", inT: "10:02", bg: "#f1f1f3", col: "rgba(55,56,60,0.6)", avBg: "#fef4e6", avCol: "#d47800" },
  { initial: "지", name: "박지우", role: "바리스타", shift: "10:00–18:00", status: "근무 중", inT: "10:00", bg: "var(--positive-bg)", col: "var(--positive)", avBg: "#eafce0", avCol: "#2e7a00" },
  { initial: "준", name: "박준혁", role: "홀 서빙", shift: "14:00–22:00", status: "결근", inT: "–", bg: "var(--negative-bg)", col: "var(--negative)", avBg: "#f0f0f2", avCol: "rgba(55,56,60,0.5)" },
];

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
const SCHED = [
  { name: "김민지", shifts: [null, "14~22", null, "14~마감", null, "10~18", null] },
  { name: "이수현", shifts: [null, "10~18", "10~18", null, "10~18", "10~18", null] },
  { name: "박지우", shifts: [null, "14~22", null, "14~22", null, null, null] },
];

export default function OwnerMobileLayout({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<OMTab>("home");
  const [sub, setSub] = useState<SubScreen>(null);
  const [manualModal, setManualModal] = useState<string | null>(null);
  const [selDay, setSelDay] = useState(3); // Wed

  const TABS: { id: OMTab; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "홈", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11.5L12 3l9 8.5V21a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" /><path d="M9 22V12h6v10" /></svg> },
    { id: "attendance", label: "근태", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V5.5A1.5 1.5 0 0 1 5.5 4H7M17 4h1.5A1.5 1.5 0 0 1 20 5.5V7M20 17v1.5a1.5 1.5 0 0 1-1.5 1.5H17M7 20H5.5A1.5 1.5 0 0 1 4 18.5V17M8 12h8" /></svg> },
    { id: "schedule", label: "스케줄", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg> },
    { id: "more", label: "더보기", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="12" r="1.5" fill="currentColor" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /><circle cx="19" cy="12" r="1.5" fill="currentColor" /></svg> },
  ];

  return (
    <MobileFrame>
      {/* 상단 여백 (실제 디바이스 status bar가 표시되는 공간) */}
      <div style={{ height: 48 }} />

      {/* Content area */}
      <div style={{ position: "absolute", inset: 0, paddingTop: 48, paddingBottom: 80, overflowY: "auto", background: "#f4f4f5" }}>

        {/* Sub screens */}
        {sub && (
          <div style={{ position: "absolute", inset: 0, background: "#f4f4f5", zIndex: 10, overflowY: "auto", paddingTop: 0 }}>
            <div style={{ background: "#fff", padding: "16px 20px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--hairline)", paddingTop: 58 }}>
              <button onClick={() => setSub(null)} style={{ width: 36, height: 36, border: "none", borderRadius: 11, background: "#f1f1f3", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#37383c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
              </button>
              <span style={{ fontWeight: 800, fontSize: 18, color: "var(--text)" }}>
                {sub === "payroll" ? "급여 정산" : sub === "staff" ? "직원 관리" : "가게 온보딩"}
              </span>
            </div>
            <div style={{ padding: "20px 20px 24px" }}>
              {sub === "payroll" && <MobilePayroll />}
              {sub === "staff" && <MobileStaff />}
              {sub === "onboarding" && <MobileOnboarding />}
            </div>
          </div>
        )}

        {/* HOME */}
        {tab === "home" && !sub && (
          <div style={{ padding: "8px 20px 24px", animation: "fadeUp .3s ease" }}>
            <div style={{ fontWeight: 800, fontSize: 22, color: "var(--text)", padding: "10px 0 14px" }}>오늘 현황</div>

            {/* KPI mini cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {[
                { label: "출근", value: "3/4명", col: "var(--positive)", bg: "var(--positive-bg)" },
                { label: "결근", value: "1명", col: "var(--negative)", bg: "var(--negative-bg)" },
                { label: "이번달 인건비", value: "₩4.82M", col: "var(--p-tint)", bg: "var(--p-soft)" },
                { label: "마감 리포트", value: "대기 중", col: "var(--cautionary)", bg: "var(--cautionary-bg)" },
              ].map((k, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 16, padding: 14 }}>
                  <div style={{ fontWeight: 500, fontSize: 12, color: "var(--text-sub)" }}>{k.label}</div>
                  <div style={{ fontWeight: 800, fontSize: 18, color: "var(--text)", marginTop: 4 }}>{k.value}</div>
                </div>
              ))}
            </div>

            <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)", marginBottom: 12 }}>실시간 근태</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {TODAY_STAFF.map((s, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: s.avBg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, color: s.avCol }}>{s.initial}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{s.name}</div>
                    <div style={{ fontWeight: 500, fontSize: 12, color: "var(--text-sub)" }}>{s.shift}</div>
                  </div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 9999, background: s.bg, color: s.col, fontWeight: 600, fontSize: 12 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.col }} />{s.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ATTENDANCE */}
        {tab === "attendance" && !sub && (
          <div style={{ padding: "8px 20px 24px", animation: "fadeUp .3s ease" }}>
            <div style={{ fontWeight: 800, fontSize: 22, color: "var(--text)", padding: "10px 0 14px" }}>근태 관리</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {TODAY_STAFF.map((s, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: s.avBg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, color: s.avCol }}>{s.initial}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{s.name}</div>
                      <div style={{ fontWeight: 500, fontSize: 12, color: "var(--text-sub)" }}>{s.role} · {s.shift}</div>
                    </div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 9999, background: s.bg, color: s.col, fontWeight: 600, fontSize: 12 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.col }} />{s.status}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ flex: 1, background: "#f7f7f8", borderRadius: 11, padding: "9px 12px" }}>
                      <div style={{ fontWeight: 500, fontSize: 11, color: "var(--text-sub)" }}>출근</div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)", marginTop: 2 }}>{s.inT}</div>
                    </div>
                    <div style={{ flex: 1, background: "#f7f7f8", borderRadius: 11, padding: "9px 12px" }}>
                      <div style={{ fontWeight: 500, fontSize: 11, color: "var(--text-sub)" }}>퇴근</div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)", marginTop: 2 }}>–</div>
                    </div>
                    <button onClick={() => setManualModal(s.name)} style={{ padding: "0 14px", border: "none", borderRadius: 11, background: "var(--p-soft)", color: "var(--p-tint)", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>수동 처리</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCHEDULE */}
        {tab === "schedule" && !sub && (
          <div style={{ padding: "8px 20px 24px", animation: "fadeUp .3s ease" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0 14px" }}>
              <div style={{ fontWeight: 800, fontSize: 22, color: "var(--text)" }}>스케줄</div>
              <button style={{ padding: "8px 14px", background: "var(--p)", border: "none", borderRadius: 10, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>일괄 배정</button>
            </div>
            {/* Day chips */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 2 }}>
              {DAYS.map((d, i) => (
                <button key={i} onClick={() => setSelDay(i)} style={{ flexShrink: 0, width: 44, height: 44, borderRadius: "50%", border: "none", background: selDay === i ? "var(--p)" : "#fff", color: selDay === i ? "#fff" : "var(--text)", fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: selDay === i ? "0 4px 12px rgba(101,65,242,0.3)" : "0 1px 3px rgba(0,0,0,0.06)" }}>
                  {d}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {SCHED.map((s, i) => {
                const shift = s.shifts[selDay];
                return (
                  <div key={i} style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--p-soft)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, color: "var(--p-tint)" }}>{s.name[0]}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{s.name}</div>
                      <div style={{ fontWeight: 500, fontSize: 12, color: shift ? "var(--p-tint)" : "var(--text-sub)", marginTop: 2 }}>{shift ?? "휴무"}</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(55,56,60,0.3)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MORE */}
        {tab === "more" && !sub && (
          <div style={{ padding: "8px 20px 24px", animation: "fadeUp .3s ease" }}>
            <div style={{ fontWeight: 800, fontSize: 22, color: "var(--text)", padding: "10px 0 16px" }}>더보기</div>
            <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: "8px 8px" }}>
              {[
                { label: "급여 정산", key: "payroll" as SubScreen, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="5" width="22" height="14" rx="2" /><path d="M1 10h22" /></svg> },
                { label: "직원 관리", key: "staff" as SubScreen, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg> },
                { label: "가게 온보딩", key: "onboarding" as SubScreen, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-7-7 18-2.5-7.5L3 11Z" /></svg> },
              ].map((item, i) => (
                <button key={i} onClick={() => setSub(item.key)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "15px 14px", background: "none", border: "none", borderRadius: 12, cursor: "pointer" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--p-soft)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--p-tint)" }}>{item.icon}</div>
                  <span style={{ flex: 1, fontWeight: 600, fontSize: 15, color: "var(--text)", textAlign: "left" }}>{item.label}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(55,56,60,0.3)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
                </button>
              ))}
              <button onClick={onLogout} style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "15px 14px", background: "none", border: "none", borderRadius: 12, cursor: "pointer" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--negative-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--negative)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M15 17l5-5-5-5M20 12H9M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" /></svg>
                </div>
                <span style={{ flex: 1, fontWeight: 600, fontSize: 15, color: "var(--negative)", textAlign: "left" }}>로그아웃</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tab bar */}
      {!sub && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "#fff", borderTop: "1px solid var(--hairline)", display: "flex", alignItems: "center", zIndex: 10, paddingBottom: 8 }}>
          {TABS.map(t => {
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "8px 0 0", background: "none", border: "none", cursor: "pointer", color: active ? "var(--p)" : "var(--text-sub)" }}>
                {t.icon}
                <span style={{ fontWeight: 600, fontSize: 10 }}>{t.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Manual modal */}
      {manualModal && (
        <div style={{ position: "absolute", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "flex-end", borderRadius: 44 }}>
          <div style={{ width: "100%", background: "#fff", borderRadius: "24px 24px 0 0", padding: "24px 24px 40px" }}>
            <div style={{ fontWeight: 800, fontSize: 17, color: "var(--text)", marginBottom: 18 }}>{manualModal} 수동 처리</div>
            <label style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", display: "block", marginBottom: 6 }}>출근 시각</label>
            <input type="time" style={{ width: "100%", height: 48, border: "1.5px solid var(--p-border)", borderRadius: 13, padding: "0 14px", fontSize: 16, fontFamily: "Pretendard", fontWeight: 600, outline: "none", marginBottom: 20 }} />
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setManualModal(null)} style={{ flex: 1, height: 50, border: "1px solid var(--hairline)", borderRadius: 14, background: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>취소</button>
              <button onClick={() => setManualModal(null)} style={{ flex: 1, height: 50, border: "none", borderRadius: 14, background: "var(--p)", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>저장</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 130, height: 5, borderRadius: 3, background: "#0f0f10", opacity: 0.25, zIndex: 15 }} />
    </MobileFrame>
  );
}

function MobilePayroll() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {[
        { name: "김민지", wage: 11000, hours: 42.5, total: 612150, avBg: "#e8e2fd", avCol: "var(--p-tint)" },
        { name: "이수현", wage: 10500, hours: 38.0, total: 499200, avBg: "#fef4e6", avCol: "#d47800" },
        { name: "박지우", wage: 11000, hours: 40.0, total: 563200, avBg: "#eafce0", avCol: "#2e7a00" },
      ].map((r, i) => (
        <div key={i} style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 16, padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: r.avBg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, color: r.avCol }}>{r.name[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{r.name}</div>
              <div style={{ fontWeight: 500, fontSize: 12, color: "var(--text-sub)" }}>₩{r.wage.toLocaleString()} · {r.hours}h</div>
            </div>
            <span style={{ fontWeight: 800, fontSize: 15, color: "var(--text)" }}>₩{r.total.toLocaleString()}</span>
          </div>
          <button style={{ width: "100%", height: 42, border: "none", borderRadius: 12, background: "var(--p)", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>정산하기</button>
        </div>
      ))}
    </div>
  );
}

function MobileStaff() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {[
        { name: "김민지", role: "바리스타", wage: 11000, avBg: "#e8e2fd", avCol: "var(--p-tint)" },
        { name: "이수현", role: "카운터", wage: 10500, avBg: "#fef4e6", avCol: "#d47800" },
        { name: "박지우", role: "바리스타", wage: 11000, avBg: "#eafce0", avCol: "#2e7a00" },
      ].map((s, i) => (
        <div key={i} style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 16, padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: s.avBg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, color: s.avCol }}>{s.name[0]}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{s.name}</div>
            <div style={{ fontWeight: 500, fontSize: 12, color: "var(--text-sub)" }}>{s.role}</div>
          </div>
          <div style={{ background: "var(--p-soft)", borderRadius: 10, padding: "6px 12px", cursor: "pointer" }}>
            <div style={{ fontWeight: 500, fontSize: 10, color: "var(--p-tint)" }}>시급</div>
            <div style={{ fontWeight: 800, fontSize: 14, color: "var(--p-tint)" }}>₩{s.wage.toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MobileOnboarding() {
  return (
    <div>
      <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)", marginBottom: 12 }}>가게 안내 항목</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {["음료 레시피 숙지", "포스 사용법", "청소 구역 안내", "비상 연락망"].map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 12, background: "#fff", border: "1px solid var(--hairline)", borderRadius: 14, padding: 14 }}>
            <div style={{ width: 26, height: 26, borderRadius: 8, background: "var(--p-soft)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: "var(--p-tint)", flexShrink: 0 }}>{i + 1}</div>
            <span style={{ fontWeight: 600, fontSize: 14, color: "var(--text)" }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
