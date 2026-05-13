"use client";
import HeroSection from "./_sections/HeroSection";
import TrustSection from "./_sections/TrustSection";
import HowItWorksSection from "./_sections/HowItWorksSection";
import BenefitsSection from "./_sections/BenefitsSection";
import CompareSection from "./_sections/CompareSection";
import EcosystemSection from "./_sections/EcosystemSection";
import RegisterSection from "./_sections/RegisterSection";
import StickyBottomCTA from "./_sections/StickyBottomCTA";
import { useState } from "react";

export default function LandingPage() {
  const [showSticky, setShowSticky] = useState(true);
  return (
    <div
      className="w-full bg-white overflow-x-hidden"
      style={{ fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", wordBreak: "keep-all" }}
    >
      <div className="mx-auto max-w-[430px] min-h-screen relative">
        {/* 1. Hero — Pain 첫 줄 → 솔루션 → 배지 → CTA */}
        <HeroSection />
        {/* 2. 신뢰 섹션 — "이미 N곳이 시작했어요" */}
        <TrustSection />
        {/* 3. How it Works — 3단계 플로우 */}
        <HowItWorksSection />
        {/* 4. 사장님 Benefits — 결과 중심 3가지 */}
        <BenefitsSection />
        {/* 5. 비교표 — 기존 광고 vs 플바 */}
        <CompareSection />
        {/* 6. 파트너/소비자 — 생태계 압축 */}
        <EcosystemSection />
        {/* 7. 최종 CTA 폼 */}
        <RegisterSection />
        {/* 스티키 CTA */}
        {showSticky && <StickyBottomCTA onClose={() => setShowSticky(false)} />}
      </div>
    </div>
  );
}
