"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden flex items-end">
      {/* 배경 이미지 — 전체 꽉 채우기 */}
      <Image
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=90"
        alt="활기찬 음식점"
        fill
        className="object-cover object-center"
        priority
      />

      {/* 그라데이션 오버레이 — 하단만 어둡게 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* 텍스트 — 이미지 위에 자연스럽게 */}
      <div className="relative z-10 w-full px-6 pb-14 pt-32 max-w-xl mx-auto">
        {/* 태그 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-5"
        >
          <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
          <span className="text-white/80 text-[12px] font-bold tracking-[0.15em] uppercase">성과형 마케팅 플랫폼</span>
        </motion.div>

        {/* 헤드라인 */}
        {["결제가 일어날 때만", "광고비가 나가는", "마케팅, 시작해요."].map((line, i) => (
          <motion.h1
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
            className={`block font-extrabold leading-[1.2] tracking-tight ${
              i === 2
                ? "text-brand text-[36px] sm:text-[48px]"
                : "text-white text-[36px] sm:text-[48px]"
            }`}
          >
            {line}
          </motion.h1>
        ))}

        {/* 서브카피 */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-white/70 text-[14px] leading-[1.7] mt-4 mb-8 max-w-xs"
        >
          동네 파트너스가 직접 홍보하고, 손님이 실제로 결제할 때만 비용이 차감됩니다. 낭비 없는 마케팅이 시작됩니다.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col gap-3"
        >
          <a
            href="#register"
            className="inline-flex items-center gap-2 px-7 py-4 bg-brand text-white rounded-2xl font-bold text-[15px] shadow-2xl shadow-brand/40 hover:bg-brand-dark transition-all active:scale-[0.97] w-fit"
          >
            무료로 내 가게 등록하기 <ArrowRight className="w-4 h-4" />
          </a>
          <div className="flex items-center gap-4 text-[12px] text-white/60 font-semibold">
            <span>✓ 가입비 0원</span>
            <span>✓ 월 고정비 0원</span>
            <span>✓ 100% 후불제</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
