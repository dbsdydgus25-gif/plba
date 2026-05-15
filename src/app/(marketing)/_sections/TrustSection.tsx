"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CHAT_BUBBLES = [
  {
    publisher: "매일경제",
    text: "배달 수수료 떼고 광고비 내면 남는 게 없어요. 진짜 폐업 고민 중입니다.",
    align: "left",
  },
  {
    publisher: "한국경제",
    text: "전단지 1000장 뿌려봤자 회수율 1%도 안 됩니다. 다 돈 낭비예요.",
    align: "right",
  },
  {
    publisher: "조선비즈",
    text: "큰 맘 먹고 인플루언서 불렀는데, 그날만 반짝하고 손님이 안 오네요.",
    align: "left",
  },
];

// 신뢰 섹션 — 실제 기사 인용 (사회적 증거)
export default function TrustSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-[#191F28] px-6 py-16 border-t border-gray-900">
      {/* 헤드 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-[26px] font-extrabold text-white leading-[1.3] mb-3">
          &quot;광고비만 빨아먹고<br />결과는 블랙박스&quot;
        </h2>
        <p className="text-[14px] text-gray-400 leading-[1.6]">
          불투명한 기존 마케팅 방식,<br />사장님들만 손해보고 있습니다.
        </p>
      </motion.div>

      {/* 말풍선 채팅 */}
      <div className="space-y-6 flex flex-col">
        {CHAT_BUBBLES.map((bubble, i) => {
          const isLeft = bubble.align === "left";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className={`flex flex-col ${isLeft ? "items-start" : "items-end"} w-full`}
            >
              <div
                className={`max-w-[85%] p-4 text-[14.5px] leading-[1.5] font-medium text-[#191F28] shadow-sm
                  ${isLeft 
                    ? "bg-white rounded-2xl rounded-bl-sm" 
                    : "bg-[#F2F4F6] rounded-2xl rounded-br-sm"
                  }
                `}
              >
                {bubble.text}
              </div>
              <p className={`text-[11px] text-gray-500 mt-2 ${isLeft ? "ml-2" : "mr-2"}`}>
                출처: {bubble.publisher}
              </p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 flex flex-col items-center"
      >
        <div className="w-px h-10 bg-gray-700 mb-5" />
        <p className="text-[#a8b3ff] font-bold text-[16px]">그래서 플바가 나왔습니다</p>
      </motion.div>
    </section>
  );
}
