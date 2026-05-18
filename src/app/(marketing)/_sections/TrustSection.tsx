"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ✅ 수치 없는 정성적 후기로 교체
// ✅ 출처: "OO구 OO 운영 사장님" 형식 (이름/상호명/구체 수치 없음)
const REVIEWS = [
  {
    text: "처음엔 반신반의했는데, 생각보다 빠르게 새 손님이 들어오기 시작했어요. 광고비 걱정 없이 해볼 수 있다는 게 진짜 좋았어요.",
    source: "마포구 고깃집 운영 사장님",
    avatar: "🍖",
    align: "left",
  },
  {
    text: "네이버 광고는 클릭만 되고 실제로 왔는지 알 수가 없잖아요. 플바는 방문 확인이 바로 보여서 믿음이 가더라고요.",
    source: "성수동 카페 운영 사장님",
    avatar: "☕",
    align: "right",
  },
  {
    text: "파트너가 링크 퍼뜨려주는 방식이 신기했어요. 내가 직접 뭔가 안 해도 홍보가 되는 느낌이라 편했어요.",
    source: "홍대 이자카야 운영 사장님",
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
        <span className="inline-block text-[11px] font-bold text-[#5b5bd6] bg-[#5b5bd6]/15 px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
          베타 사장님 후기
        </span>
        <h2 className="text-[26px] font-extrabold text-white leading-[1.3] mb-3">
          써본 사장님들이<br />직접 말합니다
        </h2>
        <p className="text-[14px] text-gray-500 leading-[1.6]">
          초기 베타에 참여한 사장님들의 경험담입니다.
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
                  className={`relative px-4 py-3.5 text-[14px] leading-[1.65] font-medium shadow-lg
                    ${isLeft
                      ? "bg-white text-[#191F28] rounded-2xl rounded-bl-[4px]"
                      : "bg-[#2A2D3A] text-white/90 rounded-2xl rounded-br-[4px] border border-white/8"
                    }`}
                >
                  {r.text}
                </div>
                {/* ✅ 출처: 지역 + 업종 수준만 표기 */}
                <p className={`text-[10.5px] text-gray-600 mt-2 ${isLeft ? "ml-1" : "mr-1"}`}>
                  — {r.source}
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
