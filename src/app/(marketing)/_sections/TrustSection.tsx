"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const NEWS_ARTICLES = [
  {
    publisher: "매일경제",
    title: `"배달 수수료 떼고, 광고비 내면 남는 게 없어요"`,
    desc: "플랫폼 수수료와 마케팅 비용 증가로 자영업자 폐업 위기 고조...",
  },
  {
    publisher: "한국경제",
    title: "동네 상권 전단지 배포, 회수율 1%도 안 돼",
    desc: "불특정 다수 대상의 오프라인 마케팅, 비용 대비 효과 미미해 실효성 논란...",
  },
  {
    publisher: "조선비즈",
    title: `"인플루언서 리뷰 맡겼더니 손님은 안 오네요"`,
    desc: "수십만 원 광고비 지출에도 실제 결제나 재방문으로 이어지지 않아 분통...",
  },
];

// 신뢰 섹션 — 실제 기사 인용 (사회적 증거)
export default function TrustSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-[#F9FAFB] px-6 py-14 border-t border-gray-100">
      {/* 헤드 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <span className="inline-block text-[10px] font-black tracking-[0.25em] text-[#E11D48] uppercase bg-[#E11D48]/10 px-3 py-1 rounded-full mb-4">
          PROBLEM
        </span>
        <h2 className="text-[26px] font-extrabold text-[#191F28] leading-[1.3] mb-2">
          "광고비만 빨아먹고<br />결과는 블랙박스"
        </h2>
        <p className="text-[14px] text-[#4E5968] leading-[1.6]">
          불투명한 기존 마케팅 방식,<br />사장님들만 손해보고 있습니다.
        </p>
      </motion.div>

      {/* 기사 카드들 */}
      <div className="space-y-4">
        {NEWS_ARTICLES.map((article, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * i }}
            className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm"
          >
            <p className="text-[11px] font-bold text-[#8B95A1] mb-2">{article.publisher}</p>
            <h3 className="text-[15px] font-bold text-[#191F28] leading-[1.4] mb-2">
              {article.title}
            </h3>
            <p className="text-[12px] text-[#6B7684] leading-[1.6]">
              {article.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 flex flex-col items-center"
      >
        <div className="w-px h-8 bg-gray-300 mb-4" />
        <p className="text-[#5b5bd6] font-bold text-[16px]">그래서 플바가 나왔습니다</p>
      </motion.div>
    </section>
  );
}
