"use client";
import { useState } from "react";

const ATT_ROWS = [
  { initial: "민", name: "김민지", role: "바리스타", inT: "14:17", outT: "–", status: "근무 중", bg: "var(--positive-bg)", col: "var(--positive)", avBg: "#e8e2fd", avCol: "var(--p-tint)", manual: true, manualLabel: "퇴근 처리" },
  { initial: "수", name: "이수현", role: "카운터", inT: "10:02", outT: "18:04", status: "퇴근", bg: "#f1f1f3", col: "rgba(55,56,60,0.6)", avBg: "#fef4e6", avCol: "#d47800", manual: false, manualLabel: "수정" },
  { initial: "지", name: "박지우", role: "바리스타", inT: "10:00", outT: "–", status: "근무 중", bg: "var(--positive-bg)", col: "var(--positive)", avBg: "#eafce0", avCol: "#2e7a00", manual: false, manualLabel: "퇴근 처리" },
  { initial: "준", name: "박준혁", role: "홀 서빙", inT: "–", outT: "–", status: "결근", bg: "var(--negative-bg)", col: "var(--negative)", avBg: "#f0f0f2", avCol: "rgba(55,56,60,0.5)", manual: false, manualLabel: "출근 처리" },
  { initial: "하", name: "최하은", role: "카운터", inT: "–", outT: "–", status: "휴무", bg: "#f1f1f3", col: "rgba(55,56,60,0.45)", avBg: "#f0f0f2", avCol: "rgba(55,56,60,0.4)", manual: false, manualLabel: "처리" },
];

interface ManualEdit { name: string; mode: "in" | "out" | "both"; inTime: string; outTime: string; hasOut: boolean; }

export default function OwnerAttendance() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState<ManualEdit | null>(null);
  const [rows, setRows] = useState(ATT_ROWS);

  function openManual(name: string) {
    setModalTarget({ name, mode: "both", inTime: "", outTime: "", hasOut: false });
    setModalOpen(true);
  }

  function saveManual() {
    setModalOpen(false);
  }

  return (
    <div style={{ animation: "fadeUp .3s ease" }}>
      {/* Banner */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, background: "var(--p-soft)", borderRadius: 14, padding: "13px 16px", marginBottom: 14 }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--p-tint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V5.5A1.5 1.5 0 0 1 5.5 4H7M17 4h1.5A1.5 1.5 0 0 1 20 5.5V7M20 17v1.5a1.5 1.5 0 0 1-1.5 1.5H17M7 20H5.5A1.5 1.5 0 0 1 4 18.5V17M8 12h8" /></svg>
        <span style={{ fontWeight: 500, fontSize: 13, color: "var(--p-tint)" }}>QR을 못 찍은 직원은 <b>수동 처리</b>로 출퇴근을 직접 기록할 수 있어요.</span>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1.1fr", padding: "14px 22px", background: "#f7f7f8", borderBottom: "1px solid rgba(112,115,124,0.12)" }}>
          {["직원", "출근", "퇴근", "상태", "수동 처리"].map((h, i) => (
            <span key={i} style={{ fontWeight: 600, fontSize: 12, color: "var(--text-sub)", textAlign: i === 4 ? "right" : "left" }}>{h}</span>
          ))}
        </div>
        {rows.map((a, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1.1fr", alignItems: "center", padding: "15px 22px", borderBottom: i < rows.length - 1 ? "1px solid rgba(112,115,124,0.1)" : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: a.avBg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: a.avCol }}>{a.initial}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{a.name}</div>
                <div style={{ fontWeight: 500, fontSize: 11, color: "var(--text-sub)" }}>{a.role}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontWeight: 600, fontSize: 14, color: "#37383c" }}>{a.inT}</span>
              {a.manual && <span style={{ padding: "1px 6px", borderRadius: 6, background: "var(--cautionary-bg)", color: "var(--cautionary)", fontWeight: 700, fontSize: 9 }}>수동</span>}
            </div>
            <span style={{ fontWeight: 600, fontSize: 14, color: "#37383c" }}>{a.outT}</span>
            <div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 11px", borderRadius: 9999, background: a.bg, color: a.col, fontWeight: 600, fontSize: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: a.col }} />{a.status}
              </span>
            </div>
            <div style={{ textAlign: "right" }}>
              <button onClick={() => openManual(a.name)} style={{ padding: "7px 13px", background: "#f1f1f3", border: "none", borderRadius: 9, color: "#37383c", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>{a.manualLabel}</button>
            </div>
          </div>
        ))}
      </div>

      {/* Manual modal */}
      {modalOpen && modalTarget && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setModalOpen(false)}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 28, width: 380, boxShadow: "0 24px 60px rgba(0,0,0,0.24)" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 800, fontSize: 18, color: "var(--text)", marginBottom: 6 }}>수동 출퇴근 처리</div>
            <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", marginBottom: 20 }}>{modalTarget.name}의 출퇴근을 직접 기록해요.</div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", display: "block", marginBottom: 6 }}>출근 시각</label>
              <input type="time" value={modalTarget.inTime} onChange={e => setModalTarget({ ...modalTarget, inTime: e.target.value })} style={{ width: "100%", height: 44, border: "1.5px solid var(--p-border)", borderRadius: 11, padding: "0 14px", fontSize: 15, fontFamily: "Pretendard", fontWeight: 600, color: "var(--text)", outline: "none" }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <label style={{ fontWeight: 600, fontSize: 13, color: "var(--text)" }}>퇴근 시각</label>
                <button onClick={() => setModalTarget({ ...modalTarget, hasOut: !modalTarget.hasOut })} style={{ fontWeight: 600, fontSize: 12, color: "var(--p)", background: "none", border: "none", cursor: "pointer" }}>{modalTarget.hasOut ? "제거" : "추가"}</button>
              </div>
              {modalTarget.hasOut && <input type="time" value={modalTarget.outTime} onChange={e => setModalTarget({ ...modalTarget, outTime: e.target.value })} style={{ width: "100%", height: 44, border: "1.5px solid var(--p-border)", borderRadius: 11, padding: "0 14px", fontSize: 15, fontFamily: "Pretendard", fontWeight: 600, color: "var(--text)", outline: "none" }} />}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setModalOpen(false)} style={{ flex: 1, height: 48, border: "1px solid var(--hairline)", borderRadius: 13, background: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>취소</button>
              <button onClick={saveManual} style={{ flex: 1, height: 48, border: "none", borderRadius: 13, background: "var(--p)", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>저장</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
