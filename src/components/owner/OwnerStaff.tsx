"use client";
import { useState, useEffect } from "react";
import { supabase, type StoreMember } from "@/lib/supabase";

const STORE_ID = "00000000-0000-0000-0000-000000000001";

const AVATAR_COLORS = [
  { bg: "#e8e2fd", col: "var(--p-tint)" },
  { bg: "#fef4e6", col: "#d47800" },
  { bg: "#eafce0", col: "#2e7a00" },
  { bg: "#f0f0f2", col: "rgba(55,56,60,0.5)" },
];

const UPCOMING_FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2e7a00" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="5" width="22" height="14" rx="2" /><path d="M1 10h22" />
      </svg>
    ),
    bgColor: "#eafce0",
    badgeColor: "#2e7a00",
    title: "계좌 등록",
    desc: "알바생이 앱에서 본인 계좌를 직접 등록해요. 사장님은 급여 정산 탭에서 바로 확인할 수 있어요.",
    bullets: ["알바생 앱 → 더보기 → 계좌 등록", "사장님 급여 탭에서 계좌 확인", "미등록 직원 배지 표시"],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#191600" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M8 12c0-1.1.9-2 2-2h4a2 2 0 0 1 0 4h-4a2 2 0 0 1-2-2z" />
      </svg>
    ),
    bgColor: "#FEE500",
    badgeColor: "#191600",
    title: "카카오페이 송금",
    desc: "급여 정산 탭에서 직원을 선택하고 버튼 한 번이면 카카오페이로 바로 송금돼요. 알바생에게 카카오톡 알림도 자동 발송돼요.",
    bullets: ["사장님: 직원 선택 → 금액 확인 → 송금", "알바생에게 카카오톡 수령 알림", "송금 내역 급여 정산 탭에 자동 기록"],
  },
];

export default function OwnerStaff() {
  const [members, setMembers] = useState<StoreMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [wages, setWages] = useState<Record<string, number>>({});
  const [editId, setEditId] = useState<string | null>(null);
  const [editVal, setEditVal] = useState("");
  const [terminateId, setTerminateId] = useState<string | null>(null);
  const [terminateDate, setTerminateDate] = useState(new Date().toISOString().split("T")[0]);
  const [terminateReason, setTerminateReason] = useState<"자진퇴사" | "계약만료" | "해고">("자진퇴사");

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    setLoading(true);
    const { data } = await supabase
      .from("store_members")
      .select("*, users(*)")
      .eq("store_id", STORE_ID)
      .order("created_at");
    if (data) {
      setMembers(data);
      const wageMap: Record<string, number> = {};
      data.forEach(m => { wageMap[m.id] = m.wage; });
      setWages(wageMap);
    }
    setLoading(false);
  }

  async function saveWage() {
    if (!editId) return;
    const v = parseInt(editVal.replace(/\D/g, ""));
    if (!isNaN(v)) {
      await supabase.from("store_members").update({ wage: v }).eq("id", editId);
      setWages(prev => ({ ...prev, [editId]: v }));
    }
    setEditId(null);
  }

  async function confirmTerminate() {
    if (!terminateId) return;
    await supabase.from("store_members").update({
      status: "terminated",
      terminate_date: terminateDate,
      terminate_reason: terminateReason,
    }).eq("id", terminateId);
    setMembers(prev => prev.map(m => m.id === terminateId ? { ...m, status: "terminated" } : m));
    setTerminateId(null);
  }

  const activeMembers = members.filter(m => m.status === "active");
  const terminatedMembers = members.filter(m => m.status === "terminated");

  const editMember = editId ? members.find(m => m.id === editId) : null;
  const terminateMember = terminateId ? members.find(m => m.id === terminateId) : null;

  if (loading) {
    return (
      <div style={{ animation: "fadeUp .3s ease", display: "flex", alignItems: "center", gap: 10, padding: 32, color: "var(--text-sub)", fontWeight: 600, fontSize: 14 }}>
        <div style={{ width: 18, height: 18, border: "2.5px solid var(--p-border)", borderTopColor: "var(--p)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
        직원 목록 불러오는 중...
      </div>
    );
  }

  return (
    <div style={{ animation: "fadeUp .3s ease" }}>
      {/* Active staff grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        {activeMembers.map((m, i) => {
          const av = AVATAR_COLORS[i % AVATAR_COLORS.length];
          const initial = m.users?.name?.[0] ?? "?";
          const name = m.users?.name ?? "이름 없음";
          const wage = wages[m.id] ?? m.wage;

          return (
            <div key={m.id} style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 50, height: 50, borderRadius: "50%", background: av.bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20, color: av.col }}>
                  {initial}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text)" }}>{name}</div>
                  <div style={{ fontWeight: 500, fontSize: 12, color: "var(--text-sub)", marginTop: 2 }}>
                    {m.start_date ? `${m.start_date.slice(0, 7)} 입사` : "입사일 미정"}
                  </div>
                </div>
                <button
                  onClick={() => setTerminateId(m.id)}
                  title="퇴사 처리"
                  style={{ width: 30, height: 30, border: "1px solid var(--hairline)", borderRadius: 8, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(55,56,60,0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>
                </button>
              </div>

              <div style={{ background: "var(--p-softer)", border: "1px solid var(--p-border)", borderRadius: 13, padding: "12px 14px", cursor: "pointer" }}
                onClick={() => { setEditId(m.id); setEditVal(String(wage)); }}>
                <div style={{ fontWeight: 500, fontSize: 11, color: "var(--p-tint)", opacity: 0.8, marginBottom: 3 }}>시급</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 800, fontSize: 20, color: "var(--p-tint)" }}>₩{wage.toLocaleString()}</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--p-tint)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Terminated */}
      {terminatedMembers.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-sub)", marginBottom: 12 }}>퇴직자</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {terminatedMembers.map((m, i) => (
              <div key={m.id} style={{ background: "#f7f7f8", border: "1px solid var(--hairline)", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, opacity: 0.7 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#e0e0e2", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, color: "#888" }}>
                  {m.users?.name?.[0] ?? "?"}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{m.users?.name}</div>
                  <div style={{ fontWeight: 500, fontSize: 11, color: "var(--text-sub)" }}>
                    {m.terminate_date} · {m.terminate_reason ?? "퇴사"} 처리됨
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming features */}
      <div style={{ marginTop: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 17, color: "var(--text)" }}>곧 추가될 기능</div>
          <span style={{ padding: "2px 10px", borderRadius: 9999, background: "var(--p-soft)", fontWeight: 700, fontSize: 11, color: "var(--p-tint)" }}>Coming Soon</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
          {UPCOMING_FEATURES.map((f, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 22 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: f.bgColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {f.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text)" }}>{f.title}</div>
                  <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", marginTop: 4, lineHeight: 1.55 }}>{f.desc}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {f.bullets.map((b, bi) => (
                  <div key={bi} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: f.badgeColor, flexShrink: 0 }} />
                    <span style={{ fontWeight: 500, fontSize: 12, color: "var(--text-sub)" }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wage edit modal */}
      {editId && editMember && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setEditId(null)}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 28, width: 360, boxShadow: "0 24px 60px rgba(0,0,0,0.24)" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 800, fontSize: 17, color: "var(--text)", marginBottom: 6 }}>시급 수정</div>
            <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", marginBottom: 20 }}>{editMember.users?.name}의 시급을 변경해요.</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <button onClick={() => setEditVal(String(Math.max(10030, parseInt(editVal || "0") - 100)))} style={{ width: 44, height: 44, borderRadius: 12, border: "1px solid var(--hairline)", background: "#f7f7f8", fontSize: 20, fontWeight: 600, cursor: "pointer" }}>–</button>
              <input value={`₩${parseInt(editVal || "0").toLocaleString()}`} onChange={e => setEditVal(e.target.value.replace(/[^\d]/g, ""))} style={{ flex: 1, height: 52, border: "1.5px solid var(--p-border)", borderRadius: 13, textAlign: "center", fontSize: 22, fontFamily: "Pretendard", fontWeight: 800, color: "var(--p-tint)", outline: "none" }} />
              <button onClick={() => setEditVal(String(parseInt(editVal || "0") + 100))} style={{ width: 44, height: 44, borderRadius: 12, border: "1px solid var(--hairline)", background: "#f7f7f8", fontSize: 20, fontWeight: 600, cursor: "pointer" }}>+</button>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setEditId(null)} style={{ flex: 1, height: 48, border: "1px solid var(--hairline)", borderRadius: 13, background: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>취소</button>
              <button onClick={saveWage} style={{ flex: 1, height: 48, border: "none", borderRadius: 13, background: "var(--p)", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>저장</button>
            </div>
          </div>
        </div>
      )}

      {/* Terminate modal */}
      {terminateId && terminateMember && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setTerminateId(null)}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 28, width: 380, boxShadow: "0 24px 60px rgba(0,0,0,0.24)" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: "var(--negative-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--negative)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>
              </div>
              <div style={{ fontWeight: 800, fontSize: 17, color: "var(--text)" }}>퇴사 처리</div>
            </div>
            <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", marginBottom: 22 }}>
              <span style={{ fontWeight: 700, color: "var(--text)" }}>{terminateMember.users?.name}</span>을 퇴사 처리할게요.
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", display: "block", marginBottom: 6 }}>퇴사일</label>
              <input type="date" value={terminateDate} onChange={e => setTerminateDate(e.target.value)}
                style={{ width: "100%", height: 44, border: "1.5px solid var(--p-border)", borderRadius: 11, padding: "0 14px", fontSize: 15, fontFamily: "Pretendard", fontWeight: 600, outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", display: "block", marginBottom: 8 }}>퇴사 사유</label>
              <div style={{ display: "flex", gap: 8 }}>
                {(["자진퇴사", "계약만료", "해고"] as const).map(r => (
                  <button key={r} onClick={() => setTerminateReason(r)}
                    style={{ flex: 1, height: 38, border: `1.5px solid ${terminateReason === r ? "var(--p)" : "var(--hairline)"}`, borderRadius: 10, background: terminateReason === r ? "var(--p-soft)" : "#fff", color: terminateReason === r ? "var(--p-tint)" : "var(--text-sub)", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setTerminateId(null)} style={{ flex: 1, height: 48, border: "1px solid var(--hairline)", borderRadius: 13, background: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>취소</button>
              <button onClick={confirmTerminate} style={{ flex: 1, height: 48, border: "none", borderRadius: 13, background: "var(--negative)", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>퇴사 처리</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
