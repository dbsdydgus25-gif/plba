"use client";
import { motion } from "framer-motion";

const REVIEWS = [
  { quote: "전단지만 뿌리던 저에게 플바는 정말 신세계예요. 결제할 때만 비용이 나가니까 마케팅이 겁나지 않아요.", name: "박○○ 사장님", role: "마포구 고깃집", stars: 5 },
  { quote: "배달앱 수수료에 치여 살다가 플바로 홀 손님을 늘렸더니 진짜로 매출이 올랐습니다.", name: "김○○ 사장님", role: "홍대 카페", stars: 5 },
  { quote: "인스타에 동네 식당 사진 올렸을 뿐인데 리워드가 쌓여요. 용돈벌이 그 이상입니다.", name: "이○○님", role: "파트너스 6개월차", stars: 5 },
  { quote: "노쇼 걱정 없이 마케팅할 수 있어서 너무 좋아요. 결제한 손님한테만 돈이 나가니까요.", name: "최○○ 사장님", role: "강남 미용실", stars: 5 },
];

export default function ReviewSection() {
  return (
    <section className="py-20 bg-[#F9FAFB] border-t border-gray-100">
      <div className="max-w-lg mx-auto px-5 mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-[11px] font-black tracking-[0.3em] text-brand uppercase mb-4">REVIEWS</p>
          <h2 className="text-[28px] sm:text-[36px] font-extrabold leading-[1.25] text-[#191F28]">먼저 쓴 분들의<br />이야기</h2>
        </motion.div>
      </div>

      <div className="overflow-x-auto pb-4 px-5 scrollbar-hide">
        <div className="flex gap-4" style={{ width: "max-content" }}>
          {REVIEWS.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="w-[280px] bg-white border border-gray-100 rounded-[24px] p-6 flex-shrink-0 shadow-sm">
              <div className="flex gap-0.5 mb-4">
                {[...Array(r.stars)].map((_, j) => <span key={j} className="text-yellow-400 text-[13px]">★</span>)}
              </div>
              <p className="text-[13px] text-[#4E5968] leading-[1.7] mb-5">&quot;{r.quote}&quot;</p>
              <div className="border-t border-gray-50 pt-4">
                <p className="text-[#191F28] font-bold text-[13px]">{r.name}</p>
                <p className="text-[#8B95A1] text-[12px]">{r.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
