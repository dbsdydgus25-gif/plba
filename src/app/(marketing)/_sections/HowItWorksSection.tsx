"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// 3단계 플로우 + 파트너/소비자 생태계 압축
export default function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const STEPS = [
    {
      num: "01",
      actor: "🏪 사장님",
      title: "캠페인 개설",
      desc: "혜택 금액과 파트너 리워드를 설정. 3분이면 완료.",
      screen: "/images/ux/owner_campaign.png",
    },
    {
      num: "02",
      actor: "📣 파트너",
      title: "고유 링크로 홍보",
      desc: "동네 파트너가 SNS·카톡에 공유. 비용은 사장님 부담 없음.",
      screen: "/images/ux/partner_link.png",
    },
    {
      num: "03",
      actor: "🎁 손님",
      title: "방문 후 결제",
      desc: "손님이 결제하면 그 순간 포인트가 차감됩니다.",
      screen: "/images/ux/owner_qr_scan.png",
    },
  ];

  return (
    <section ref={ref} className="bg-[#F9FAFB] px-6 py-14 border-t border-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >

        <h2 className="text-[26px] font-extrabold text-[#191F28] leading-[1.25]">
          3단계로 끝나는<br />성과형 마케팅
        </h2>
      </motion.div>

      {/* 3단계 플로우 (타임라인) */}
      <div className="relative mt-8">
        {/* 전체 연결선 */}
        <div className="absolute left-[19px] top-[24px] bottom-[120px] w-[2px] bg-[#5b5bd6]/20 z-0" />
        
        {STEPS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: i * 0.12 }}
            className="relative z-10 flex gap-6 pb-12 last:pb-4"
          >
            {/* 타임라인 노드 */}
            <div className="w-10 h-10 rounded-full bg-white border-[3px] border-[#5b5bd6] flex items-center justify-center flex-shrink-0 shadow-sm relative z-10 mt-1">
              <span className="text-[#5b5bd6] font-black text-[12px]">{s.num}</span>
            </div>

            {/* 내용 */}
            <div className="flex-1 pt-1">
              <p className="text-[12px] text-[#5b5bd6] font-bold mb-1">{s.actor}</p>
              <h3 className="text-[18px] font-bold text-[#191F28] mb-2">{s.title}</h3>
              <p className="text-[14px] text-[#6B7684] leading-[1.6] mb-5">{s.desc}</p>

              {/* 앱 스크린샷 */}
              <div className="w-full max-w-[200px] bg-[#111] rounded-2xl p-1 shadow-lg ring-1 ring-black/5">
                <div className="bg-white rounded-xl overflow-hidden h-[130px]">
                  <Image
                    src={s.screen}
                    alt={s.title}
                    width={180}
                    height={200}
                    className="w-full h-auto object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 결과 하이라이트 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, delay: 0.5 }}
        className="mt-4 bg-[#5b5bd6] rounded-3xl p-5 text-white"
      >
        <p className="text-[12px] font-bold opacity-70 mb-1">결과</p>
        <p className="text-[17px] font-black leading-[1.4]">
          결제가 일어난 순간에만<br />포인트가 차감됩니다.
        </p>
        <p className="text-[13px] opacity-70 mt-2">매출이 일어났을 때만 광고비를 내세요.</p>
      </motion.div>
    </section>
  );
}
