"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type Step =
  | "signup"    // 이메일 + 비번 + 약관
  | "waiting"   // 이메일 링크 확인 대기
  | "bizinfo"   // 업종 + 직원수  (링크 클릭 후)
  | "bizreg"    // 사업자등록번호
  | "store"     // 가게명 + 주소
  | "name"      // 대표자 이름
  | "phone"     // 핸드폰
  | "sms"       // SMS 인증
  | "done";

const POST_LINK_STEPS: Step[] = ["bizinfo","bizreg","store","name","phone","sms"];
const TOTAL_POST = POST_LINK_STEPS.length;

const I: React.CSSProperties = {
  width: "100%", height: 54, border: "1.5px solid #e0e0e4", borderRadius: 14,
  padding: "0 16px", fontSize: 16, fontFamily: "Pretendard", fontWeight: 500,
  color: "#1a1a1a", outline: "none", boxSizing: "border-box", background: "#fff",
};

function Btn({ children, onClick, disabled, loading, secondary }: {
  children: React.ReactNode; onClick: () => void; disabled?: boolean; loading?: boolean; secondary?: boolean;
}) {
  return (
    <button onClick={onClick} disabled={disabled || loading}
      style={{ marginTop: 20, width: "100%", height: 54, border: secondary ? "2px solid var(--p)" : "none", borderRadius: 14, background: secondary ? "#fff" : "var(--p)", color: secondary ? "var(--p)" : "#fff", fontWeight: 800, fontSize: 16, cursor: disabled || loading ? "not-allowed" : "pointer", opacity: disabled || loading ? 0.4 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "opacity 0.15s" }}>
      {loading && <Spin />}
      {children}
    </button>
  );
}
function Spin() {
  return <div style={{ width: 16, height: 16, border: "2.5px solid rgba(255,255,255,0.35)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin .7s linear infinite" }} />;
}
function Err({ msg }: { msg: string }) {
  if (!msg) return null;
  return <div style={{ marginTop: 12, padding: "11px 14px", background: "#fff1f0", borderRadius: 11, fontWeight: 600, fontSize: 13, color: "#d32f2f" }}>{msg}</div>;
}
function Ok({ msg }: { msg: string }) {
  if (!msg) return null;
  return <div style={{ marginTop: 12, padding: "11px 14px", background: "#f0fdf4", borderRadius: 11, fontWeight: 600, fontSize: 13, color: "#16a34a", display: "flex", alignItems: "center", gap: 7 }}>
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>{msg}
  </div>;
}
function PwStrength({ pw }: { pw: string }) {
  const c = [
    { l: "8자 이상", ok: pw.length >= 8 },
    { l: "대문자 포함", ok: /[A-Z]/.test(pw) },
    { l: "숫자 포함", ok: /[0-9]/.test(pw) },
    { l: "특수문자 포함", ok: /[!@#$%^&*(),.?":{}|<>]/.test(pw) },
  ];
  return (
    <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: "5px 12px" }}>
      {c.map(x => <span key={x.l} style={{ fontWeight: 600, fontSize: 12, color: x.ok ? "#16a34a" : "#bbb", display: "flex", alignItems: "center", gap: 4 }}><span style={{ fontSize: 13 }}>{x.ok ? "✓" : "○"}</span>{x.l}</span>)}
    </div>
  );
}
function isStrong(pw: string) {
  return pw.length >= 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw) && /[!@#$%^&*(),.?":{}|<>]/.test(pw);
}
function CheckRow({ checked, onChange, label, link, bold }: { checked: boolean; onChange: (v: boolean) => void; label: string; link?: string; bold?: boolean }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
      <div onClick={() => onChange(!checked)} style={{ width: 22, height: 22, borderRadius: 7, border: `2px solid ${checked ? "var(--p)" : "#d0d0d4"}`, background: checked ? "var(--p)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .12s" }}>
        {checked && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>}
      </div>
      <span style={{ fontWeight: bold ? 700 : 500, fontSize: bold ? 15 : 13, color: bold ? "#1a1a1a" : "#555", flex: 1 }} onClick={() => onChange(!checked)}>{label}</span>
      {link && <a href={link} onClick={e => e.stopPropagation()} style={{ fontWeight: 500, fontSize: 12, color: "#aaa", textDecoration: "underline", flexShrink: 0 }}>보기</a>}
    </label>
  );
}

function formatPhone(v: string) {
  const d = v.replace(/\D/g,"").slice(0,11);
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0,3)}-${d.slice(3)}`;
  return `${d.slice(0,3)}-${d.slice(3,7)}-${d.slice(7)}`;
}
function formatBizReg(v: string) {
  const d = v.replace(/\D/g,"").slice(0,10);
  if (d.length <= 3) return d;
  if (d.length <= 5) return `${d.slice(0,3)}-${d.slice(3)}`;
  return `${d.slice(0,3)}-${d.slice(3,5)}-${d.slice(5)}`;
}

function OwnerAuthInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlStep = searchParams.get("step") as Step | null;

  const [step, setStep] = useState<Step>(urlStep && POST_LINK_STEPS.includes(urlStep) ? urlStep : "signup");

  // signup fields
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwC, setPwC] = useState("");
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  // post-link fields
  const [bizType, setBizType] = useState("");
  const [empCount, setEmpCount] = useState("");
  const [bizReg, setBizReg] = useState("");
  const [bizVerified, setBizVerified] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [smsCode, setSmsCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  // Daum 주소 스크립트
  useEffect(() => {
    if (step === "store") {
      if (!(window as unknown as Record<string, unknown>).daum) {
        const s = document.createElement("script");
        s.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        s.async = true;
        document.head.appendChild(s);
      }
    }
  }, [step]);

  function go(s: Step) { setErr(""); setOk(""); setStep(s); }

  function back() {
    const order: Step[] = ["signup","bizinfo","bizreg","store","name","phone","sms"];
    const i = order.indexOf(step);
    if (i <= 0) router.push("/login");
    else go(order[i - 1]);
  }

  // ── 회원가입 → 이메일 링크 발송 ──
  async function doSignup() {
    if (!isStrong(pw)) { setErr("비밀번호 조건을 모두 충족해야 해요."); return; }
    if (pw !== pwC) { setErr("비밀번호가 일치하지 않아요."); return; }
    if (!terms || !privacy) { setErr("필수 약관에 동의해주세요."); return; }
    setErr(""); setLoading(true);
    try {
      const { error: e } = await supabase.auth.signUp({
        email, password: pw,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback?role=owner` },
      });
      if (e) {
        if (e.message.includes("already registered") || e.message.includes("User already registered")) {
          setErr("이미 가입된 이메일이에요. 로그인 페이지에서 로그인해주세요.");
        } else {
          throw e;
        }
        return;
      }
      go("waiting");
    } catch (e) {
      setErr((e as { message?: string }).message ?? "가입 중 오류가 발생했어요.");
    } finally { setLoading(false); }
  }

  // ── 사업자번호 확인 ──
  async function verifyBiz() {
    setErr(""); setOk(""); setLoading(true);
    try {
      const res = await fetch("/api/biz", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ b_no: bizReg }) });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error ?? "등록되지 않은 사업자번호예요.");
      setBizVerified(true);
      setOk("사업자가 확인되었습니다!");
    } catch (e) { setErr((e as Error).message); }
    finally { setLoading(false); }
  }

  // ── SMS 발송 ──
  async function sendSms() {
    setErr(""); setLoading(true);
    try {
      const res = await fetch("/api/sms", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone, action: "send" }) });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error ?? "SMS 발송 실패");
      go("sms");
    } catch (e) { setErr((e as Error).message); }
    finally { setLoading(false); }
  }

  // ── SMS 인증 + DB 저장 + Creem ──
  async function finish() {
    setErr(""); setLoading(true);
    try {
      const smsRes = await fetch("/api/sms", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone, action: "verify", code: smsCode }) });
      if (!(await smsRes.json()).ok) throw new Error("인증번호가 올바르지 않아요.");

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("로그인 세션이 없어요. 처음부터 다시 시도해주세요.");

      const { error: uErr } = await supabase.from("users").insert({ id: user.id, email: user.email, phone: phone.replace(/\D/g,""), name: ownerName, role: "owner" });
      if (uErr && !uErr.message.includes("duplicate")) throw new Error("계정 저장 실패: " + uErr.message);

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const trialEndsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
      const { data: store, error: sErr } = await supabase.from("stores").insert({
        name: storeName || ownerName + "의 가게", address, code, owner_id: user.id,
        business_type: bizType, employee_count: empCount, subscription_status: "trial", trial_ends_at: trialEndsAt,
      }).select("id, name, code").single();
      if (sErr) throw new Error("가게 저장 실패: " + sErr.message);

      localStorage.setItem("plba_uid", user.id);
      localStorage.setItem("plba_name", ownerName);
      localStorage.setItem("plba_store_id", store.id);
      localStorage.setItem("plba_store_name", store.name);
      localStorage.setItem("plba_store_code", store.code);
      localStorage.setItem("plba_role", "owner");
      go("done");

      const checkout = await fetch("/api/creem/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ storeId: store.id, storeName: store.name, successUrl: `${window.location.origin}/owner?payment=success` }) });
      const cd = await checkout.json();
      window.location.href = cd.checkoutUrl ?? "/owner";
    } catch (e) { setErr((e as Error).message); setLoading(false); }
  }

  // 진행바 (post-link 단계에서만)
  const postIdx = POST_LINK_STEPS.indexOf(step);
  const pct = postIdx >= 0 ? ((postIdx + 1) / TOTAL_POST) * 100 : 0;

  if (step === "done") return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", flexDirection: "column", gap: 16 }}>
      <Spin />
      <p style={{ fontWeight: 600, fontSize: 15, color: "#555" }}>결제 페이지로 이동 중...</p>
    </div>
  );

  if (step === "waiting") return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", padding: 24 }}>
      <div style={{ maxWidth: 420, width: "100%", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#f0edfe", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6B4DF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        </div>
        <h2 style={{ fontWeight: 800, fontSize: 22, color: "#1a1a1a", marginBottom: 12 }}>이메일을 확인해주세요</h2>
        <p style={{ fontWeight: 500, fontSize: 15, color: "#555", lineHeight: 1.65, marginBottom: 6 }}>
          <span style={{ color: "#6B4DF6", fontWeight: 700 }}>{email}</span>로<br />인증 링크를 보냈어요.
        </p>
        <p style={{ fontWeight: 500, fontSize: 13, color: "#aaa", lineHeight: 1.6, marginBottom: 32 }}>
          링크를 클릭하면 다음 단계로 바로 이동해요.<br />스팸 폴더도 확인해보세요.
        </p>
        <button onClick={doSignup} disabled={loading}
          style={{ width: "100%", height: 50, border: "1.5px solid #e0e0e4", borderRadius: 13, background: "#fff", color: "#555", fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {loading && <Spin />} 인증 메일 재전송
        </button>
        <button onClick={() => router.push("/login")} style={{ marginTop: 12, background: "none", border: "none", cursor: "pointer", fontWeight: 500, fontSize: 13, color: "#aaa" }}>
          로그인 화면으로 돌아가기
        </button>
      </div>
    </div>
  );

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

        {/* 진행바 (post-link 단계) */}
        {postIdx >= 0 && (
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: 1, height: 4, background: "#f1f1f3", borderRadius: 9999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: "var(--p)", borderRadius: 9999, transition: "width .3s ease" }} />
            </div>
            <span style={{ fontWeight: 600, fontSize: 12, color: "var(--text-sub)", flexShrink: 0 }}>{postIdx + 1}/{TOTAL_POST}</span>
          </div>
        )}

        <div style={{ flex: 1, paddingTop: 36, paddingBottom: 40 }}>

          {/* ── 회원가입 ── */}
          {step === "signup" && (
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, color: "var(--p)", marginBottom: 8 }}>사업자 회원가입</p>
              <h2 style={{ fontWeight: 800, fontSize: 26, color: "#1a1a1a", lineHeight: 1.3, marginBottom: 32 }}>계정을 만들어주세요</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontWeight: 600, fontSize: 13, color: "#37383c", display: "block", marginBottom: 7 }}>이메일</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" style={I} autoComplete="email" autoFocus />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: 13, color: "#37383c", display: "block", marginBottom: 7 }}>비밀번호</label>
                  <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="비밀번호" style={I} autoComplete="new-password" />
                  <PwStrength pw={pw} />
                </div>
                <div>
                  <label style={{ fontWeight: 600, fontSize: 13, color: "#37383c", display: "block", marginBottom: 7 }}>비밀번호 확인</label>
                  <input type="password" value={pwC} onChange={e => setPwC(e.target.value)} placeholder="비밀번호 재입력" style={{ ...I, borderColor: pwC && pwC !== pw ? "#d32f2f" : "#e0e0e4" }} autoComplete="new-password" />
                  {pwC && pwC !== pw && <p style={{ marginTop: 6, fontSize: 12, fontWeight: 600, color: "#d32f2f" }}>비밀번호가 일치하지 않아요</p>}
                </div>
              </div>
              <div style={{ marginTop: 20, padding: "16px", background: "#f7f7f9", borderRadius: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                <CheckRow checked={terms && privacy} onChange={v => { setTerms(v); setPrivacy(v); }} label="전체 동의" bold />
                <div style={{ height: 1, background: "#e8e8ea" }} />
                <CheckRow checked={terms} onChange={setTerms} label="[필수] 서비스 이용약관" link="#" />
                <CheckRow checked={privacy} onChange={setPrivacy} label="[필수] 개인정보 처리방침" link="#" />
              </div>
              <Err msg={err} />
              <Btn onClick={doSignup} disabled={!email.includes("@") || !isStrong(pw) || pw !== pwC || !terms || !privacy} loading={loading}>가입하고 인증 메일 받기</Btn>
            </div>
          )}

          {/* ── 업종 + 직원수 ── */}
          {step === "bizinfo" && (
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, color: "var(--p)", marginBottom: 8 }}>사업장 정보</p>
              <h2 style={{ fontWeight: 800, fontSize: 26, color: "#1a1a1a", lineHeight: 1.3, marginBottom: 8 }}>업종을 선택해주세요</h2>
              <p style={{ fontWeight: 500, fontSize: 14, color: "#888", marginBottom: 24 }}>서비스 최적화에 활용돼요.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["카페","☕"],["식당","🍽️"],["편의점","🏪"],["마트/슈퍼","🛒"],["베이커리","🥐"],["기타","📦"]].map(([v,i]) => (
                  <button key={v} onClick={() => setBizType(v)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", border: `2px solid ${bizType === v ? "var(--p)" : "#e8e8ea"}`, borderRadius: 14, background: bizType === v ? "var(--p-softer)" : "#fff", cursor: "pointer", fontWeight: 700, fontSize: 15, color: bizType === v ? "var(--p-tint)" : "#1a1a1a", transition: "all .12s" }}>
                    <span style={{ fontSize: 20 }}>{i}</span>{v}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 24 }}>
                <p style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a", marginBottom: 12 }}>현재 직원 수</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {["1~3명","4~9명","10~19명","20명 이상"].map(v => (
                    <button key={v} onClick={() => setEmpCount(v)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", border: `2px solid ${empCount === v ? "var(--p)" : "#e8e8ea"}`, borderRadius: 14, background: empCount === v ? "var(--p-softer)" : "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14, color: empCount === v ? "var(--p-tint)" : "#1a1a1a", textAlign: "left" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${empCount === v ? "var(--p)" : "#ccc"}`, background: empCount === v ? "var(--p)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {empCount === v && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff" }} />}
                      </div>
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <Btn onClick={() => go("bizreg")} disabled={!bizType || !empCount}>다음</Btn>
            </div>
          )}

          {/* ── 사업자번호 ── */}
          {step === "bizreg" && (
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, color: "var(--p)", marginBottom: 8 }}>사업자 인증</p>
              <h2 style={{ fontWeight: 800, fontSize: 26, color: "#1a1a1a", lineHeight: 1.3, marginBottom: 8 }}>사업자등록번호를<br />입력해주세요</h2>
              <p style={{ fontWeight: 500, fontSize: 14, color: "#888", marginBottom: 28 }}>번호 확인 후 가게 등록이 진행돼요.</p>
              <label style={{ fontWeight: 600, fontSize: 13, color: "#37383c", display: "block", marginBottom: 8 }}>사업자등록번호</label>
              <div style={{ display: "flex", gap: 10 }}>
                <input type="text" value={bizReg} onChange={e => { setBizReg(formatBizReg(e.target.value)); setBizVerified(false); setOk(""); }} placeholder="000-00-00000" readOnly={bizVerified} autoFocus
                  style={{ ...I, flex: 1, borderColor: bizVerified ? "#16a34a" : "#e0e0e4" }} />
                <button onClick={verifyBiz} disabled={bizReg.replace(/\D/g,"").length < 10 || bizVerified || loading}
                  style={{ flexShrink: 0, height: 54, padding: "0 18px", border: "none", borderRadius: 14, background: bizVerified ? "#f0fdf4" : bizReg.replace(/\D/g,"").length >= 10 ? "var(--p)" : "#f1f1f3", color: bizVerified ? "#16a34a" : bizReg.replace(/\D/g,"").length >= 10 ? "#fff" : "#aaa", fontWeight: 700, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6 }}>
                  {loading ? <div style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin .7s linear infinite" }} /> : bizVerified ? "✓ 확인됨" : "확인"}
                </button>
              </div>
              <Ok msg={ok} /><Err msg={err} />
              <Btn onClick={() => go("store")} disabled={!bizVerified}>다음</Btn>
            </div>
          )}

          {/* ── 가게명 + 주소 ── */}
          {step === "store" && (
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, color: "var(--p)", marginBottom: 8 }}>가게 정보</p>
              <h2 style={{ fontWeight: 800, fontSize: 26, color: "#1a1a1a", lineHeight: 1.3, marginBottom: 28 }}>가게 정보를<br />입력해주세요</h2>
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
                      oncomplete(data: { roadAddress: string; jibunAddress: string }) { setAddress(data.roadAddress || data.jibunAddress); },
                    }).open();
                  }} style={{ ...I, cursor: "pointer", textAlign: "left", color: address ? "#1a1a1a" : "#bbb", display: "flex", alignItems: "center", gap: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.4"/></svg>
                    {address || "주소 검색하기"}
                  </button>
                </div>
              </div>
              <Btn onClick={() => go("name")} disabled={storeName.trim().length < 1 || address.trim().length < 5}>다음</Btn>
            </div>
          )}

          {/* ── 대표자 이름 ── */}
          {step === "name" && (
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, color: "var(--p)", marginBottom: 8 }}>대표자 정보</p>
              <h2 style={{ fontWeight: 800, fontSize: 26, color: "#1a1a1a", lineHeight: 1.3, marginBottom: 8 }}>이름을 알려주세요</h2>
              <p style={{ fontWeight: 500, fontSize: 14, color: "#888", marginBottom: 28 }}>사장님 계정에 표시돼요.</p>
              <label style={{ fontWeight: 600, fontSize: 13, color: "#37383c", display: "block", marginBottom: 8 }}>이름</label>
              <input type="text" value={ownerName} onChange={e => setOwnerName(e.target.value)} placeholder="홍길동" autoFocus style={I} onKeyDown={e => e.key === "Enter" && ownerName.trim().length >= 2 && go("phone")} />
              <Btn onClick={() => go("phone")} disabled={ownerName.trim().length < 2}>다음</Btn>
            </div>
          )}

          {/* ── 핸드폰 ── */}
          {step === "phone" && (
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, color: "var(--p)", marginBottom: 8 }}>본인 인증</p>
              <h2 style={{ fontWeight: 800, fontSize: 26, color: "#1a1a1a", lineHeight: 1.3, marginBottom: 8 }}>핸드폰 번호를<br />입력해주세요</h2>
              <p style={{ fontWeight: 500, fontSize: 14, color: "#888", marginBottom: 28 }}>직원들이 연락하는 번호예요.</p>
              <label style={{ fontWeight: 600, fontSize: 13, color: "#37383c", display: "block", marginBottom: 8 }}>핸드폰 번호</label>
              <input type="tel" value={phone} onChange={e => setPhone(formatPhone(e.target.value))} placeholder="010-0000-0000" autoFocus style={{ ...I, letterSpacing: "0.04em" }} />
              <Err msg={err} />
              <Btn onClick={sendSms} disabled={phone.replace(/\D/g,"").length < 10} loading={loading}>인증번호 받기</Btn>
            </div>
          )}

          {/* ── SMS 인증 ── */}
          {step === "sms" && (
            <div>
              <p style={{ fontWeight: 700, fontSize: 13, color: "var(--p)", marginBottom: 8 }}>본인 인증</p>
              <h2 style={{ fontWeight: 800, fontSize: 26, color: "#1a1a1a", lineHeight: 1.3, marginBottom: 8 }}>인증번호를<br />입력해주세요</h2>
              <p style={{ fontWeight: 500, fontSize: 14, color: "#888", marginBottom: 28 }}>
                <span style={{ color: "var(--p)", fontWeight: 700 }}>{phone}</span>으로 보냈어요.
              </p>
              <div style={{ position: "relative" }}>
                <div style={{ display: "flex", gap: 8 }}>
                  {smsCode.padEnd(6, " ").split("").map((ch, i) => {
                    const active = i === smsCode.length && smsCode.length < 6;
                    const has = i < smsCode.length;
                    return <div key={i} style={{ flex: 1, height: 58, borderRadius: 13, border: `2px solid ${active ? "var(--p)" : has ? "var(--p-border)" : "#e0e0e4"}`, background: has ? "var(--p-softer)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 22, color: "#1a1a1a" }}>{ch.trim() || ""}</div>;
                  })}
                </div>
                <input value={smsCode} onChange={e => setSmsCode(e.target.value.replace(/\D/g,"").slice(0,6))} inputMode="numeric" maxLength={6} autoFocus style={{ position: "absolute", inset: 0, opacity: 0, cursor: "text" }} />
              </div>
              <button onClick={sendSms} style={{ marginTop: 14, background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, color: "var(--p)", display: "inline-flex", alignItems: "center", gap: 6 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
                재전송
              </button>
              <Err msg={err} />
              <Btn onClick={finish} disabled={smsCode.length < 6} loading={loading}>가입 완료 →</Btn>
            </div>
          )}

        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function OwnerAuthPage() {
  return (
    <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}><div style={{ width: 28, height: 28, border: "3px solid #6B4DF6", borderTopColor: "transparent", borderRadius: "50%", animation: "spin .8s linear infinite" }} /><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>}>
      <OwnerAuthInner />
    </Suspense>
  );
}
