"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CircleDollarSign, ScanSearch, Megaphone } from "lucide-react";

const BENEFITS = [
  {
    Icon: CircleDollarSign,
    tag: "비용",
    tagColor: "#E05252",
    title: "광고비 태우는 거\n이제 그만",
    desc: "손님이 오지 않으면 한 푼도 나가지 않아요. 전단지처럼 태워버리는 마케팅비가 사라집니다.",
    gradient: "from-[#FFF5F5] to-[#FFF]",
    iconBg: "#FFF0F0",
    iconColor: "#E05252",
  },
  {
    Icon: ScanSearch,
    tag: "투명성",
    tagColor: "#5b5bd6",
    title: "어디서 손님 왔는지\n처음으로 보입니다",
    desc: "파트너별 방문 수, 결제 금액, 활성 캠페인을 앱에서 실시간 확인. 어디서 손님이 오는지 정확히 보입니다.",
    gradient: "from-[#F5F5FF] to-[#FFF]",
    iconBg: "#EEEEFF",
    iconColor: "#5b5bd6",
  },
  {
    Icon: Megaphone,
    tag: "자동화",
    tagColor: "#00A67E",
    title: "알바생이 동네방네\n소문내줍니다",
    desc: "내 가게를 직접 다녀본 동네 사람들이 SNS에서 자발적으로 홍보해요. 사장님은 장사에만 집중하세요.",
    gradient: "from-[#F0FBF7] to-[#FFF]",
    iconBg: "#E5F7F2",
    iconColor: "#00A67E",
  },
];

export default function BenefitsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-white px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <span className="inline-block text-[11px] font-bold text-[#5b5bd6] bg-[#5b5bd6]/10 px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
          Owner Benefits
        </span>
        <h2 className="text-[26px] font-extrabold text-[#191F28] leading-[1.25]">
          사장님이 실제로<br />달라지는 것 3가지
        </h2>
        <p className="text-[13px] text-[#8B95A1] mt-2 leading-[1.6]">
          플바를 도입한 사장님들이 가장 크게 체감하는 3가지 변화입니다.
        </p>
      </motion.div>

      <div className="space-y-4">
        {BENEFITS.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: i * 0.13 }}
            className={`bg-gradient-to-br ${b.gradient} rounded-3xl p-5 border border-gray-100 shadow-sm`}
          >
            <div className="flex items-start gap-4">
              {/* 아이콘 박스 */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
                style={{ backgroundColor: b.iconBg }}
              >
                <b.Icon className="w-5 h-5" style={{ color: b.iconColor }} strokeWidth={2} />
              </div>

              <div className="flex-1">
                {/* 태그 */}
                <span
                  className="inline-block text-[10px] font-black px-2 py-0.5 rounded-md mb-2"
                  style={{ backgroundColor: `${b.tagColor}18`, color: b.tagColor }}
                >
                  {b.tag}
                </span>
                <h3 className="text-[15px] font-bold text-[#191F28] mb-2 leading-[1.35] whitespace-pre-line">
                  {b.title}
                </h3>
                <p className="text-[13px] text-[#6B7684] leading-[1.65]">{b.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 성과 대시보드 미리보기 — 플바는 결제금액 미집계, 실제 트래킹 지표만 표시 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.45, delay: 0.5 }}
        className="mt-6 bg-[#F4F6FA] border border-gray-100 rounded-3xl p-5"
      >
        <div className="flex justify-between items-center mb-4">
          <p className="text-[11px] text-[#8B95A1] font-bold uppercase tracking-wider">앱 대시보드 미리보기</p>
          <p className="text-[10px] text-[#5b5bd6] font-bold bg-[#5b5bd6]/10 px-2 py-0.5 rounded-full border border-[#5b5bd6]/20">예시 수치</p>
        </div>

        {/* 이번 달 요약 헤더 */}
        <div className="bg-[#5b5bd6] rounded-2xl p-4 text-white mb-3">
          <p className="text-[11px] opacity-65 mb-0.5">이번 달 캠페인 현황</p>
          <div className="flex items-end gap-2">
            <p className="font-black text-[26px] tracking-tight">142건</p>
            <p className="text-[13px] font-bold opacity-80 pb-0.5">방문 확인</p>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C896]" />
            <p className="text-[11px] opacity-70">지난 달 대비 +38건 더 방문했어요</p>
          </div>
        </div>

        {/* 4개 지표 그리드 */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "리워드 지급", val: "142건", sub: "방문 1건 = 리워드 1건", color: "text-[#5b5bd6]" },
            { label: "활성 파트너", val: "17명", sub: "+3명 이번 달 합류", color: "text-green-600" },
            { label: "진행 캠페인", val: "2개", sub: "고깃집 런치 / 카페 쿠폰", color: "text-orange-500" },
            { label: "총 리워드 차감", val: "213,000P", sub: "방문 건당 1,500P 설정", color: "text-[#8B95A1]" },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm">
              <p className="text-[10px] text-[#8B95A1] font-medium mb-1">{item.label}</p>
              <p className={`text-[16px] font-black text-[#191F28] mt-0.5`}>{item.val}</p>
              <p className={`text-[10px] font-medium mt-1 ${item.color}`}>{item.sub}</p>
            </div>
          ))}
        </div>

        {/* 안내 텍스트 */}
        <p className="text-[10.5px] text-[#8B95A1] mt-3 leading-[1.5] text-center">
          💡 방문 확인은 QR 스캔 기준 · 실제 결제금액은 별도 집계
        </p>
      </motion.div>
    </section>
  );
}
