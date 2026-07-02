"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type Step =
  | "email"      // 1. 이메일 입력
  | "otp"        // 2. 이메일 인증번호
  | "password"   // 3. 비밀번호 + 약관
  | "bizinfo"    // 4. 업종 + 직원수
  | "bizreg"     // 5. 사업자등록번호
  | "store"      // 6. 가게명 + 주소
  | "name"       // 7. 대표자 이름
  | "phone"      // 8. 핸드폰
  | "sms"        // 9. SMS 인증
  | "done";      // → Creem 이동 중

const STEP_ORDER: Step[] = ["email","otp","password","bizinfo","bizreg","store","name","phone","sms","done"];
const TOTAL = 9; // done 제외

function stepNum(s: Step) { return STEP_ORDER.indexOf(s); }

const I: React.CSSProperties = {
  width: "100%", height: 54, border: "1.5px solid #e0e0e4", borderRadius: 14,
  padding: "0 16px", fontSize: 16, fontFamily: "Pretendard", fontWeight: 500,
  color: "#1a1a1a", outline: "none", boxSizing: "border-box", background: "#fff",
};

function PrimaryBtn({ children, onClick, disabled, loading }: {
  children: React.ReactNode; onClick: () => void; disabled?: boolean; loading?: boolean;
}) {
  return (
    <button onClick={onClick} disabled={disabled || loading}
      style={{ marginTop: 24, width: "100%", height: 54, border: "none", borderRadius: 14, background: "var(--p)", color: "#fff", fontWeight: 800, fontSize: 16, cursor: disabled || loading ? "not-allowed" : "pointer", opacity: disabled || loading ? 0.4 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "opacity 0.15s" }}>
      {loading && <Spinner />}
      {children}
    </button>
  );
}

function Spinner() {
  return <div style={{ width: 16, height: 16, border: "2.5px solid rgba(255,255,255,0.35)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />;
}

function ErrorBox({ msg }: { msg: string }) {
  if (!msg) return null;
  return <div style={{ marginTop: 12, padding: "11px 14px", background: "#fff1f0", borderRadius: 11, fontWeight: 600, fontSize: 13, color: "#d32f2f" }}>{msg}</div>;
}

function SuccessBox({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <div style={{ marginTop: 12, padding: "11px 14px", background: "#f0fdf4", borderRadius: 11, fontWeight: 600, fontSize: 13, color: "#16a34a", display: "flex", alignItems: "center", gap: 7 }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
      {msg}
    </div>
  );
}

function PasswordStrength({ pw }: { pw: string }) {
  const checks = [
    { label: "8자 이상", ok: pw.length >= 8 },
    { label: "대문자 포함", ok: /[A-Z]/.test(pw) },
    { label: "숫자 포함", ok: /[0-9]/.test(pw) },
    { label: "특수문자 포함", ok: /[!@#$%^&*(),.?":{}|<>]/.test(pw) },
  ];
  return (
    <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: "6px 10px" }}>
      {checks.map(c => (
        <span key={c.label} style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: 600, fontSize: 12, color: c.ok ? "#16a34a" : "#aaa" }}>
          <span style={{ fontSize: 14 }}>{c.ok ? "✓" : "○"}</span>{c.label}
        </span>
      ))}
    </div>
  );
}

function isStrongPw(pw: string) {
  return pw.length >= 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw) && /[!@#$%^&*(),.?":{}|<>]/.test(pw);
}

export default function OwnerAuthPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [businessType, setBizType] = useState("");
  const [employeeCount, setEmpCount] = useState("");
  const [bizReg, setBizReg] = useState("");
  const [bizVerified, setBizVerified] = useState(false);
  const [bizName, setBizName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [smsSent, setSmsSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Daum 주소 API 로드
  useEffect(() => {
    if (step === "store") {
      const s = document.createElement("script");
      s.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      s.async = true;
      document.head.appendChild(s);
    }
  }, [step]);

  function go(s: Step) { setError(""); setSuccess(""); setStep(s); }
  function back() {
    const i = STEP_ORDER.indexOf(step);
    if (i <= 0) router.push("/login");
    else go(STEP_ORDER[i - 1] as Step);
  }

  // ── STEP 1: 이메일 → OTP 발송 ──
  async function sendEmailOtp() {
    setError(""); setLoading(true);
    try {
      const { error: e } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
      });
      if (e) throw e;
      setOtpSent(true);
      go("otp");
    } catch (e) {
      setError((e as { message?: string }).message ?? "인증번호 발송 실패");
    } finally { setLoading(false); }
  }

  // ── STEP 2: OTP 인증 ──
  async function verifyEmailOtp() {
    setError(""); setLoading(true);
    try {
      const { error: e } = await supabase.auth.verifyOtp({
        email, token: otp, type: "email",
      });
      if (e) throw e;
      go("password");
    } catch (e) {
      setError("인증번호가 올바르지 않아요. 다시 확인해주세요.");
    } finally { setLoading(false); }
  }

  // ── STEP 3: 비밀번호 설정 ──
  async function setPassword() {
    if (!isStrongPw(password)) { setError("비밀번호 조건을 모두 충족해야 해요."); return; }
    if (password !== pwConfirm) { setError("비밀번호가 일치하지 않아요."); return; }
    if (!terms || !privacy) { setError("필수 약관에 동의해주세요."); return; }
    setError(""); setLoading(true);
    try {
      const { error: e } = await supabase.auth.updateUser({ password });
      if (e) throw e;
      go("bizinfo");
    } catch (e) {
      setError((e as { message?: string }).message ?? "비밀번호 설정 실패");
    } finally { setLoading(false); }
  }

  // ── STEP 5: 사업자번호 확인 ──
  async function verifyBizReg() {
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/biz", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ b_no: bizReg }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error ?? "등록되지 않은 사업자번호예요.");
      setBizVerified(true);
      setBizName(data.tax_type ?? "확인 완료");
      setSuccess("사업자가 확인되었습니다!");
    } catch (e) {
      setError((e as Error).message);
    } finally { setLoading(false); }
  }

  // ── STEP 8: SMS 발송 ──
  async function sendSms() {
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/sms", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, action: "send" }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error ?? "SMS 발송 실패");
      setSmsSent(true);
      go("sms");
    } catch (e) {
      setError((e as Error).message);
    } finally { setLoading(false); }
  }

  // ── STEP 9: SMS 인증 + DB 저장 + Creem ──
  async function verifySmsAndFinish() {
    setError(""); setLoading(true);
    try {
      // SMS 인증
      const smsRes = await fetch("/api/sms", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, action: "verify", code: smsCode }),
      });
      const smsData = await smsRes.json();
      if (!smsData.ok) throw new Error("인증번호가 올바르지 않아요.");

      // 현재 auth user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("로그인 세션이 없어요. 처음부터 다시 시도해주세요.");

      // users 저장
      const { error: userErr } = await supabase.from("users").insert({
        id: user.id,
        email,
        phone: phone.replace(/\D/g, ""),
        name: ownerName,
        role: "owner",
      });
      if (userErr && !userErr.message.includes("duplicate")) throw new Error("계정 저장 실패: " + userErr.message);

      // stores 저장
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const trialEndsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
      const { data: store, error: storeErr } = await supabase.from("stores").insert({
        name: storeName || ownerName + "의 가게",
        address, code,
        owner_id: user.id,
        business_type: businessType,
        employee_count: employeeCount,
        subscription_status: "trial",
        trial_ends_at: trialEndsAt,
      }).select("id, name, code").single();
      if (storeErr) throw new Error("가게 저장 실패: " + storeErr.message);

      localStorage.setItem("plba_uid", user.id);
      localStorage.setItem("plba_name", ownerName);
      localStorage.setItem("plba_store_id", store.id);
      localStorage.setItem("plba_store_name", store.name);
      localStorage.setItem("plba_store_code", store.code);
      localStorage.setItem("plba_role", "owner");

      go("done");

      // Creem 결제 체크아웃
      const checkoutRes = await fetch("/api/creem/checkout", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storeId: store.id, storeName: store.name, successUrl: `${window.location.origin}/owner?payment=success` }),
      });
      const checkoutData = await checkoutRes.json();
      if (checkoutData.checkoutUrl) {
        window.location.href = checkoutData.checkoutUrl;
      } else {
        router.replace("/owner");
      }
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  }

  function formatBizReg(v: string) {
    const d = v.replace(/\D/g, "").slice(0, 10);
    if (d.length <= 3) return d;
    if (d.length <= 5) return `${d.slice(0,3)}-${d.slice(3)}`;
    return `${d.slice(0,3)}-${d.slice(3,5)}-${d.slice(5)}`;
  }

  function formatPhone(v: string) {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 7) return `${d.slice(0,3)}-${d.slice(3)}`;
    return `${d.slice(0,3)}-${d.slice(3,7)}-${d.slice(7)}`;
  }

  const progress = stepNum(step);
  const pct = Math.min((progress / TOTAL) * 100, 100);

  if (step === "done") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
        <div style={{ textAlign: "center" }}>
          <Spinner />
          <p style={{ marginTop: 16, fontWeight: 600, fontSize: 15, color: "#555" }}>결제 페이지로 이동 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 24px", minHeight: "100svh", display: "flex", flexDirection: "column" }}>
        {/* 헤더 */}
        <div style={{ padding: "20px 0 0", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={back} style={{ width: 38, height: 38, border: "none", borderRadius: 11, background: "#f1f1f3", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#37383c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6"/></svg>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Image src="/plba-symbol.png" width={26} height={26} alt="plba" style={{ objectFit: "contain" }} />
            <Image src="/plba-logo.png" width={40} height={14} alt="plba" style={{ objectFit: "contain" }} />
          </div>
        </div>

        {/* 진행바 */}
        {step !== "email" && (
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: 1, height: 4, background: "#f1f1f3", borderRadius: 9999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: "var(--p)", borderRadius: 9999, transition: "width 0.3s ease" }} />
            </div>
            <span style={{ fontWeight: 600, fontSize: 12, color: "var(--text-sub)", flexShrink: 0 }}>{progress}/{TOTAL}</span>
          </div>
        )}

        <div style={{ flex: 1, paddingTop: 36, paddingBottom: 40 }}>

          {/* ── 1. 이메일 ── */}
          {step === "email" && (
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, color: "var(--p)", marginBottom: 8 }}>사업자 회원가입</p>
              <h2 style={{ fontWeight: 800, fontSize: 26, color: "#1a1a1a", lineHeight: 1.3, marginBottom: 8 }}>이메일을 입력해주세요</h2>
              <p style={{ fontWeight: 500, fontSize: 14, color: "#888", marginBottom: 32, lineHeight: 1.5 }}>입력하신 이메일로 인증번호를 보내드려요.</p>
              <label style={{ fontWeight: 600, fontSize: 13, color: "#37383c", display: "block", marginBottom: 8 }}>이메일</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" style={I} autoComplete="email" onKeyDown={e => e.key === "Enter" && sendEmailOtp()} autoFocus />
              <ErrorBox msg={error} />
              <PrimaryBtn onClick={sendEmailOtp} disabled={!email.includes("@")} loading={loading}>인증번호 받기</PrimaryBtn>
            </div>
          )}

          {/* ── 2. 이메일 OTP ── */}
          {step === "otp" && (
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, color: "var(--p)", marginBottom: 8 }}>이메일 인증</p>
              <h2 style={{ fontWeight: 800, fontSize: 26, color: "#1a1a1a", lineHeight: 1.3, marginBottom: 8 }}>인증번호를 입력해주세요</h2>
              <p style={{ fontWeight: 500, fontSize: 14, color: "#888", marginBottom: 32, lineHeight: 1.5 }}>
                <span style={{ color: "var(--p)", fontWeight: 700 }}>{email}</span>로 6자리 코드를 보냈어요.
              </p>
              {/* OTP 박스 */}
              <div style={{ position: "relative" }}>
                <div style={{ display: "flex", gap: 8 }}>
                  {otp.padEnd(6, " ").split("").map((ch, i) => {
                    const isActive = i === otp.length && otp.length < 6;
                    const has = i < otp.length;
                    return (
                      <div key={i} style={{ flex: 1, height: 58, borderRadius: 13, border: `2px solid ${isActive ? "var(--p)" : has ? "var(--p-border)" : "#e0e0e4"}`, background: has ? "var(--p-softer)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 22, color: "#1a1a1a", transition: "border-color 0.12s" }}>
                        {ch.trim() ? ch : ""}
                      </div>
                    );
                  })}
                </div>
                <input value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" maxLength={6} autoFocus style={{ position: "absolute", inset: 0, opacity: 0, cursor: "text" }} />
              </div>
              <button onClick={sendEmailOtp} style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, color: "var(--p)" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
                인증번호 재전송
              </button>
              <ErrorBox msg={error} />
              <PrimaryBtn onClick={verifyEmailOtp} disabled={otp.length < 6} loading={loading}>확인</PrimaryBtn>
            </div>
          )}

          {/* ── 3. 비밀번호 + 약관 ── */}
          {step === "password" && (
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, color: "var(--p)", marginBottom: 8 }}>비밀번호 설정</p>
              <h2 style={{ fontWeight: 800, fontSize: 26, color: "#1a1a1a", lineHeight: 1.3, marginBottom: 32 }}>사용할 비밀번호를<br />설정해주세요</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <label style={{ fontWeight: 600, fontSize: 13, color: "#37383c", display: "block", marginBottom: 7 }}>비밀번호</label>
                  <input type="password" value={password} onChange={e => setPw(e.target.value)} placeholder="비밀번호" style={I} autoComplete="new-password" autoFocus />
                  <PasswordStrength pw={password} />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: 13, color: "#37383c", display: "block", marginBottom: 7 }}>비밀번호 확인</label>
                  <input type="password" value={pwConfirm} onChange={e => setPwConfirm(e.target.value)} placeholder="비밀번호 재입력" style={{ ...I, borderColor: pwConfirm && pwConfirm !== password ? "#d32f2f" : "#e0e0e4" }} autoComplete="new-password" />
                  {pwConfirm && pwConfirm !== password && <p style={{ marginTop: 6, fontSize: 12, fontWeight: 600, color: "#d32f2f" }}>비밀번호가 일치하지 않아요</p>}
                </div>
              </div>
              {/* 약관 */}
              <div style={{ marginTop: 24, padding: "18px 16px", background: "#f7f7f9", borderRadius: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                <CheckRow checked={terms && privacy} onChange={v => { setTerms(v); setPrivacy(v); }} label="전체 동의" bold />
                <div style={{ height: 1, background: "#e8e8ea" }} />
                <CheckRow checked={terms} onChange={setTerms} label="[필수] 서비스 이용약관" link="#" />
                <CheckRow checked={privacy} onChange={setPrivacy} label="[필수] 개인정보 처리방침" link="#" />
              </div>
              <ErrorBox msg={error} />
              <PrimaryBtn onClick={setPassword} disabled={!isStrongPw(password) || password !== pwConfirm || !terms || !privacy} loading={loading}>다음</PrimaryBtn>
            </div>
          )}

          {/* ── 4. 업종 + 직원수 ── */}
          {step === "bizinfo" && (
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, color: "var(--p)", marginBottom: 8 }}>사업장 정보</p>
              <h2 style={{ fontWeight: 800, fontSize: 26, color: "#1a1a1a", lineHeight: 1.3, marginBottom: 8 }}>업종을 선택해주세요</h2>
              <p style={{ fontWeight: 500, fontSize: 14, color: "#888", marginBottom: 28 }}>서비스 최적화에 활용돼요.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[{ v: "카페", i: "☕" },{ v: "식당", i: "🍽️" },{ v: "편의점", i: "🏪" },{ v: "마트/슈퍼", i: "🛒" },{ v: "베이커리", i: "🥐" },{ v: "기타", i: "📦" }].map(({ v, i }) => (
                  <button key={v} onClick={() => setBizType(v)}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", border: `2px solid ${businessType === v ? "var(--p)" : "#e8e8ea"}`, borderRadius: 14, background: businessType === v ? "var(--p-softer)" : "#fff", cursor: "pointer", fontWeight: 700, fontSize: 15, color: businessType === v ? "var(--p-tint)" : "#1a1a1a", transition: "all 0.12s" }}>
                    <span style={{ fontSize: 20 }}>{i}</span>{v}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 28 }}>
                <p style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a", marginBottom: 12 }}>현재 직원 수</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {["1~3명","4~9명","10~19명","20명 이상"].map(v => (
                    <button key={v} onClick={() => setEmpCount(v)}
                      style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", border: `2px solid ${employeeCount === v ? "var(--p)" : "#e8e8ea"}`, borderRadius: 14, background: employeeCount === v ? "var(--p-softer)" : "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14, color: employeeCount === v ? "var(--p-tint)" : "#1a1a1a", textAlign: "left", transition: "all 0.12s" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${employeeCount === v ? "var(--p)" : "#ccc"}`, background: employeeCount === v ? "var(--p)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {employeeCount === v && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff" }} />}
                      </div>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <PrimaryBtn onClick={() => go("bizreg")} disabled={!businessType || !employeeCount}>다음</PrimaryBtn>
            </div>
          )}

          {/* ── 5. 사업자등록번호 ── */}
          {step === "bizreg" && (
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, color: "var(--p)", marginBottom: 8 }}>사업자 인증</p>
              <h2 style={{ fontWeight: 800, fontSize: 26, color: "#1a1a1a", lineHeight: 1.3, marginBottom: 8 }}>사업자등록번호를<br />입력해주세요</h2>
              <p style={{ fontWeight: 500, fontSize: 14, color: "#888", marginBottom: 32 }}>번호 확인 후 가게 등록이 진행돼요.</p>
              <label style={{ fontWeight: 600, fontSize: 13, color: "#37383c", display: "block", marginBottom: 8 }}>사업자등록번호</label>
              <div style={{ display: "flex", gap: 10 }}>
                <input type="text" value={bizReg} onChange={e => { setBizReg(formatBizReg(e.target.value)); setBizVerified(false); setSuccess(""); }} placeholder="000-00-00000" readOnly={bizVerified} autoFocus
                  style={{ ...I, flex: 1, borderColor: bizVerified ? "#16a34a" : "#e0e0e4" }} />
                <button onClick={verifyBizReg} disabled={bizReg.replace(/\D/g,"").length < 10 || bizVerified || loading}
                  style={{ flexShrink: 0, height: 54, padding: "0 18px", border: "none", borderRadius: 14, background: bizVerified ? "#f0fdf4" : bizReg.replace(/\D/g,"").length >= 10 ? "var(--p)" : "#f1f1f3", color: bizVerified ? "#16a34a" : bizReg.replace(/\D/g,"").length >= 10 ? "#fff" : "#aaa", fontWeight: 700, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6 }}>
                  {loading ? <Spinner /> : bizVerified ? "✓ 확인됨" : "확인"}
                </button>
              </div>
              <SuccessBox msg={success} />
              <ErrorBox msg={error} />
              <PrimaryBtn onClick={() => go("store")} disabled={!bizVerified}>다음</PrimaryBtn>
            </div>
          )}

          {/* ── 6. 가게명 + 주소 ── */}
          {step === "store" && (
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, color: "var(--p)", marginBottom: 8 }}>가게 정보</p>
              <h2 style={{ fontWeight: 800, fontSize: 26, color: "#1a1a1a", lineHeight: 1.3, marginBottom: 32 }}>가게 정보를<br />입력해주세요</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ fontWeight: 600, fontSize: 13, color: "#37383c", display: "block", marginBottom: 8 }}>가게 이름</label>
                  <input type="text" value={storeName} onChange={e => setStoreName(e.target.value)} placeholder="예) 홍길동 카페" autoFocus style={I} />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: 13, color: "#37383c", display: "block", marginBottom: 8 }}>사업장 주소</label>
                  <button onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    new (window as any).daum.Postcode({
                      oncomplete(data: { roadAddress: string; jibunAddress: string }) {
                        setAddress(data.roadAddress || data.jibunAddress);
                      },
                    }).open();
                  }} style={{ ...I, cursor: "pointer", textAlign: "left", color: address ? "#1a1a1a" : "#bbb", display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.4"/></svg>
                    {address || "주소 검색하기"}
                  </button>
                </div>
              </div>
              <PrimaryBtn onClick={() => go("name")} disabled={storeName.trim().length < 1 || address.trim().length < 5}>다음</PrimaryBtn>
            </div>
          )}

          {/* ── 7. 대표자 이름 ── */}
          {step === "name" && (
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, color: "var(--p)", marginBottom: 8 }}>대표자 정보</p>
              <h2 style={{ fontWeight: 800, fontSize: 26, color: "#1a1a1a", lineHeight: 1.3, marginBottom: 8 }}>대표자 이름을<br />알려주세요</h2>
              <p style={{ fontWeight: 500, fontSize: 14, color: "#888", marginBottom: 32 }}>사장님 계정에 표시돼요.</p>
              <label style={{ fontWeight: 600, fontSize: 13, color: "#37383c", display: "block", marginBottom: 8 }}>이름</label>
              <input type="text" value={ownerName} onChange={e => setOwnerName(e.target.value)} placeholder="홍길동" autoFocus style={I} onKeyDown={e => e.key === "Enter" && ownerName.trim().length >= 2 && go("phone")} />
              <PrimaryBtn onClick={() => go("phone")} disabled={ownerName.trim().length < 2}>다음</PrimaryBtn>
            </div>
          )}

          {/* ── 8. 핸드폰 ── */}
          {step === "phone" && (
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, color: "var(--p)", marginBottom: 8 }}>본인 인증</p>
              <h2 style={{ fontWeight: 800, fontSize: 26, color: "#1a1a1a", lineHeight: 1.3, marginBottom: 8 }}>핸드폰 번호를<br />입력해주세요</h2>
              <p style={{ fontWeight: 500, fontSize: 14, color: "#888", marginBottom: 32 }}>직원들이 연락하는 번호예요.</p>
              <label style={{ fontWeight: 600, fontSize: 13, color: "#37383c", display: "block", marginBottom: 8 }}>핸드폰 번호</label>
              <input type="tel" value={phone} onChange={e => setPhone(formatPhone(e.target.value))} placeholder="010-0000-0000" autoFocus style={{ ...I, letterSpacing: "0.04em" }} onKeyDown={e => e.key === "Enter" && phone.replace(/\D/g,"").length >= 10 && sendSms()} />
              <ErrorBox msg={error} />
              <PrimaryBtn onClick={sendSms} disabled={phone.replace(/\D/g,"").length < 10} loading={loading}>인증번호 받기</PrimaryBtn>
            </div>
          )}

          {/* ── 9. SMS 인증 ── */}
          {step === "sms" && (
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, color: "var(--p)", marginBottom: 8 }}>본인 인증</p>
              <h2 style={{ fontWeight: 800, fontSize: 26, color: "#1a1a1a", lineHeight: 1.3, marginBottom: 8 }}>인증번호를<br />입력해주세요</h2>
              <p style={{ fontWeight: 500, fontSize: 14, color: "#888", marginBottom: 32 }}>
                <span style={{ color: "var(--p)", fontWeight: 700 }}>{phone}</span>으로 보냈어요.
              </p>
              <div style={{ position: "relative" }}>
                <div style={{ display: "flex", gap: 8 }}>
                  {smsCode.padEnd(6, " ").split("").map((ch, i) => {
                    const isActive = i === smsCode.length && smsCode.length < 6;
                    const has = i < smsCode.length;
                    return (
                      <div key={i} style={{ flex: 1, height: 58, borderRadius: 13, border: `2px solid ${isActive ? "var(--p)" : has ? "var(--p-border)" : "#e0e0e4"}`, background: has ? "var(--p-softer)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 22, color: "#1a1a1a", transition: "border-color 0.12s" }}>
                        {ch.trim() ? ch : ""}
                      </div>
                    );
                  })}
                </div>
                <input value={smsCode} onChange={e => setSmsCode(e.target.value.replace(/\D/g,"").slice(0,6))} inputMode="numeric" maxLength={6} autoFocus style={{ position: "absolute", inset: 0, opacity: 0, cursor: "text" }} />
              </div>
              <button onClick={sendSms} style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, color: "var(--p)" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
                재전송
              </button>
              <ErrorBox msg={error} />
              <PrimaryBtn onClick={verifySmsAndFinish} disabled={smsCode.length < 6} loading={loading}>
                {loading ? "처리 중..." : "가입 완료 →"}
              </PrimaryBtn>
            </div>
          )}

        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function CheckRow({ checked, onChange, label, link, bold }: {
  checked: boolean; onChange: (v: boolean) => void; label: string; link?: string; bold?: boolean;
}) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
      <div onClick={() => onChange(!checked)} style={{ width: 22, height: 22, borderRadius: 7, border: `2px solid ${checked ? "var(--p)" : "#d0d0d4"}`, background: checked ? "var(--p)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.12s" }}>
        {checked && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>}
      </div>
      <span style={{ fontWeight: bold ? 700 : 500, fontSize: bold ? 15 : 13, color: bold ? "#1a1a1a" : "#555", flex: 1 }} onClick={() => onChange(!checked)}>{label}</span>
      {link && <a href={link} onClick={e => e.stopPropagation()} style={{ fontWeight: 500, fontSize: 12, color: "#aaa", textDecoration: "underline", flexShrink: 0 }}>보기</a>}
    </label>
  );
}
