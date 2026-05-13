"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ROWS = [
  { label: "비용 발생 시점", old: "선불 고정", plba: "결제 시에만" },
  { label: "효과 측정", old: "불가능", plba: "실시간 확인" },
  { label: "초기 비용", old: "수십만원~", plba: "가입비 0원" },
  { label: "홍보 지속성", old: "배포 후 끝", plba: "파트너가 자발적 지속" },
  { label: "ROI 보장", old: "없음", plba: "결제 = 비용" },
];

export default function CompareSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-[#F9FAFB] px-6 py-14 border-t border-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <span className="inline-block text-[10px] font-black tracking-[0.25em] text-[#5b5bd6] uppercase bg-[#5b5bd6]/10 px-3 py-1 rounded-full mb-4">
          COMPARE
        </span>
        <h2 className="text-[26px] font-extrabold text-[#191F28] leading-[1.25]">
          기존 광고와<br />뭐가 다른가요?
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm"
      >
        {/* 헤더 */}
        <div className="grid grid-cols-3 bg-white border-b border-gray-100 items-end">
          <div className="p-3 text-[11px] font-bold text-[#8B95A1] pb-4">항목</div>
          <div className="p-3 text-[11px] font-bold text-[#8B95A1] text-center border-l border-gray-100 pb-4">기존 광고</div>
          <div className="p-3 text-[13px] font-black text-white text-center bg-[#5b5bd6] rounded-t-xl shadow-inner relative z-10">
            플바
          </div>
        </div>

        {ROWS.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.15 + i * 0.07 }}
            className={`grid grid-cols-3 border-b border-gray-50 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
          >
            <div className="p-3 text-[12px] font-semibold text-[#191F28] flex items-center">{r.label}</div>
            <div className="p-3 text-[12px] text-[#8B95A1] text-center border-l border-gray-100 flex items-center justify-center">
              {r.old}
            </div>
            <div className={`p-3 text-[12px] text-[#5b5bd6] font-black text-center bg-[#5b5bd6]/10 flex items-center justify-center border-x border-[#5b5bd6]/20 relative z-10 ${i === ROWS.length - 1 ? 'rounded-b-xl border-b' : ''}`}>
              {r.plba}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 핵심 강조 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-5 bg-[#191F28] rounded-3xl p-5 text-white"
      >
        <p className="text-[13px] opacity-60 mb-1">한 줄 요약</p>
        <p className="text-[16px] font-black leading-[1.5]">
          손님이 실제로 결제해야만<br />광고비가 나갑니다.
        </p>
      </motion.div>
    </section>
  );
}
