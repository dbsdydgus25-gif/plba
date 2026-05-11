"use client";
import { motion } from "framer-motion";
import { Link2, Users, Gift } from "lucide-react";


const STEPS = [
  { icon: <Link2 className="w-5 h-5"/>, label: "홍보 링크 생성", desc: "원하는 가게의 고유 링크를 만들어 SNS·커뮤니티에 공유" },
  { icon: <Users className="w-5 h-5"/>, label: "지인·팔로워 방문", desc: "홍보 글을 본 사람들이 가게에 직접 방문해 결제" },
  { icon: <Gift className="w-5 h-5"/>, label: "리워드 즉시 적립", desc: "결제가 확인되는 순간, 파트너에게 리워드가 지급" },
];

export default function Part2Section() {
  return (
    <section className="py-24 px-5 bg-white overflow-hidden">
      <div className="max-w-lg mx-auto">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="mb-12">
          <span className="inline-block text-[11px] font-black tracking-[0.3em] text-brand uppercase bg-brand/10 px-4 py-1.5 rounded-full mb-5">PART 2 · 파트너스편</span>
          <h2 className="text-[28px] sm:text-[38px] font-extrabold leading-[1.3] text-[#191F28]">
            동네 맛집 알려주고<br /><span className="text-brand">리워드 받는 방법</span>
          </h2>
          <p className="mt-4 text-[16px] text-[#4E5968] leading-[1.7]">
            플바 파트너스는 우리 동네 식당·카페를 자유롭게 홍보하고, 자신의 링크를 통해 손님이 오면 리워드를 받는 동네 마케터입니다.
          </p>
        </motion.div>

        <div className="relative mb-12">
          <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-brand/20"/>
          <div className="space-y-6">
            {STEPS.map((s, i) => (
              <motion.div key={i} initial={{opacity:0,x:-16}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.12}} className="flex gap-5 relative">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-brand flex items-center justify-center text-white shadow-lg shadow-brand/30 z-10">{s.icon}</div>
                <div className="pt-1">
                  <p className="font-bold text-[16px] text-[#191F28] mb-1">{s.label}</p>
                  <p className="text-[14px] text-[#4E5968] leading-[1.6]">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="relative rounded-[28px] overflow-hidden bg-[#191F28] p-7 text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full -mr-10 -mt-10"/>
          <p className="text-brand text-[11px] font-black tracking-widest uppercase mb-3">파트너스 후기</p>
          <p className="text-[16px] leading-[1.7] text-[#E5E8EB] mb-4">
            &quot;인스타에 동네 식당 사진 올렸을 뿐인데 친구들이 가게를 찾아가고 저에게 리워드가 쌓여요. 완전 신세계입니다.&quot;
          </p>
          <p className="text-[13px] text-[#8B95A1] font-semibold">마포구 거주 20대 · 파트너스 3개월차</p>
        </motion.div>
      </div>
    </section>
  );
}
