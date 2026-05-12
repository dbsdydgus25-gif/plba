"use client";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative bg-[#5b5bd6] min-h-[100svh] flex flex-col overflow-hidden">
      {/* 배경 원 장식 */}
      <div className="absolute top-[-80px] right-[-80px] w-[280px] h-[280px] rounded-full bg-white/5" />
      <div className="absolute top-[60px] right-[-40px] w-[180px] h-[180px] rounded-full bg-white/5" />

      {/* 상단 로고 */}
      <div className="relative z-10 px-6 pt-14 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center">
            <span className="text-[#5b5bd6] font-black text-[14px]">P</span>
          </div>
          <span className="text-white font-black text-[18px] tracking-tight">plba.</span>
        </div>
      </div>

      {/* 메인 카피 */}
      <div className="relative z-10 px-6 pt-8 pb-6 flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-3 py-1 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/90 text-[11px] font-bold tracking-widest uppercase">성과형 마케팅 플랫폼</span>
          </div>

          <h1 className="text-white font-black text-[38px] leading-[1.15] tracking-tight mb-4">
            결제가 일어날 때만<br />
            <span className="text-white/60">광고비가 나갑니다</span>
          </h1>
          <p className="text-white/70 text-[15px] leading-[1.65] mb-8">
            동네 파트너가 홍보하고, 손님이 실제로 결제해야만 비용이 차감됩니다.
            낭비 없는 마케팅의 시작.
          </p>

          <div className="flex gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-4 py-2">
              <span className="text-white text-[13px] font-semibold">✓ 가입비 0원</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-4 py-2">
              <span className="text-white text-[13px] font-semibold">✓ 100% 후불제</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-4 py-2">
              <span className="text-white text-[13px] font-semibold">✓ 선착순 2만P 지원</span>
            </div>
          </div>
        </motion.div>

        {/* 앱 화면 미리보기 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-auto pt-10 flex justify-center"
        >
          <div className="relative w-[200px]">
            {/* 폰 프레임 */}
            <div className="bg-[#111] rounded-[36px] p-2 shadow-2xl shadow-black/50 ring-2 ring-white/10">
              <div className="bg-white rounded-[28px] overflow-hidden">
                <Image
                  src="/images/ux/home_roles.png"
                  alt="플바 앱 화면"
                  width={196}
                  height={380}
                  className="w-full h-auto object-cover object-top"
                  style={{ maxHeight: "260px" }}
                />
              </div>
            </div>
            {/* 뱃지 */}
            <div className="absolute -right-8 top-8 bg-white rounded-2xl px-3 py-2 shadow-xl shadow-black/20">
              <p className="text-[10px] text-gray-500 font-medium">이번 달 매출</p>
              <p className="text-[#5b5bd6] font-black text-[14px]">₩1,847,300</p>
            </div>
            <div className="absolute -left-8 bottom-8 bg-white rounded-2xl px-3 py-2 shadow-xl shadow-black/20">
              <p className="text-[10px] text-gray-500 font-medium">적립 포인트</p>
              <p className="text-green-600 font-black text-[14px]">+47,800P</p>
            </div>
          </div>
        </motion.div>

        {/* 스크롤 유도 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-2 pt-8 pb-6"
        >
          <span className="text-white/50 text-[12px] font-medium">아래로 내려서 플로우 확인</span>
          <ArrowDown className="w-4 h-4 text-white/40 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
