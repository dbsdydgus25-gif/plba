"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type AttendanceRow = {
  id: string;
  user_id: string;
  in_time: string | null;
  out_time: string | null;
  users: { name: string; role: string } | null;
};

type MemberRow = {
  user_id: string;
  wage: number;
  status: string;
  users: { name: string } | null;
};

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function fmtTime(t: string | null) {
  if (!t) return null;
  return t.slice(11, 16);
}

function avatarColors(i: number) {
  const palettes = [
    { bg: "#e8e2fd", col: "var(--p-tint)" },
    { bg: "#fef4e6", col: "#d47800" },
    { bg: "#eafce0", col: "#2e7a00" },
    { bg: "#f0f0f2", col: "rgba(55,56,60,0.5)" },
  ];
  return palettes[i % palettes.length];
}

export default function OwnerDashboard({ storeId }: { storeId: string }) {
  const [attendance, setAttendance] = useState<AttendanceRow[]>([]);
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!storeId) return;
    async function load() {
      const today = todayStr();
      const [{ data: att }, { data: mem }] = await Promise.all([
        supabase.from("attendance").select("id, user_id, in_time, out_time, users(name, role)").eq("store_id", storeId).eq("date", today),
        supabase.from("store_members").select("user_id, wage, status, users(name)").eq("store_id", storeId).eq("status", "active"),
      ]);
      setAttendance((att as AttendanceRow[] | null) ?? []);
      setMembers((mem as MemberRow[] | null) ?? []);
      setLoading(false);
    }
    load();
  }, [storeId]);

  const totalActive = members.length;
  const checkedIn = attendance.filter(a => a.in_time && !a.out_time).length;
  const checkedOut = attendance.filter(a => a.out_time).length;
  const absent = totalActive - attendance.length;

  // 이번달 인건비 추정 (단순 합산)
  const monthlyWage = members.reduce((s, m) => s + (m.wage * 8 * 22), 0);
  function fmtWage(w: number) {
    if (w >= 1_000_000) return `₩${(w / 1_000_000).toFixed(1)}M`;
    return `₩${(w / 1000).toFixed(0)}K`;
  }

  const KPIs = [
    { label: "오늘 출근", value: totalActive ? `${checkedIn + checkedOut}/${totalActive}` : "0", delta: absent > 0 ? `${absent}명 미출근` : "전원 출근", bg: "var(--p-soft)", col: "var(--p-tint)", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg> },
    { label: "근무 중", value: String(checkedIn), delta: checkedIn > 0 ? "현재 근무 중" : "없음", bg: "#eafce0", col: "#2e7a00", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg> },
    { label: "결근", value: String(absent > 0 ? absent : 0), delta: absent > 0 ? `${absent}명 결근` : "결근 없음", bg: "var(--negative-bg)", col: "var(--negative)", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6 6 18" /></svg> },
    { label: "이번달 인건비", value: monthlyWage ? fmtWage(monthlyWage) : "—", delta: "예상 인건비", bg: "#f1f1f3", col: "rgba(55,56,60,0.6)", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="5" width="22" height="14" rx="2" /><path d="M1 10h22" /></svg> },
  ];

  if (!storeId) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200, color: "var(--text-sub)", fontSize: 15, fontWeight: 500 }}>
      가게 정보를 불러오는 중...
    </div>
  );

  return (
    <div style={{ animation: "fadeUp .3s ease" }}>
      {/* KPI cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {KPIs.map((k, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 16, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 600, fontSize: 13, color: "var(--text-sub)" }}>{k.label}</span>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: k.bg, color: k.col, display: "flex", alignItems: "center", justifyContent: "center" }}>{k.icon}</div>
            </div>
            <div style={{ fontWeight: 800, fontSize: 26, color: "var(--text)", marginTop: 12 }}>{k.value}</div>
            <div style={{ fontWeight: 500, fontSize: 12, color: k.col, marginTop: 2 }}>{k.delta}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, marginTop: 18 }}>
        {/* Today attendance */}
        <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontWeight: 700, fontSize: 16, color: "var(--text)" }}>오늘 실시간 근태</span>
            <span style={{ fontWeight: 600, fontSize: 12, color: "var(--p)" }}>● 실시간</span>
          </div>
          {loading ? (
            <div style={{ padding: "24px 0", color: "var(--text-sub)", fontSize: 14, textAlign: "center" }}>불러오는 중...</div>
          ) : attendance.length === 0 ? (
            <div style={{ padding: "32px 0", color: "var(--text-sub)", fontSize: 14, textAlign: "center" }}>
              오늘 출퇴근 기록이 없어요<br />
              <span style={{ fontSize: 12, opacity: 0.7 }}>직원들이 QR을 스캔하면 여기에 표시돼요</span>
            </div>
          ) : (
            attendance.map((a, i) => {
              const name = a.users?.name ?? "알 수 없음";
              const isWorking = !!a.in_time && !a.out_time;
              const isOut = !!a.out_time;
              const status = isWorking ? "근무 중" : isOut ? "퇴근" : "출근 전";
              const bg = isWorking ? "var(--positive-bg)" : isOut ? "#f1f1f3" : "var(--p-soft)";
              const col = isWorking ? "var(--positive)" : isOut ? "rgba(55,56,60,0.6)" : "var(--p-tint)";
              const av = avatarColors(i);
              return (
                <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 0", borderBottom: i < attendance.length - 1 ? "1px solid rgba(112,115,124,0.1)" : "none" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: av.bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, color: av.col }}>{name.charAt(0)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{name}</div>
                    <div style={{ fontWeight: 500, fontSize: 12, color: "var(--text-sub)" }}>{a.users?.role ?? ""}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 9999, background: bg, color: col, fontWeight: 600, fontSize: 12 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: col }} />{status}
                    </div>
                    <div style={{ fontWeight: 500, fontSize: 11, color: "rgba(55,56,60,0.45)", marginTop: 4 }}>
                      {a.in_time ? `출근 ${fmtTime(a.in_time)}` : "—"}
                      {a.out_time ? ` · 퇴근 ${fmtTime(a.out_time)}` : ""}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Staff summary */}
        <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 20 }}>
          <span style={{ fontWeight: 700, fontSize: 16, color: "var(--text)" }}>직원 현황</span>
          {loading ? (
            <div style={{ marginTop: 20, color: "var(--text-sub)", fontSize: 14, textAlign: "center" }}>불러오는 중...</div>
          ) : members.length === 0 ? (
            <div style={{ marginTop: 32, color: "var(--text-sub)", fontSize: 14, textAlign: "center" }}>
              등록된 직원이 없어요<br />
              <span style={{ fontSize: 12, opacity: 0.7 }}>직원 추가 버튼으로 초대해보세요</span>
            </div>
          ) : (
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              {members.map((m, i) => {
                const av = avatarColors(i);
                const name = m.users?.name ?? "알 수 없음";
                return (
                  <div key={m.user_id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: av.bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: av.col }}>{name.charAt(0)}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "var(--text)" }}>{name}</div>
                      <div style={{ fontWeight: 500, fontSize: 11, color: "var(--text-sub)" }}>시급 {m.wage.toLocaleString()}원</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(112,115,124,0.1)", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)" }}>총 직원</span>
            <span style={{ fontWeight: 800, fontSize: 15, color: "var(--text)" }}>{members.length}명</span>
          </div>
        </div>
      </div>

      {/* Closing report */}
      <div style={{ marginTop: 16, background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{ fontWeight: 700, fontSize: 16, color: "var(--text)" }}>오늘 마감 리포트</span>
          <span style={{ fontWeight: 700, fontSize: 12, color: "var(--cautionary)" }}>대기 중</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "8px 0" }}>
          <div style={{ width: 48, height: 48, borderRadius: 13, background: "var(--cautionary-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cautionary)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L8 6H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-4z" /><circle cx="12" cy="13" r="3.6" /></svg>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>아직 마감 사진이 없어요</div>
            <div style={{ fontWeight: 500, fontSize: 12, color: "var(--text-sub)", marginTop: 2 }}>마감 담당자가 앱에서 사진을 전송하면 여기에 표시돼요.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
