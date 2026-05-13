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
        <span className="inline-block text-[10px] font-black tracking-[0.25em] text-[#5b5bd6] uppercase bg-[#5b5bd6]/10 px-3 py-1 rounded-full mb-4">
          HOW IT WORKS
        </span>
        <h2 className="text-[26px] font-extrabold text-[#191F28] leading-[1.25]">
          3단계로 끝나는<br />성과형 마케팅
        </h2>
      </motion.div>

      {/* 3단계 플로우 */}
      <div className="space-y-6">
        {STEPS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: i * 0.12 }}
            className="flex gap-4"
          >
            {/* 번호 + 세로선 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#5b5bd6] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-[12px]">{s.num}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-px flex-1 bg-[#5b5bd6]/20 my-2" />
              )}
            </div>

            {/* 내용 */}
            <div className="flex-1 pb-6">
              <p className="text-[11px] text-[#5b5bd6] font-bold mb-1">{s.actor}</p>
              <h3 className="text-[16px] font-bold text-[#191F28] mb-1">{s.title}</h3>
              <p className="text-[13px] text-[#6B7684] leading-[1.6] mb-4">{s.desc}</p>

              {/* 앱 스크린샷 */}
              <div className="w-[140px] bg-[#111] rounded-[24px] p-1 shadow-lg ring-1 ring-black/5">
                <div className="bg-white rounded-[18px] overflow-hidden">
                  <Image
                    src={s.screen}
                    alt={s.title}
                    width={138}
                    height={240}
                    className="w-full h-auto"
                    style={{ maxHeight: "200px", objectFit: "cover", objectPosition: "top" }}
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
        <p className="text-[13px] opacity-70 mt-2">광고비가 매출로 직결되는 구조.</p>
      </motion.div>
    </section>
  );
}
