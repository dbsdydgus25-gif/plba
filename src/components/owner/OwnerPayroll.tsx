"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

interface PayRow {
  userId: string;
  name: string;
  wage: number;
  hours: number;
  weekly: number;
  total: number;
}

const AV_COLORS = [
  { bg: "#e8e2fd", col: "var(--p-tint)" },
  { bg: "#fef4e6", col: "#d47800" },
  { bg: "#eafce0", col: "#2e7a00" },
  { bg: "#f0f0f2", col: "rgba(55,56,60,0.5)" },
  { bg: "#fde8f0", col: "#c0006a" },
];

export default function OwnerPayroll({ storeId }: { storeId?: string }) {
  const [rows, setRows] = useState<PayRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));

  const load = useCallback(async () => {
    if (!storeId) return;
    setLoading(true);

    const start = `${month}-01`;
    const endDate = new Date(month + "-01");
    endDate.setMonth(endDate.getMonth() + 1);
    const end = endDate.toISOString().slice(0, 10);

    const [{ data: members }, { data: att }] = await Promise.all([
      supabase.from("store_members").select("user_id,wage,start_date,users(name)").eq("store_id", storeId).eq("status", "active"),
      supabase.from("attendance").select("user_id,in_time,out_time,date").eq("store_id", storeId).gte("date", start).lt("date", end),
    ]);

    if (!members) { setLoading(false); return; }

    const attByUser = new Map<string, typeof att>();
    (att ?? []).forEach(a => {
      if (!attByUser.has(a.user_id)) attByUser.set(a.user_id, []);
      attByUser.get(a.user_id)!.push(a);
    });

    const result: PayRow[] = members.map(m => {
      const user = m.users as unknown as { name: string } | null;
      const wage = m.wage ?? 10030;
      const records = attByUser.get(m.user_id) ?? [];

      // 총 근무시간 계산
      let totalMin = 0;
      const weeklyHoursMap = new Map<number, number>();
      records.forEach(r => {
        if (!r.in_time || !r.out_time) return;
        const inT = new Date(r.in_time);
        const outT = new Date(r.out_time);
        const mins = Math.max(0, (outT.getTime() - inT.getTime()) / 60000);
        totalMin += mins;
        // 주 번호 (ISO week)
        const d = new Date(r.date);
        const week = Math.ceil((d.getDate() - d.getDay() + 6) / 7);
        weeklyHoursMap.set(week, (weeklyHoursMap.get(week) ?? 0) + mins / 60);
      });

      const hours = Math.round(totalMin / 60 * 10) / 10;

      // 주휴수당: 주 15시간 이상 근무 시 하루치 지급
      let weekly = 0;
      weeklyHoursMap.forEach(wh => {
        if (wh >= 15) weekly += Math.round(wh / 5 * wage);
      });

      const total = Math.round(wage * hours + weekly);
      return { userId: m.user_id, name: user?.name ?? "직원", wage, hours, weekly, total };
    });

    setRows(result);
    setLoading(false);
  }, [storeId, month]);

  useEffect(() => { load(); }, [load]);

  const totalWage = rows.reduce((s, r) => s + r.total, 0);
  const totalWeekly = rows.reduce((s, r) => s + r.weekly, 0);

  return (
    <div style={{ animation: "fadeUp .3s ease" }}>
      {/* 월 선택 */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <input type="month" value={month} onChange={e => setMonth(e.target.value)} style={{ height: 40, border: "1.5px solid var(--p-border)", borderRadius: 10, padding: "0 12px", fontSize: 14, fontWeight: 600, color: "var(--text)", outline: "none", background: "#fff" }} />
      </div>

      {/* 요약 카드 */}
      <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
        <div style={{ flex: 1, background: "var(--p)", borderRadius: 16, padding: "18px 20px", color: "#fff" }}>
          <div style={{ fontWeight: 600, fontSize: 13, opacity: 0.85 }}>총 인건비</div>
          <div style={{ fontWeight: 800, fontSize: 26, marginTop: 6 }}>₩{totalWage.toLocaleString()}</div>
        </div>
        <div style={{ flex: 1, background: "#fff", border: "1px solid var(--hairline)", borderRadius: 16, padding: "18px 20px" }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-sub)" }}>주휴수당 합계</div>
          <div style={{ fontWeight: 800, fontSize: 26, color: "var(--text)", marginTop: 6 }}>₩{totalWeekly.toLocaleString()}</div>
        </div>
        <div style={{ flex: 1, background: "#fff", border: "1px solid var(--hairline)", borderRadius: 16, padding: "18px 20px" }}>
          <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-sub)" }}>직원 수</div>
          <div style={{ fontWeight: 800, fontSize: 26, color: "var(--text)", marginTop: 6 }}>{rows.length}명</div>
        </div>
      </div>

      {/* 테이블 */}
      <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr", padding: "14px 22px", background: "#f7f7f8", borderBottom: "1px solid rgba(112,115,124,0.12)" }}>
          {["직원", "시급", "근무시간", "주휴수당", "합계"].map((h, i) => (
            <span key={i} style={{ fontWeight: 600, fontSize: 12, color: "var(--text-sub)" }}>{h}</span>
          ))}
        </div>
        {loading ? (
          <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-sub)", fontSize: 14 }}>불러오는 중...</div>
        ) : rows.length === 0 ? (
          <div style={{ padding: "48px 0", textAlign: "center", color: "var(--text-sub)", fontSize: 14 }}>등록된 직원이 없어요.</div>
        ) : rows.map((r, i) => {
          const av = AV_COLORS[i % AV_COLORS.length];
          return (
            <div key={r.userId} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr", alignItems: "center", padding: "15px 22px", borderBottom: i < rows.length - 1 ? "1px solid rgba(112,115,124,0.1)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: av.bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: av.col }}>{r.name.charAt(0)}</div>
                <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{r.name}</span>
              </div>
              <span style={{ fontWeight: 600, fontSize: 14, color: "#37383c" }}>₩{r.wage.toLocaleString()}</span>
              <span style={{ fontWeight: 600, fontSize: 14, color: "#37383c" }}>{r.hours}h</span>
              <span style={{ fontWeight: 600, fontSize: 14, color: "#37383c" }}>₩{r.weekly.toLocaleString()}</span>
              <span style={{ fontWeight: 800, fontSize: 14, color: "var(--p-tint)" }}>₩{r.total.toLocaleString()}</span>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 14, padding: "11px 16px", background: "#f7f7f8", borderRadius: 12, fontWeight: 500, fontSize: 12, color: "var(--text-sub)", lineHeight: 1.6 }}>
        주 15시간 이상 근무 시 주휴수당이 자동 포함됩니다. 근무 기록이 없는 날은 계산에서 제외돼요.
      </div>
    </div>
  );
}
