"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";

const IMAGES = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80",
  "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1200&q=80",
];

export default function HeroSection() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p+1)%IMAGES.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-5 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div key={idx} initial={{opacity:0,scale:1.05}} animate={{opacity:0.25,scale:1}} exit={{opacity:0}} transition={{duration:1.5}} className="absolute inset-0">
            <Image src={IMAGES[idx]} alt="배경" fill className="object-cover" priority />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/75 to-white z-10" />
      </div>

      <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="relative z-20 max-w-lg mx-auto w-full">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand/10 text-brand-dark font-bold text-sm mb-8 border border-brand/10">
          <span className="animate-pulse">🎉</span> 선착순 100곳 사장님 한정 20,000P 무상 지원
        </div>

        <h1 className="text-[36px] sm:text-[52px] font-extrabold leading-[1.2] tracking-[-0.02em] mb-6 text-[#191F28]">
          마케팅비를 썼는데<br />손님이 없다면?
        </h1>
        <p className="text-[18px] sm:text-[22px] text-[#4E5968] font-medium leading-[1.6] mb-10">
          <span className="text-brand font-bold">결제할 때만</span> 광고비가 나가는<br />성과형 마케팅 플랫폼, 플바
        </p>

        <a href="#register" className="inline-flex items-center justify-center gap-2 w-full max-w-sm mx-auto px-8 py-5 bg-brand text-white rounded-2xl font-bold text-[18px] shadow-2xl shadow-brand/40 hover:bg-brand-dark transition-all hover:scale-[1.02] active:scale-[0.98]">
          무료로 내 가게 등록하기 <ArrowRight className="w-5 h-5" />
        </a>

        <div className="mt-6 flex items-center justify-center gap-5 text-[13px] text-[#6B7684] font-semibold">
          <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-brand"/>가입비 0원</span>
          <span className="w-px h-3 bg-gray-300"/>
          <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-brand"/>월 고정비 0원</span>
          <span className="w-px h-3 bg-gray-300"/>
          <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-brand"/>100% 후불제</span>
        </div>
      </motion.div>
    </section>
  );
}
