"use client";
import { useState, useEffect } from "react";
import type { WorkState } from "@/app/app/alba/page";
import { supabase } from "@/lib/supabase";

function calcHours(inTime: string | null, outTime: string | null) {
  if (!inTime || !outTime) return 0;
  return (new Date(outTime).getTime() - new Date(inTime).getTime()) / 3600000;
}

export default function AlbaHome({
  userName, storeName, userId, storeId,
  workState, inTime, outTime, elapsed,
  onScanIn, onScanOut, onResetDay, onOpenGuide, onOpenCamera,
}: {
  userName: string;
  storeName: string;
  userId?: string;
  storeId?: string;
  workState: WorkState;
  inTime: string;
  outTime: string;
  elapsed: string;
  onScanIn: () => void;
  onScanOut: () => void;
  onResetDay: () => void;
  onOpenGuide: () => void;
  onOpenCamera: () => void;
}) {
  const today = new Date();
  const todayLabel = `${today.getMonth() + 1}월 ${today.getDate()}일 ${["일","월","화","수","목","금","토"][today.getDay()]}요일`;

  const [weekHours, setWeekHours] = useState<number | null>(null);
  const [monthPay, setMonthPay] = useState<number | null>(null);

  useEffect(() => {
    if (!userId || !storeId) return;
    loadStats();
  }, [userId, storeId]);

  async function loadStats() {
    const now = new Date();

    // 이번 주 월요일
    const day = now.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diff);
    const weekStart = monday.toISOString().split("T")[0];
    const weekEnd = now.toISOString().split("T")[0];

    // 이번 달
    const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];

    const [{ data: weekAtt }, { data: monthAtt }, { data: member }] = await Promise.all([
      supabase.from("attendance").select("in_time, out_time").eq("user_id", userId).eq("store_id", storeId).gte("date", weekStart).lte("date", weekEnd),
      supabase.from("attendance").select("in_time, out_time").eq("user_id", userId).eq("store_id", storeId).gte("date", monthStart).lte("date", monthEnd),
      supabase.from("store_members").select("wage").eq("user_id", userId).eq("store_id", storeId).single(),
    ]);

    const wh = (weekAtt ?? []).reduce((s, r) => s + calcHours(r.in_time, r.out_time), 0);
    setWeekHours(wh);

    const wage = member?.wage ?? 10030;
    const mh = (monthAtt ?? []).reduce((s, r) => s + calcHours(r.in_time, r.out_time), 0);
    setMonthPay(Math.round(mh * wage));
  }

  return (
    <div style={{ padding: "8px 20px 24px", animation: "fadeUp .35s ease" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "10px 0 18px" }}>
        <div>
          <div style={{ fontWeight: 500, fontSize: 14, color: "var(--text-sub)" }}>{todayLabel}</div>
          <div style={{ fontWeight: 800, fontSize: 23, letterSpacing: "-0.02em", color: "var(--text)", marginTop: 3 }}>
            {userName ? `안녕하세요, ${userName}님` : "안녕하세요!"}
          </div>
          {storeName && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 8, padding: "5px 10px", background: "#fff", border: "1px solid var(--hairline)", borderRadius: 9999 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--p)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.4" /></svg>
              <span style={{ fontWeight: 600, fontSize: 12, color: "#37383c" }}>{storeName}</span>
            </div>
          )}
        </div>
        <button style={{ width: 42, height: 42, border: "none", borderRadius: 13, background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#37383c" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0" /></svg>
          <span style={{ position: "absolute", top: 9, right: 10, width: 8, height: 8, borderRadius: "50%", background: "#ff4242", border: "2px solid #fff" }} />
        </button>
      </div>

      {/* Today work card */}
      <div style={{ borderRadius: 26, overflow: "hidden", boxShadow: "0 18px 40px rgba(20,16,40,0.16)" }}>
        {workState === "before" && (
          <div style={{ background: "linear-gradient(160deg, var(--p), var(--p-strong))", padding: "26px 24px 28px", color: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 600, fontSize: 13, opacity: 0.9 }}>오늘 근무</span>
              <span style={{ padding: "4px 10px", background: "rgba(255,255,255,0.18)", borderRadius: 9999, fontWeight: 600, fontSize: 12 }}>출근 전</span>
            </div>
            <div style={{ fontWeight: 800, fontSize: 30, letterSpacing: "-0.02em", marginTop: 10 }}>QR로 출근해요</div>
            <div style={{ fontWeight: 500, fontSize: 13, opacity: 0.85, marginTop: 2 }}>{storeName || "매장"}</div>
            <button onClick={onScanIn} style={{ marginTop: 22, width: "100%", height: 58, border: "none", borderRadius: 18, background: "#fff", color: "var(--p-tint)", fontWeight: 800, fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", gap: 9, cursor: "pointer", boxShadow: "0 8px 18px rgba(0,0,0,0.14)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V5.5A1.5 1.5 0 0 1 5.5 4H7M17 4h1.5A1.5 1.5 0 0 1 20 5.5V7M20 17v1.5a1.5 1.5 0 0 1-1.5 1.5H17M7 20H5.5A1.5 1.5 0 0 1 4 18.5V17M8 12h8" /></svg>
              QR 찍고 출근하기
            </button>
          </div>
        )}
        {workState === "working" && (
          <div style={{ background: "linear-gradient(160deg, var(--p), var(--p-strong))", padding: "24px 24px 26px", color: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#7df5a5", animation: "softPulse 1.4s infinite" }} />
              <span style={{ fontWeight: 700, fontSize: 13 }}>근무 중</span>
              <span style={{ marginLeft: "auto", fontWeight: 500, fontSize: 12, opacity: 0.85 }}>출근 {inTime}</span>
            </div>
            <div style={{ fontWeight: 800, fontSize: 44, letterSpacing: "0.01em", marginTop: 14, fontVariantNumeric: "tabular-nums", textAlign: "center" }}>{elapsed}</div>
            <div style={{ fontWeight: 500, fontSize: 12, opacity: 0.8, textAlign: "center", marginTop: 2 }}>오늘도 화이팅이에요</div>
            <button onClick={onScanOut} style={{ marginTop: 20, width: "100%", height: 54, border: "1.5px solid rgba(255,255,255,0.7)", borderRadius: 16, background: "rgba(255,255,255,0.12)", color: "#fff", fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V5.5A1.5 1.5 0 0 1 5.5 4H7M17 4h1.5A1.5 1.5 0 0 1 20 5.5V7M20 17v1.5a1.5 1.5 0 0 1-1.5 1.5H17M7 20H5.5A1.5 1.5 0 0 1 4 18.5V17M8 12h8" /></svg>
              QR 찍고 퇴근하기
            </button>
          </div>
        )}
        {workState === "done" && (
          <div style={{ background: "#fff", padding: 24, border: "1px solid var(--hairline)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--p-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--p)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5 10 17.5 19 7" /></svg>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 17, color: "var(--text)" }}>오늘 근무 완료</div>
                <div style={{ fontWeight: 500, fontSize: 12, color: "var(--text-sub)" }}>수고하셨어요!</div>
              </div>
              <button onClick={onResetDay} style={{ marginLeft: "auto", background: "#f1f1f3", color: "#37383c", fontWeight: 600, fontSize: 12, padding: "7px 12px", borderRadius: 9, border: "none", cursor: "pointer" }}>다시 시연</button>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              {[["출근", inTime], ["퇴근", outTime], ["근무시간", elapsed]].map(([label, val], i) => (
                <div key={label} style={{ flex: 1, background: i === 2 ? "var(--p-soft)" : "#f7f7f8", borderRadius: 14, padding: "13px 14px" }}>
                  <div style={{ fontWeight: 500, fontSize: 11, color: i === 2 ? "var(--p-tint)" : "rgba(55,56,60,0.5)" }}>{label}</div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: i === 2 ? "var(--p-tint)" : "var(--text)", marginTop: 3 }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick stats */}
      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <div style={{ flex: 1, background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 16 }}>
          <div style={{ fontWeight: 500, fontSize: 12, color: "var(--text-sub)" }}>이번 주 근무</div>
          <div style={{ fontWeight: 800, fontSize: 22, color: "var(--text)", marginTop: 4 }}>
            {weekHours === null
              ? <span style={{ fontSize: 14, color: "var(--text-sub)" }}>—</span>
              : <>{weekHours.toFixed(1)}<span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-sub)" }}> 시간</span></>
            }
          </div>
        </div>
        <div style={{ flex: 1, background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 16 }}>
          <div style={{ fontWeight: 500, fontSize: 12, color: "var(--text-sub)" }}>이번 달 예상급여</div>
          <div style={{ fontWeight: 800, fontSize: 22, color: "var(--text)", marginTop: 4 }}>
            {monthPay === null
              ? <span style={{ fontSize: 14, color: "var(--text-sub)" }}>—</span>
              : `₩${monthPay.toLocaleString()}`
            }
          </div>
        </div>
      </div>

      {/* Closing banner */}
      <button onClick={onOpenCamera} style={{ width: "100%", textAlign: "left", marginTop: 16, border: "none", borderRadius: 18, padding: 18, cursor: "pointer", display: "flex", alignItems: "center", gap: 14, background: "linear-gradient(150deg,#6B4DF6,#5a3ee0)", boxShadow: "0 12px 28px rgba(107,77,246,0.3)" }}>
        <div style={{ width: 48, height: 48, flexShrink: 0, borderRadius: 14, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a7 7 0 1 0 11 11Z" /></svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>오늘 마감이에요</span>
            <span style={{ padding: "2px 8px", borderRadius: 9999, background: "#ff9200", fontWeight: 700, fontSize: 10, color: "#231400" }}>마감 담당</span>
          </div>
          <div style={{ fontWeight: 500, fontSize: 13, color: "rgba(255,255,255,0.78)", marginTop: 3 }}>정리 후 마감 사진을 올려주세요</div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L8 6H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-4z" /><circle cx="12" cy="13" r="3.4" /></svg>
      </button>

      {/* Guide card */}
      <button onClick={onOpenGuide} style={{ width: "100%", textAlign: "left", marginTop: 16, background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 16, cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 46, height: 46, borderRadius: 13, background: "var(--p-soft)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--p-tint)" }}>
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3 8-8" /><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" /></svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>오늘의 업무 가이드</div>
          <div style={{ fontWeight: 500, fontSize: 12, color: "var(--text-sub)", marginTop: 2 }}>첫 근무 전에 꼭 읽어주세요</div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(55,56,60,0.3)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
      </button>
    </div>
  );
}
