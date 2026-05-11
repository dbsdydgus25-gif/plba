"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// 헤어살롱(3번째) 이미지 제거 — AI티 나는 이미지 삭제
const CASES = [
  {
    tag: "마포구 삼겹살 전문점",
    tagBg: "bg-orange-50 text-orange-600 border-orange-100",
    image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=800&q=80",
    quote: "버려지던 전단지 비용을\n실제 방문객 혜택으로 돌렸어요",
    body: "결제가 일어날 때만 예산이 차감되니 1원도 낭비되는 느낌이 없어요. 파트너들이 SNS에 홍보 글을 올리고 실제 손님을 데려옵니다.",
  },
  {
    tag: "홍대 로스터리 카페",
    tagBg: "bg-blue-50 text-blue-600 border-blue-100",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    quote: "평일 빈자리를\n동네 주민들이 채워줍니다",
    body: "배달 수수료 내면 남는 게 없던 카페 장사. 플바 파트너들 덕에 홀 방문객이 눈에 띄게 늘어 매출이 30% 이상 성장했어요.",
  },
];

export default function Part1Section() {
  return (
    <section className="py-20 bg-[#F9FAFB] border-t border-gray-100">
      <div className="px-5 max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <span className="inline-block text-[11px] font-black tracking-[0.3em] text-brand uppercase bg-brand/10 border border-brand/20 px-4 py-1.5 rounded-full mb-5">PART 1 · 사장님편</span>
          <h2 className="text-[30px] sm:text-[40px] font-extrabold leading-[1.25] text-[#191F28]">
            결제가 일어날 때만<br /><span className="text-brand">마케팅비가 나갑니다</span>
          </h2>
          <p className="mt-3 text-[14px] text-[#4E5968] leading-[1.7]">이미 많은 사장님들이 광고비 낭비를 멈추고 플바와 함께하고 있습니다.</p>
        </motion.div>

        <div className="space-y-6">
          {CASES.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-[28px] overflow-hidden bg-white border border-gray-100 shadow-sm">
              <div className="relative h-52 w-full">
                <Image src={c.image} alt={c.tag} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className={`absolute top-4 left-4 text-[11px] font-bold px-3 py-1 rounded-full border ${c.tagBg}`}>{c.tag}</span>
              </div>
              <div className="p-6">
                <h3 className="text-[18px] font-bold text-[#191F28] mb-3 leading-[1.4] whitespace-pre-line">&quot;{c.quote}&quot;</h3>
                <p className="text-[13px] text-[#4E5968] leading-[1.7]">{c.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8">
          <a href="#register" className="flex items-center justify-center gap-2 w-full py-5 border-2 border-brand text-brand rounded-2xl font-bold text-[15px] hover:bg-brand hover:text-white transition-all">
            나도 등록하러 가기 <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
