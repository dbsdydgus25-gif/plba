"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import type { OwnerWebTab } from "@/app/owner/page";
import OwnerDashboard from "./OwnerDashboard";
import OwnerAttendance from "./OwnerAttendance";
import OwnerPayroll from "./OwnerPayroll";
import OwnerSchedule from "./OwnerSchedule";
import OwnerStaff from "./OwnerStaff";
import OwnerOnboarding from "./OwnerOnboarding";
import OwnerBilling from "./OwnerBilling";
import { supabase } from "@/lib/supabase";

const NAV_ITEMS: { id: OwnerWebTab; label: string; icon: React.ReactNode }[] = [
  {
    id: "dashboard", label: "대시보드",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="8" height="9" rx="1.5" /><rect x="13" y="3" width="8" height="5" rx="1.5" /><rect x="13" y="11" width="8" height="10" rx="1.5" /><rect x="3" y="15" width="8" height="6" rx="1.5" /></svg>
  },
  {
    id: "attendance", label: "근태 관리",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V5.5A1.5 1.5 0 0 1 5.5 4H7M17 4h1.5A1.5 1.5 0 0 1 20 5.5V7M20 17v1.5a1.5 1.5 0 0 1-1.5 1.5H17M7 20H5.5A1.5 1.5 0 0 1 4 18.5V17M8 12h8" /></svg>
  },
  {
    id: "payroll", label: "급여 정산",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="5" width="22" height="14" rx="2" /><path d="M1 10h22" /></svg>
  },
  {
    id: "schedule", label: "스케줄 관리",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
  },
  {
    id: "staff", label: "직원 관리",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  },
  {
    id: "onboarding", label: "가게 온보딩",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-7-7 18-2.5-7.5L3 11Z" /></svg>
  },
  {
    id: "billing", label: "구독 / 결제",
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="5" width="22" height="14" rx="2"/><path d="M1 10h22"/></svg>
  },
];

const WEB_TITLES: Record<OwnerWebTab, string> = {
  dashboard: "대시보드",
  attendance: "근태 관리",
  payroll: "급여 정산",
  schedule: "스케줄 관리",
  staff: "직원 관리",
  onboarding: "가게 온보딩",
  billing: "구독 / 결제",
};

function InviteModal({ storeCode, onClose }: { storeCode: string; onClose: () => void }) {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const INVITE_URL = `plba.co.kr/join?code=${storeCode}`;
  function copy(text: string) {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 1800);
  }
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 22, padding: 28, width: 400, boxShadow: "0 24px 60px rgba(0,0,0,0.22)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: "var(--text)" }}>직원 초대</div>
            <div style={{ fontWeight: 500, fontSize: 12, color: "var(--text-sub)", marginTop: 2 }}>가입 링크와 코드를 한번에 복사해서 전달하세요</div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, border: "none", borderRadius: 9, background: "#f1f1f3", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#37383c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 12, color: "var(--text-sub)", marginBottom: 8 }}>가게 코드</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 72, background: "var(--p-soft)", border: "1.5px solid var(--p-border)", borderRadius: 16 }}>
            <span style={{ fontWeight: 900, fontSize: 36, color: "var(--p-tint)", letterSpacing: "0.22em", fontFamily: "monospace" }}>{storeCode}</span>
          </div>
        </div>

        <button
          onClick={() => copy(`안녕하세요! 플바 앱으로 출퇴근을 관리해요 :)\n\n가입 링크: https://${INVITE_URL}\n가게 코드: ${storeCode}\n\n링크로 가입 후 코드를 입력하면 바로 합류돼요!`)}
          style={{ width: "100%", height: 52, border: "none", borderRadius: 14, background: copiedUrl ? "var(--positive)" : "var(--p)", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", transition: "background 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
        >
          {copiedUrl ? (
            <>✓ 복사됐어요! 카톡으로 붙여넣어 보내세요</>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              링크 + 코드 한번에 복사
            </>
          )}
        </button>

        <div style={{ padding: "10px 14px", background: "#f7f7f8", borderRadius: 12, marginTop: 10 }}>
          <div style={{ fontWeight: 500, fontSize: 12, color: "var(--text-sub)", lineHeight: 1.6 }}>
            복사 후 카카오톡이나 문자로 붙여넣어 전달하면 돼요.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OwnerWebLayout({ tab, onTabChange, onLogout }: {
  tab: OwnerWebTab;
  onTabChange: (t: OwnerWebTab) => void;
  onLogout: () => void;
}) {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid") ?? (typeof window !== "undefined" ? localStorage.getItem("plba_uid") ?? "" : "");
  const nameParam = searchParams.get("name") ?? (typeof window !== "undefined" ? localStorage.getItem("plba_name") ?? "사장님" : "사장님");

  const [inviteOpen, setInviteOpen] = useState(false);
  const [storeCode, setStoreCode] = useState("------");
  const [storeName, setStoreName] = useState("");
  const [storeId, setStoreId] = useState("");

  const today = new Date();
  const dateLabel = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 ${"일월화수목금토"[today.getDay()]}요일`;

  useEffect(() => {
    if (!uid) return;
    supabase.from("stores").select("id, name, code").eq("owner_id", uid).maybeSingle().then(({ data }) => {
      if (data) {
        setStoreCode(data.code);
        setStoreName(data.name);
        setStoreId(data.id);
      }
    });
  }, [uid]);

  return (
    <>
    <div style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{
        width: 256,
        flexShrink: 0,
        background: "#fff",
        borderRight: "1px solid rgba(112,115,124,0.14)",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 8px 24px" }}>
          <Image src="/plba-symbol.png" width={34} height={34} alt="plba" style={{ objectFit: "contain" }} />
          <Image src="/plba-logo.png" width={56} height={20} alt="plba" style={{ objectFit: "contain" }} />
          <span style={{ fontWeight: 600, fontSize: 12, color: "var(--text-sub)", marginLeft: 2 }}>사장님</span>
        </div>

        {/* Shop code */}
        <div
          onClick={() => storeCode !== "------" && setInviteOpen(true)}
          style={{ background: "var(--p-soft)", borderRadius: 13, padding: "12px 14px", marginBottom: 16, cursor: storeCode !== "------" ? "pointer" : "default" }}
        >
          <div style={{ fontWeight: 600, fontSize: 11, color: "var(--p-tint)", opacity: 0.85 }}>우리 가게 코드</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 3 }}>
            <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: "0.1em", color: "var(--p-tint)" }}>{storeCode}</span>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--p-tint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>
          </div>
          <div style={{ fontWeight: 500, fontSize: 11, color: "var(--p-tint)", opacity: 0.7, marginTop: 1 }}>알바생에게 공유하세요</div>
        </div>

        {/* Nav */}
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {NAV_ITEMS.map(n => {
            const active = tab === n.id;
            return (
              <button key={n.id} onClick={() => onTabChange(n.id)} style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 13px", border: "none", borderRadius: 11, cursor: "pointer", textAlign: "left", background: active ? "var(--p-soft)" : "transparent", color: active ? "var(--p-tint)" : "rgba(55,56,60,0.65)", fontWeight: active ? 700 : 500, fontSize: 14, transition: "background 0.12s" }}>
                {n.icon}
                <span>{n.label}</span>
              </button>
            );
          })}
        </div>

        {/* Profile + logout */}
        <div style={{ marginTop: "auto", paddingTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11, padding: 12, background: "#f7f7f8", border: "1px solid var(--hairline)", borderRadius: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#e1e2e4", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "#46474c" }}>
              {nameParam.charAt(0)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: "var(--text)" }}>{nameParam}</div>
              <div style={{ fontWeight: 500, fontSize: 11, color: "var(--text-sub)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{storeName || "가게 정보 로딩 중..."}</div>
            </div>
            <button onClick={onLogout} title="로그아웃" style={{ padding: 6, border: "none", background: "none", cursor: "pointer", color: "var(--text-sub)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 17l5-5-5-5M20 12H9M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", background: "#fafafb" }}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px", borderBottom: "1px solid rgba(112,115,124,0.12)", background: "#fff", position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 22, color: "var(--text)" }}>{WEB_TITLES[tab]}</div>
            <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", marginTop: 2 }}>{dateLabel}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setInviteOpen(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", background: "var(--p)", border: "none", borderRadius: 10, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
              직원 추가
            </button>
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px 48px" }}>
          {tab === "dashboard" && <OwnerDashboard storeId={storeId} />}
          {tab === "attendance" && <OwnerAttendance />}
          {tab === "payroll" && <OwnerPayroll />}
          {tab === "schedule" && <OwnerSchedule />}
          {tab === "staff" && <OwnerStaff />}
          {tab === "onboarding" && <OwnerOnboarding />}
          {tab === "billing" && storeId && <OwnerBilling storeId={storeId} />}
        </div>
      </div>
    </div>
    {inviteOpen && <InviteModal storeCode={storeCode} onClose={() => setInviteOpen(false)} />}
    </>
  );
}
