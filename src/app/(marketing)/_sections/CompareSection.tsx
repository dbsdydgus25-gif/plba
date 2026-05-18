"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { X, Check, TrendingDown, TrendingUp } from "lucide-react";

const COMPARE_ITEMS = [
  {
    topic: "💸 비용 내는 시점",
    old: { label: "네이버 플레이스 / 인스타 광고", val: "광고 집행 전 선불 고정\n결과 없어도 무조건 납부", bad: true },
    plba: { val: "방문이 확인될 때만\n한 건도 안 오면 0원", good: true },
  },
  {
    topic: "📊 효과 측정",
    old: { label: "네이버 플레이스 / 인스타 광고", val: "클릭 수만 보여줌\n실제 방문인지 알 수 없음", bad: true },
    plba: { val: "QR 스캔 기준\n방문 건수 실시간 확인", good: true },
  },
  {
    topic: "📣 홍보 방식",
    old: { label: "네이버 플레이스 / 인스타 광고", val: "광고 끄면 노출 종료\n매달 유지비 발생", bad: true },
    plba: { val: "동네 파트너가 자발적 홍보\n링크만 살아있으면 계속", good: true },
  },
  {
    topic: "💰 초기 진입 비용",
    old: { label: "네이버 플레이스 / 인스타 광고", val: "월 수십만원~\n광고 세팅비 별도", bad: true },
    plba: { val: "가입비 0원\n+ 선착순 20,000P 지원", good: true },
  },
];

export default function CompareSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-[#F4F6FA] px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <span className="inline-block text-[11px] font-bold text-[#5b5bd6] bg-[#5b5bd6]/10 px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
          비교
        </span>
        <h2 className="text-[26px] font-extrabold text-[#191F28] leading-[1.25]">
          기존 광고랑<br />뭐가 다른가요?
        </h2>
        <p className="text-[13px] text-[#8B95A1] mt-2 leading-[1.6]">
          사장님이 가장 많이 쓰는 네이버 플레이스, 인스타 광고와 비교했습니다.
        </p>
      </motion.div>

      {/* 비교 카드 리스트 */}
      <div className="space-y-5">
        {COMPARE_ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: i * 0.1 }}
          >
            {/* 토픽 라벨 */}
            <p className="text-[12px] font-bold text-[#8B95A1] mb-2 ml-1">{item.topic}</p>

            <div className="grid grid-cols-2 gap-2.5">
              {/* 기존 광고 카드 — 나쁜 쪽 */}
              <div className="bg-white rounded-2xl p-4 border border-red-100 relative overflow-hidden">
                {/* 배지 */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-red-500" />
                  </div>
                  <p className="text-[9.5px] font-bold text-red-400 leading-[1.3]">
                    네이버·인스타 광고
                  </p>
                </div>
                <p className="text-[12.5px] font-semibold text-[#191F28] leading-[1.5] whitespace-pre-line">
                  {item.old.val}
                </p>
                {/* 하단 트렌드 아이콘 */}
                <TrendingDown className="absolute bottom-3 right-3 w-5 h-5 text-red-200" />
              </div>

              {/* 플바 카드 — 좋은 쪽 */}
              <div className="bg-[#5b5bd6] rounded-2xl p-4 relative overflow-hidden shadow-md shadow-[#5b5bd6]/20">
                {/* 배지 */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-[9.5px] font-bold text-white/80 leading-[1.3]">
                    플바
                  </p>
                </div>
                <p className="text-[12.5px] font-semibold text-white leading-[1.5] whitespace-pre-line">
                  {item.plba.val}
                </p>
                {/* 배경 장식 */}
                <TrendingUp className="absolute bottom-3 right-3 w-5 h-5 text-white/20" />
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/8 rounded-full" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 핵심 요약 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="mt-8 bg-[#191F28] rounded-3xl p-5 text-white relative overflow-hidden"
      >
        <div className="absolute -right-6 -top-6 w-28 h-28 bg-[#5b5bd6]/15 rounded-full blur-2xl" />
        <p className="text-[12px] opacity-50 mb-2 relative z-10">한 줄 요약</p>
        <p className="text-[17px] font-black leading-[1.45] relative z-10">
          기존 광고는 먼저 내고 기도합니다.<br />
          <span className="text-[#a8b3ff]">플바는 결과가 나온 다음 냅니다.</span>
        </p>
      </motion.div>
    </section>
  );
}
