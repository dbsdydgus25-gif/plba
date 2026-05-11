"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden flex flex-col bg-[#0F1115]">
      {/* 배경 장식 — 은은한 빛 */}
      <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-brand/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-brand/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />

      {/* Hero Mockup Image */}
      <div className="absolute right-[-10%] top-[15%] w-[80%] aspect-square opacity-60 pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src="/images/app_mockup.png"
            alt="Plus-Alba App"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-[#0F1115]/60 to-transparent" />

      {/* 텍스트 — 이미지 위에 자연스럽게 */}
      <div className="relative z-10 w-full px-6 flex-1 flex flex-col justify-center max-w-xl mx-auto">
        {/* 태그 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="px-3 py-1 bg-brand/20 border border-brand/30 rounded-full">
            <span className="text-brand text-[10px] font-black tracking-[0.2em] uppercase">PERFORMANCE MARKETING</span>
          </div>
        </motion.div>

        {/* 헤드라인 */}
        <div className="space-y-1">
          {["결제가 일어날 때만", "광고비가 나가는", "마케팅의 혁신"].map((line, i) => (
            <motion.h1
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
              className={`block font-extrabold leading-[1.1] tracking-tighter ${
                i === 2
                  ? "text-brand text-[40px] sm:text-[56px]"
                  : "text-white text-[40px] sm:text-[56px]"
              }`}
            >
              {line}
            </motion.h1>
          ))}
        </div>

        {/* 서브카피 */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-white/60 text-[15px] sm:text-[17px] leading-[1.6] mt-6 mb-10 max-w-sm font-medium"
        >
          불확실한 전단지 대신, 실제 매출이 발생할 때만 지불하세요. 동네 전문가들과 함께하는 새로운 마케팅 경험.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col gap-5"
        >
          <a
            href="#register"
            className="group inline-flex items-center justify-center gap-3 px-8 py-5 bg-brand text-white rounded-[24px] font-bold text-[17px] shadow-2xl shadow-brand/40 hover:bg-brand-dark transition-all active:scale-[0.97] w-full sm:w-fit"
          >
            무료로 지금 시작하기 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <div className="flex items-center gap-5 text-[12px] text-white/40 font-bold tracking-tight">
            <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-brand" /> 가입비 0원</span>
            <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-brand" /> 100% 후불제</span>
            <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-brand" /> 선착순 혜택</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
