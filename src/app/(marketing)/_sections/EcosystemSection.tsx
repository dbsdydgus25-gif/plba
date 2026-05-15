"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// 파트너/소비자 생태계 — 한 컷으로 압축
export default function EcosystemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-white px-6 py-14 border-t border-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >

        <h2 className="text-[26px] font-extrabold text-[#191F28] leading-[1.25]">
          사장님 혼자<br />홍보 안 해도 됩니다
        </h2>
        <p className="text-[13px] text-[#8B95A1] mt-2 leading-[1.6]">
          파트너가 대신 홍보하고, 손님이 혜택을 받습니다.<br />
          사장님은 결과만 확인하면 됩니다.
        </p>
      </motion.div>

      {/* 3자 구조 카드 */}
      <div className="space-y-3">
        {[
          {
            role: "📣 파트너",
            color: "#7c3aed",
            bgColor: "#7c3aed/8",
            title: "동네 사람이 홍보합니다",
            desc: "내 가게를 즐겨 찾는 단골이나 동네 주민이 파트너가 됩니다. SNS·블로그에 고유 링크를 공유하고, 손님이 결제하면 현금처럼 쓸 수 있는 리워드를 받기 때문에 자발적으로 열심히 홍보합니다.",
            screen: "/images/ux/partner_link.png",
          },
          {
            role: "🎁 소비자",
            color: "#0891b2",
            bgColor: "#0891b2/8",
            title: "손님은 혜택 받고 방문합니다",
            desc: "파트너 링크로 들어온 손님은 현장에서 즉시 할인을 받습니다. QR 하나면 끝.",
            screen: "/images/ux/consumer_qr.png",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: i * 0.15 }}
            className="rounded-3xl border border-gray-100 overflow-hidden bg-[#F9FAFB]"
          >
            <div className="p-5 pb-4">
              <span
                className="inline-block text-[11px] font-black px-3 py-1 rounded-full mb-3"
                style={{ background: `${item.color}15`, color: item.color }}
              >
                {item.role}
              </span>
              <h3 className="text-[15px] font-bold text-[#191F28] mb-2">{item.title}</h3>
              <p className="text-[13px] text-[#6B7684] leading-[1.65] mb-4">{item.desc}</p>
            </div>
            {/* 앱 스크린 */}
            <div className="px-5 pb-5">
              <div className="w-[120px] bg-[#111] rounded-[22px] p-1 shadow-md ring-1 ring-black/5">
                <div className="bg-white rounded-[16px] overflow-hidden">
                  <Image
                    src={item.screen}
                    alt={item.title}
                    width={118}
                    height={200}
                    className="w-full h-auto"
                    style={{ maxHeight: "180px", objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 한 줄 요약 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.45, delay: 0.45 }}
        className="mt-5 flex items-center gap-3 bg-[#F9FAFB] border border-gray-100 rounded-2xl px-4 py-4"
      >
        <span className="text-[22px]">⚡</span>
        <p className="text-[13px] text-[#4E5968] font-medium leading-[1.5]">
          <strong className="text-[#191F28]">사장님은 캠페인만 개설.</strong><br />
          홍보는 파트너가, 결제는 손님이 합니다.
        </p>
      </motion.div>
    </section>
  );
}
