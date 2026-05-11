"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const BADGES = ["가입비 0원", "월 고정비 0원", "100% 후불제"];

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[100svh] flex flex-col bg-[#0D0D0D] overflow-hidden">

      {/* 상단 이미지 — 꽉 차게, 선명하게 */}
      <div className="relative w-full h-[55vw] max-h-[320px] flex-shrink-0">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=90"
          alt="활기찬 음식점"
          fill
          className="object-cover object-center"
          priority
        />
        {/* 하단에만 짧게 그라데이션 — 이미지는 선명하게 */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0D0D0D] to-transparent" />
      </div>

      {/* 메인 카피 — 좌측 정렬, 드라마틱 */}
      <div className="flex-1 flex flex-col justify-center px-6 pt-4 pb-10">

        {/* 태그 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 self-start mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
          <span className="text-brand text-[12px] font-black tracking-[0.2em] uppercase">성과형 마케팅 플랫폼</span>
        </motion.div>

        {/* 헤드라인 */}
        <div className="space-y-1 mb-6">
          {["결제가 일어날 때만", "광고비가 나가는", "마케팅이 있다면?"].map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
              className={`font-extrabold tracking-tight leading-[1.15] ${
                i === 2
                  ? "text-brand text-[38px] sm:text-[52px]"
                  : "text-white text-[38px] sm:text-[52px]"
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* 서브 카피 */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-[#8B95A1] text-[15px] leading-[1.7] mb-8 max-w-xs"
        >
          동네 파트너스가 직접 홍보하고, 손님이 실제로 결제할 때만 비용이 차감됩니다. 낭비 없는 마케팅이 시작됩니다.
        </motion.p>

        {/* CTA 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <a
            href="#register"
            className="inline-flex items-center gap-2 px-8 py-5 bg-brand text-white rounded-2xl font-bold text-[16px] shadow-2xl shadow-brand/40 hover:bg-brand-dark transition-all active:scale-[0.97]"
          >
            무료로 내 가게 등록하기
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>

        {/* 배지 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center gap-3 mt-5"
        >
          {BADGES.map((b, i) => (
            <span key={i} className="text-[11px] font-bold text-[#4E5968] flex items-center gap-1">
              <span className="text-brand">✓</span> {b}
            </span>
          ))}
        </motion.div>
      </div>

      {/* 배경 광원 효과 */}
      <div className="pointer-events-none absolute top-[40%] -left-20 w-72 h-72 bg-brand/20 rounded-full blur-[80px]" />
    </section>
  );
}
