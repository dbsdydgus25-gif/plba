"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type PayData = {
  totalHours: number;
  wage: number;
  basePay: number;
  weeklyAllowance: number;
  totalPay: number;
  records: { date: string; hours: number }[];
};

function calcHours(inTime: string | null, outTime: string | null) {
  if (!inTime || !outTime) return 0;
  return (new Date(outTime).getTime() - new Date(inTime).getTime()) / 3600000;
}

export default function AlbaPay({ userId, storeId }: { userId?: string; storeId?: string }) {
  const [pay, setPay] = useState<PayData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || !storeId) return;
    loadPay();
  }, [userId, storeId]);

  async function loadPay() {
    setLoading(true);
    const now = new Date();
    const firstDay = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];

    // 이번달 근태
    const { data: att } = await supabase
      .from("attendance")
      .select("date, in_time, out_time")
      .eq("user_id", userId)
      .eq("store_id", storeId)
      .gte("date", firstDay)
      .lte("date", lastDay)
      .order("date");

    // 시급
    const { data: member } = await supabase
      .from("store_members")
      .select("wage")
      .eq("user_id", userId)
      .eq("store_id", storeId)
      .single();

    const wage = member?.wage ?? 10030;
    const records = (att ?? []).map(r => ({
      date: r.date,
      hours: calcHours(r.in_time, r.out_time),
    }));
    const totalHours = records.reduce((s, r) => s + r.hours, 0);
    const basePay = Math.round(totalHours * wage);
    // 주휴수당: 주 15시간 이상이면 1일치 추가 (단순 계산)
    const weeklyAllowance = totalHours >= 15 ? Math.round(wage * 8) : 0;

    setPay({ totalHours, wage, basePay, weeklyAllowance, totalPay: basePay + weeklyAllowance, records });
    setLoading(false);
  }

  const now = new Date();
  const monthLabel = `${now.getFullYear()}년 ${now.getMonth() + 1}월`;

  if (loading) return (
    <div style={{ padding: "14px 20px 24px", animation: "fadeUp .35s ease" }}>
      <div style={{ fontWeight: 800, fontSize: 22, color: "var(--text)", padding: "4px 0 16px" }}>급여</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-sub)", fontWeight: 600, fontSize: 14 }}>
        <div style={{ width: 16, height: 16, border: "2.5px solid var(--p-border)", borderTopColor: "var(--p)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
        계산 중...
      </div>
    </div>
  );

  return (
    <div style={{ padding: "14px 20px 24px", animation: "fadeUp .35s ease" }}>
      <div style={{ fontWeight: 800, fontSize: 22, color: "var(--text)", padding: "4px 0 16px" }}>급여</div>

      {/* Main card */}
      <div style={{ background: "linear-gradient(160deg, var(--p), var(--p-strong))", borderRadius: 22, padding: "22px 22px 24px", color: "#fff", boxShadow: "0 16px 36px rgba(20,16,40,0.18)" }}>
        <div style={{ fontWeight: 600, fontSize: 13, opacity: 0.88 }}>{monthLabel} 예상 급여</div>
        <div style={{ fontWeight: 800, fontSize: 34, letterSpacing: "-0.01em", marginTop: 6 }}>
          ₩{(pay?.totalPay ?? 0).toLocaleString()}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "11px 12px" }}>
            <div style={{ fontWeight: 500, fontSize: 11, opacity: 0.85 }}>기본급</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginTop: 2 }}>₩{(pay?.basePay ?? 0).toLocaleString()}</div>
          </div>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "11px 12px" }}>
            <div style={{ fontWeight: 500, fontSize: 11, opacity: 0.85 }}>주휴수당</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginTop: 2 }}>₩{(pay?.weeklyAllowance ?? 0).toLocaleString()}</div>
          </div>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "11px 12px" }}>
            <div style={{ fontWeight: 500, fontSize: 11, opacity: 0.85 }}>총 근무</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginTop: 2 }}>{(pay?.totalHours ?? 0).toFixed(1)}h</div>
          </div>
        </div>
      </div>

      {/* 상세 내역 */}
      <div style={{ marginTop: 20, background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, overflow: "hidden" }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--hairline)", fontWeight: 700, fontSize: 14, color: "var(--text)" }}>급여 상세</div>
        {[
          { label: "기본급", sub: `${(pay?.totalHours ?? 0).toFixed(1)}시간 × ₩${(pay?.wage ?? 0).toLocaleString()}`, val: `₩${(pay?.basePay ?? 0).toLocaleString()}` },
          { label: "주휴수당", sub: "주 15시간 이상 근무 시 자동 계산", val: `₩${(pay?.weeklyAllowance ?? 0).toLocaleString()}` },
        ].map((row, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid var(--hairline)" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{row.label}</div>
              <div style={{ fontWeight: 500, fontSize: 12, color: "var(--text-sub)", marginTop: 2 }}>{row.sub}</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{row.val}</div>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 16px" }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "var(--text)" }}>예상 합계</div>
          <div style={{ fontWeight: 800, fontSize: 18, color: "var(--p-tint)" }}>₩{(pay?.totalPay ?? 0).toLocaleString()}</div>
        </div>
      </div>

      {/* 일별 기록 */}
      {pay && pay.records.length > 0 && (
        <div style={{ marginTop: 16, background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, overflow: "hidden" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--hairline)", fontWeight: 700, fontSize: 14, color: "var(--text)" }}>일별 근무 시간</div>
          {pay.records.map((r, i) => {
            const d = new Date(r.date);
            return (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 16px", borderBottom: i < pay.records.length - 1 ? "1px solid var(--hairline)" : "none" }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: "var(--text-sub)" }}>{d.getMonth() + 1}/{d.getDate()}</span>
                <span style={{ fontWeight: 700, fontSize: 13, color: "var(--text)" }}>{r.hours.toFixed(1)}h — ₩{Math.round(r.hours * (pay.wage)).toLocaleString()}</span>
              </div>
            );
          })}
        </div>
      )}

      {pay && pay.records.length === 0 && (
        <div style={{ marginTop: 20, padding: "32px 0", textAlign: "center", color: "var(--text-sub)", fontWeight: 500, fontSize: 14 }}>
          이번달 근무 기록이 없어요.
        </div>
      )}
    </div>
  );
}
