"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function getWeekDates() {
  const today = new Date();
  const dow = today.getDay();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - dow + i);
    return { label: `${d.getMonth() + 1}/${d.getDate()}`, date: d };
  });
}

type Cell = { s: string; e: string } | null;

interface StaffRow { userId: string; name: string; schedule: Cell[]; }

export default function OwnerSchedule({ storeId }: { storeId?: string }) {
  const [staffRows, setStaffRows] = useState<StaffRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDraft, setEditDraft] = useState<{ ri: number; di: number; s: string; e: string } | null>(null);
  const weekDates = getWeekDates();

  const load = useCallback(async () => {
    if (!storeId) return;
    setLoading(true);
    const { data: members } = await supabase
      .from("store_members")
      .select("user_id,users(name)")
      .eq("store_id", storeId)
      .eq("status", "active");
    if (!members) { setLoading(false); return; }
    setStaffRows(members.map(m => ({
      userId: m.user_id,
      name: (m.users as unknown as { name: string } | null)?.name ?? "직원",
      schedule: Array(7).fill(null),
    })));
    setLoading(false);
  }, [storeId]);

  useEffect(() => { load(); }, [load]);

  function openCell(ri: number, di: number) {
    const cell = staffRows[ri].schedule[di];
    setEditDraft({ ri, di, s: cell?.s ?? "09:00", e: cell?.e ?? "18:00" });
  }

  function saveCell() {
    if (!editDraft) return;
    setStaffRows(prev => prev.map((row, i) => {
      if (i !== editDraft.ri) return row;
      const newSched = [...row.schedule];
      newSched[editDraft.di] = { s: editDraft.s, e: editDraft.e };
      return { ...row, schedule: newSched };
    }));
    setEditDraft(null);
  }

  function clearCell() {
    if (!editDraft) return;
    setStaffRows(prev => prev.map((row, i) => {
      if (i !== editDraft.ri) return row;
      const newSched = [...row.schedule];
      newSched[editDraft.di] = null;
      return { ...row, schedule: newSched };
    }));
    setEditDraft(null);
  }

  const AV_COLORS = ["#e8e2fd/var(--p-tint)", "#fef4e6/#d47800", "#eafce0/#2e7a00", "#f0f0f2/rgba(55,56,60,0.5)", "#fde8f0/#c0006a"];

  return (
    <div style={{ animation: "fadeUp .3s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, background: "var(--p-soft)", borderRadius: 14, padding: "13px 16px", marginBottom: 18 }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--p-tint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
        <span style={{ fontWeight: 500, fontSize: 13, color: "var(--p-tint)" }}>셀을 클릭해서 이번 주 스케줄을 설정해요. 저장은 브라우저 세션 내에서 유지됩니다.</span>
      </div>

      <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, overflow: "auto" }}>
        {/* 헤더 */}
        <div style={{ display: "grid", gridTemplateColumns: `140px repeat(7, 1fr)`, borderBottom: "1px solid rgba(112,115,124,0.12)", background: "#f7f7f8" }}>
          <div style={{ padding: "14px 18px", fontWeight: 600, fontSize: 12, color: "var(--text-sub)" }}>직원</div>
          {DAYS.map((d, i) => (
            <div key={i} style={{ padding: "10px 6px", textAlign: "center", borderLeft: "1px solid rgba(112,115,124,0.08)" }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: i === 0 || i === 6 ? "var(--negative)" : "var(--text)" }}>{d}</div>
              <div style={{ fontWeight: 500, fontSize: 11, color: "var(--text-sub)", marginTop: 1 }}>{weekDates[i].label}</div>
            </div>
          ))}
        </div>

        {loading ? (
          <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-sub)", fontSize: 14 }}>불러오는 중...</div>
        ) : staffRows.length === 0 ? (
          <div style={{ padding: "48px 0", textAlign: "center", color: "var(--text-sub)", fontSize: 14 }}>등록된 직원이 없어요.</div>
        ) : staffRows.map((row, ri) => {
          const [avBg, avCol] = AV_COLORS[ri % AV_COLORS.length].split("/");
          return (
            <div key={row.userId} style={{ display: "grid", gridTemplateColumns: `140px repeat(7, 1fr)`, borderBottom: ri < staffRows.length - 1 ? "1px solid rgba(112,115,124,0.08)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "12px 18px" }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: avBg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: avCol, flexShrink: 0 }}>{row.name.charAt(0)}</div>
                <span style={{ fontWeight: 700, fontSize: 13, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.name}</span>
              </div>
              {row.schedule.map((cell, di) => (
                <button key={di} onClick={() => openCell(ri, di)} style={{ border: "none", borderLeft: "1px solid rgba(112,115,124,0.08)", padding: "8px 6px", background: cell ? "var(--p-soft)" : "transparent", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, minHeight: 56, transition: "background 0.12s" }}>
                  {cell ? (
                    <>
                      <span style={{ fontWeight: 700, fontSize: 11, color: "var(--p-tint)" }}>{cell.s}</span>
                      <span style={{ fontWeight: 500, fontSize: 10, color: "var(--p-tint)", opacity: 0.7 }}>~{cell.e}</span>
                    </>
                  ) : (
                    <span style={{ fontSize: 18, color: "rgba(112,115,124,0.25)" }}>+</span>
                  )}
                </button>
              ))}
            </div>
          );
        })}
      </div>

      {editDraft && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setEditDraft(null)}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 28, width: 320, boxShadow: "0 24px 60px rgba(0,0,0,0.18)" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 800, fontSize: 17, color: "var(--text)", marginBottom: 4 }}>
              {staffRows[editDraft.ri].name} — {DAYS[editDraft.di]}요일
            </div>
            <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", marginBottom: 22 }}>{weekDates[editDraft.di].label}</div>
            {[["시작", editDraft.s, (v: string) => setEditDraft(d => d ? { ...d, s: v } : d)], ["종료", editDraft.e, (v: string) => setEditDraft(d => d ? { ...d, e: v } : d)]].map(([label, val, set]) => (
              <div key={label as string} style={{ marginBottom: 14 }}>
                <label style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", display: "block", marginBottom: 6 }}>{label as string}</label>
                <input type="time" value={val as string} onChange={e => (set as (v: string) => void)(e.target.value)} style={{ width: "100%", height: 48, border: "1.5px solid var(--p-border)", borderRadius: 12, padding: "0 14px", fontSize: 16, boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button onClick={clearCell} style={{ flex: 1, height: 48, border: "1.5px solid var(--negative)", borderRadius: 12, background: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", color: "var(--negative)" }}>삭제</button>
              <button onClick={saveCell} style={{ flex: 2, height: 48, border: "none", borderRadius: 12, background: "var(--p)", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>저장</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
