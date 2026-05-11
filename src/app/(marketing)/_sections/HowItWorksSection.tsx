"use client";
import { motion } from "framer-motion";
import { Wallet, Gift, Users, QrCode, CheckCircle2 } from "lucide-react";

const STEPS = [
  { icon: <Wallet className="w-5 h-5 text-[#4E5968]"/>, title: "포인트 충전", desc: "이번 달 예산만큼 간편 충전", accent: false },
  { icon: <Gift className="w-5 h-5 text-white"/>, title: "캠페인 & 리워드 설정", desc: "손님 혜택과 파트너 리워드 금액 설정", accent: true },
  { icon: <Users className="w-5 h-5 text-[#4E5968]"/>, title: "파트너스 자발적 홍보", desc: "동네 파트너들이 SNS·블로그에 홍보 시작", accent: false },
  { icon: <QrCode className="w-5 h-5 text-white"/>, title: "손님 방문 & QR 스캔", desc: "방문 손님이 결제 시 QR 스캔으로 확인", accent: true },
  { icon: <CheckCircle2 className="w-5 h-5 text-[#4E5968]"/>, title: "자동 정산 완료", desc: "결제 확인 즉시 차감 + 파트너 리워드 지급", accent: false },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 px-5 bg-[#F9FAFB] border-t border-gray-100">
      <div className="max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-[11px] font-black tracking-[0.3em] text-brand uppercase mb-4">HOW IT WORKS</p>
          <h2 className="text-[28px] sm:text-[36px] font-extrabold leading-[1.25] text-[#191F28]">앱 하나로 끝나는<br />선순환 마케팅 5단계</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[23px] top-10 bottom-10 w-px bg-gray-200" />
          <div className="space-y-4">
            {STEPS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-4 relative">
                <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm z-10 ${s.accent ? "bg-brand shadow-brand/30" : "bg-white border border-gray-200"}`}>
                  {s.icon}
                </div>
                <div className="flex-1 bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="font-bold text-[14px] text-[#191F28]">{s.title}</p>
                    <span className="text-[10px] font-black text-brand/50 tabular-nums">0{i+1}</span>
                  </div>
                  <p className="text-[12px] text-[#8B95A1]">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
