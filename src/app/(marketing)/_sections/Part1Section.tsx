"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const CASES = [
  {
    tag: "마포구 삼겹살 전문점",
    tagColor: "bg-orange-100 text-orange-700",
    image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&q=80",
    quote: "버려지던 전단지 비용을 실제 방문객 혜택으로 돌렸어요",
    body: "전단지를 뿌려도 몇 명 오는지 몰라 답답했는데, 플바 파트너들이 SNS에 올린 글 덕분에 진짜 손님이 왔습니다. 결제가 일어날 때만 예산이 차감되니 1원도 낭비 없어요.",
  },
  {
    tag: "홍대 로스터리 카페",
    tagColor: "bg-blue-100 text-blue-700",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    quote: "평일 빈자리를 동네 주민들이 채워줍니다",
    body: "배달 수수료 내면 남는 게 없던 카페 장사에 플바는 완벽한 해결책이었습니다. 파트너들 덕에 홀 방문객이 늘어 매출이 30% 이상 성장했어요.",
  },
  {
    tag: "강남구 헤어살롱",
    tagColor: "bg-pink-100 text-pink-700",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80",
    quote: "노쇼 걱정 제로! 머리 다 하고 결제할 때 정산되니까요",
    body: "예약만 하고 안 오는 노쇼 손님들 때문에 마케팅 비용 쓰기가 무서웠어요. 플바는 실제로 카드를 긁는 순간에만 비용이 발생하니 마케팅 효율이 100%입니다.",
  },
];

export default function Part1Section() {
  return (
    <section className="py-24 px-5 bg-[#F9FAFB]">
      <div className="max-w-lg mx-auto">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="mb-12">
          <span className="inline-block text-[11px] font-black tracking-[0.3em] text-brand uppercase bg-brand/10 px-4 py-1.5 rounded-full mb-5">PART 1 · 사장님편</span>
          <h2 className="text-[28px] sm:text-[38px] font-extrabold leading-[1.3] text-[#191F28]">
            결제가 일어날 때만<br /><span className="text-brand">마케팅비가 나갑니다</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {CASES.map((c, i) => (
            <motion.div key={i} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm">
              <div className="relative h-52 w-full">
                <Image src={c.image} alt={c.tag} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                <span className={`absolute top-4 left-4 text-[11px] font-bold px-3 py-1 rounded-full ${c.tagColor}`}>{c.tag}</span>
              </div>
              <div className="p-7">
                <h3 className="text-[19px] font-bold text-[#191F28] mb-4 leading-[1.4]">&quot;{c.quote}&quot;</h3>
                <p className="text-[14px] text-[#4E5968] leading-[1.7]">&quot;{c.body}&quot;</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
