"use client";
import HeroSection from "./_sections/HeroSection";
import FlowSection from "./_sections/FlowSection";
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
      {/* 모바일 폰 프레임처럼 max-width 제한 */}
      <div className="mx-auto max-w-[430px] min-h-screen relative">
        <HeroSection />
        <FlowSection />
        <RegisterSection />
        {showSticky && <StickyBottomCTA onClose={() => setShowSticky(false)} />}
      </div>
    </div>
  );
}
