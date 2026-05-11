"use client";
import { motion } from "framer-motion";
import { Map, BarChart3, QrCode } from "lucide-react";
import Image from "next/image";

const FEATURES = [
  { icon: <BarChart3 className="w-5 h-5 text-brand" />, label: "매출 대시보드", desc: "플바로 늘어난 매출과 성과를 한눈에" },
  { icon: <Map className="w-5 h-5 text-brand" />, label: "동네 파트너 매칭", desc: "우리 동네 홍보 고수들이 내 가게를 홍보" },
  { icon: <QrCode className="w-5 h-5 text-brand" />, label: "실시간 정산", desc: "QR 스캔 즉시 매출 차감 및 리워드 지급" },
];

export default function AppPreviewSection() {
  return (
    <section className="py-24 px-5 bg-[#F9FAFB] overflow-hidden">
      <div className="max-w-lg mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-16"
        >
          <span className="inline-block text-[11px] font-black tracking-[0.3em] text-brand uppercase bg-brand/10 border border-brand/20 px-4 py-1.5 rounded-full mb-5">NEXT-GEN APP</span>
          <h2 className="text-[30px] sm:text-[40px] font-extrabold leading-[1.25] text-[#191F28] mb-4">
            앱 하나로 완성되는<br /><span className="text-brand">마케팅 자동화</span>
          </h2>
          <p className="text-[15px] text-[#4E5968] leading-[1.7]">
            복잡한 설정 없이 앱만 켜면 시작됩니다.<br />
            사장님, 파트너, 손님 모두가 만족하는 경험을 선사합니다.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }}
          className="relative mb-16 aspect-square w-full max-w-[400px] mx-auto"
        >
          <div className="absolute inset-0 bg-brand/5 rounded-full blur-3xl scale-110" />
          <Image 
            src="/images/app_mockup.png" 
            alt="Plus-Alba App Mockup" 
            fill 
            className="object-contain relative z-10"
          />
        </motion.div>

        <div className="space-y-4">
          {FEATURES.map((f, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-5 bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center">
                {f.icon}
              </div>
              <div>
                <p className="font-bold text-[16px] text-[#191F28] mb-1">{f.label}</p>
                <p className="text-[13px] text-[#8B95A1] leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
