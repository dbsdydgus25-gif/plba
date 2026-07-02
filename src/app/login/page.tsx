"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputStyle: React.CSSProperties = {
    width: "100%", height: 54, border: "1.5px solid #e0e0e4", borderRadius: 14,
    padding: "0 16px", fontSize: 16, fontFamily: "Pretendard", fontWeight: 500,
    color: "#1a1a1a", outline: "none", boxSizing: "border-box", background: "#fff",
  };

  async function handleLogin() {
    if (!email || !password) return;
    setError("");
    setLoading(true);
    try {
      const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) throw err;

      const userId = data.user.id;
      localStorage.setItem("plba_role", "owner");

      const { data: existing } = await supabase
        .from("users").select("id, name").eq("id", userId).maybeSingle();

      if (existing) {
        localStorage.setItem("plba_uid", existing.id);
        localStorage.setItem("plba_name", existing.name);
        const { data: store } = await supabase
          .from("stores").select("id, name, code").eq("owner_id", existing.id).maybeSingle();
        if (store) {
          localStorage.setItem("plba_store_id", store.id);
          localStorage.setItem("plba_store_name", store.name);
          localStorage.setItem("plba_store_code", store.code);
        }
        router.replace("/owner");
      } else {
        router.replace(`/owner-signup?google_id=${encodeURIComponent(userId)}&google_name=`);
      }
    } catch (e) {
      const msg = (e as { message?: string }).message ?? "";
      if (msg.includes("Invalid login credentials") || msg.includes("invalid_credentials")) {
        setError("이메일 또는 비밀번호가 올바르지 않아요.");
      } else if (msg.includes("Email not confirmed")) {
        setError("이메일 인증을 완료해주세요. 받은 편지함을 확인하세요.");
      } else {
        setError(msg || "로그인 중 오류가 발생했어요.");
      }
    } finally {
      setLoading(false);
    }
  }

  function kakaoLogin() {
    localStorage.setItem("plba_role", "alba");
    supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f9", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <div style={{ width: "100%", maxWidth: 420, background: "#fff", borderRadius: 24, padding: "48px 36px 40px", boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <Image src="/plba-symbol.png" width={40} height={40} alt="plba" style={{ objectFit: "contain" }} />
            <Image src="/plba-logo.png" width={64} height={22} alt="plba" style={{ objectFit: "contain" }} />
          </div>
        </div>

        {/* 이메일/비번 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="이메일 입력"
            style={inputStyle}
            autoComplete="email"
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
            style={inputStyle}
            autoComplete="current-password"
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
        </div>

        {error && (
          <div style={{ marginTop: 10, padding: "10px 14px", background: "#fff1f0", borderRadius: 11, fontWeight: 600, fontSize: 13, color: "#d32f2f" }}>
            {error}
          </div>
        )}

        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          disabled={loading || !email || !password}
          style={{ marginTop: 16, width: "100%", height: 54, border: "none", borderRadius: 14, background: "var(--p)", color: "#fff", fontWeight: 800, fontSize: 16, cursor: loading || !email || !password ? "not-allowed" : "pointer", opacity: loading || !email || !password ? 0.45 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "opacity 0.15s" }}
        >
          {loading && <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />}
          로그인
        </button>

        {/* 비번 찾기 */}
        <div style={{ marginTop: 12, textAlign: "right" }}>
          <button
            onClick={() => router.push("/owner-auth?tab=reset")}
            style={{ background: "none", border: "none", cursor: "pointer", fontWeight: 500, fontSize: 13, color: "#aaa" }}
          >
            비밀번호 찾기
          </button>
        </div>

        {/* 구분선 */}
        <div style={{ margin: "24px 0", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: "#ebebee" }} />
          <div style={{ flex: 1, height: 1, background: "#ebebee" }} />
        </div>

        {/* 사업자 신규 가입 */}
        <button
          onClick={() => router.push("/owner-auth")}
          style={{ width: "100%", height: 54, border: "2px solid var(--p)", borderRadius: 14, background: "#fff", color: "var(--p)", fontWeight: 800, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
          </svg>
          사업자 신규 가입하기
        </button>

        {/* 알바생 구분 안내 */}
        <p style={{ margin: "20px 0 12px", fontWeight: 500, fontSize: 13, color: "#aaa", textAlign: "center" }}>
          알바생이신가요?
        </p>

        {/* 카카오 로그인 */}
        <button
          onClick={kakaoLogin}
          style={{ width: "100%", height: 54, border: "none", borderRadius: 14, background: "#FEE500", color: "#191600", fontWeight: 700, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
        >
          <KakaoIcon />
          알바생 간편 로그인
        </button>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function KakaoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#191600">
      <path d="M12 3.5C6.8 3.5 2.5 6.8 2.5 10.9c0 2.6 1.8 4.9 4.5 6.2-.2.7-.7 2.5-.8 2.9-.1.5.2.5.4.4.2-.1 2.5-1.7 3.5-2.4.7.1 1.5.2 2.4.2 5.2 0 9.5-3.3 9.5-7.4S17.2 3.5 12 3.5z" />
    </svg>
  );
}
