"use client";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

// ✅ 3단 구조: 훅 → 핵심 가치 → 단일 CTA
// ✅ 허위 수치 전면 제거 (파트너 2400명, 37곳 남음)
// ✅ 배지(0원/100%/2만원)는 CTA 아래로 이동 — 첫 화면 과부하 해소

const BADGES = [
  { num: "0원", label: "초기 가입비" },
  { num: "100%", label: "성과 발생 시만 과금" },
  { num: "2만원 상당", label: "선착순 무상 지원" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-[#0D0F14]">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <Image
          src="/images/bbq.png"
          alt="한국 음식점"
          fill
          className="object-cover object-center opacity-[0.5]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0F14]/88 via-[#0D0F14]/50 to-[#0D0F14]/96" />
        <div className="absolute top-0 left-0 right-0 h-[70%] bg-gradient-to-b from-black/55 to-transparent" />
      </div>

      {/* 로고 */}
      <div className="relative z-10 px-6 pt-14">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#5b5bd6] flex items-center justify-center">
            <span className="text-white font-black text-[13px]">P</span>
          </div>
          <span className="text-white font-black text-[18px] tracking-tight">plba.</span>
        </div>
      </div>

      {/* ══ 3단 구조 메인 카피 ══ */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 pt-8 pb-4">

        {/* [1단] 훅 — 서브 카피 + 메인 헤드라인 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <p className="text-white/50 text-[13px] font-semibold mb-4 tracking-wide">
            매달 마케팅비는 쓰는데...
          </p>
          <h1
            className="text-white font-black text-[38px] leading-[1.22] tracking-tight"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.8)" }}
          >
            진짜 손님이<br />
            <span
              className="text-[#a8b3ff]"
              style={{ textShadow: "0 2px 20px rgba(91,91,214,0.5), 0 1px 4px rgba(0,0,0,0.8)" }}
            >
              오고 있는 거 맞나요?
            </span>
          </h1>
        </motion.div>

        {/* [2단] 핵심 가치 — 한 줄 */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mb-10"
        >
          <div className="h-[2px] w-10 bg-[#5b5bd6] mb-4 rounded-full" />
          <p
            className="text-white font-bold text-[20px] leading-[1.45]"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.7)" }}
          >
            손님이 안 오면,<br />
            <span className="text-[#a8b3ff]">광고비도 안 나갑니다.</span>
          </p>
        </motion.div>

        {/* [3단] 단일 CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.34 }}
        >
          <a
            href="#register"
            className="flex items-center justify-center w-full py-4.5 py-[18px] bg-[#5b5bd6] text-white font-black text-[17px] rounded-2xl active:scale-[0.98] transition-transform hover:bg-[#4f4fc4] shadow-xl shadow-[#5b5bd6]/30"
          >
            지금 무료로 내 가게 등록하기 →
          </a>

          {/* 배지 3개 — CTA 아래 보조 정보로 배치 */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {BADGES.map((b, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center bg-white/8 border border-white/12 rounded-xl px-2 py-3"
              >
                <span className="text-[#a8b3ff] font-black text-[14px] mb-1 leading-none text-center">
                  {b.num}
                </span>
                <span className="text-white/55 text-[9.5px] font-medium text-center break-keep leading-[1.35]">
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 스크롤 유도 */}
      <div className="relative z-10 flex flex-col items-center pb-8 gap-1">
        <span className="text-white/20 text-[11px]">아래로 내려보세요</span>
        <ArrowDown className="w-3.5 h-3.5 text-white/20 animate-bounce" />
      </div>
    </section>
  );
}
