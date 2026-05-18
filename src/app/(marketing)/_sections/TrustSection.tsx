"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CHAT_BUBBLES = [
  {
    publisher: "매일경제",
    text: "배달 수수료 떼고 광고비 내면 남는 게 없어요. 진짜 폐업 고민 중입니다.",
    align: "left",
    avatar: "🏠",
  },
  {
    publisher: "한국경제",
    text: "전단지 1000장 뿌려봤자 회수율 1%도 안 됩니다. 다 돈 낭비예요.",
    align: "right",
    avatar: "🍖",
  },
  {
    publisher: "조선비즈",
    text: "큰 맘 먹고 인플루언서 불렀는데, 그날만 반짝하고 손님이 안 오네요.",
    align: "left",
    avatar: "☕",
  },
];

export default function TrustSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-[#13161D] px-6 py-16">
      {/* 헤드 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        {/* 섹션 라벨 */}
        <span className="inline-block text-[11px] font-bold text-[#5b5bd6] bg-[#5b5bd6]/15 px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
          실제 사장님들의 목소리
        </span>
        <h2 className="text-[26px] font-extrabold text-white leading-[1.3] mb-3">
          &quot;광고비만 빨아먹고<br />결과는 블랙박스&quot;
        </h2>
        <p className="text-[14px] text-gray-500 leading-[1.6]">
          불투명한 기존 마케팅 방식,<br />사장님들만 손해보고 있습니다.
        </p>
      </motion.div>

      {/* 말풍선 채팅 — 강화 버전 */}
      <div className="space-y-8 flex flex-col">
        {CHAT_BUBBLES.map((bubble, i) => {
          const isLeft = bubble.align === "left";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className={`flex ${isLeft ? "flex-row" : "flex-row-reverse"} items-end gap-3 w-full`}
            >
              {/* 아바타 */}
              <div className="w-9 h-9 rounded-full bg-[#1E2230] flex items-center justify-center text-[18px] flex-shrink-0 border border-white/8">
                {bubble.avatar}
              </div>

              <div className={`flex flex-col ${isLeft ? "items-start" : "items-end"} max-w-[82%]`}>
                {/* 말풍선 */}
                <div
                  className={`relative px-4 py-3.5 text-[14.5px] leading-[1.55] font-medium shadow-lg
                    ${isLeft
                      ? "bg-white text-[#191F28] rounded-2xl rounded-bl-[4px]"
                      : "bg-[#2A2D3A] text-white/90 rounded-2xl rounded-br-[4px] border border-white/8"
                    }`}
                >
                  {/* 말풍선 꼬리 */}
                  {isLeft && (
                    <span className="absolute -bottom-[6px] left-[0px] w-3 h-3 bg-white clip-tail-left" />
                  )}
                  {!isLeft && (
                    <span className="absolute -bottom-[6px] right-[0px] w-3 h-3 bg-[#2A2D3A] clip-tail-right" />
                  )}
                  {bubble.text}
                </div>
                {/* 출처 */}
                <p className={`text-[10.5px] text-gray-600 mt-2 ${isLeft ? "ml-1" : "mr-1"}`}>
                  출처: {bubble.publisher}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 구분 → 해결책으로 전환 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-14 flex flex-col items-center"
      >
        <div className="flex flex-col items-center gap-2 mb-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-0.5 h-2 bg-[#5b5bd6] rounded-full"
              style={{ opacity: 1 - i * 0.25 }}
            />
          ))}
        </div>
        <p className="text-[#a8b3ff] font-bold text-[16px]">그래서 플바가 나왔습니다</p>
      </motion.div>
    </section>
  );
}
