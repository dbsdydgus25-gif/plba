"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

interface AttRow {
  userId: string;
  name: string;
  inTime: string | null;
  outTime: string | null;
}

const AV_COLORS = [
  { bg: "#e8e2fd", col: "var(--p-tint)" },
  { bg: "#fef4e6", col: "#d47800" },
  { bg: "#eafce0", col: "#2e7a00" },
  { bg: "#f0f0f2", col: "rgba(55,56,60,0.5)" },
  { bg: "#fde8f0", col: "#c0006a" },
];

export default function OwnerAttendance({ storeId }: { storeId?: string }) {
  const [rows, setRows] = useState<AttRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalTarget, setModalTarget] = useState<AttRow | null>(null);
  const [inTime, setInTime] = useState("");
  const [outTime, setOutTime] = useState("");
  const [saving, setSaving] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  const load = useCallback(async () => {
    if (!storeId) return;
    setLoading(true);
    const [{ data: att }, { data: members }] = await Promise.all([
      supabase.from("attendance").select("user_id,in_time,out_time").eq("store_id", storeId).eq("date", today),
      supabase.from("store_members").select("user_id,users(name)").eq("store_id", storeId).eq("status", "active"),
    ]);
    if (!members) { setLoading(false); return; }
    const attMap = new Map((att ?? []).map(a => [a.user_id, a]));
    setRows(members.map(m => {
      const a = attMap.get(m.user_id);
      const user = m.users as unknown as { name: string } | null;
      const fmt = (iso: string) => new Date(iso).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false });
      return { userId: m.user_id, name: user?.name ?? "직원", inTime: a?.in_time ? fmt(a.in_time) : null, outTime: a?.out_time ? fmt(a.out_time) : null };
    }));
    setLoading(false);
  }, [storeId, today]);

  useEffect(() => { load(); }, [load]);

  async function saveManual() {
    if (!modalTarget || !storeId) return;
    setSaving(true);
    const toISO = (t: string) => t ? new Date(`${today}T${t}:00`).toISOString() : null;
    await supabase.from("attendance").upsert(
      { store_id: storeId, user_id: modalTarget.userId, date: today, in_time: toISO(inTime), out_time: toISO(outTime) },
      { onConflict: "store_id,user_id,date" }
    );
    setSaving(false);
    setModalTarget(null);
    load();
  }

  function getStatus(row: AttRow) {
    if (row.inTime && !row.outTime) return { label: "근무 중", bg: "var(--positive-bg)", col: "var(--positive)" };
    if (row.inTime && row.outTime) return { label: "퇴근", bg: "#f1f1f3", col: "rgba(55,56,60,0.6)" };
    return { label: "미출근", bg: "var(--negative-bg)", col: "var(--negative)" };
  }

  return (
    <div style={{ animation: "fadeUp .3s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, background: "var(--p-soft)", borderRadius: 14, padding: "13px 16px", marginBottom: 14 }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--p-tint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V5.5A1.5 1.5 0 0 1 5.5 4H7M17 4h1.5A1.5 1.5 0 0 1 20 5.5V7M20 17v1.5a1.5 1.5 0 0 1-1.5 1.5H17M7 20H5.5A1.5 1.5 0 0 1 4 18.5V17M8 12h8" /></svg>
        <span style={{ fontWeight: 500, fontSize: 13, color: "var(--p-tint)" }}>QR을 못 찍은 직원은 <b>수동 처리</b>로 출퇴근을 직접 기록할 수 있어요.</span>
      </div>

      <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1.1fr", padding: "14px 22px", background: "#f7f7f8", borderBottom: "1px solid rgba(112,115,124,0.12)" }}>
          {["직원", "출근", "퇴근", "상태", "수동 처리"].map((h, i) => (
            <span key={i} style={{ fontWeight: 600, fontSize: 12, color: "var(--text-sub)", textAlign: i === 4 ? "right" : "left" }}>{h}</span>
          ))}
        </div>
        {loading ? (
          <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-sub)", fontSize: 14 }}>불러오는 중...</div>
        ) : rows.length === 0 ? (
          <div style={{ padding: "48px 0", textAlign: "center", color: "var(--text-sub)", fontSize: 14 }}>등록된 직원이 없어요. 직원 관리에서 먼저 추가해주세요.</div>
        ) : rows.map((row, i) => {
          const st = getStatus(row);
          const av = AV_COLORS[i % AV_COLORS.length];
          return (
            <div key={row.userId} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1.1fr", alignItems: "center", padding: "15px 22px", borderBottom: i < rows.length - 1 ? "1px solid rgba(112,115,124,0.1)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: av.bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: av.col }}>{row.name.charAt(0)}</div>
                <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{row.name}</span>
              </div>
              <span style={{ fontWeight: 600, fontSize: 14, color: "#37383c" }}>{row.inTime ?? "–"}</span>
              <span style={{ fontWeight: 600, fontSize: 14, color: "#37383c" }}>{row.outTime ?? "–"}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "5px 11px", borderRadius: 9999, background: st.bg, color: st.col, fontWeight: 600, fontSize: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: st.col }} />{st.label}
              </span>
              <div style={{ textAlign: "right" }}>
                <button onClick={() => { setModalTarget(row); setInTime(row.inTime ?? ""); setOutTime(row.outTime ?? ""); }} style={{ padding: "7px 12px", background: "var(--p-soft)", border: "none", borderRadius: 9, color: "var(--p-tint)", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>수동 처리</button>
              </div>
            </div>
          );
        })}
      </div>

      {modalTarget && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setModalTarget(null)}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 28, width: 360, boxShadow: "0 24px 60px rgba(0,0,0,0.18)" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 800, fontSize: 17, color: "var(--text)", marginBottom: 4 }}>{modalTarget.name} 수동 처리</div>
            <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", marginBottom: 22 }}>{today} 출퇴근 시간을 직접 입력해요.</div>
            {[["출근 시간", inTime, setInTime], ["퇴근 시간", outTime, setOutTime]].map(([label, val, set]) => (
              <div key={label as string} style={{ marginBottom: 14 }}>
                <label style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", display: "block", marginBottom: 6 }}>{label as string}</label>
                <input type="time" value={val as string} onChange={e => (set as (v: string) => void)(e.target.value)} style={{ width: "100%", height: 48, border: "1.5px solid var(--p-border)", borderRadius: 12, padding: "0 14px", fontSize: 16, boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button onClick={() => setModalTarget(null)} style={{ flex: 1, height: 48, border: "1.5px solid var(--hairline)", borderRadius: 12, background: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", color: "var(--text-sub)" }}>취소</button>
              <button onClick={saveManual} disabled={saving} style={{ flex: 2, height: 48, border: "none", borderRadius: 12, background: "var(--p)", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", opacity: saving ? 0.7 : 1 }}>{saving ? "저장 중..." : "저장"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
