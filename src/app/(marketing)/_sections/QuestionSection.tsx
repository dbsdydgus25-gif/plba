"use client";
import { motion } from "framer-motion";

const BUBBLES = [
  { side: "right", text: "전단지 뿌렸는데... 오늘 몇 명 왔는지 알 수가 없어" },
  { side: "left",  text: "배달앱 수수료 내면 팔아도 남는 게 없고..." },
  { side: "right", text: "인스타 광고비 썼는데 클릭만 있고 매출은 없고" },
  { side: "left",  text: "체험단 불렀더니 노쇼에 후기도 없어..." },
  { side: "right", text: "그냥 성과 날 때만 돈 내고 싶은데" },
];

export default function QuestionSection() {
  return (
    <section className="py-20 px-5 bg-[#0D0D0D]">
      <div className="max-w-lg mx-auto">

        {/* 헤더 — 좌측 정렬 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-brand text-[11px] font-black tracking-[0.3em] uppercase mb-4">사장님들의 속마음</p>
          <h2 className="text-white text-[32px] sm:text-[40px] font-extrabold leading-[1.25]">
            이런 고민,<br />해보신 적 있나요?
          </h2>
        </motion.div>

        {/* 채팅 말풍선 */}
        <div className="space-y-4 mb-14">
          {BUBBLES.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: b.side === "right" ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`flex ${b.side === "right" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] px-5 py-3.5 rounded-[20px] text-[14px] leading-[1.6] font-medium ${
                b.side === "right"
                  ? "bg-[#1E1E1E] text-[#D1D6DC] rounded-tr-sm"
                  : "bg-[#252525] text-[#D1D6DC] rounded-tl-sm"
              }`}>
                {b.text}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 해답 강조 박스 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand to-brand-dark opacity-90" />
          <div className="relative z-10 p-8">
            <p className="text-white/70 text-[12px] font-black tracking-[0.2em] uppercase mb-3">플바의 해답</p>
            <p className="text-white text-[22px] sm:text-[26px] font-extrabold leading-[1.35]">
              이 모든 고민의 답,<br />플바에 담았습니다.
            </p>
            <p className="text-white/80 text-[14px] mt-3 leading-[1.6]">
              결제가 일어날 때만 비용이 나갑니다.
            </p>
          </div>
          <div className="pointer-events-none absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full" />
        </motion.div>

      </div>
    </section>
  );
}
