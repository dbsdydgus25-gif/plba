"use client";
import { motion } from "framer-motion";
import { Wallet, Gift, Users, QrCode, CheckCircle2 } from "lucide-react";

const STEPS = [
  { icon: <Wallet className="w-6 h-6"/>, title: "포인트 충전", desc: "이번 달 예산만큼만 간편 충전", color: "bg-gray-800 text-white" },
  { icon: <Gift className="w-6 h-6"/>, title: "캠페인 & 리워드 설정", desc: "손님 혜택과 파트너 리워드 금액 설정", color: "bg-brand text-white" },
  { icon: <Users className="w-6 h-6"/>, title: "파트너스 자발적 홍보", desc: "동네 파트너들이 SNS·블로그에 홍보 시작", color: "bg-gray-800 text-white" },
  { icon: <QrCode className="w-6 h-6"/>, title: "손님 방문 & QR 스캔", desc: "방문한 손님이 결제 시 QR 스캔", color: "bg-brand text-white" },
  { icon: <CheckCircle2 className="w-6 h-6"/>, title: "자동 정산 완료", desc: "결제 확인 즉시 포인트 차감 + 파트너 리워드 지급", color: "bg-gray-800 text-white" },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 px-5 bg-[#F9FAFB]">
      <div className="max-w-lg mx-auto">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-12">
          <p className="text-[11px] font-black tracking-[0.3em] text-brand uppercase mb-4">HOW IT WORKS</p>
          <h2 className="text-[28px] sm:text-[36px] font-extrabold leading-[1.3] text-[#191F28]">
            앱 하나로 끝나는<br />선순환 마케팅 5단계
          </h2>
        </motion.div>

        <div className="space-y-4">
          {STEPS.map((s, i) => (
            <motion.div key={i} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}} className="flex items-center gap-5 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${s.color} shadow-md`}>
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[11px] font-black text-brand uppercase">STEP {i+1}</span>
                </div>
                <p className="font-bold text-[15px] text-[#191F28]">{s.title}</p>
                <p className="text-[13px] text-[#4E5968] mt-0.5">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
