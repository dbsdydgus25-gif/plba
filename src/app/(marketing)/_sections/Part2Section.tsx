"use client";
import { motion } from "framer-motion";
import { Link2, Users, Gift } from "lucide-react";

const STEPS = [
  { icon: <Link2 className="w-5 h-5"/>, label: "홍보 링크 생성", desc: "원하는 가게의 고유 링크를 만들어 SNS·커뮤니티에 공유", num: "01" },
  { icon: <Users className="w-5 h-5"/>, label: "지인·팔로워 방문", desc: "홍보 글을 본 사람들이 가게에 직접 방문해 결제", num: "02" },
  { icon: <Gift className="w-5 h-5"/>, label: "리워드 즉시 적립", desc: "결제가 확인되는 순간, 파트너에게 리워드가 지급됩니다", num: "03" },
];

export default function Part2Section() {
  return (
    <section className="py-20 px-5 bg-[#0D0D0D] border-t border-white/5">
      <div className="max-w-lg mx-auto">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <span className="inline-block text-[11px] font-black tracking-[0.3em] text-brand uppercase bg-brand/10 border border-brand/20 px-4 py-1.5 rounded-full mb-5">
            PART 2 · 파트너스편
          </span>
          <h2 className="text-[30px] sm:text-[40px] font-extrabold leading-[1.25] text-white">
            동네 맛집 알려주고<br />
            <span className="text-brand">리워드 받는 방법</span>
          </h2>
          <p className="mt-3 text-[14px] text-[#8B95A1] leading-[1.7]">
            플바 파트너스는 우리 동네 식당·카페를 자유롭게 홍보하고, 손님이 결제하면 리워드를 받습니다.
          </p>
        </motion.div>

        {/* 스텝 카드 */}
        <div className="space-y-4 mb-10">
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-5 bg-[#141414] border border-white/5 rounded-2xl p-5"
            >
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <span className="text-[10px] font-black text-brand/60 tabular-nums">{s.num}</span>
                <div className="w-12 h-12 rounded-2xl bg-brand flex items-center justify-center text-white shadow-lg shadow-brand/30">
                  {s.icon}
                </div>
              </div>
              <div>
                <p className="font-bold text-[15px] text-white mb-1">{s.label}</p>
                <p className="text-[13px] text-[#8B95A1] leading-[1.6]">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 파트너 후기 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[24px] overflow-hidden bg-gradient-to-br from-brand to-brand-dark p-7 text-white"
        >
          <p className="text-white/60 text-[11px] font-black tracking-[0.2em] uppercase mb-3">파트너스 후기</p>
          <p className="text-[16px] leading-[1.7] mb-4">
            &quot;인스타에 동네 식당 사진 올렸을 뿐인데 친구들이 찾아가고 저에게 리워드가 쌓여요. 용돈벌이 그 이상입니다.&quot;
          </p>
          <p className="text-[13px] text-white/70 font-semibold">마포구 거주 20대 · 파트너스 3개월차</p>
          <div className="pointer-events-none absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
