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
    <section className="py-20 px-5 bg-white border-t border-gray-100">
      <div className="max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <p className="text-brand text-[11px] font-black tracking-[0.3em] uppercase mb-4">사장님들의 속마음</p>
          <h2 className="text-[#191F28] text-[32px] sm:text-[40px] font-extrabold leading-[1.25]">
            이런 고민,<br />해보신 적 있나요?
          </h2>
        </motion.div>

        <div className="space-y-4 mb-14">
          {BUBBLES.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: b.side === "right" ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className={`flex ${b.side === "right" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] px-5 py-3.5 rounded-[20px] text-[14px] leading-[1.6] font-medium ${b.side === "right" ? "bg-[#F2F4F6] text-[#191F28] rounded-tr-sm" : "bg-brand/10 text-[#191F28] rounded-tl-sm"}`}>
                {b.text}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand to-brand-dark p-8 text-white">
          <p className="text-white/70 text-[11px] font-black tracking-[0.2em] uppercase mb-3">플바의 해답</p>
          <p className="text-[22px] sm:text-[26px] font-extrabold leading-[1.35]">이 모든 고민의 답,<br />플바에 담았습니다.</p>
          <p className="text-white/80 text-[14px] mt-3">결제가 일어날 때만 비용이 나갑니다.</p>
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
