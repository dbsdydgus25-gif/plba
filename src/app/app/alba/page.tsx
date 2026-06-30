"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import AlbaHome from "@/components/alba/AlbaHome";
import AlbaRecords from "@/components/alba/AlbaRecords";
import AlbaPay from "@/components/alba/AlbaPay";
import AlbaMore from "@/components/alba/AlbaMore";
import QROverlay from "@/components/alba/QROverlay";
import GuideOverlay from "@/components/alba/GuideOverlay";
import CameraOverlay from "@/components/alba/CameraOverlay";
import OnboardingOverlay from "@/components/alba/OnboardingOverlay";
import { supabase } from "@/lib/supabase";
import { getSession, setDemoSession, type PlbaSession } from "@/lib/session";

export type WorkState = "before" | "working" | "done";
export type AlbaTab = "home" | "records" | "pay" | "more";

export default function AlbaAppPage() {
  const router = useRouter();
  const [session, setSession] = useState<PlbaSession | null>(null);
  const [tab, setTab] = useState<AlbaTab>("home");
  const [workState, setWorkState] = useState<WorkState>("before");
  const [inTime, setInTime] = useState("");
  const [outTime, setOutTime] = useState("");
  const [elapsed, setElapsed] = useState("00:00:00");
  const [startTs, setStartTs] = useState<number | null>(null);
  const [attendanceId, setAttendanceId] = useState<string | null>(null);

  const [qrOpen, setQrOpen] = useState(false);
  const [qrMode, setQrMode] = useState<"in" | "out">("in");
  const [guideOpen, setGuideOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  // 세션 로드
  useEffect(() => {
    let s = getSession();
    // 세션 없으면 데모 세션으로 자동 설정 (테스트용)
    if (!s) {
      setDemoSession();
      s = getSession();
    }
    setSession(s);
    // 첫 방문이면 온보딩 표시
    const visited = localStorage.getItem("plba_visited");
    if (!visited) {
      setOnboardingOpen(true);
      localStorage.setItem("plba_visited", "1");
    }
  }, []);

  // 근무 타이머
  useEffect(() => {
    if (workState !== "working" || !startTs) return;
    const id = setInterval(() => {
      const s = Math.floor((Date.now() - startTs) / 1000);
      const h = String(Math.floor(s / 3600)).padStart(2, "0");
      const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      const sec = String(s % 60).padStart(2, "0");
      setElapsed(`${h}:${m}:${sec}`);
    }, 1000);
    return () => clearInterval(id);
  }, [workState, startTs]);

  const openQR = useCallback((mode: "in" | "out") => {
    setQrMode(mode);
    setQrOpen(true);
  }, []);

  const onQRSuccess = useCallback(async () => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const s = getSession();

    if (qrMode === "in") {
      setInTime(timeStr);
      setStartTs(Date.now());
      setWorkState("working");

      // DB에 출근 기록 INSERT
      if (s) {
        const today = now.toISOString().split("T")[0];
        const { data } = await supabase
          .from("attendance")
          .insert({ store_id: s.storeId, user_id: s.userId, date: today, in_time: now.toISOString() })
          .select("id")
          .single();
        if (data) setAttendanceId(data.id);
      }
    } else {
      setOutTime(timeStr);
      setWorkState("done");

      // DB에 퇴근 시간 UPDATE
      if (attendanceId) {
        await supabase
          .from("attendance")
          .update({ out_time: now.toISOString() })
          .eq("id", attendanceId);
      }
    }
    setTimeout(() => setQrOpen(false), 800);
  }, [qrMode, attendanceId]);

  const handleLogout = () => {
    localStorage.removeItem("plba_visited");
    router.push("/login");
  };

  const TABS: { id: AlbaTab; label: string; isQr?: boolean; icon: React.ReactNode }[] = [
    {
      id: "home", label: "홈",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11.5L12 3l9 8.5V21a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" /><path d="M9 22V12h6v10" /></svg>
    },
    {
      id: "records", label: "근무기록",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
    },
    {
      id: "home", label: "QR", isQr: true,
      icon: (
        <button
          onClick={() => openQR(workState === "before" ? "in" : "out")}
          style={{ width: 54, height: 54, borderRadius: "50%", background: "var(--p)", border: "4px solid #fff", boxShadow: "0 4px 18px rgba(101,65,242,0.45)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: -22, color: "#fff", cursor: "pointer" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V5.5A1.5 1.5 0 0 1 5.5 4H7M17 4h1.5A1.5 1.5 0 0 1 20 5.5V7M20 17v1.5a1.5 1.5 0 0 1-1.5 1.5H17M7 20H5.5A1.5 1.5 0 0 1 4 18.5V17M8 12h8" /></svg>
        </button>
      )
    },
    {
      id: "pay", label: "급여",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="5" width="22" height="14" rx="2" /><path d="M1 10h22" /></svg>
    },
    {
      id: "more", label: "더보기",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1.3" fill="currentColor" /><circle cx="12" cy="12" r="1.3" fill="currentColor" /><circle cx="12" cy="19" r="1.3" fill="currentColor" /></svg>
    },
  ];

  return (
    <div style={{ width: "100%", maxWidth: 430, margin: "0 auto", minHeight: "100svh", background: "#fff", position: "relative", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 80 }}>
        {tab === "home" && (
          <AlbaHome
            userName={session?.userName ?? ""}
            storeName={session?.storeName ?? ""}
            userId={session?.userId}
            storeId={session?.storeId}
            workState={workState}
            inTime={inTime}
            outTime={outTime}
            elapsed={elapsed}
            onScanIn={() => openQR("in")}
            onScanOut={() => openQR("out")}
            onResetDay={() => { setWorkState("before"); setInTime(""); setOutTime(""); setElapsed("00:00:00"); setStartTs(null); setAttendanceId(null); }}
            onOpenGuide={() => setGuideOpen(true)}
            onOpenCamera={() => setCameraOpen(true)}
          />
        )}
        {tab === "records" && <AlbaRecords userId={session?.userId} storeId={session?.storeId} />}
        {tab === "pay" && <AlbaPay userId={session?.userId} storeId={session?.storeId} />}
        {tab === "more" && <AlbaMore userName={session?.userName} storeName={session?.storeName} onLogout={handleLogout} />}
      </div>

      {/* Bottom tab bar */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, height: 72, background: "#fff", borderTop: "1px solid var(--hairline)", display: "flex", alignItems: "center", zIndex: 10, paddingBottom: "env(safe-area-inset-bottom)" }}>
        {TABS.map((t, i) => {
          if (t.isQr) {
            return (
              <div key="qr" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                {t.icon}
                <span style={{ fontWeight: 600, fontSize: 10, color: "var(--text-sub)" }}>QR</span>
              </div>
            );
          }
          const active = tab === t.id && !t.isQr;
          return (
            <button key={i} onClick={() => setTab(t.id as AlbaTab)}
              style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "8px 0 0", background: "none", border: "none", cursor: "pointer", color: active ? "var(--p)" : "var(--text-sub)" }}>
              {t.icon}
              <span style={{ fontWeight: 600, fontSize: 10 }}>{t.label}</span>
            </button>
          );
        })}
      </div>

      {qrOpen && <QROverlay mode={qrMode} storeCode={session?.storeCode} onSuccess={onQRSuccess} onClose={() => setQrOpen(false)} />}
      {guideOpen && <GuideOverlay onClose={() => setGuideOpen(false)} onOpenCamera={() => { setGuideOpen(false); setCameraOpen(true); }} />}
      {cameraOpen && <CameraOverlay onClose={() => setCameraOpen(false)} />}
      {onboardingOpen && <OnboardingOverlay onClose={() => setOnboardingOpen(false)} storeName={session?.storeName} />}
    </div>
  );
}
