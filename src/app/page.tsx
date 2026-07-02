"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
        <path d="M14 14h2v2m0 3h3m-3-3v3M17 14h3" />
      </svg>
    ),
    title: "QR 한 번으로 출퇴근",
    desc: "앱 설치 없이 폰 카메라로 QR만 찍으면 끝. 종이 대장은 이제 그만.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "실시간 근태 확인",
    desc: "누가 지금 출근 중인지, 오늘 몇 시간 일했는지 사장님이 바로 확인.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
      </svg>
    ),
    title: "급여 자동 계산",
    desc: "근무 기록을 토대로 시급 × 시간을 자동으로 계산. 주휴수당도 자동.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "직원 관리",
    desc: "초대 링크 하나로 직원 등록. 시급 수정, 퇴사 처리도 간편하게.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    title: "스케줄 관리",
    desc: "이번 주 누가 어느 시간에 일하는지 한눈에. 셀 클릭으로 바로 편집.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "알바생 앱 내장",
    desc: "별도 앱 설치 불필요. 알바생은 브라우저에서 QR 스캔 후 급여 확인까지.",
  },
];

const STEPS = [
  { num: "01", title: "가게 등록", desc: "사장님이 가게를 등록하면 고유 QR 코드 생성." },
  { num: "02", title: "QR 출력·부착", desc: "QR을 출력해서 계산대 옆에 붙여두기." },
  { num: "03", title: "알바생 초대", desc: "링크 공유 후 알바생이 간단히 가입." },
  { num: "04", title: "QR 찍고 끝", desc: "출퇴근마다 QR 스캔 → 자동 기록." },
];

export default function LandingPage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ fontFamily: "'Pretendard', -apple-system, sans-serif", color: "var(--text)", background: "#fff", overflowX: "hidden" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(255,255,255,0.92)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", transition: "background 0.2s, box-shadow 0.2s", boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.06)" : "none" }}>
        <div style={{ fontWeight: 900, fontSize: 20, color: "var(--p)", letterSpacing: "-0.5px" }}>plba</div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button onClick={() => router.push("/login?role=owner")} style={{ height: 36, padding: "0 16px", borderRadius: 10, border: "1.5px solid var(--p-border)", background: "#fff", fontWeight: 700, fontSize: 13, color: "var(--p-tint)", cursor: "pointer" }}>
            사장님 로그인
          </button>
          <button onClick={() => router.push("/login?role=alba")} style={{ height: 36, padding: "0 16px", borderRadius: 10, border: "none", background: "var(--p)", fontWeight: 700, fontSize: 13, color: "#fff", cursor: "pointer" }}>
            알바생 시작
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 24px 80px", textAlign: "center", background: "linear-gradient(160deg, #f5f2ff 0%, #fff 60%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -120, right: -120, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(107,77,246,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(107,77,246,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 14px", borderRadius: 9999, background: "var(--p-soft)", border: "1px solid var(--p-border)", marginBottom: 28 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--p)", display: "inline-block" }} />
          <span style={{ fontWeight: 700, fontSize: 12, color: "var(--p-tint)" }}>지금 무료 체험 중</span>
        </div>

        <h1 style={{ fontWeight: 900, fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1.15, letterSpacing: "-1.5px", color: "var(--text)", marginBottom: 20, maxWidth: 700 }}>
          QR 한 번으로<br />
          <span style={{ color: "var(--p)" }}>출퇴근 관리</span> 끝
        </h1>
        <p style={{ fontWeight: 500, fontSize: "clamp(15px, 2vw, 18px)", color: "var(--text-sub)", lineHeight: 1.7, marginBottom: 40, maxWidth: 520 }}>
          앱 설치 없이 QR 코드만 붙여두면<br />
          출퇴근·급여·스케줄이 전부 자동으로.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={() => router.push("/owner-signup")} style={{ height: 54, padding: "0 32px", borderRadius: 14, border: "none", background: "var(--p)", color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer", boxShadow: "0 8px 24px rgba(107,77,246,0.3)" }}>
            사장님 무료로 시작하기 →
          </button>
          <button onClick={() => router.push("/login?role=alba")} style={{ height: 54, padding: "0 28px", borderRadius: 14, border: "1.5px solid var(--p-border)", background: "#fff", color: "var(--p-tint)", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            알바생 가입
          </button>
        </div>

        <p style={{ marginTop: 20, fontSize: 13, color: "var(--text-sub2)" }}>신용카드 없이 30일 무료 체험 · 언제든 해지</p>

        {/* mock UI */}
        <div style={{ marginTop: 64, position: "relative", maxWidth: 380, width: "100%" }}>
          <div style={{ background: "#fff", borderRadius: 24, boxShadow: "0 24px 80px rgba(0,0,0,0.12)", border: "1px solid var(--hairline)", overflow: "hidden" }}>
            <div style={{ background: "var(--p)", padding: "20px 24px 16px" }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#fff", opacity: 0.9 }}>플바 카페</div>
              <div style={{ fontWeight: 500, fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>오늘 출근 3명 · 퇴근 1명</div>
            </div>
            <div style={{ padding: "16px 24px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { name: "홍길동", time: "09:02 출근", color: "#e8e2fd", col: "var(--p-tint)" },
                { name: "김민지", time: "09:45 출근", color: "#eafce0", col: "#2e7a00" },
                { name: "이수진", time: "10:00 출근", color: "#fef4e6", col: "#d47800" },
              ].map((r) => (
                <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#f7f7fb", borderRadius: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: r.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: r.col, flexShrink: 0 }}>{r.name[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "var(--text)" }}>{r.name}</div>
                    <div style={{ fontWeight: 500, fontSize: 11, color: "var(--text-sub)", marginTop: 1 }}>{r.time}</div>
                  </div>
                  <span style={{ padding: "3px 8px", borderRadius: 9999, background: "#eafce0", fontWeight: 700, fontSize: 11, color: "#2e7a00" }}>근무중</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "100px 24px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: "var(--p-tint)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>How it works</div>
          <h2 style={{ fontWeight: 900, fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-1px", color: "var(--text)" }}>4단계로 끝나요</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24 }}>
          {STEPS.map((s) => (
            <div key={s.num} style={{ textAlign: "center", padding: "32px 20px" }}>
              <div style={{ fontWeight: 900, fontSize: 40, color: "var(--p-soft)", letterSpacing: "-2px", marginBottom: 12 }}>{s.num}</div>
              <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text)", marginBottom: 8 }}>{s.title}</div>
              <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", lineHeight: 1.7 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "80px 24px", background: "var(--surface)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "var(--p-tint)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Features</div>
            <h2 style={{ fontWeight: 900, fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-1px", color: "var(--text)" }}>필요한 건 다 들어있어요</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
            {FEATURES.map((f) => (
              <div key={f.title} style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", border: "1px solid var(--hairline)" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "var(--p-soft)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--p-tint)", marginBottom: 18 }}>{f.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 15, color: "var(--text)", marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", lineHeight: 1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: "100px 24px", maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: "var(--p-tint)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Pricing</div>
        <h2 style={{ fontWeight: 900, fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-1px", color: "var(--text)", marginBottom: 16 }}>단순하게, 하나의 요금제</h2>
        <p style={{ fontWeight: 500, fontSize: 15, color: "var(--text-sub)", marginBottom: 48 }}>직원 수 제한 없이 모든 기능을 이용할 수 있어요.</p>

        <div style={{ background: "#fff", borderRadius: 24, border: "2px solid var(--p-border)", padding: "44px 40px", boxShadow: "0 8px 40px rgba(107,77,246,0.08)", maxWidth: 420, margin: "0 auto" }}>
          <div style={{ fontWeight: 900, fontSize: 48, color: "var(--p)", letterSpacing: "-2px", lineHeight: 1 }}>₩4,900</div>
          <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-sub)", marginTop: 6, marginBottom: 32 }}>/월 · 부가세 포함</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36, textAlign: "left" }}>
            {["QR 출퇴근 (직원 무제한)", "실시간 근태 대시보드", "급여 자동 계산 + 주휴수당", "스케줄 관리", "가게 설정 & 직원 초대"].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 600, color: "var(--text)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--p)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5 10 17.5 19 7" /></svg>
                {item}
              </div>
            ))}
          </div>
          <button onClick={() => router.push("/owner-signup")} style={{ width: "100%", height: 52, borderRadius: 13, border: "none", background: "var(--p)", color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 6px 20px rgba(107,77,246,0.25)" }}>
            30일 무료로 시작하기
          </button>
          <p style={{ marginTop: 12, fontSize: 12, color: "var(--text-sub2)" }}>신용카드 불필요 · 언제든지 해지 가능</p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: "var(--p)", textAlign: "center" }}>
        <h2 style={{ fontWeight: 900, fontSize: "clamp(26px, 4vw, 42px)", color: "#fff", letterSpacing: "-1px", marginBottom: 16 }}>지금 바로 시작해보세요</h2>
        <p style={{ fontWeight: 500, fontSize: 15, color: "rgba(255,255,255,0.75)", marginBottom: 36 }}>30일 무료 체험, 카드 정보 없이 시작 가능합니다.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => router.push("/owner-signup")} style={{ height: 52, padding: "0 32px", borderRadius: 13, border: "none", background: "#fff", color: "var(--p)", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
            사장님 무료 시작 →
          </button>
          <button onClick={() => router.push("/login?role=alba")} style={{ height: 52, padding: "0 28px", borderRadius: 13, border: "1.5px solid rgba(255,255,255,0.4)", background: "transparent", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            알바생 가입
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "32px 24px", textAlign: "center", borderTop: "1px solid var(--hairline)", background: "#fff" }}>
        <div style={{ fontWeight: 900, fontSize: 18, color: "var(--p)", marginBottom: 8 }}>plba</div>
        <p style={{ fontSize: 12, color: "var(--text-sub2)", lineHeight: 1.8 }}>
          QR 기반 알바생 출퇴근 관리 서비스<br />
          문의: support@plba.co.kr
        </p>
      </footer>
    </div>
  );
}
