"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Store, Megaphone, CreditCard } from "lucide-react";

const STEPS = [
  {
    num: "01",
    Icon: Store,
    actor: "사장님",
    title: "캠페인 개설",
    desc: "혜택 금액과 파트너 리워드를 설정. 3분이면 완료.",
    screen: "/images/ux/owner_campaign.png",
    color: "#5b5bd6",
  },
  {
    num: "02",
    Icon: Megaphone,
    actor: "파트너",
    title: "고유 링크로 홍보",
    desc: "동네 파트너가 SNS·카톡에 공유. 비용은 사장님 부담 없음.",
    screen: "/images/ux/partner_link.png",
    color: "#7C6EE6",
  },
  {
    num: "03",
    Icon: CreditCard,
    actor: "손님",
    title: "방문 후 결제",
    desc: "손님이 결제하면 그 순간 포인트가 차감됩니다.",
    screen: "/images/ux/owner_qr_scan.png",
    color: "#9B61E5",
  },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-[#F4F6FA] px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <span className="inline-block text-[11px] font-bold text-[#5b5bd6] bg-[#5b5bd6]/10 px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
          How it works
        </span>
        <h2 className="text-[26px] font-extrabold text-[#191F28] leading-[1.25]">
          3단계로 끝나는<br />성과형 마케팅
        </h2>
      </motion.div>

      {/* 타임라인 */}
      <div className="relative">
        {/* 세로 연결선 — 전체 타임라인 배경 */}
        <div className="absolute left-[19px] top-[20px] bottom-[80px] w-[2px] bg-gradient-to-b from-[#5b5bd6] via-[#7C6EE6] to-[#9B61E5] opacity-25 rounded-full" />

        <div className="space-y-0">
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.15 }}
              className="relative flex gap-5 pb-12 last:pb-0"
            >
              {/* 타임라인 노드 */}
              <div className="flex-shrink-0 relative z-10">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                  style={{ backgroundColor: s.color }}
                >
                  <s.Icon className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" />
                </div>
              </div>

              {/* 내용 카드 */}
              <div className="flex-1 bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                {/* 스텝 라벨 */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-[11px] font-black px-2 py-0.5 rounded-md"
                    style={{ backgroundColor: `${s.color}18`, color: s.color }}
                  >
                    {s.num}
                  </span>
                  <span className="text-[11px] text-gray-400 font-bold">{s.actor}</span>
                </div>

                <h3 className="text-[18px] font-bold text-[#191F28] mb-2">{s.title}</h3>
                <p className="text-[13.5px] text-[#6B7684] leading-[1.6] mb-5">{s.desc}</p>

                {/* 앱 스크린샷 */}
                <div className="w-[140px] bg-[#111318] rounded-[22px] p-1.5 shadow-xl ring-1 ring-black/8">
                  <div className="bg-white rounded-[16px] overflow-hidden relative h-[230px]">
                    <Image
                      src={s.screen}
                      alt={s.title}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 결과 하이라이트 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, delay: 0.55 }}
        className="mt-6 bg-[#5b5bd6] rounded-3xl p-5 text-white relative overflow-hidden"
      >
        <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
        <p className="text-[12px] font-bold opacity-60 mb-1 relative z-10">결과</p>
        <p className="text-[17px] font-black leading-[1.4] relative z-10">
          결제가 일어난 순간에만<br />포인트가 차감됩니다.
        </p>
        <p className="text-[13px] opacity-65 mt-2 relative z-10">매출이 일어났을 때만 광고비를 내세요.</p>
      </motion.div>
    </section>
  );
}
