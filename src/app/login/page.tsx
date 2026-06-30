"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  async function kakaoLogin(role: "alba" | "owner") {
    const redirectTo = `${window.location.origin}/auth/callback?role=${role}`;
    await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: { redirectTo },
    });
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Desktop layout */}
      <div className="hidden md:flex min-h-screen">
        {/* Left — brand panel */}
        <div style={{ width: 480, flexShrink: 0, background: "var(--p)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "64px 56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
            <Image src="/plba-symbol.png" width={48} height={48} alt="plba" style={{ objectFit: "contain", filter: "brightness(10)" }} />
            <Image src="/plba-logo.png" width={80} height={28} alt="plba" style={{ objectFit: "contain", filter: "brightness(10)" }} />
          </div>
          <h1 style={{ fontWeight: 800, fontSize: 36, color: "#fff", lineHeight: 1.25, letterSpacing: "-0.02em" }}>
            QR 하나로 끝내는<br />알바 근태 관리
          </h1>
          <p style={{ fontWeight: 500, fontSize: 16, color: "rgba(255,255,255,0.75)", marginTop: 18, lineHeight: 1.65 }}>
            매장에 부착된 QR을 알바생이 스캔하면,<br />
            사장님 대시보드에 실시간으로 기록돼요.
          </p>
          <div style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { icon: "📱", text: "QR 한 번으로 출퇴근 완료" },
              { icon: "📊", text: "실시간 근태 현황 대시보드" },
              { icon: "💰", text: "주휴수당 포함 자동 급여 계산" },
              { icon: "📅", text: "스케줄 관리 & 직원 알림" },
            ].map(item => (
              <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <span style={{ fontWeight: 500, fontSize: 15, color: "rgba(255,255,255,0.85)" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — login cards */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 48px" }}>
          <div style={{ width: "100%", maxWidth: 520 }}>
            <h2 style={{ fontWeight: 800, fontSize: 26, color: "var(--text)", marginBottom: 8 }}>시작하기</h2>
            <p style={{ fontWeight: 500, fontSize: 15, color: "var(--text-sub)", marginBottom: 32 }}>어떤 계정으로 시작할까요?</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <LoginCard
                icon={
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="2.5" width="12" height="19" rx="3" /><path d="M11 18.5h2" />
                  </svg>
                }
                title="알바생으로 시작"
                desc="매장 QR을 찍어 출퇴근을 기록하고, 내 근무·급여를 확인해요."
                tags={["QR 출퇴근", "근무기록", "급여조회"]}
                kakaoLabel="카카오로 알바생 시작"
                onKakao={() => kakaoLogin("alba")}
              />
              <LoginCard
                icon={
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="8" height="9" rx="1.5" /><rect x="13" y="3" width="8" height="5" rx="1.5" />
                    <rect x="13" y="11" width="8" height="10" rx="1.5" /><rect x="3" y="15" width="8" height="6" rx="1.5" />
                  </svg>
                }
                title="사장님으로 시작"
                desc="직원 근태와 급여를 한눈에 관리하고, 스케줄을 짜고 정산해요."
                tags={["실시간 근태", "급여정산", "스케줄"]}
                kakaoLabel="카카오로 사장님 시작"
                onKakao={() => kakaoLogin("owner")}
              />
            </div>
            <p style={{ marginTop: 20, fontWeight: 500, fontSize: 12, color: "var(--text-sub)", textAlign: "center", lineHeight: 1.6 }}>
              알바생은 핸드폰 인증으로 가입하고,<br />사장님은 사업자 정보를 입력하면 바로 서비스를 시작할 수 있어요.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden flex-col min-h-screen" style={{ background: "#fff" }}>
        {/* Top brand */}
        <div style={{ padding: "52px 28px 32px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <Image src="/plba-symbol.png" width={40} height={40} alt="plba" style={{ objectFit: "contain" }} />
            <Image src="/plba-logo.png" width={64} height={22} alt="plba" style={{ objectFit: "contain" }} />
          </div>
          <h1 style={{ fontWeight: 800, fontSize: 22, color: "var(--text)", lineHeight: 1.3, letterSpacing: "-0.02em" }}>
            QR 하나로 끝내는<br />알바 근태 관리
          </h1>
          <p style={{ fontWeight: 500, fontSize: 14, color: "var(--text-sub)", marginTop: 10, lineHeight: 1.6 }}>
            어떤 계정으로 시작할까요?
          </p>
        </div>

        {/* Cards */}
        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 14 }}>
          <LoginCard
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="2.5" width="12" height="19" rx="3" /><path d="M11 18.5h2" />
              </svg>
            }
            title="알바생으로 시작"
            desc="QR 찍어 출퇴근하고, 내 근무·급여를 확인해요."
            tags={["QR 출퇴근", "근무기록", "급여조회"]}
            kakaoLabel="카카오로 알바생 시작"
            onKakao={() => kakaoLogin("alba")}
          />
          <LoginCard
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="8" height="9" rx="1.5" /><rect x="13" y="3" width="8" height="5" rx="1.5" />
                <rect x="13" y="11" width="8" height="10" rx="1.5" /><rect x="3" y="15" width="8" height="6" rx="1.5" />
              </svg>
            }
            title="사장님으로 시작"
            desc="직원 근태·급여 관리와 스케줄을 한눈에."
            tags={["실시간 근태", "급여정산", "스케줄"]}
            kakaoLabel="카카오로 사장님 시작"
            onKakao={() => kakaoLogin("owner")}
          />
        </div>

        <p style={{ margin: "20px 24px 40px", fontWeight: 500, fontSize: 12, color: "var(--text-sub)", textAlign: "center", lineHeight: 1.6 }}>
          알바생은 핸드폰 인증으로,<br />사장님은 사업자 정보로 바로 시작할 수 있어요.
        </p>
      </div>
    </div>
  );
}

function LoginCard({
  icon, title, desc, tags, kakaoLabel, onKakao,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tags: string[];
  kakaoLabel: string;
  onKakao: () => void;
}) {
  return (
    <button
      onClick={onKakao}
      style={{ width: "100%", textAlign: "left", background: "#fff", border: "1.5px solid rgba(112,115,124,0.18)", borderRadius: 20, padding: "22px 22px 20px", cursor: "pointer" }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
        <div style={{ width: 46, height: 46, borderRadius: 13, background: "var(--p-soft)", color: "var(--p-tint)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {icon}
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 17, color: "var(--text)" }}>{title}</div>
          <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", marginTop: 4, lineHeight: 1.5 }}>{desc}</div>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {tags.map(tag => (
          <span key={tag} style={{ padding: "4px 10px", background: "#f1f1f3", borderRadius: 9999, fontWeight: 600, fontSize: 12, color: "rgba(55,56,60,0.65)" }}>{tag}</span>
        ))}
      </div>
      <div style={{ width: "100%", height: 50, borderRadius: 12, background: "var(--kakao)", color: "var(--kakao-text)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontWeight: 700, fontSize: 15 }}>
        <KakaoIcon />
        {kakaoLabel}
      </div>
    </button>
  );
}

function KakaoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#191600">
      <path d="M12 3.5C6.8 3.5 2.5 6.8 2.5 10.9c0 2.6 1.8 4.9 4.5 6.2-.2.7-.7 2.5-.8 2.9-.1.5.2.5.4.4.2-.1 2.5-1.7 3.5-2.4.7.1 1.5.2 2.4.2 5.2 0 9.5-3.3 9.5-7.4S17.2 3.5 12 3.5z" />
    </svg>
  );
}
