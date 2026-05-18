"use client";
import { motion } from "framer-motion";
import { ArrowDown, Users } from "lucide-react";
import Image from "next/image";

// 뱃지 — #2: P 단위 명확화 "20,000P (2만원 상당)"
const BADGES = [
  { num: "0원", label: "초기 가입비" },
  { num: "100%", label: "성과 발생 시만 과금" },
  { num: "2만원 상당", label: "선착순 무상 지원" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-[#0D0F14]">
      {/* 배경 이미지 — #8: 오버레이 투명도 조정으로 가독성/감성 균형 */}
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

      {/* 메인 카피 */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 pt-8 pb-4">

        {/* ① 공감 유발 질문 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-white/55 text-[13px] font-semibold mb-4 tracking-wide">
            매달 마케팅비는 쓰는데...
          </p>
          <h1
            className="text-white font-black text-[36px] leading-[1.25] tracking-tight mb-2"
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

        {/* ② 솔루션 + #5 파트너 첫 등장 시 설명 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 mb-7"
        >
          <div className="h-[2px] w-10 bg-[#5b5bd6] mb-4 rounded-full" />
          <p
            className="text-white font-bold text-[20px] leading-[1.5]"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.7)" }}
          >
            손님이 안 오면,<br />
            <span className="text-[#a8b3ff]">광고비도 안 나갑니다.</span>
          </p>
          {/* #5: "파트너" 첫 등장 — 괄호로 즉시 정의 */}
          <p
            className="text-white/65 text-[13px] mt-2 leading-[1.65]"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}
          >
            내 가게 단골·동네 주민<span className="text-[#a8b3ff]/80 font-semibold">(파트너)</span>이 SNS로 홍보하고,<br />
            손님이 실제로 방문해야만 리워드 차감.
          </p>
        </motion.div>

        {/* ③ 파트너 수 사회적 증거 배너 — #1 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="flex items-center gap-2.5 bg-white/8 border border-white/12 rounded-2xl px-4 py-3 mb-6 backdrop-blur-sm"
        >
          <div className="w-8 h-8 rounded-xl bg-[#5b5bd6]/30 flex items-center justify-center flex-shrink-0">
            <Users className="w-4 h-4 text-[#a8b3ff]" />
          </div>
          <div>
            <p className="text-white font-black text-[15px] leading-none">
              파트너 <span className="text-[#a8b3ff]">2,400명+</span> 대기 중
            </p>
            <p className="text-white/50 text-[11px] mt-0.5">
              등록 즉시 내 가게 캠페인이 파트너에게 노출됩니다
            </p>
          </div>
        </motion.div>

        {/* ④ 혜택 배지 3분할 카드 — #2 P 단위 명확화 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="grid grid-cols-3 gap-2.5 mb-8"
        >
          {BADGES.map((b, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center bg-black/40 border border-white/18 rounded-2xl px-2 py-4 backdrop-blur-md"
            >
              <span
                className="text-[#a8b3ff] font-black text-[16px] mb-1.5 leading-none text-center"
                style={{ textShadow: "0 0 12px rgba(168,179,255,0.4)" }}
              >
                {b.num}
              </span>
              <span className="text-white/70 text-[10px] font-medium tracking-tight text-center break-keep leading-[1.4]">
                {b.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ⑤ CTA — #7 보라 색상 통일 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-[22px] overflow-hidden border border-white/18 backdrop-blur-md"
        >
          <div className="bg-white/10 px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00C896] animate-pulse flex-shrink-0" />
              <span className="text-white/90 text-[13.5px] font-semibold leading-[1.4]">
                우리 가게도 결과 나온 만큼만 내고 싶다면?
              </span>
            </div>
          </div>
          {/* #7: CTA 보라 통일 */}
          <a
            href="#register"
            className="flex items-center justify-center w-full py-4 bg-[#5b5bd6] text-white font-black text-[16px] active:scale-[0.98] transition-transform hover:bg-[#4f4fc4]"
          >
            선착순 100곳 · 2만원 상당 포인트 받기 →
          </a>
        </motion.div>
      </div>

      {/* 스크롤 유도 */}
      <div className="relative z-10 flex flex-col items-center pb-8 gap-1">
        <span className="text-white/25 text-[11px]">아래로 내려보세요</span>
        <ArrowDown className="w-3.5 h-3.5 text-white/25 animate-bounce" />
      </div>
    </section>
  );
}
