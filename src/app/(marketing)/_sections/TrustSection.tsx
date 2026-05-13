"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// 신뢰 섹션 — "이미 N곳이 시작했어요" + 사장님 한마디
export default function TrustSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-white px-6 py-14 border-t border-gray-100">
      {/* 숫자 헤드 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <p className="text-[#5b5bd6] text-[11px] font-black tracking-[0.25em] uppercase mb-3">EARLY ADOPTERS</p>
        <h2 className="text-[28px] font-extrabold text-[#191F28] leading-[1.2] mb-2">
          이미 여러 가게가<br />시작했어요
        </h2>
        <p className="text-[13px] text-[#8B95A1] leading-[1.6]">
          음식점, 카페, 뷰티샵 사장님들이<br />먼저 경험하고 있습니다.
        </p>
      </motion.div>

      {/* 업종 뱃지 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex gap-2 flex-wrap justify-center mb-10"
      >
        {["🍖 고깃집·한식", "☕ 카페·디저트", "🍺 주점·이자카야", "💇 뷰티·네일"].map((tag) => (
          <span key={tag} className="text-[12px] font-semibold bg-[#F3F4F6] text-[#4E5968] px-3 py-1.5 rounded-full">
            {tag}
          </span>
        ))}
      </motion.div>

      {/* 사장님 한마디 카드 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-3xl overflow-hidden shadow-sm border border-gray-100"
      >
        {/* 사진 */}
        <div className="relative h-52 bg-gray-100">
          <Image
            src="/images/owner.png"
            alt="플바를 사용 중인 사장님"
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="text-white font-bold text-[14px]">마포구 음식점 사장님</span>
          </div>
        </div>

        {/* 인용 */}
        <div className="bg-white p-5">
          <div className="text-[#5b5bd6] text-[22px] mb-2 leading-none">&quot;</div>
          <p className="text-[15px] text-[#191F28] font-medium leading-[1.65] mb-3">
            전단지 20만원 써도 몇 명 왔는지 몰랐는데,
            플바는 손님이 결제하면 바로 알림이 와요.
            돈 쓴 게 어디로 갔는지 처음으로 보였어요.
          </p>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-amber-400 text-[13px]">★</span>
              ))}
            </div>
            <span className="text-[12px] text-[#8B95A1]">플바 사용 3주차</span>
          </div>
        </div>
      </motion.div>

      {/* 심플 수치 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="mt-6 grid grid-cols-2 gap-3"
      >
        <div className="bg-[#F9FAFB] rounded-2xl p-4 text-center">
          <p className="text-[#5b5bd6] font-black text-[26px]">0원</p>
          <p className="text-[11px] text-[#8B95A1] mt-1">손님 없을 때 광고비</p>
        </div>
        <div className="bg-[#F9FAFB] rounded-2xl p-4 text-center">
          <p className="text-[#5b5bd6] font-black text-[26px]">실시간</p>
          <p className="text-[11px] text-[#8B95A1] mt-1">결제 발생 즉시 알림</p>
        </div>
      </motion.div>
    </section>
  );
}
