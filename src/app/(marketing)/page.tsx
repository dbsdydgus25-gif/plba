"use client";
import { useState } from "react";
import HeroSection from "./_sections/HeroSection";
import QuestionSection from "./_sections/QuestionSection";
import Part1Section from "./_sections/Part1Section";
import Part2Section from "./_sections/Part2Section";
import HowItWorksSection from "./_sections/HowItWorksSection";
import AppPreviewSection from "./_sections/AppPreviewSection";
import ComparisonSection from "./_sections/ComparisonSection";
import ReviewSection from "./_sections/ReviewSection";
import RegisterSection from "./_sections/RegisterSection";
import StickyBottomCTA from "./_sections/StickyBottomCTA";

export default function LandingPage() {
  const [showSticky, setShowSticky] = useState(true);
  return (
    <div className="w-full min-h-screen bg-white text-[#191F28] overflow-x-hidden" style={{ fontFamily: "'Pretendard', 'Inter', sans-serif", wordBreak: "keep-all" }}>
      <HeroSection />
      <QuestionSection />
      <Part1Section />
      <Part2Section />
      <HowItWorksSection />
      <AppPreviewSection />
      <ComparisonSection />
      <ReviewSection />
      <RegisterSection />
      {showSticky && <StickyBottomCTA onClose={() => setShowSticky(false)} />}
    </div>
  );
}
