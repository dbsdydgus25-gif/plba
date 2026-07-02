"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type Mode = "login" | "signup";

export default function OwnerAuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false); // 회원가입 후 이메일 확인 안내

  const inputStyle: React.CSSProperties = {
    width: "100%", height: 52, border: "1.5px solid #e0e0e4", borderRadius: 13,
    padding: "0 16px", fontSize: 15, fontFamily: "Pretendard", fontWeight: 500,
    color: "#1a1a1a", outline: "none", boxSizing: "border-box", background: "#fff",
  };

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        if (!terms || !privacy) { setError("필수 약관에 동의해주세요."); return; }
        if (password.length < 6) { setError("비밀번호는 6자 이상이어야 해요."); return; }
        if (password !== passwordConfirm) { setError("비밀번호가 일치하지 않아요."); return; }

        const { error: signUpErr } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?role=owner`,
          },
        });
        if (signUpErr) throw signUpErr;
        setDone(true);
      } else {
        // 로그인
        const { data, error: signInErr } = await supabase.auth.signInWithPassword({ email, password });
        if (signInErr) throw signInErr;

        const userId = data.user.id;
        localStorage.setItem("plba_role", "owner");

        // users 테이블 확인
        const { data: existing } = await supabase
          .from("users")
          .select("id, name")
          .eq("id", userId)
          .maybeSingle();

        if (existing) {
          localStorage.setItem("plba_uid", existing.id);
          localStorage.setItem("plba_name", existing.name);
          const { data: store } = await supabase
            .from("stores")
            .select("id, name, code")
            .eq("owner_id", existing.id)
            .maybeSingle();
          if (store) {
            localStorage.setItem("plba_store_id", store.id);
            localStorage.setItem("plba_store_name", store.name);
            localStorage.setItem("plba_store_code", store.code);
          }
          router.replace("/owner");
        } else {
          // 가입 절차 미완료 → 사업자 정보 입력으로
          router.replace(`/owner-signup?google_id=${encodeURIComponent(userId)}&google_name=`);
        }
      }
    } catch (e) {
      const msg = (e as { message?: string }).message ?? "오류가 발생했어요.";
      if (msg.includes("already registered") || msg.includes("User already registered")) {
        setError("이미 가입된 이메일이에요. 로그인해주세요.");
        setMode("login");
      } else if (msg.includes("Invalid login credentials")) {
        setError("이메일 또는 비밀번호가 올바르지 않아요.");
      } else if (msg.includes("Email not confirmed")) {
        setError("이메일 인증을 완료해주세요. 받은 편지함을 확인해주세요.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }

  // 이메일 발송 완료 화면
  if (done) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", padding: 24 }}>
        <div style={{ maxWidth: 420, width: "100%", textAlign: "center" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#f0edfe", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6B4DF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </div>
          <h2 style={{ fontWeight: 800, fontSize: 22, color: "#1a1a1a", marginBottom: 12 }}>이메일을 확인해주세요</h2>
          <p style={{ fontWeight: 500, fontSize: 15, color: "#555", lineHeight: 1.65, marginBottom: 8 }}>
            <span style={{ color: "#6B4DF6", fontWeight: 700 }}>{email}</span>로<br />인증 링크를 보냈어요.
          </p>
          <p style={{ fontWeight: 500, fontSize: 13, color: "#999", lineHeight: 1.6, marginBottom: 32 }}>
            링크를 클릭하면 사업자 정보 입력으로 이동해요.<br />스팸 폴더도 확인해보세요.
          </p>
          <button onClick={() => { setDone(false); setMode("login"); }}
            style={{ width: "100%", height: 50, border: "none", borderRadius: 13, background: "#6B4DF6", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            로그인 화면으로
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <div style={{ maxWidth: 460, margin: "0 auto", padding: "0 24px", minHeight: "100svh", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ padding: "48px 0 32px", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => router.push("/login")} style={{ width: 38, height: 38, border: "none", borderRadius: 11, background: "#f1f1f3", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#37383c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Image src="/plba-symbol.png" width={28} height={28} alt="plba" style={{ objectFit: "contain" }} />
            <Image src="/plba-logo.png" width={44} height={16} alt="plba" style={{ objectFit: "contain" }} />
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h1 style={{ fontWeight: 800, fontSize: 26, color: "#1a1a1a", lineHeight: 1.3, marginBottom: 6 }}>
            {mode === "signup" ? "사장님 계정 만들기" : "사장님 로그인"}
          </h1>
          <p style={{ fontWeight: 500, fontSize: 14, color: "#888", marginBottom: 32, lineHeight: 1.5 }}>
            {mode === "signup" ? "이메일로 간편하게 가입하세요." : "이메일과 비밀번호로 로그인하세요."}
          </p>

          {/* Tab */}
          <div style={{ display: "flex", background: "#f4f4f6", borderRadius: 12, padding: 4, marginBottom: 28 }}>
            {(["signup", "login"] as Mode[]).map(m => (
              <button key={m} onClick={() => { setMode(m); setError(""); }}
                style={{ flex: 1, height: 40, border: "none", borderRadius: 9, background: mode === m ? "#fff" : "transparent", fontWeight: mode === m ? 700 : 500, fontSize: 14, color: mode === m ? "#1a1a1a" : "#888", cursor: "pointer", boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.1)" : "none", transition: "all 0.15s" }}>
                {m === "signup" ? "회원가입" : "로그인"}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 13, color: "#37383c", display: "block", marginBottom: 7 }}>이메일</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" style={inputStyle} autoComplete="email" />
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 13, color: "#37383c", display: "block", marginBottom: 7 }}>비밀번호</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={mode === "signup" ? "6자 이상 입력해주세요" : "비밀번호"} style={inputStyle} autoComplete={mode === "signup" ? "new-password" : "current-password"} onKeyDown={e => { if (e.key === "Enter" && mode === "login") handleSubmit(); }} />
            </div>
            {mode === "signup" && (
              <div>
                <label style={{ fontWeight: 600, fontSize: 13, color: "#37383c", display: "block", marginBottom: 7 }}>비밀번호 확인</label>
                <input type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} placeholder="비밀번호를 다시 입력해주세요" style={inputStyle} autoComplete="new-password" />
              </div>
            )}
          </div>

          {/* 약관 (회원가입만) */}
          {mode === "signup" && (
            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
              <CheckRow checked={terms && privacy} onChange={v => { setTerms(v); setPrivacy(v); }} label="전체 동의" bold />
              <div style={{ height: 1, background: "#f0f0f2" }} />
              <CheckRow checked={terms} onChange={setTerms} label="[필수] 서비스 이용약관" link="#" />
              <CheckRow checked={privacy} onChange={setPrivacy} label="[필수] 개인정보 처리방침" link="#" />
            </div>
          )}

          {error && (
            <div style={{ marginTop: 14, padding: "11px 14px", background: "#fff1f0", borderRadius: 11, fontWeight: 600, fontSize: 13, color: "#d32f2f" }}>
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !email || !password}
            style={{ marginTop: 24, width: "100%", height: 54, border: "none", borderRadius: 14, background: "#6B4DF6", color: "#fff", fontWeight: 800, fontSize: 16, cursor: loading || !email || !password ? "not-allowed" : "pointer", opacity: loading || !email || !password ? 0.45 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "opacity 0.15s" }}
          >
            {loading && <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />}
            {mode === "signup" ? "가입하고 시작하기" : "로그인"}
          </button>

          {mode === "login" && (
            <button onClick={() => { /* 비번 찾기 — 추후 구현 */ }} style={{ marginTop: 14, display: "block", width: "100%", textAlign: "center", background: "none", border: "none", cursor: "pointer", fontWeight: 500, fontSize: 13, color: "#aaa" }}>
              비밀번호를 잊으셨나요?
            </button>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function CheckRow({ checked, onChange, label, link, bold }: { checked: boolean; onChange: (v: boolean) => void; label: string; link?: string; bold?: boolean }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
      <div
        onClick={() => onChange(!checked)}
        style={{ width: 22, height: 22, borderRadius: 7, border: `2px solid ${checked ? "#6B4DF6" : "#d0d0d4"}`, background: checked ? "#6B4DF6" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.12s" }}
      >
        {checked && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>}
      </div>
      <span style={{ fontWeight: bold ? 700 : 500, fontSize: bold ? 15 : 13, color: bold ? "#1a1a1a" : "#555", flex: 1 }} onClick={() => onChange(!checked)}>{label}</span>
      {link && (
        <a href={link} onClick={e => e.stopPropagation()} style={{ fontWeight: 500, fontSize: 12, color: "#aaa", textDecoration: "underline", flexShrink: 0 }}>보기</a>
      )}
    </label>
  );
}
