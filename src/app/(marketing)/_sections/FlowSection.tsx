"use client";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

/* ────── 공통 PhoneFrame ────── */
function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto w-[180px]">
      <div className="bg-[#111] rounded-[32px] p-1.5 shadow-xl shadow-black/25 ring-1 ring-black/10">
        <div className="bg-white rounded-[24px] overflow-hidden">
          <Image src={src} alt={alt} width={177} height={360} className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}

/* ────── 플로우 스텝 카드 ────── */
function FlowStep({
  num, title, desc, img, imgAlt, badge,
}: {
  num: string; title: string; desc: string; img: string; imgAlt: string; badge?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* 번호 */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#5b5bd6] flex items-center justify-center flex-shrink-0">
          <span className="text-white text-[13px] font-black">{num}</span>
        </div>
        <h3 className="text-[#191F28] font-bold text-[16px]">{title}</h3>
      </div>
      <p className="text-[#6B7684] text-[13px] leading-[1.7] mb-6 pl-11">{desc}</p>

      {/* 이미지 */}
      <div className="relative">
        <PhoneFrame src={img} alt={imgAlt} />
        {badge && (
          <div className="absolute top-6 -right-2 bg-white border border-gray-100 rounded-2xl px-3 py-2 shadow-lg">
            <p className="text-[11px] text-[#5b5bd6] font-black">{badge}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ────── 섹션 헤더 ────── */
function SectionHeader({ tag, title, sub, color }: { tag: string; title: string; sub?: string; color: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <span
        className="inline-block text-[10px] font-black tracking-[0.25em] uppercase rounded-full px-3 py-1 mb-4"
        style={{ background: `${color}18`, color }}
      >
        {tag}
      </span>
      <h2
        className="text-[26px] font-extrabold leading-[1.25] text-[#191F28] mb-2"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {sub && <p className="text-[13px] text-[#8B95A1] leading-[1.65]">{sub}</p>}
    </motion.div>
  );
}

/* ────── 구분선 ────── */
function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px bg-gray-100" />
      <span className="text-[11px] text-gray-400 font-semibold">{label}</span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
}

/* ────── 강조 박스 ────── */
function HighlightBox({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45 }}
      className="bg-[#5b5bd6]/8 border border-[#5b5bd6]/20 rounded-3xl p-5 my-8"
    >
      {children}
    </motion.div>
  );
}

export default function FlowSection() {
  return (
    <div>

      {/* ━━━━━━ PART 0: 개요 ━━━━━━ */}
      <section className="px-6 pt-14 pb-10 bg-white">
        <SectionHeader
          tag="HOW IT WORKS"
          title="3분이면 이해되는<br/>플바 선순환 구조"
          sub="사장님이 캠페인을 열면, 파트너가 홍보하고, 손님이 방문합니다. 결제가 일어날 때만 비용이 빠져나갑니다."
          color="#5b5bd6"
        />

        {/* 3자 구조 한눈에 */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { emoji: "🏪", label: "사장님", sub: "캠페인 개설" },
            { emoji: "📣", label: "파트너", sub: "자유롭게 홍보" },
            { emoji: "🎁", label: "소비자", sub: "혜택 수령" },
          ].map((item, i) => (
            <div key={i} className="bg-[#F9FAFB] rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">{item.emoji}</div>
              <p className="text-[13px] font-bold text-[#191F28]">{item.label}</p>
              <p className="text-[11px] text-[#8B95A1] mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>

        <HighlightBox>
          <p className="text-[13px] text-[#5b5bd6] font-black mb-1">💡 핵심 원리</p>
          <p className="text-[14px] text-[#3730a3] leading-[1.6]">
            결제가 완료된 순간에만 마케팅 비용이 차감됩니다. 클릭도, 노출도 아닌 <strong>실제 매출</strong>에만 지불하세요.
          </p>
        </HighlightBox>
      </section>

      {/* ━━━━━━ PART 1: 사장님 플로우 ━━━━━━ */}
      <section className="px-6 pt-10 pb-14 bg-[#F9FAFB] border-t border-gray-100">
        <SectionHeader
          tag="PART 1 · 사장님"
          title="캠페인 하나로<br/>홍보팀이 생깁니다"
          sub="복잡한 광고 세팅 없이, 앱에서 3단계로 끝납니다."
          color="#5b5bd6"
        />

        <div className="space-y-12">
          <FlowStep
            num="1"
            title="가게 등록"
            desc="상호명, 업종, 위치를 입력하면 동네 파트너들이 내 가게를 찾을 수 있어요. 가게 정보가 정확할수록 매칭이 빨라집니다."
            img="/images/ux/owner_register.png"
            imgAlt="가게 등록 화면"
          />

          <Divider label="다음" />

          <FlowStep
            num="2"
            title="마케팅 포인트 충전"
            desc="이번 달 예산만큼만 충전하세요. 선착순 등록 사장님께는 무상 20,000P를 지원합니다."
            img="/images/ux/owner_charge.png"
            imgAlt="포인트 충전 화면"
            badge="선착순 20,000P 지원"
          />

          <Divider label="다음" />

          <FlowStep
            num="3"
            title="캠페인 & 리워드 설정"
            desc="손님 혜택(현장 할인, 음료 증정 등)과 파트너 리워드 금액을 설정하면 끝. 결제 1건당 파트너에게 자동 지급됩니다."
            img="/images/ux/owner_campaign.png"
            imgAlt="캠페인 등록 화면"
          />

          <Divider label="다음" />

          <FlowStep
            num="4"
            title="손님 결제 시 QR 스캔"
            desc="손님이 파트너 링크로 오면, 결제 시 QR을 스캔합니다. 인식 즉시 포인트가 차감되고 파트너에게 리워드가 지급돼요."
            img="/images/ux/owner_qr_scan.png"
            imgAlt="QR 스캔 화면"
          />

          <Divider label="결과" />

          <FlowStep
            num="5"
            title="성과 대시보드 확인"
            desc="방문 손님 수, 활성 파트너, 평균 객단가를 한눈에. 플바로 늘어난 매출을 실시간으로 확인하세요."
            img="/images/ux/owner_dashboard.png"
            imgAlt="사장님 대시보드"
            badge="₩1,847,300 +28%"
          />
        </div>

        <HighlightBox>
          <p className="text-[13px] text-[#5b5bd6] font-black mb-2">사장님이 절약하는 것</p>
          <div className="space-y-2">
            {[
              { label: "전단지 제작·배포비", value: "0원" },
              { label: "SNS 광고 최소 예산", value: "0원" },
              { label: "효과 없는 노출에 낭비되는 돈", value: "0원" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-[13px] text-[#4E5968]">{item.label}</span>
                <span className="text-[#5b5bd6] font-black text-[13px]">{item.value}</span>
              </div>
            ))}
          </div>
        </HighlightBox>
      </section>

      {/* ━━━━━━ PART 2: 파트너스 플로우 ━━━━━━ */}
      <section className="px-6 pt-10 pb-14 bg-white border-t border-gray-100">
        <SectionHeader
          tag="PART 2 · 파트너스"
          title="내 동네 가게 홍보하고<br/>리워드 받는 방법"
          sub="쿠팡 파트너스처럼, 내 고유 링크로 홍보하면 손님이 결제할 때마다 리워드가 쌓입니다."
          color="#7c3aed"
        />

        <div className="space-y-12">
          <FlowStep
            num="1"
            title="동네 캠페인 탐색"
            desc="지도에서 주변 가게들을 확인하고, 리워드 높은 순으로 정렬해 내 입맛에 맞는 가게를 선택하세요."
            img="/images/ux/partner_map.png"
            imgAlt="파트너 캠페인 찾기"
          />

          <Divider label="다음" />

          <FlowStep
            num="2"
            title="고유 홍보 링크 생성"
            desc="가게를 선택하면 나만의 고유 링크가 발급됩니다. 인스타, 블로그, 카톡 어디든 공유하세요. 추천 멘트도 AI가 작성해줘요."
            img="/images/ux/partner_link.png"
            imgAlt="홍보 링크 만들기"
            badge="plba.me/r/jisu-87qx2"
          />

          <Divider label="결과" />

          <FlowStep
            num="3"
            title="리워드 자동 적립"
            desc="내 링크로 들어온 손님이 결제하면, 즉시 리워드가 적립됩니다. 15,000P 이상이면 언제든 출금 가능."
            img="/images/ux/partner_rewards.png"
            imgAlt="파트너 리워드 확인"
            badge="이번 달 +124,300P"
          />
        </div>
      </section>

      {/* ━━━━━━ PART 3: 소비자 플로우 ━━━━━━ */}
      <section className="px-6 pt-10 pb-14 bg-[#F9FAFB] border-t border-gray-100">
        <SectionHeader
          tag="PART 3 · 소비자"
          title="혜택 받고 방문하는<br/>소비자 경험"
          sub="파트너가 공유한 링크로 들어오면, 결제 시 즉시 할인이 적용됩니다."
          color="#0891b2"
        />

        <div className="space-y-12">
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#0891b2] flex items-center justify-center">
                <span className="text-white text-[13px] font-black">1</span>
              </div>
              <h3 className="text-[#191F28] font-bold text-[16px]">파트너 링크로 가게 발견</h3>
            </div>
            <p className="text-[#6B7684] text-[13px] leading-[1.7] mb-6 pl-11">
              인스타, 블로그, 카톡에서 파트너가 공유한 링크를 클릭하면 가게 정보와 혜택이 표시됩니다.
            </p>
          </div>

          <FlowStep
            num="2"
            title="QR 코드로 방문 인증"
            desc="매장에서 결제할 때 앱의 고유 QR을 사장님께 보여주세요. 인식 즉시 5,000원 할인이 적용되고, 추천한 파트너에게도 리워드가 지급됩니다."
            img="/images/ux/consumer_qr.png"
            imgAlt="소비자 QR 코드"
            badge="5,000원 즉시 할인"
          />
        </div>

        {/* 3자 모두 Win-Win */}
        <div className="mt-10 rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          <div className="bg-[#5b5bd6] px-5 py-4">
            <p className="text-white font-black text-[15px]">모두가 이기는 구조</p>
            <p className="text-white/70 text-[12px] mt-0.5">한 번의 결제로 3자 모두 혜택</p>
          </div>
          <div className="bg-white divide-y divide-gray-50">
            {[
              { role: "🏪 사장님", win: "실제 방문 손님 확보, 검증된 CAC" },
              { role: "📣 파트너", win: "결제 1건당 리워드 즉시 지급" },
              { role: "🎁 소비자", win: "현장 할인 혜택 + 발견의 즐거움" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <span className="text-[15px] flex-shrink-0">{item.role.split(" ")[0]}</span>
                <div>
                  <p className="text-[13px] font-bold text-[#191F28]">{item.role.split(" ")[1]}</p>
                  <p className="text-[12px] text-[#8B95A1] mt-0.5">{item.win}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━ 비교표 ━━━━━━ */}
      <section className="px-6 pt-10 pb-12 bg-white border-t border-gray-100">
        <SectionHeader
          tag="WHY PLBA"
          title="기존 광고와 다릅니다"
          color="#5b5bd6"
        />

        <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          <div className="grid grid-cols-4 bg-[#F9FAFB] border-b border-gray-100">
            <div className="p-3 text-[10px] font-bold text-gray-400">항목</div>
            <div className="p-3 text-[10px] font-bold text-gray-400 text-center">전단지</div>
            <div className="p-3 text-[10px] font-bold text-gray-400 text-center">SNS광고</div>
            <div className="p-3 text-[10px] font-black text-[#5b5bd6] text-center bg-[#5b5bd6]/5">플바</div>
          </div>
          {[
            { label: "광고비 지불", v1: "선불 고정", v2: "클릭마다", plba: "결제 시만" },
            { label: "매출 연결", v1: "불가능", v2: "낮음", plba: "100% 보장" },
            { label: "초기 비용", v1: "수십만원", v2: "최소예산", plba: "무료 시작" },
            { label: "홍보 지속성", v1: "배포 후 끝", v2: "예산 소진", plba: "자발적 지속" },
          ].map((r, i) => (
            <div key={i} className={`grid grid-cols-4 border-b border-gray-50 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
              <div className="p-3 text-[11px] font-semibold text-[#191F28] flex items-center">{r.label}</div>
              <div className="p-3 text-[11px] text-gray-400 text-center flex items-center justify-center">{r.v1}</div>
              <div className="p-3 text-[11px] text-gray-400 text-center flex items-center justify-center">{r.v2}</div>
              <div className="p-3 text-[11px] text-[#5b5bd6] font-black text-center bg-[#5b5bd6]/5 flex items-center justify-center">{r.plba}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
