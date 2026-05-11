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
              <div className="relative h-60 w-full overflow-hidden bg-gray-50">
                <Image src={c.image} alt={c.tag} fill className="object-cover opacity-90 scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                
                {/* App UI Overlay Simulation */}
                <div className="absolute inset-x-4 top-4">
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-brand flex items-center justify-center shadow-md shadow-brand/20">
                          <span className="text-[10px] font-black text-white">P</span>
                        </div>
                        <div>
                          <p className="text-[12px] font-black text-[#191F28]">{c.tag}</p>
                          <p className="text-[10px] text-brand font-bold">인증 완료 · 실시간</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-[#8B95A1] font-bold uppercase tracking-tighter">Today</p>
                        <p className="text-[14px] font-black text-[#191F28] tracking-tighter">₩{i === 0 ? "1,847,300" : "942,000"}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 h-6 items-end px-1">
                      {[30, 45, 35, 60, 55, 80, 70, 95, 85].map((h, idx) => (
                        <div key={idx} className="flex-1 bg-brand/30 rounded-t-[2px]" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
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
