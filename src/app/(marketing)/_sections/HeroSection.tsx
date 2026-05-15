"use client";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

const BADGES = [
  { num: "0원", label: "초기 가입비" },
  { num: "100%", label: "성과 발생 시만 과금" },
  { num: "20,000P", label: "선착순 무상 지원" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-[#111318]">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 bg-[#000000]">
        <Image
          src="/images/bbq.png"
          alt="한국 음식점"
          fill
          className="object-cover object-center opacity-[0.25]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#111318]" />
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
        {/* Pain 첫 줄 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-white/80 text-[13px] font-bold mb-3 tracking-wide">
            전단지, SNS 광고, 배달 수수료...
          </p>
          <h1 className="text-white font-black text-[34px] leading-[1.3] tracking-tight mb-3">
            마케팅비는 나가는데<br />
            <span className="text-white/60">손님은 왜 안 올까요?</span>
          </h1>
        </motion.div>

        {/* 솔루션 한 줄 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-5 mb-8"
        >
          <div className="h-px w-8 bg-[#5b5bd6] mb-4" />
          <p className="text-[#a8b3ff] font-bold text-[18px] leading-[1.5]">
            손님이 안 오면,<br />광고비도 안 나갑니다.
          </p>
          <p className="text-white/70 text-[13px] mt-2 leading-[1.6]">
            동네 파트너가 홍보하고, 손님이 실제로 결제해야만 비용 차감.
          </p>
        </motion.div>

        {/* 혜택 배지 3개 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col gap-2 mb-8"
        >
          {BADGES.map((b, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-4 py-3 backdrop-blur-sm shadow-sm">
              <span className="text-[#a8b3ff] font-black text-[20px] min-w-[80px]">{b.num}</span>
              <span className="text-white/90 text-[13.5px] font-bold tracking-wide">{b.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <div className="text-center mb-3">
            <span className="inline-block bg-white/10 border border-white/10 text-white/90 text-[13px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md">
              지금 등록하면 20,000P 즉시 지급 · 선착순 100곳
            </span>
          </div>
          <a
            href="#register"
            className="flex items-center justify-center gap-2 w-full py-5 bg-[#5b5bd6] text-white rounded-2xl font-black text-[17px] shadow-2xl shadow-[#5b5bd6]/30 active:scale-[0.98] transition-transform"
          >
            무료로 내 가게 등록하기
          </a>
          <p className="text-center text-white/30 text-[11px] font-medium mt-3">
            1분이면 사전등록이 완료됩니다
          </p>
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
