"use client";
import { useState } from "react";

const PAYROLL_ROWS = [
  { initial: "민", name: "김민지", role: "바리스타", wage: 11000, hours: 42.5, weekly: 144650, avBg: "#e8e2fd", avCol: "var(--p-tint)" },
  { initial: "수", name: "이수현", role: "카운터", wage: 10500, hours: 38.0, weekly: 88200, avBg: "#fef4e6", avCol: "#d47800" },
  { initial: "지", name: "박지우", role: "바리스타", wage: 11000, hours: 40.0, weekly: 123200, avBg: "#eafce0", avCol: "#2e7a00" },
  { initial: "준", name: "박준혁", role: "홀 서빙", wage: 10000, hours: 24.0, weekly: 0, avBg: "#f0f0f2", avCol: "rgba(55,56,60,0.5)" },
];

export default function OwnerPayroll() {
  const [settling, setSettling] = useState<number | null>(null);

  return (
    <div style={{ animation: "fadeUp .3s ease" }}>
      {/* Summary cards */}
      <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
        <div style={{ flex: 1, background: "var(--p)", borderRadius: 16, padding: "18px 20px", color: "#fff" }}>
          <div style={{ fontWeight: 600, fontSize: 13, opacity: 0.9 }}>6월 총 인건비</div>
          <div style={{ fontWeight: 800, fontSize: 27, marginTop: 6 }}>₩4,820,000</div>
        </div>
        <div style={{ flex: 1, background: "#fff", border: "1px solid var(--hairline)", borderRadius: 16, padding: "18px 20px" }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-sub)" }}>주휴수당 포함</div>
          <div style={{ fontWeight: 800, fontSize: 27, color: "var(--text)", marginTop: 6 }}>₩640,500</div>
        </div>
        <div style={{ flex: 1, background: "#fff", border: "1px solid var(--hairline)", borderRadius: 16, padding: "18px 20px" }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-sub)" }}>정산 대기</div>
          <div style={{ fontWeight: 800, fontSize: 27, color: "var(--negative)", marginTop: 6 }}>4명</div>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr 1fr", padding: "14px 22px", background: "#f7f7f8", borderBottom: "1px solid rgba(112,115,124,0.12)" }}>
          {["직원", "시급", "근무시간", "주휴수당", "합계", "정산"].map((h, i) => (
            <span key={i} style={{ fontWeight: 600, fontSize: 12, color: "var(--text-sub)", textAlign: i === 5 ? "right" : "left" }}>{h}</span>
          ))}
        </div>
        {PAYROLL_ROWS.map((r, i) => {
          const total = Math.round(r.wage * r.hours + r.weekly);
          const settled = settling === i;
          return (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr 1fr", alignItems: "center", padding: "15px 22px", borderBottom: i < PAYROLL_ROWS.length - 1 ? "1px solid rgba(112,115,124,0.1)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: r.avBg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: r.avCol }}>{r.initial}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{r.name}</div>
                  <div style={{ fontWeight: 500, fontSize: 11, color: "var(--text-sub)" }}>{r.role}</div>
                </div>
              </div>
              <span style={{ fontWeight: 600, fontSize: 14, color: "#37383c" }}>₩{r.wage.toLocaleString()}</span>
              <span style={{ fontWeight: 600, fontSize: 14, color: "#37383c" }}>{r.hours}h</span>
              <span style={{ fontWeight: 600, fontSize: 14, color: "#37383c" }}>₩{r.weekly.toLocaleString()}</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>₩{total.toLocaleString()}</span>
              <div style={{ textAlign: "right" }}>
                <button
                  onClick={() => setSettling(settled ? null : i)}
                  style={{ padding: "7px 13px", background: settled ? "var(--positive-bg)" : "var(--p)", border: "none", borderRadius: 9, color: settled ? "var(--positive)" : "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer", transition: "all 0.15s" }}
                >
                  {settled ? "정산 완료" : "정산하기"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
