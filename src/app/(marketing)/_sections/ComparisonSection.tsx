"use client";
import { motion } from "framer-motion";

const ROWS = [
  { label: "광고비 과금 시점", bad1: "제작 전 선불", bad2: "클릭 시 차감", good: "결제 시만" },
  { label: "매출 연결 보장", bad1: "불가", bad2: "낮음", good: "100% 보장" },
  { label: "초기 비용", bad1: "수십만 원", bad2: "최소예산 필수", good: "0원" },
  { label: "홍보 지속성", bad1: "배포 후 종료", bad2: "예산 소진 종료", good: "자발적 지속" },
];

export default function ComparisonSection() {
  return (
    <section className="py-20 px-5 bg-[#0D0D0D] border-t border-white/5">
      <div className="max-w-lg mx-auto">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <h2 className="text-[28px] sm:text-[36px] font-extrabold leading-[1.25] text-white">
            기존 마케팅과<br />비교해 보세요.
          </h2>
          <p className="mt-2 text-[15px] text-brand font-bold">답은 정해져 있습니다.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[24px] overflow-hidden border border-white/5">
          {/* 헤더 */}
          <div className="grid grid-cols-4 bg-[#141414] border-b border-white/5">
            <div className="p-3 text-[10px] font-bold text-[#4E5968]">항목</div>
            <div className="p-3 text-[10px] font-bold text-[#4E5968] text-center">전단지</div>
            <div className="p-3 text-[10px] font-bold text-[#4E5968] text-center">SNS광고</div>
            <div className="p-3 text-[10px] font-black text-brand text-center bg-brand/10">플바</div>
          </div>
          {/* 바디 */}
          {ROWS.map((r, i) => (
            <div key={i} className={`grid grid-cols-4 border-b border-white/5 last:border-0 ${i % 2 === 0 ? "bg-[#0D0D0D]" : "bg-[#111111]"}`}>
              <div className="p-3 text-[11px] font-bold text-white flex items-center">{r.label}</div>
              <div className="p-3 text-[11px] text-[#4E5968] text-center flex items-center justify-center">{r.bad1}</div>
              <div className="p-3 text-[11px] text-[#4E5968] text-center flex items-center justify-center">{r.bad2}</div>
              <div className="p-3 text-[11px] text-brand font-black text-center bg-brand/5 flex items-center justify-center">{r.good}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
