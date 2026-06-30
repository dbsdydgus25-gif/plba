"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type Step = "phone" | "verify" | "name" | "birth" | "startdate" | "storecode";

function JoinInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const kakaoId = searchParams.get("kakao_id") ?? "";
  const kakaoName = searchParams.get("kakao_name") ? decodeURIComponent(searchParams.get("kakao_name")!) : "";

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");

  // 카카오로 온 경우 이름 자동 입력
  useEffect(() => {
    if (kakaoName) setName(kakaoName);
  }, [kakaoName]);
  const [startDate, setStartDate] = useState("");
  const [storeCode, setStoreCode] = useState("");
  const [storeVerified, setStoreVerified] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [storeId, setStoreId] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const otpRef = useRef<HTMLInputElement>(null);
  const storeInputRef = useRef<HTMLInputElement>(null);

  const otpDigits = otp.padEnd(6, " ").split("");
  const storeDigits = storeCode.padEnd(6, " ").split("");

  function formatPhone(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(e.target.value));
  }

  async function sendOtp() {
    if (phone.replace(/\D/g, "").length < 10) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, action: "send" }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error ?? "SMS 발송 실패");
      setStep("verify");
      setTimeout(() => otpRef.current?.focus(), 100);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  async function verifyOtp() {
    if (otp.length < 6) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, action: "verify", code: otp }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error("인증번호가 올바르지 않아요.");
      setStep("name");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleOtpInput(e: React.ChangeEvent<HTMLInputElement>) {
    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
  }

  async function handleStoreCodeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
    setStoreCode(val);
    setStoreVerified(false);
    setStoreName("");
    setStoreId("");
    setError("");

    if (val.length === 6) {
      // DB에서 가게 코드 조회
      const { data } = await supabase
        .from("stores")
        .select("id, name, address")
        .eq("code", val)
        .single();

      if (data) {
        setStoreVerified(true);
        setStoreName(data.name);
        setStoreId(data.id);
        setStoreAddress(data.address ?? "");
      }
    }
  }

  async function handleJoin() {
    if (!storeVerified || !storeId) return;
    setSubmitting(true);
    setError("");

    try {
      // 1. users 테이블에 upsert (같은 폰번호면 업데이트)
      const upsertPayload: Record<string, unknown> = { phone, name, birth_date: birth || null, role: "alba" };
      if (kakaoId) upsertPayload.kakao_id = kakaoId;
      const { data: userData, error: userErr } = await supabase
        .from("users")
        .upsert(upsertPayload, { onConflict: "phone" })
        .select("id")
        .single();

      if (userErr || !userData) throw new Error("가입 중 오류가 발생했어요.");

      const userId = userData.id;

      // 2. store_members 연결
      const { error: memberErr } = await supabase
        .from("store_members")
        .upsert({
          store_id: storeId,
          user_id: userId,
          start_date: startDate || null,
          wage: 10030,
          status: "active",
        }, { onConflict: "store_id,user_id" });

      if (memberErr) throw new Error("가게 연결 중 오류가 발생했어요.");

      // 3. 세션 저장 (localStorage)
      localStorage.setItem("plba_uid", userId);
      localStorage.setItem("plba_name", name);
      localStorage.setItem("plba_store_id", storeId);
      localStorage.setItem("plba_store_name", storeName);
      localStorage.setItem("plba_store_code", storeCode);

      router.push("/app/alba");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "오류가 발생했어요.");
    } finally {
      setSubmitting(false);
    }
  }

  const STEPS: Record<Step, number> = { phone: 1, verify: 2, name: 3, birth: 4, startdate: 5, storecode: 6 };
  const progress = STEPS[step];
  const totalSteps = 6;

  const prevStep: Record<Step, Step | "login"> = {
    phone: "login", verify: "phone", name: "verify", birth: "name", startdate: "birth", storecode: "startdate"
  };

  return (
    <div className="min-h-screen" style={{ background: "#fff" }}>
      <div style={{ maxWidth: 430, width: "100%", margin: "0 auto", minHeight: "100svh", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ padding: "16px 20px 0", display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => {
              const p = prevStep[step];
              if (p === "login") router.push("/login");
              else setStep(p);
            }}
            style={{ width: 38, height: 38, border: "none", borderRadius: 11, background: "#f1f1f3", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#37383c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
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

          {/* STEP 1: 핸드폰 */}
          {step === "phone" && (
            <div style={{ animation: "fadeUp .25s ease" }}>
              <h2 style={{ fontWeight: 800, fontSize: 24, color: "var(--text)", lineHeight: 1.3 }}>핸드폰 번호를<br />입력해주세요</h2>
              <p style={{ fontWeight: 500, fontSize: 14, color: "var(--text-sub)", marginTop: 8, lineHeight: 1.6 }}>본인 확인을 위해 사용해요.<br />광고성 메시지는 절대 보내지 않아요.</p>
              <div style={{ marginTop: 32 }}>
                <label style={labelStyle}>핸드폰 번호</label>
                <input type="tel" value={phone} onChange={handlePhoneChange} placeholder="010-0000-0000" autoFocus
                  style={{ ...inputStyle, letterSpacing: "0.05em" }} />
              </div>
              {error && (
                <div style={{ marginTop: 12, padding: "10px 14px", background: "var(--negative-bg)", borderRadius: 12, fontWeight: 600, fontSize: 13, color: "var(--negative)" }}>{error}</div>
              )}
              <button onClick={sendOtp} disabled={phone.replace(/\D/g, "").length < 10 || submitting}
                style={{ ...primaryBtn(phone.replace(/\D/g, "").length < 10), display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {submitting && <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />}
                인증번호 받기
              </button>
            </div>
          )}

          {/* STEP 2: OTP */}
          {step === "verify" && (
            <div style={{ animation: "fadeUp .25s ease" }}>
              <h2 style={{ fontWeight: 800, fontSize: 24, color: "var(--text)", lineHeight: 1.3 }}>인증번호를<br />입력해주세요</h2>
              <p style={{ fontWeight: 500, fontSize: 14, color: "var(--text-sub)", marginTop: 8, lineHeight: 1.6 }}>
                <span style={{ color: "var(--p)", fontWeight: 700 }}>{phone}</span>으로<br />6자리 인증번호를 보냈어요.
              </p>
              <div style={{ position: "relative", marginTop: 32 }}>
                <div style={{ display: "flex", gap: 9 }}>
                  {otpDigits.map((ch, i) => {
                    const isActive = i === otp.length && otp.length < 6;
                    const hasCh = i < otp.length;
                    return (
                      <div key={i} style={{ flex: 1, height: 58, borderRadius: 13, border: `2px solid ${isActive ? "var(--p)" : hasCh ? "var(--p-border)" : "rgba(112,115,124,0.22)"}`, background: hasCh ? "var(--p-softer)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 24, color: "var(--text)", transition: "border-color 0.12s" }}>
                        {ch !== " " ? ch : ""}
                      </div>
                    );
                  })}
                </div>
                <input ref={otpRef} value={otp} onChange={handleOtpInput} inputMode="numeric" maxLength={6} autoFocus
                  style={{ position: "absolute", inset: 0, opacity: 0, cursor: "text", fontSize: 16 }} />
              </div>
              {error && (
                <div style={{ marginTop: 12, padding: "10px 14px", background: "var(--negative-bg)", borderRadius: 12, fontWeight: 600, fontSize: 13, color: "var(--negative)" }}>{error}</div>
              )}
              <button onClick={verifyOtp} disabled={otp.length < 6 || submitting} style={{ ...primaryBtn(otp.length < 6), display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                {submitting && <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />}
                확인
              </button>
              <button onClick={sendOtp} style={{ marginTop: 12, width: "100%", height: 44, border: "none", background: "none", cursor: "pointer", fontWeight: 600, fontSize: 14, color: "var(--text-sub)" }}>인증번호 재발송</button>
            </div>
          )}

          {/* STEP 3: 이름 */}
          {step === "name" && (
            <div style={{ animation: "fadeUp .25s ease" }}>
              <h2 style={{ fontWeight: 800, fontSize: 24, color: "var(--text)", lineHeight: 1.3 }}>이름을<br />알려주세요</h2>
              <p style={{ fontWeight: 500, fontSize: 14, color: "var(--text-sub)", marginTop: 8 }}>사장님 대시보드에 표시되는 이름이에요.</p>
              <div style={{ marginTop: 32 }}>
                <label style={labelStyle}>이름</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="홍길동" autoFocus style={inputStyle} />
              </div>
              <button onClick={() => setStep("birth")} disabled={name.trim().length < 2} style={primaryBtn(name.trim().length < 2)}>다음</button>
            </div>
          )}

          {/* STEP 4: 생년월일 */}
          {step === "birth" && (
            <div style={{ animation: "fadeUp .25s ease" }}>
              <h2 style={{ fontWeight: 800, fontSize: 24, color: "var(--text)", lineHeight: 1.3 }}>생년월일을<br />입력해주세요</h2>
              <p style={{ fontWeight: 500, fontSize: 14, color: "var(--text-sub)", marginTop: 8 }}>급여 계산 시 나이 정보를 사용해요.</p>
              <div style={{ marginTop: 32 }}>
                <label style={labelStyle}>생년월일</label>
                <input type="date" value={birth}
                  onChange={e => {
                    const val = e.target.value;
                    if (val && val.split("-")[0].length > 4) return;
                    setBirth(val);
                  }}
                  max="2015-12-31" min="1950-01-01" autoFocus
                  style={{ ...inputStyle, color: birth ? "var(--text)" : "rgba(55,56,60,0.4)" }} />
              </div>
              <button onClick={() => setStep("startdate")} disabled={!birth} style={primaryBtn(!birth)}>다음</button>
            </div>
          )}

          {/* STEP 5: 근무 시작일 */}
          {step === "startdate" && (
            <div style={{ animation: "fadeUp .25s ease" }}>
              <h2 style={{ fontWeight: 800, fontSize: 24, color: "var(--text)", lineHeight: 1.3 }}>근무 시작일을<br />알려주세요</h2>
              <p style={{ fontWeight: 500, fontSize: 14, color: "var(--text-sub)", marginTop: 8 }}>주휴수당 계산의 기준이 돼요.</p>
              <div style={{ marginTop: 32 }}>
                <label style={labelStyle}>근무 시작일</label>
                <input type="date" value={startDate}
                  onChange={e => {
                    const val = e.target.value;
                    if (val && val.split("-")[0].length > 4) return;
                    setStartDate(val);
                  }}
                  min="2020-01-01" max="2030-12-31" autoFocus
                  style={{ ...inputStyle, color: startDate ? "var(--text)" : "rgba(55,56,60,0.4)" }} />
              </div>
              <button onClick={() => setStep("storecode")} disabled={!startDate} style={primaryBtn(!startDate)}>다음 — 가게 코드 입력</button>
            </div>
          )}

          {/* STEP 6: 가게 코드 */}
          {step === "storecode" && (
            <div style={{ animation: "fadeUp .25s ease" }}>
              <h2 style={{ fontWeight: 800, fontSize: 24, color: "var(--text)", lineHeight: 1.3 }}>사장님께 받은<br />가게 코드를 입력해요</h2>
              <p style={{ fontWeight: 500, fontSize: 14, color: "var(--text-sub)", marginTop: 8, lineHeight: 1.6 }}>
                6자리 코드를 입력하면 매장 직원으로 등록돼요.
              </p>

              <div style={{ position: "relative", marginTop: 32 }}>
                <div style={{ display: "flex", gap: 9 }}>
                  {storeDigits.map((ch, i) => {
                    const isActive = i === storeCode.length && storeCode.length < 6;
                    const hasCh = i < storeCode.length;
                    return (
                      <div key={i} style={{
                        flex: 1, height: 62, borderRadius: 14,
                        border: `2px solid ${storeVerified ? "var(--positive)" : isActive ? "var(--p)" : hasCh ? "var(--p-border)" : "rgba(112,115,124,0.22)"}`,
                        background: storeVerified ? "var(--positive-bg)" : hasCh ? "var(--p-softer)" : "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: 800, fontSize: 26, color: storeVerified ? "var(--positive)" : "var(--text)",
                        transition: "all 0.15s",
                      }}>
                        {ch !== " " ? ch : ""}
                      </div>
                    );
                  })}
                </div>
                <input
                  ref={storeInputRef}
                  value={storeCode}
                  onChange={handleStoreCodeInput}
                  inputMode="numeric"
                  maxLength={6}
                  autoFocus
                  style={{ position: "absolute", inset: 0, opacity: 0, cursor: "text", fontSize: 16 }}
                />
              </div>

              <button
                onClick={() => {
                  setStoreCode("482910");
                  setStoreVerified(true);
                  setStoreName("카페 플바");
                  setStoreId("00000000-0000-0000-0000-000000000001");
                  setStoreAddress("서울 성동구 성수동");
                }}
                style={ghostBtn}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M3 12h18" /></svg>
                데모 코드 482910 채우기
              </button>

              {/* 가게 확인됨 */}
              {storeVerified && (
                <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", background: "var(--positive-bg)", border: "1px solid var(--positive)", borderRadius: 14 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--positive)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "var(--positive)" }}>{storeName}</div>
                    {storeAddress && <div style={{ fontWeight: 500, fontSize: 12, color: "var(--positive)", opacity: 0.8 }}>{storeAddress}</div>}
                  </div>
                </div>
              )}

              {/* 코드 틀렸을 때 */}
              {storeCode.length === 6 && !storeVerified && (
                <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8, padding: "12px 14px", background: "var(--negative-bg)", borderRadius: 12 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--negative)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 8v4.5M12 16v.2" /></svg>
                  <span style={{ fontWeight: 600, fontSize: 13, color: "var(--negative)" }}>코드가 맞지 않아요. 사장님께 다시 확인해보세요.</span>
                </div>
              )}

              {error && (
                <div style={{ marginTop: 12, padding: "10px 14px", background: "var(--negative-bg)", borderRadius: 10 }}>
                  <span style={{ fontWeight: 600, fontSize: 13, color: "var(--negative)" }}>{error}</span>
                </div>
              )}

              <button
                onClick={handleJoin}
                disabled={!storeVerified || submitting}
                style={primaryBtn(!storeVerified || submitting)}
              >
                {submitting ? "가입 중..." : "입장하기 🎉"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = { fontWeight: 600, fontSize: 13, color: "var(--text)", display: "block", marginBottom: 8 };
const inputStyle: React.CSSProperties = { width: "100%", height: 54, border: "1.5px solid var(--p-border)", borderRadius: 14, padding: "0 16px", fontSize: 16, fontFamily: "Pretendard", fontWeight: 600, color: "var(--text)", outline: "none", boxSizing: "border-box" };
const primaryBtn = (disabled: boolean): React.CSSProperties => ({ marginTop: 20, width: "100%", height: 54, border: "none", borderRadius: 15, background: "var(--p)", color: "#fff", fontWeight: 800, fontSize: 16, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1, transition: "opacity 0.15s" });
const ghostBtn: React.CSSProperties = { marginTop: 14, display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, color: "var(--p)" };

export default function JoinPage() {
  return (
    <Suspense>
      <JoinInner />
    </Suspense>
  );
}
