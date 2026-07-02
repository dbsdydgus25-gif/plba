"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type Step = "bizreg" | "bizinfo" | "address" | "name" | "phone" | "verify";

function OwnerSignupInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const googleId = searchParams.get("google_id") ?? "";
  const googleName = searchParams.get("google_name") ? decodeURIComponent(searchParams.get("google_name")!) : "";

  const [step, setStep] = useState<Step>("bizreg");
  const [businessType, setBusinessType] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [storeName, setStoreName] = useState("");
  const [bizReg, setBizReg] = useState("");
  const [bizVerified, setBizVerified] = useState(false);
  const [bizName, setBizName] = useState("");
  const [address, setAddress] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [bizError, setBizError] = useState("");
  const [bizLoading, setBizLoading] = useState(false);
  const [smsError, setSmsError] = useState("");
  const [smsLoading, setSmsLoading] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => { if (googleName) setOwnerName(googleName); }, [googleName]);

  const otpDigits = otp.padEnd(6, "").split("");

  function formatBizReg(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
  }

  function formatPhone(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }

  async function verifyBizReg() {
    setBizLoading(true);
    setBizError("");
    try {
      const res = await fetch("/api/biz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ b_no: bizReg }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error ?? "등록되지 않은 사업자번호예요.");
      if (data.b_stt && data.b_stt !== "계속사업자") throw new Error(`사업 상태: ${data.b_stt}`);
      setBizVerified(true);
      setBizName(data.tax_type ?? "사업자 확인 완료");
    } catch (e) {
      setBizError((e as Error).message);
    } finally {
      setBizLoading(false);
    }
  }

  async function sendOtp() {
    setSmsLoading(true);
    setSmsError("");
    try {
      const res = await fetch("/api/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, action: "send" }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error ?? "SMS 발송 실패");
      setOtpSent(true);
      setStep("verify");
    } catch (e) {
      setSmsError((e as Error).message);
    } finally {
      setSmsLoading(false);
    }
  }

  async function verifyOtp() {
    setSmsLoading(true);
    setSmsError("");
    setSaveError("");
    try {
      const res = await fetch("/api/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, action: "verify", code: otp }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error("인증번호가 올바르지 않아요.");

      // DB 저장: users (Google auth user ID = users.id)
      const insertData: Record<string, unknown> = { phone: phone.replace(/\D/g, ""), name: ownerName, role: "owner" };
      if (googleId) insertData.id = googleId;
      const { data: user, error: userErr } = await supabase
        .from("users")
        .upsert(insertData, { onConflict: "id" })
        .select("id")
        .single();
      if (userErr) throw new Error("계정 저장 실패: " + userErr.message);

      // DB 저장: stores (14일 무료체험 상태)
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const trialEndsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
      const { data: store, error: storeErr } = await supabase
        .from("stores")
        .insert({ name: storeName || ownerName + "의 가게", address, code, owner_id: user.id, business_type: businessType, employee_count: employeeCount, subscription_status: "trial", trial_ends_at: trialEndsAt })
        .select("id, name, code")
        .single();
      if (storeErr) throw new Error("가게 저장 실패: " + storeErr.message);

      localStorage.setItem("plba_uid", user.id);
      localStorage.setItem("plba_name", ownerName);
      localStorage.setItem("plba_store_id", store.id);
      localStorage.setItem("plba_store_name", store.name);
      localStorage.setItem("plba_store_code", store.code);

      // Creem 결제 등록 체크아웃으로 이동
      const checkoutRes = await fetch("/api/creem/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storeId: store.id, storeName: store.name, successUrl: `${window.location.origin}/owner?payment=success` }),
      });
      const checkoutData = await checkoutRes.json();
      if (checkoutData.checkoutUrl) {
        window.location.href = checkoutData.checkoutUrl;
      } else {
        router.push("/owner");
      }
    } catch (e) {
      const msg = (e as Error).message;
      if (msg.includes("인증번호")) setSmsError(msg);
      else setSaveError(msg);
    } finally {
      setSmsLoading(false);
    }
  }

  const progress = { bizreg: 1, bizinfo: 2, address: 3, name: 4, phone: 5, verify: 6 }[step];
  if (saveError) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", padding: 24, textAlign: "center", color: "red" }}>{saveError}</div>;
  const totalSteps = 6;

  const bizDigits = bizReg.replace(/\D/g, "").length;

  return (
    <div className="min-h-screen" style={{ background: "#fff" }}>
      {/* Desktop layout */}
      <div className="hidden md:flex min-h-screen">
        {/* Left panel */}
        <div style={{ width: 420, flexShrink: 0, background: "var(--p)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "64px 52px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
            <Image src="/plba-symbol.png" width={44} height={44} alt="plba" style={{ objectFit: "contain", filter: "brightness(10)" }} />
            <Image src="/plba-logo.png" width={72} height={26} alt="plba" style={{ objectFit: "contain", filter: "brightness(10)" }} />
          </div>
          <h2 style={{ fontWeight: 800, fontSize: 30, color: "#fff", lineHeight: 1.3 }}>
            사장님 계정<br />등록하기
          </h2>
          <p style={{ fontWeight: 500, fontSize: 15, color: "rgba(255,255,255,0.75)", marginTop: 16, lineHeight: 1.65 }}>
            사업자 정보를 입력하면<br />바로 직원 관리를 시작할 수 있어요.
          </p>

          {/* Step indicators */}
          <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { n: 1, label: "사업자등록번호 확인" },
              { n: 2, label: "사업장 주소 입력" },
              { n: 3, label: "대표자 이름" },
              { n: 4, label: "연락처 인증" },
            ].map(item => (
              <div key={item.n} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: progress > item.n ? "rgba(255,255,255,0.9)" : progress === item.n ? "#fff" : "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {progress > item.n ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--p)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <span style={{ fontWeight: 800, fontSize: 12, color: progress === item.n ? "var(--p)" : "rgba(255,255,255,0.6)" }}>{item.n}</span>
                  )}
                </div>
                <span style={{ fontWeight: progress === item.n ? 700 : 500, fontSize: 14, color: progress === item.n ? "#fff" : "rgba(255,255,255,0.6)" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px" }}>
          <div style={{ width: "100%", maxWidth: 480 }}>
            <FormContent
              step={step} setStep={setStep}
              bizReg={bizReg} setBizReg={v => setBizReg(formatBizReg(v))}
              bizVerified={bizVerified} bizName={bizName} verifyBizReg={verifyBizReg}
              bizError={bizError} bizLoading={bizLoading}
              businessType={businessType} setBusinessType={setBusinessType}
              employeeCount={employeeCount} setEmployeeCount={setEmployeeCount}
              storeName={storeName} setStoreName={setStoreName}
              address={address} setAddress={setAddress}
              ownerName={ownerName} setOwnerName={setOwnerName}
              phone={phone} setPhone={v => setPhone(formatPhone(v))}
              otp={otp} setOtp={setOtp} otpSent={otpSent} sendOtp={sendOtp} verifyOtp={verifyOtp}
              smsError={smsError} smsLoading={smsLoading}
              otpDigits={otpDigits}
              onComplete={() => {}}
              onBack={() => {
                const prev: Record<Step, Step | "login"> = { bizreg: "login", bizinfo: "bizreg", address: "bizinfo", name: "address", phone: "name", verify: "phone" };
                const p = prev[step];
                if (p === "login") router.push("/login");
                else setStep(p);
              }}
              bizDigits={bizDigits}
            />
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden min-h-screen flex-col" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 430, width: "100%", margin: "0 auto", minHeight: "100svh", display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <div style={{ padding: "16px 20px 0", display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => {
                const prev: Record<Step, Step | "login"> = { bizreg: "login", bizinfo: "bizreg", address: "bizinfo", name: "address", phone: "name", verify: "phone" };
                const p = prev[step];
                if (p === "login") router.push("/login");
                else setStep(p);
              }}
              style={{ width: 38, height: 38, border: "none", borderRadius: 11, background: "#f1f1f3", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#37383c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <div style={{ flex: 1, height: 4, background: "#f1f1f3", borderRadius: 9999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(progress / totalSteps) * 100}%`, background: "var(--p)", borderRadius: 9999, transition: "width 0.3s ease" }} />
            </div>
            <span style={{ fontWeight: 600, fontSize: 12, color: "var(--text-sub)", flexShrink: 0 }}>{progress}/{totalSteps}</span>
          </div>

          <div style={{ flex: 1, padding: "32px 24px 40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
              <Image src="/plba-symbol.png" width={28} height={28} alt="plba" style={{ objectFit: "contain" }} />
              <Image src="/plba-logo.png" width={44} height={16} alt="plba" style={{ objectFit: "contain" }} />
            </div>

            <FormContent
              step={step} setStep={setStep}
              bizReg={bizReg} setBizReg={v => setBizReg(formatBizReg(v))}
              bizVerified={bizVerified} bizName={bizName} verifyBizReg={verifyBizReg}
              bizError={bizError} bizLoading={bizLoading}
              businessType={businessType} setBusinessType={setBusinessType}
              employeeCount={employeeCount} setEmployeeCount={setEmployeeCount}
              storeName={storeName} setStoreName={setStoreName}
              address={address} setAddress={setAddress}
              ownerName={ownerName} setOwnerName={setOwnerName}
              phone={phone} setPhone={v => setPhone(formatPhone(v))}
              otp={otp} setOtp={setOtp} otpSent={otpSent} sendOtp={sendOtp} verifyOtp={verifyOtp}
              smsError={smsError} smsLoading={smsLoading}
              otpDigits={otpDigits}
              onComplete={() => {}}
              onBack={() => {}}
              bizDigits={bizDigits}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FormContent({
  step, setStep,
  bizReg, setBizReg, bizVerified, bizName, verifyBizReg, bizError, bizLoading,
  businessType, setBusinessType, employeeCount, setEmployeeCount,
  storeName, setStoreName,
  address, setAddress,
  ownerName, setOwnerName,
  phone, setPhone,
  otp, setOtp, otpSent, sendOtp, verifyOtp, smsError, smsLoading,
  otpDigits,
  onComplete, onBack, bizDigits,
}: {
  step: Step; setStep: (s: Step) => void;
  bizReg: string; setBizReg: (v: string) => void;
  bizVerified: boolean; bizName: string; verifyBizReg: () => void;
  bizError: string; bizLoading: boolean;
  businessType: string; setBusinessType: (v: string) => void;
  employeeCount: string; setEmployeeCount: (v: string) => void;
  storeName: string; setStoreName: (v: string) => void;
  address: string; setAddress: (v: string) => void;
  ownerName: string; setOwnerName: (v: string) => void;
  phone: string; setPhone: (v: string) => void;
  otp: string; setOtp: (v: string) => void;
  otpSent: boolean; sendOtp: () => void; verifyOtp: () => void;
  smsError: string; smsLoading: boolean;
  otpDigits: string[];
  onComplete: () => void; onBack: () => void;
  bizDigits: number;
}) {
  const inputStyle: React.CSSProperties = { width: "100%", height: 54, border: "1.5px solid var(--p-border)", borderRadius: 14, padding: "0 16px", fontSize: 16, fontFamily: "Pretendard", fontWeight: 600, color: "var(--text)", outline: "none", boxSizing: "border-box" };
  const btnPrimary = (disabled: boolean): React.CSSProperties => ({ marginTop: 20, width: "100%", height: 54, border: "none", borderRadius: 15, background: "var(--p)", color: "#fff", fontWeight: 800, fontSize: 16, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1, transition: "opacity 0.15s" });

  return (
    <>
      {/* STEP 1: 사업자등록번호 */}
      {step === "bizreg" && (
        <div style={{ animation: "fadeUp .25s ease" }}>
          <h2 style={{ fontWeight: 800, fontSize: 24, color: "var(--text)", lineHeight: 1.3 }}>
            사업자등록번호를<br />입력해주세요
          </h2>
          <p style={{ fontWeight: 500, fontSize: 14, color: "var(--text-sub)", marginTop: 8, lineHeight: 1.6 }}>
            번호 확인 후 가게 등록이 진행돼요.
          </p>

          <div style={{ marginTop: 32 }}>
            <label style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", display: "block", marginBottom: 8 }}>사업자등록번호</label>
            <div style={{ display: "flex", gap: 10 }}>
              <input
                type="text"
                value={bizReg}
                onChange={e => { setBizReg(e.target.value); }}
                placeholder="000-00-00000"
                autoFocus
                style={{ ...inputStyle, flex: 1, borderColor: bizVerified ? "var(--positive)" : "var(--p-border)" }}
                readOnly={bizVerified}
              />
              <button
                onClick={verifyBizReg}
                disabled={bizDigits < 10 || bizVerified || bizLoading}
                style={{ flexShrink: 0, height: 54, padding: "0 18px", border: "none", borderRadius: 14, background: bizVerified ? "var(--positive-bg)" : bizDigits >= 10 ? "var(--p)" : "#f1f1f3", color: bizVerified ? "var(--positive)" : bizDigits >= 10 ? "#fff" : "var(--text-sub)", fontWeight: 700, fontSize: 14, cursor: bizDigits < 10 || bizVerified ? "default" : "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6 }}
              >
                {bizLoading && <div style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.5)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />}
                {bizVerified ? "✓ 확인됨" : "확인"}
              </button>
            </div>
            {bizVerified && (
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", background: "var(--positive-bg)", borderRadius: 12 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--positive)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                <span style={{ fontWeight: 600, fontSize: 13, color: "var(--positive)" }}>사업자가 확인되었습니다!</span>
              </div>
            )}
            {bizError && (
              <div style={{ marginTop: 10, padding: "10px 14px", background: "var(--negative-bg)", borderRadius: 12, fontWeight: 600, fontSize: 13, color: "var(--negative)" }}>사업자 번호를 다시 확인해주세요</div>
            )}
          </div>

          <button
            onClick={() => setStep("bizinfo")}
            disabled={!bizVerified}
            style={btnPrimary(!bizVerified)}
          >
            다음
          </button>
        </div>
      )}

      {/* STEP 2: 업종 & 직원수 */}
      {step === "bizinfo" && (
        <div style={{ animation: "fadeUp .25s ease" }}>
          <h2 style={{ fontWeight: 800, fontSize: 24, color: "var(--text)", lineHeight: 1.3 }}>
            사업장 업종을<br />선택해주세요
          </h2>
          <p style={{ fontWeight: 500, fontSize: 14, color: "var(--text-sub)", marginTop: 8 }}>
            알바생에게 맞는 서비스를 제공하는 데 활용돼요.
          </p>

          <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { value: "카페", icon: "☕" },
              { value: "식당", icon: "🍽️" },
              { value: "편의점", icon: "🏪" },
              { value: "마트/슈퍼", icon: "🛒" },
              { value: "베이커리", icon: "🥐" },
              { value: "기타", icon: "📦" },
            ].map(({ value, icon }) => (
              <button
                key={value}
                onClick={() => setBusinessType(value)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", border: `2px solid ${businessType === value ? "var(--p)" : "rgba(112,115,124,0.2)"}`, borderRadius: 14, background: businessType === value ? "var(--p-softer)" : "#fff", cursor: "pointer", fontWeight: 700, fontSize: 15, color: businessType === value ? "var(--p-tint)" : "var(--text)", transition: "all 0.12s" }}
              >
                <span style={{ fontSize: 20 }}>{icon}</span>
                {value}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: "var(--text)", marginBottom: 12 }}>현재 직원 수는요?</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["1~3명", "4~9명", "10~19명", "20명 이상"].map(v => (
                <button
                  key={v}
                  onClick={() => setEmployeeCount(v)}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", border: `2px solid ${employeeCount === v ? "var(--p)" : "rgba(112,115,124,0.2)"}`, borderRadius: 14, background: employeeCount === v ? "var(--p-softer)" : "#fff", cursor: "pointer", fontWeight: 700, fontSize: 14, color: employeeCount === v ? "var(--p-tint)" : "var(--text)", textAlign: "left", transition: "all 0.12s" }}
                >
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${employeeCount === v ? "var(--p)" : "rgba(112,115,124,0.35)"}`, background: employeeCount === v ? "var(--p)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {employeeCount === v && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
                  </div>
                  {v}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep("address")}
            disabled={!businessType || !employeeCount}
            style={{ ...btnPrimary(!businessType || !employeeCount), marginTop: 28 }}
          >
            다음
          </button>
        </div>
      )}

      {/* STEP 3: 사업장 주소 */}
      {step === "address" && (
        <div style={{ animation: "fadeUp .25s ease" }}>
          <h2 style={{ fontWeight: 800, fontSize: 24, color: "var(--text)", lineHeight: 1.3 }}>
            가게 정보를<br />입력해주세요
          </h2>
          <p style={{ fontWeight: 500, fontSize: 14, color: "var(--text-sub)", marginTop: 8 }}>
            알바생 앱에서 표시되는 가게 이름이에요.
          </p>

          <div style={{ marginTop: 32 }}>
            <label style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", display: "block", marginBottom: 8 }}>가게 이름</label>
            <input
              type="text"
              value={storeName}
              onChange={e => setStoreName(e.target.value)}
              placeholder="예) 홍길동 카페"
              autoFocus
              style={inputStyle}
            />
          </div>

          <div style={{ marginTop: 20 }}>
            <label style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", display: "block", marginBottom: 8 }}>사업장 주소</label>
            <button
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                new (window as any).daum.Postcode({
                  oncomplete(data: { roadAddress: string; jibunAddress: string }) {
                    setAddress(data.roadAddress || data.jibunAddress);
                  },
                }).open();
              }}
              style={{ ...inputStyle, cursor: "pointer", textAlign: "left", color: address ? "var(--text)" : "rgba(112,115,124,0.5)", display: "flex", alignItems: "center", gap: 10 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.4"/></svg>
              {address || "주소 검색하기"}
            </button>
            {address && (
              <input
                type="text"
                placeholder="상세주소 (동/호수 등)"
                style={{ ...inputStyle, marginTop: 10 }}
                onChange={e => setAddress(address.split(" — ")[0] + (e.target.value ? ` — ${e.target.value}` : ""))}
              />
            )}
          </div>

          <button onClick={() => setStep("name")} disabled={storeName.trim().length < 1 || address.trim().length < 5} style={btnPrimary(storeName.trim().length < 1 || address.trim().length < 5)}>
            다음
          </button>
        </div>
      )}

      {/* STEP 3: 이름 */}
      {step === "name" && (
        <div style={{ animation: "fadeUp .25s ease" }}>
          <h2 style={{ fontWeight: 800, fontSize: 24, color: "var(--text)", lineHeight: 1.3 }}>
            대표자 이름을<br />알려주세요
          </h2>
          <p style={{ fontWeight: 500, fontSize: 14, color: "var(--text-sub)", marginTop: 8 }}>
            사장님 계정에 표시돼요.
          </p>

          <div style={{ marginTop: 32 }}>
            <label style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", display: "block", marginBottom: 8 }}>이름</label>
            <input
              type="text"
              value={ownerName}
              onChange={e => setOwnerName(e.target.value)}
              placeholder="홍길동"
              autoFocus
              style={inputStyle}
            />
          </div>

          <button onClick={() => setStep("phone")} disabled={ownerName.trim().length < 2} style={btnPrimary(ownerName.trim().length < 2)}>
            다음
          </button>
        </div>
      )}

      {/* STEP 4: 연락처 */}
      {step === "phone" && (
        <div style={{ animation: "fadeUp .25s ease" }}>
          <h2 style={{ fontWeight: 800, fontSize: 24, color: "var(--text)", lineHeight: 1.3 }}>
            연락처 인증을<br />해주세요
          </h2>
          <p style={{ fontWeight: 500, fontSize: 14, color: "var(--text-sub)", marginTop: 8 }}>
            직원들이 긴급 상황 시 연락하는 번호예요.
          </p>

          <div style={{ marginTop: 32 }}>
            <label style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", display: "block", marginBottom: 8 }}>핸드폰 번호</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="010-0000-0000"
              autoFocus
              style={{ ...inputStyle, letterSpacing: "0.05em" }}
            />
          </div>

          {smsError && (
            <div style={{ marginTop: 10, padding: "10px 14px", background: "var(--negative-bg)", borderRadius: 12, fontWeight: 600, fontSize: 13, color: "var(--negative)" }}>{smsError}</div>
          )}
          <button onClick={sendOtp} disabled={phone.replace(/\D/g, "").length < 10 || smsLoading} style={{ ...btnPrimary(phone.replace(/\D/g, "").length < 10), display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {smsLoading && <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.5)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />}
            인증번호 받기
          </button>
        </div>
      )}

      {/* STEP 5: OTP */}
      {step === "verify" && (
        <div style={{ animation: "fadeUp .25s ease" }}>
          <h2 style={{ fontWeight: 800, fontSize: 24, color: "var(--text)", lineHeight: 1.3 }}>
            인증번호를<br />입력해주세요
          </h2>
          <p style={{ fontWeight: 500, fontSize: 14, color: "var(--text-sub)", marginTop: 8 }}>
            <span style={{ color: "var(--p)", fontWeight: 700 }}>{phone}</span>으로 보냈어요.
          </p>

          <div style={{ position: "relative", marginTop: 32 }}>
            <div style={{ display: "flex", gap: 9 }}>
              {otp.padEnd(6, " ").split("").map((ch, i) => {
                const isActive = i === otp.length && otp.length < 6;
                const hasCh = i < otp.length;
                return (
                  <div key={i} style={{ flex: 1, height: 58, borderRadius: 13, border: `2px solid ${isActive ? "var(--p)" : hasCh ? "var(--p-border)" : "rgba(112,115,124,0.22)"}`, background: hasCh ? "var(--p-softer)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 24, color: "var(--text)", transition: "border-color 0.12s" }}>
                    {ch !== " " ? ch : ""}
                  </div>
                );
              })}
            </div>
            <input value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" maxLength={6} autoFocus
              style={{ position: "absolute", inset: 0, opacity: 0, cursor: "text", fontSize: 16 }} />
          </div>

          <button onClick={sendOtp} style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, color: "var(--p)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4v6h6M23 20v-6h-6" /><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" /></svg>
            인증번호 재전송
          </button>

          {smsError && (
            <div style={{ marginTop: 10, padding: "10px 14px", background: "var(--negative-bg)", borderRadius: 12, fontWeight: 600, fontSize: 13, color: "var(--negative)" }}>{smsError}</div>
          )}

          <button onClick={verifyOtp} disabled={otp.length < 6 || smsLoading} style={{ ...btnPrimary(otp.length < 6), display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {smsLoading && <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.5)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />}
            가입 완료 →
          </button>
        </div>
      )}
    </>
  );
}

export default function OwnerSignupPage() {
  return (
    <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>로딩 중...</div>}>
      <OwnerSignupInner />
    </Suspense>
  );
}
