"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const CASES = [
  {
    tag: "마포구 삼겹살 전문점",
    tagColor: "bg-orange-500/20 text-orange-400",
    image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=800&q=80",
    quote: "버려지던 전단지 비용을\n실제 방문객 혜택으로 돌렸어요",
    body: "결제가 일어날 때만 예산이 차감되니 1원도 낭비되는 느낌이 없어요. 파트너들이 SNS에 홍보 글을 올리고 실제 손님을 데려옵니다.",
    stat: "월 방문객 +42%",
  },
  {
    tag: "홍대 로스터리 카페",
    tagColor: "bg-blue-500/20 text-blue-400",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    quote: "평일 빈자리를\n동네 주민들이 채워줍니다",
    body: "배달 수수료 내면 남는 게 없던 카페 장사. 플바 파트너들 덕에 홀 방문객이 눈에 띄게 늘었습니다.",
    stat: "매출 +30% 성장",
  },
  {
    tag: "강남구 헤어살롱",
    tagColor: "bg-pink-500/20 text-pink-400",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80",
    quote: "노쇼 걱정 제로!\n머리 다 하고 결제할 때 정산돼요",
    body: "매장에서 실제로 카드를 긁는 순간에만 리워드가 발생하니 마케팅 효율이 100%입니다.",
    stat: "노쇼율 0%",
  },
];

export default function Part1Section() {
  return (
    <section className="py-20 bg-[#111111]">
      <div className="px-5 max-w-lg mx-auto">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <span className="inline-block text-[11px] font-black tracking-[0.3em] text-brand uppercase bg-brand/10 border border-brand/20 px-4 py-1.5 rounded-full mb-5">
            PART 1 · 사장님편
          </span>
          <h2 className="text-[30px] sm:text-[40px] font-extrabold leading-[1.25] text-white">
            결제가 일어날 때만<br />
            <span className="text-brand">마케팅비가 나갑니다</span>
          </h2>
          <p className="mt-3 text-[14px] text-[#8B95A1] leading-[1.7]">
            이미 많은 사장님들이 광고비 낭비를 멈추고 플바와 함께하고 있습니다.
          </p>
        </motion.div>

      </div>

      {/* 카드 — 좌우 여백 없이 꽉 차게 */}
      <div className="space-y-6 px-5 max-w-lg mx-auto">
        {CASES.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-[28px] overflow-hidden bg-[#161616] border border-white/5"
          >
            {/* 이미지 — 선명하게 */}
            <div className="relative h-52 w-full">
              <Image src={c.image} alt={c.tag} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${c.tagColor}`}>{c.tag}</span>
                <span className="text-[12px] font-black text-white bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">{c.stat}</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-[18px] font-bold text-white mb-3 leading-[1.4] whitespace-pre-line">&quot;{c.quote}&quot;</h3>
              <p className="text-[13px] text-[#8B95A1] leading-[1.7]">{c.body}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA 링크 */}
      <div className="px-5 max-w-lg mx-auto mt-10">
        <a href="#register" className="flex items-center justify-center gap-2 w-full py-5 border border-white/10 rounded-2xl text-white font-bold text-[15px] hover:bg-white/5 transition-all">
          나도 등록하러 가기 <ArrowRight className="w-4 h-4"/>
        </a>
      </div>
    </section>
  );
}
