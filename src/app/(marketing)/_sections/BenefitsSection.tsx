"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const BENEFITS = [
  {
    emoji: "💸",
    title: "광고비 낭비가 없어집니다",
    desc: "손님이 오지 않으면 한 푼도 나가지 않아요. 전단지처럼 태워버리는 마케팅비가 사라집니다.",
  },
  {
    emoji: "📊",
    title: "효과를 숫자로 봅니다",
    desc: "파트너별 방문 수, 결제 금액, 활성 캠페인을 앱에서 실시간 확인. 어디서 손님이 오는지 정확히 보입니다.",
  },
  {
    emoji: "🙋",
    title: "홍보는 동네 파트너가 합니다",
    desc: "내 가게를 직접 다녀본 동네 사람들이 SNS에서 자발적으로 홍보해요. 가장 신뢰도 높은 광고입니다.",
  },
];

export default function BenefitsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-white px-6 py-14 border-t border-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <span className="inline-block text-[10px] font-black tracking-[0.25em] text-[#5b5bd6] uppercase bg-[#5b5bd6]/10 px-3 py-1 rounded-full mb-4">
          OWNER BENEFITS
        </span>
        <h2 className="text-[26px] font-extrabold text-[#191F28] leading-[1.25]">
          사장님이 실제로<br />달라지는 것 3가지
        </h2>
        <p className="text-[13px] text-[#8B95A1] mt-2 leading-[1.6]">
          기능 설명보다 결과가 먼저입니다.
        </p>
      </motion.div>

      <div className="space-y-4">
        {BENEFITS.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: i * 0.12 }}
            className="bg-[#F9FAFB] rounded-3xl p-5 border border-gray-100"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                {b.emoji}
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#191F28] mb-2 leading-[1.35]">{b.title}</h3>
                <p className="text-[13px] text-[#6B7684] leading-[1.65]">{b.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 성과 대시보드 미리보기 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.45, delay: 0.45 }}
        className="mt-6 bg-[#F9FAFB] border border-gray-100 rounded-3xl p-5"
      >
        <div className="flex justify-between items-center mb-3">
          <p className="text-[11px] text-[#8B95A1] font-bold uppercase tracking-wider">앱 대시보드 미리보기</p>
          <p className="text-[10px] text-[#8B95A1] font-medium bg-gray-100 px-2 py-0.5 rounded-full">💡 실제 매장 예시 화면</p>
        </div>
        <div className="bg-[#5b5bd6] rounded-2xl p-4 text-white mb-3">
          <p className="text-[11px] opacity-70 mb-1">플바로 늘어난 매출</p>
          <p className="font-black text-[28px] tracking-tight">₩1,847,300</p>
          <p className="text-[11px] opacity-70 mt-1">지난 달 대비 +414,500원 증가했어요</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "방문 손님", val: "142명", sub: "+24" },
            { label: "활성 파트너", val: "17명", sub: "+3" },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-3">
              <p className="text-[11px] text-[#8B95A1]">{item.label}</p>
              <p className="text-[18px] font-black text-[#191F28] mt-0.5">{item.val}</p>
              <p className="text-[11px] text-green-600 font-bold">{item.sub}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
