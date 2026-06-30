"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type AttendanceState = "none" | "in" | "out";

export default function QRPage() {
  const params = useParams();
  const router = useRouter();
  const storeCode = params.storeCode as string;

  const [store, setStore] = useState<{ id: string; name: string } | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [state, setState] = useState<AttendanceState>("none");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [done, setDone] = useState<"in" | "out" | null>(null);

  useEffect(() => {
    const uid = localStorage.getItem("plba_uid");
    const name = localStorage.getItem("plba_name");
    if (!uid) {
      router.replace(`/login?next=/qr/${storeCode}`);
      return;
    }
    setUserId(uid);
    setUserName(name ?? "");
    loadStore(uid);
  }, [storeCode, router]);

  async function loadStore(uid: string) {
    const { data: storeData } = await supabase
      .from("stores")
      .select("id, name")
      .eq("code", storeCode)
      .maybeSingle();

    if (!storeData) {
      setLoading(false);
      return;
    }
    setStore(storeData);

    const today = new Date().toISOString().slice(0, 10);
    const { data: att } = await supabase
      .from("attendance")
      .select("in_time, out_time")
      .eq("store_id", storeData.id)
      .eq("user_id", uid)
      .eq("date", today)
      .maybeSingle();

    if (!att) setState("none");
    else if (att.in_time && !att.out_time) setState("in");
    else if (att.out_time) setState("out");

    setLoading(false);
  }

  async function handleCheckIn() {
    if (!store || !userId) return;
    setActionLoading(true);
    const today = new Date().toISOString().slice(0, 10);
    const now = new Date().toISOString();
    await supabase.from("attendance").upsert(
      { store_id: store.id, user_id: userId, date: today, in_time: now },
      { onConflict: "store_id,user_id,date" }
    );
    setState("in");
    setDone("in");
    setActionLoading(false);
  }

  async function handleCheckOut() {
    if (!store || !userId) return;
    setActionLoading(true);
    const today = new Date().toISOString().slice(0, 10);
    const now = new Date().toISOString();
    await supabase
      .from("attendance")
      .update({ out_time: now })
      .eq("store_id", store.id)
      .eq("user_id", userId)
      .eq("date", today);
    setState("out");
    setDone("out");
    setActionLoading(false);
  }

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", flexDirection: "column", gap: 16 }}>
        <div style={{ width: 32, height: 32, border: "3px solid #6B4DF6", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!store) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", flexDirection: "column", gap: 12, padding: 24 }}>
        <span style={{ fontSize: 48 }}>❌</span>
        <p style={{ fontWeight: 700, fontSize: 18, color: "#222" }}>유효하지 않은 QR코드입니다</p>
        <p style={{ fontSize: 14, color: "#888" }}>가게 코드: {storeCode}</p>
      </div>
    );
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString("ko-KR", { month: "long", day: "numeric", weekday: "short" });

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7fb", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 400, background: "#fff", borderRadius: 24, padding: "40px 32px", boxShadow: "0 4px 32px rgba(0,0,0,0.08)", textAlign: "center" }}>
        {/* 가게명 */}
        <div style={{ width: 64, height: 64, borderRadius: 18, background: "#EEE9FF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 28 }}>🏪</div>
        <h1 style={{ fontWeight: 800, fontSize: 22, color: "#111", marginBottom: 4 }}>{store.name}</h1>
        <p style={{ fontSize: 14, color: "#888", marginBottom: 32 }}>{dateStr} · {timeStr}</p>

        {/* 유저명 */}
        <div style={{ background: "#f7f7fb", borderRadius: 12, padding: "12px 20px", marginBottom: 32, fontSize: 15, fontWeight: 600, color: "#444" }}>
          👤 {userName}님
        </div>

        {/* 완료 상태 */}
        {done && (
          <div style={{ background: done === "in" ? "#E8F5E9" : "#FFF3E0", borderRadius: 16, padding: "24px 20px", marginBottom: 24 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{done === "in" ? "✅" : "👋"}</div>
            <p style={{ fontWeight: 800, fontSize: 20, color: done === "in" ? "#2E7D32" : "#E65100" }}>
              {done === "in" ? "출근 완료!" : "퇴근 완료!"}
            </p>
            <p style={{ fontSize: 14, color: "#666", marginTop: 4 }}>{timeStr} 기록됐습니다</p>
          </div>
        )}

        {/* 버튼 */}
        {!done && (
          <>
            {state === "none" && (
              <button
                onClick={handleCheckIn}
                disabled={actionLoading}
                style={{ width: "100%", height: 56, borderRadius: 14, border: "none", background: "#6B4DF6", color: "#fff", fontSize: 17, fontWeight: 700, cursor: "pointer", opacity: actionLoading ? 0.7 : 1 }}
              >
                {actionLoading ? "처리 중..." : "🟢 출근하기"}
              </button>
            )}
            {state === "in" && (
              <button
                onClick={handleCheckOut}
                disabled={actionLoading}
                style={{ width: "100%", height: 56, borderRadius: 14, border: "none", background: "#FF6B35", color: "#fff", fontSize: 17, fontWeight: 700, cursor: "pointer", opacity: actionLoading ? 0.7 : 1 }}
              >
                {actionLoading ? "처리 중..." : "🔴 퇴근하기"}
              </button>
            )}
            {state === "out" && (
              <div style={{ background: "#f7f7fb", borderRadius: 14, padding: "20px", color: "#888", fontSize: 15, fontWeight: 600 }}>
                오늘 근무 완료 ✓
              </div>
            )}
          </>
        )}

        <p style={{ marginTop: 24, fontSize: 12, color: "#bbb" }}>powered by plba</p>
      </div>
    </div>
  );
}
