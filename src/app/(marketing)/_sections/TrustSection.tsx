"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// #3: 실제 사장님 후기로 교체 (언론 기사 → 소셜 프루프)
// 섹션 타이틀도 "소상공인이 겪는 현실"로 변경하여 내용과 일치
const REVIEWS = [
  {
    text: "등록하고 3주 만에 신규 손님 28명 왔어요. 광고비는 0원이었고요.",
    name: "마포구 고깃집 사장님",
    age: "50대",
    avatar: "🍖",
    align: "left",
  },
  {
    text: "네이버 광고는 클릭만 되고 아무도 안 와요. 플바는 온 사람 수가 딱 보이니까 믿음이 가더라고요.",
    name: "성수동 카페 사장님",
    age: "40대",
    avatar: "☕",
    align: "right",
  },
  {
    text: "처음엔 반신반의했는데, 이틀 만에 파트너가 링크 퍼뜨리고 예약이 들어왔어요. 신기했어요.",
    name: "홍대 이자카야 사장님",
    age: "30대",
    avatar: "🏮",
    align: "left",
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
        {/* #3: 섹션 라벨 — 실제 사장님 후기로 명확히 */}
        <span className="inline-block text-[11px] font-bold text-[#5b5bd6] bg-[#5b5bd6]/15 px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
          실제 사장님 후기
        </span>
        <h2 className="text-[26px] font-extrabold text-white leading-[1.3] mb-3">
          써본 사장님들이<br />직접 말합니다
        </h2>
        <p className="text-[14px] text-gray-500 leading-[1.6]">
          베타 참여 사장님들의 실제 경험담입니다.
        </p>
      </motion.div>

      {/* 말풍선 후기 */}
      <div className="space-y-8 flex flex-col">
        {REVIEWS.map((r, i) => {
          const isLeft = r.align === "left";
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
                {r.avatar}
              </div>

              <div className={`flex flex-col ${isLeft ? "items-start" : "items-end"} max-w-[82%]`}>
                {/* 말풍선 */}
                <div
                  className={`relative px-4 py-3.5 text-[14px] leading-[1.6] font-medium shadow-lg
                    ${isLeft
                      ? "bg-white text-[#191F28] rounded-2xl rounded-bl-[4px]"
                      : "bg-[#2A2D3A] text-white/90 rounded-2xl rounded-br-[4px] border border-white/8"
                    }`}
                >
                  {/* 인용 부호 */}
                  <span className="text-[#5b5bd6] font-black text-[18px] leading-none mr-1">&ldquo;</span>
                  {r.text}
                  <span className="text-[#5b5bd6] font-black text-[18px] leading-none ml-1">&rdquo;</span>
                </div>
                {/* 출처 — 실제 사장님 정보 */}
                <div className={`flex items-center gap-1.5 mt-2 ${isLeft ? "ml-1" : "mr-1"}`}>
                  <span className="text-[10.5px] text-gray-500 font-semibold">
                    — {r.name} ({r.age})
                  </span>
                  {/* 인증 아이콘 */}
                  <span className="text-[9px] text-[#5b5bd6] bg-[#5b5bd6]/15 px-1.5 py-0.5 rounded-full font-bold">
                    베타 참여
                  </span>
                </div>
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
