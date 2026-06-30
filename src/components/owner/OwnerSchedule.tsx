"use client";
import { useState } from "react";

const STAFF = ["김민지", "이수현", "박지우", "박준혁"];
const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
const DATES = ["6/22", "6/23", "6/24", "6/25", "6/26", "6/27", "6/28"];

type Cell = { s: string; e: string } | null;
type Matrix = Cell[][];

const INIT: Matrix = [
  [null, { s: "14:00", e: "22:00" }, null, { s: "14:00", e: "마감" }, null, { s: "10:00", e: "18:00" }, null],
  [null, { s: "10:00", e: "18:00" }, { s: "10:00", e: "18:00" }, null, { s: "10:00", e: "18:00" }, { s: "10:00", e: "18:00" }, null],
  [null, { s: "14:00", e: "22:00" }, null, { s: "14:00", e: "22:00" }, null, null, null],
  [null, null, { s: "14:00", e: "마감" }, null, { s: "14:00", e: "22:00" }, null, null],
];

interface EditDraft { staff: number; day: number; s: string; e: string; eMode: "time" | "미정" | "마감"; }

export default function OwnerSchedule() {
  const [range, setRange] = useState<"week" | "month">("week");
  const [matrix, setMatrix] = useState<Matrix>(INIT);
  const [editDraft, setEditDraft] = useState<EditDraft | null>(null);
  const [batchOpen, setBatchOpen] = useState(false);

  function openCell(si: number, di: number) {
    const cell = matrix[si][di];
    setEditDraft({
      staff: si, day: di,
      s: cell?.s ?? "09:00",
      e: cell?.e && !["미정", "마감"].includes(cell.e) ? cell.e : "18:00",
      eMode: cell?.e === "미정" ? "미정" : cell?.e === "마감" ? "마감" : "time",
    });
  }

  function saveCell() {
    if (!editDraft) return;
    const { staff, day, s, e, eMode } = editDraft;
    const newMatrix = matrix.map(row => [...row]);
    newMatrix[staff][day] = { s, e: eMode === "time" ? e : eMode };
    setMatrix(newMatrix);
    setEditDraft(null);
  }

  function clearCell() {
    if (!editDraft) return;
    const { staff, day } = editDraft;
    const newMatrix = matrix.map(row => [...row]);
    newMatrix[staff][day] = null;
    setMatrix(newMatrix);
    setEditDraft(null);
  }

  const segStyle = (active: boolean): React.CSSProperties => ({ height: 30, padding: "0 14px", borderRadius: 8, border: "none", fontWeight: 600, fontSize: 12, cursor: "pointer", background: active ? "#fff" : "transparent", color: active ? "var(--text)" : "var(--text-sub)", boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none", transition: "all 0.12s", whiteSpace: "nowrap" });

  // Month view: build per-day staff assignments from matrix
  // June 2026 starts Sunday. Day 1 = cell 0.
  const monthAssignments: { count: number; names: string[] }[] = Array.from({ length: 30 }, (_, d) => {
    // INIT covers 7 days of week (not a full month), so just demo: cycle through week days
    const di = d % 7;
    const staffForDay = STAFF.filter((_, si) => matrix[si][di] !== null);
    return { count: staffForDay.length, names: staffForDay };
  });

  return (
    <div style={{ animation: "fadeUp .3s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <div style={{ display: "inline-flex", gap: 2, padding: 3, background: "#f1f1f3", borderRadius: 10 }}>
          <button style={segStyle(range === "week")} onClick={() => setRange("week")}>이번 주</button>
          <button style={segStyle(range === "month")} onClick={() => setRange("month")}>이번 달</button>
        </div>
        <button onClick={() => setBatchOpen(true)} style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7, padding: "9px 15px", background: "var(--p)", border: "none", borderRadius: 10, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 10h18M8 2v4M16 2v4" /></svg>
          일괄 배정
        </button>
      </div>

      {range === "week" && (
        <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, overflow: "hidden" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: `140px repeat(7,1fr)`, padding: "12px 16px", background: "#f7f7f8", borderBottom: "1px solid rgba(112,115,124,0.12)", gap: 6 }}>
            <span style={{ fontWeight: 600, fontSize: 12, color: "var(--text-sub)" }}>직원</span>
            {DAYS.map((d, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 600, fontSize: 11, color: "var(--text-sub)" }}>{DATES[i]}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: i === 3 ? "var(--p)" : "var(--text)" }}>{d}</div>
              </div>
            ))}
          </div>

          {/* Rows */}
          {STAFF.map((name, si) => (
            <div key={si} style={{ display: "grid", gridTemplateColumns: `140px repeat(7,1fr)`, padding: "10px 16px", borderBottom: si < STAFF.length - 1 ? "1px solid rgba(112,115,124,0.1)" : "none", gap: 6, alignItems: "center" }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text)" }}>{name}</div>
              {matrix[si].map((cell, di) => {
                const isClose = cell?.e === "마감";
                return (
                  <button
                    key={di}
                    onClick={() => openCell(si, di)}
                    style={{
                      height: 56, borderRadius: 10, border: "1px solid", cursor: "pointer",
                      background: isClose ? "#2B2440" : cell ? "var(--p-softer)" : "#fafafa",
                      borderColor: isClose ? "#2B2440" : cell ? "var(--p-border)" : "rgba(112,115,124,0.18)",
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2,
                      transition: "all 0.12s",
                    }}
                  >
                    {cell ? (
                      <>
                        <span style={{ fontWeight: 700, fontSize: 11, color: isClose ? "#C4B8FF" : "var(--p-tint)" }}>{cell.s}</span>
                        <span style={{ fontWeight: 600, fontSize: 10, color: isClose ? "rgba(196,184,255,0.7)" : "var(--p-tint)", opacity: 0.8 }}>{cell.e}</span>
                      </>
                    ) : (
                      <span style={{ fontWeight: 700, fontSize: 18, color: "rgba(112,115,124,0.3)" }}>+</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {range === "month" && (
        <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", padding: "10px 12px 8px", background: "#f7f7f8", borderBottom: "1px solid rgba(112,115,124,0.12)" }}>
            {DAYS.map(d => <div key={d} style={{ textAlign: "center", fontWeight: 600, fontSize: 12, color: "var(--text-sub)" }}>{d}</div>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, padding: 10 }}>
            {Array.from({ length: 35 }, (_, i) => {
              // June 2026 starts on Monday (day index 1), so offset by 1
              const dateNum = i - 0;
              const date = dateNum >= 0 && dateNum < 30 ? dateNum + 1 : null;
              const info = date ? monthAssignments[date - 1] : null;
              const isToday = date === 29;
              return (
                <div key={i} style={{ minHeight: 90, borderRadius: 10, background: date ? "#fff" : "#f7f7f8", border: `1px solid ${isToday ? "var(--p-border)" : "var(--hairline)"}`, padding: "7px 7px 8px", boxSizing: "border-box", position: "relative", overflow: "hidden" }}>
                  {date && (
                    <>
                      <div style={{ fontWeight: isToday ? 800 : 600, fontSize: 12, color: isToday ? "var(--p-tint)" : "var(--text-sub)", marginBottom: 4 }}>{date}</div>
                      {info && info.count > 0 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 6px", borderRadius: 6, background: "var(--p-soft)", width: "fit-content" }}>
                            <span style={{ fontWeight: 700, fontSize: 10, color: "var(--p-tint)" }}>{info.count}명</span>
                          </div>
                          {info.names.slice(0, 3).map((name, ni) => (
                            <div key={ni} style={{ fontSize: 10, fontWeight: 600, color: "var(--text-sub)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", paddingLeft: 1 }}>
                              {name}
                            </div>
                          ))}
                          {info.names.length > 3 && <div style={{ fontSize: 9, color: "var(--text-sub)", opacity: 0.6, paddingLeft: 1 }}>+{info.names.length - 3}명</div>}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cell edit modal */}
      {editDraft && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setEditDraft(null)}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 28, width: 360, boxShadow: "0 24px 60px rgba(0,0,0,0.24)" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 800, fontSize: 17, color: "var(--text)", marginBottom: 18 }}>{STAFF[editDraft.staff]} · {DAYS[editDraft.day]}요일</div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", display: "block", marginBottom: 6 }}>시작 시각</label>
              <input type="time" value={editDraft.s} onChange={e => setEditDraft({ ...editDraft, s: e.target.value })} style={{ width: "100%", height: 44, border: "1.5px solid var(--p-border)", borderRadius: 11, padding: "0 14px", fontSize: 15, fontFamily: "Pretendard", fontWeight: 600, outline: "none" }} />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", display: "block", marginBottom: 8 }}>종료</label>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                {(["time", "미정", "마감"] as const).map(mode => (
                  <button key={mode} onClick={() => setEditDraft({ ...editDraft, eMode: mode })} style={{ flex: 1, height: 36, border: `1.5px solid ${editDraft.eMode === mode ? "var(--p)" : "var(--hairline)"}`, borderRadius: 9, background: editDraft.eMode === mode ? "var(--p-soft)" : "#fff", color: editDraft.eMode === mode ? "var(--p-tint)" : "var(--text-sub)", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                    {mode === "time" ? "시간 지정" : mode}
                  </button>
                ))}
              </div>
              {editDraft.eMode === "time" && <input type="time" value={editDraft.e} onChange={e => setEditDraft({ ...editDraft, e: e.target.value })} style={{ width: "100%", height: 44, border: "1.5px solid var(--p-border)", borderRadius: 11, padding: "0 14px", fontSize: 15, fontFamily: "Pretendard", fontWeight: 600, outline: "none" }} />}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
              <button onClick={clearCell} style={{ padding: "10px 16px", border: "1px solid var(--negative-bg)", borderRadius: 12, background: "var(--negative-bg)", color: "var(--negative)", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>휴무로 변경</button>
              <div style={{ flex: 1 }} />
              <button onClick={() => setEditDraft(null)} style={{ padding: "10px 16px", border: "1px solid var(--hairline)", borderRadius: 12, background: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>취소</button>
              <button onClick={saveCell} style={{ padding: "10px 16px", border: "none", borderRadius: 12, background: "var(--p)", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>저장</button>
            </div>
          </div>
        </div>
      )}

      {/* Batch modal */}
      {batchOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setBatchOpen(false)}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 28, width: 400, boxShadow: "0 24px 60px rgba(0,0,0,0.24)" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 800, fontSize: 17, color: "var(--text)", marginBottom: 18 }}>일괄 배정</div>
            <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", marginBottom: 8 }}>직원 선택</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
              {STAFF.map(s => <span key={s} style={{ padding: "6px 12px", borderRadius: 9999, border: "1.5px solid var(--p)", background: "var(--p-soft)", color: "var(--p-tint)", fontWeight: 600, fontSize: 13 }}>{s}</span>)}
            </div>
            <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", marginBottom: 8 }}>요일 선택</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
              {DAYS.map(d => <span key={d} style={{ flex: 1, height: 36, borderRadius: 9, border: "1.5px solid var(--p)", background: "var(--p-soft)", color: "var(--p-tint)", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>{d}</span>)}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input type="time" defaultValue="14:00" style={{ flex: 1, height: 44, border: "1.5px solid var(--p-border)", borderRadius: 11, padding: "0 14px", fontSize: 15, fontFamily: "Pretendard", fontWeight: 600, outline: "none" }} />
              <span style={{ display: "flex", alignItems: "center", color: "var(--text-sub)" }}>–</span>
              <input type="time" defaultValue="22:00" style={{ flex: 1, height: 44, border: "1.5px solid var(--p-border)", borderRadius: 11, padding: "0 14px", fontSize: 15, fontFamily: "Pretendard", fontWeight: 600, outline: "none" }} />
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={() => setBatchOpen(false)} style={{ flex: 1, height: 48, border: "1px solid var(--hairline)", borderRadius: 13, background: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>취소</button>
              <button onClick={() => setBatchOpen(false)} style={{ flex: 1, height: 48, border: "none", borderRadius: 13, background: "var(--p)", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>일괄 적용</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
