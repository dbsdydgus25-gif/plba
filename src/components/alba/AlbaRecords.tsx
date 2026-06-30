"use client";
import { useState, useEffect } from "react";
import { supabase, type Attendance } from "@/lib/supabase";

function formatTime(iso: string | null) {
  if (!iso) return "--:--";
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function calcHours(inTime: string | null, outTime: string | null) {
  if (!inTime || !outTime) return null;
  const diff = (new Date(outTime).getTime() - new Date(inTime).getTime()) / 3600000;
  return diff.toFixed(1) + "h";
}

function getStatus(inTime: string | null, outTime: string | null) {
  if (!inTime) return { label: "결근", bg: "var(--negative-bg)", col: "var(--negative)" };
  if (!outTime) return { label: "근무중", bg: "var(--p-soft)", col: "var(--p-tint)" };
  const inH = new Date(inTime).getHours() * 60 + new Date(inTime).getMinutes();
  const lateThreshold = 14 * 60 + 15; // 14:15 이후면 지각
  if (inH > lateThreshold) return { label: "지각", bg: "var(--cautionary-bg)", col: "var(--cautionary)" };
  return { label: "정상", bg: "var(--positive-bg)", col: "var(--positive)" };
}

const segBase = { flex: 1, height: 38, borderRadius: 9, border: "none", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.12s" };

export default function AlbaRecords({ userId, storeId }: { userId?: string; storeId?: string }) {
  const [tab, setTab] = useState<"records" | "schedule">("records");
  const [records, setRecords] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || !storeId) return;
    loadRecords();
  }, [userId, storeId]);

  async function loadRecords() {
    setLoading(true);
    const { data } = await supabase
      .from("attendance")
      .select("*")
      .eq("user_id", userId)
      .eq("store_id", storeId)
      .order("date", { ascending: false })
      .limit(30);
    if (data) setRecords(data);
    setLoading(false);
  }

  const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div style={{ padding: "14px 20px 24px", animation: "fadeUp .35s ease" }}>
      <div style={{ fontWeight: 800, fontSize: 22, color: "var(--text)", padding: "4px 0 14px" }}>근무 기록</div>

      {/* Segment */}
      <div style={{ display: "flex", gap: 6, padding: "5px", background: "#f1f1f3", borderRadius: 13, marginBottom: 20 }}>
        <button style={{ ...segBase, background: tab === "records" ? "#fff" : "transparent", color: tab === "records" ? "var(--text)" : "var(--text-sub)", boxShadow: tab === "records" ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }}
          onClick={() => setTab("records")}>출퇴근 기록</button>
        <button style={{ ...segBase, background: tab === "schedule" ? "#fff" : "transparent", color: tab === "schedule" ? "var(--text)" : "var(--text-sub)", boxShadow: tab === "schedule" ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }}
          onClick={() => setTab("schedule")}>이번 주 스케줄</button>
      </div>

      {tab === "records" && (
        loading ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "24px 0", color: "var(--text-sub)", fontWeight: 600, fontSize: 14 }}>
            <div style={{ width: 16, height: 16, border: "2.5px solid var(--p-border)", borderTopColor: "var(--p)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
            불러오는 중...
          </div>
        ) : records.length === 0 ? (
          <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-sub)", fontWeight: 500, fontSize: 14 }}>
            아직 근무 기록이 없어요.<br />QR을 찍고 출근하면 여기에 기록돼요.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {records.map((r) => {
              const date = new Date(r.date);
              const dow = DAYS[date.getDay()];
              const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
              const status = getStatus(r.in_time, r.out_time);
              const hours = calcHours(r.in_time, r.out_time);
              return (
                <div key={r.id} style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ textAlign: "center", minWidth: 36 }}>
                    <div style={{ fontWeight: 700, fontSize: 16, color: "var(--text)" }}>{date.getDate()}</div>
                    <div style={{ fontWeight: 600, fontSize: 11, color: "var(--text-sub)" }}>{dow}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>
                        {formatTime(r.in_time)} – {formatTime(r.out_time)}
                      </span>
                      {hours && <span style={{ fontWeight: 600, fontSize: 12, color: "var(--text-sub)" }}>{hours}</span>}
                    </div>
                    <span style={{ padding: "2px 8px", borderRadius: 6, background: status.bg, color: status.col, fontWeight: 700, fontSize: 11 }}>{status.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}

      {tab === "schedule" && (
        <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", background: "#f7f7f8", fontWeight: 600, fontSize: 12, color: "var(--text-sub)" }}>
            이번 주 스케줄 (사장님이 설정한 일정)
          </div>
          <div style={{ padding: "12px 0", display: "flex", flexDirection: "column" }}>
            {DAYS.map((d, i) => {
              const isToday = i === new Date().getDay();
              return (
                <div key={d} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: isToday ? "var(--p-softer)" : "transparent", borderLeft: isToday ? "3px solid var(--p)" : "3px solid transparent" }}>
                  <div style={{ width: 28, fontWeight: isToday ? 800 : 600, fontSize: 13, color: isToday ? "var(--p-tint)" : "var(--text-sub)" }}>{d}</div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-sub)" }}>스케줄 준비중</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
