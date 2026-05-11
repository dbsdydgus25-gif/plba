"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Store, ShieldCheck, ChevronRight, Wallet, Gift, QrCode, CheckCircle2, Link, Users } from "lucide-react";
import { useState, useEffect } from "react";

const HERO_IMAGES = [
  "/images/hero_bg_1.png",
  "/images/hero_bg_2.png",
  "/images/hero_bg_3.png"
];

export default function LandingPage() {
  const [storeName, setStoreName] = useState("");
  const [contact, setContact] = useState("");
  const [category, setCategory] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert("사전 등록이 완료되었습니다.");
  };

  return (
    <div className="w-full min-h-screen bg-white text-[#191F28] font-sans selection:bg-brand/20 leading-[1.7] tracking-[-0.01em]">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-32 pb-40 px-6 overflow-hidden flex flex-col items-center text-center min-h-[90vh] justify-center border-b border-gray-50">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.2, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image 
                src={HERO_IMAGES[currentImageIndex]} 
                alt="배경 이미지" 
                fill 
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white z-10" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto z-20"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand/10 text-brand-dark font-bold text-sm md:text-base mb-10 shadow-sm border border-brand/5">
            <span className="animate-pulse">🎉</span> 선착순 100곳 사장님 한정 20,000P 무상 지원
          </div>
          
          <h1 className="text-[42px] md:text-[72px] font-extrabold leading-[1.2] tracking-tight mb-10 break-keep">
            동네 사람들이 <span className="text-brand">알아서 홍보하고</span><br className="hidden md:block" />
            결제할 때만 광고비 내세요.
          </h1>
          
          <p className="text-[18px] md:text-[26px] text-[#4E5968] mb-16 font-medium leading-[1.6] break-keep max-w-3xl mx-auto px-4">
            클릭만 하고 안 오는 광고는 이제 그만.<br />
            우리 가게를 사랑하는 <span className="text-[#191F28] font-bold">동네 파트너스</span>가 직접 홍보하고,<br />
            진짜 방문 결제 시에만 정산하는 성과형 마케팅 플랫폼.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-5 w-full px-4 sm:px-0">
            <a href="#register" className="w-full sm:w-auto px-10 py-6 md:px-14 md:py-7 bg-brand hover:bg-brand-dark text-white rounded-3xl font-bold text-xl md:text-2xl transition-all hover:scale-[1.02] shadow-2xl shadow-brand/40 flex items-center justify-center gap-3">
              무료로 내 가게 등록하기
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
            </a>
          </div>
          <div className="mt-10 flex items-center justify-center gap-6 text-[15px] md:text-[18px] text-[#6B7684] font-semibold">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-5 h-5 text-brand" /> 가입비 0원</span>
            <span className="w-px h-4 bg-gray-200" />
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-5 h-5 text-brand" /> 월 고정비 0원</span>
            <span className="w-px h-4 bg-gray-200" />
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-5 h-5 text-brand" /> 100% 후불제</span>
          </div>
        </motion.div>
      </section>

      {/* 2. PROBLEM SECTION */}
      <section className="py-32 md:py-48 px-6 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 md:mb-24">
            <h2 className="text-[32px] md:text-[48px] font-extrabold tracking-tight text-[#191F28] mb-8 leading-[1.3] break-keep">
              사장님, 마케팅 비용 쓰면서<br className="md:hidden" /> 불안하지 않으셨나요?
            </h2>
            <p className="text-[17px] md:text-[22px] text-[#4E5968] font-medium leading-[1.6] break-keep max-w-2xl mx-auto">
              기존 마케팅은 돈부터 내고 기도를 해야 했습니다.<br />
              성과가 없어도 나가는 고정 비용, 이제는 멈춰야 합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <div className="bg-white p-10 md:p-12 rounded-[40px] shadow-sm border border-[#F2F4F6] transition-all hover:shadow-md">
              <div className="text-[56px] mb-8">📱</div>
              <h3 className="text-[24px] font-bold text-[#191F28] mb-5">성과 없는 클릭 광고</h3>
              <p className="text-[17px] text-[#4E5968] leading-[1.7] break-keep">
                단순 노출과 클릭만으로도 비용이 나가는 방식, 정작 오늘 매출로 연결되었는지 알 길이 없습니다.
              </p>
            </div>
            <div className="bg-white p-10 md:p-12 rounded-[40px] shadow-sm border border-[#F2F4F6] transition-all hover:shadow-md">
              <div className="text-[56px] mb-8">🛵</div>
              <h3 className="text-[24px] font-bold text-[#191F28] mb-5">과도한 배달 플랫폼</h3>
              <p className="text-[17px] text-[#4E5968] leading-[1.7] break-keep">
                높은 수수료와 배달비 때문에 팔아도 남는 게 없는 장사, 이제는 오프라인 홀 방문객을 늘려야 합니다.
              </p>
            </div>
            <div className="bg-white p-10 md:p-12 rounded-[40px] shadow-sm border border-[#F2F4F6] transition-all hover:shadow-md">
              <div className="text-[56px] mb-8">📝</div>
              <h3 className="text-[24px] font-bold text-[#191F28] mb-5">막막한 체험단 마케팅</h3>
              <p className="text-[17px] text-[#4E5968] leading-[1.7] break-keep">
                식사 제공에 원고료까지 줬지만, 진짜 그 글을 보고 온 손님이 몇 명인지 파악하기 불가능했습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PARTNERS CONCEPT SECTION (NEW) */}
      <section className="py-32 md:py-48 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <div className="w-full md:w-1/2 relative">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand/5 rounded-full blur-3xl" />
              <div className="relative z-10 bg-[#F9FAFB] rounded-[48px] p-10 border border-gray-100 shadow-inner">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-brand flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand/20">P</div>
                  <div className="space-y-1">
                    <p className="font-bold text-lg text-[#191F28]">동네 파트너스</p>
                    <p className="text-sm text-[#8B95A1]">우리 동네 영향력 있는 이웃들</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 flex items-start gap-4">
                    <Link className="w-6 h-6 text-brand mt-1" />
                    <div>
                      <p className="font-bold text-[#191F28]">가게 홍보 링크 생성</p>
                      <p className="text-[15px] text-[#4E5968]">자유롭게 공유하고 지인들에게 추천</p>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 flex items-start gap-4">
                    <Users className="w-6 h-6 text-brand mt-1" />
                    <div>
                      <p className="font-bold text-[#191F28]">소비자 방문 및 결제</p>
                      <p className="text-[15px] text-[#4E5968]">홍보 글을 보고 매장에 방문하여 식사</p>
                    </div>
                  </div>
                  <div className="bg-brand p-5 rounded-2xl shadow-lg shadow-brand/20 flex items-start gap-4 text-white">
                    <Gift className="w-6 h-6 mt-1" />
                    <div>
                      <p className="font-bold">리워드 적립</p>
                      <p className="text-[15px] opacity-90">결제가 확인되면 파트너에게 즉시 보상</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-[32px] md:text-[48px] font-extrabold tracking-tight text-[#191F28] mb-10 leading-[1.3] break-keep">
                사장님은 가게에만 집중하세요.<br />
                <span className="text-brand">동네 이웃들이 홍보를 맡습니다.</span>
              </h2>
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold">1</div>
                  <p className="text-[18px] md:text-[20px] text-[#4E5968] leading-[1.6] break-keep">
                    플바 파트너스는 우리 동네 식당을 자유롭게 홍보하고, 자신의 링크를 통해 손님이 오면 혜택을 받는 마케터입니다.
                  </p>
                </div>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold">2</div>
                  <p className="text-[18px] md:text-[20px] text-[#4E5968] leading-[1.6] break-keep">
                    단순히 보여주기 위한 광고가 아닙니다. 파트너의 진심 어린 추천이 <span className="text-[#191F28] font-bold">실제 방문객</span>을 만듭니다.
                  </p>
                </div>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold">3</div>
                  <p className="text-[18px] md:text-[20px] text-[#4E5968] leading-[1.6] break-keep">
                    매출이 발생했을 때만 리워드를 지급하므로, 사장님은 <span className="text-brand font-bold underline decoration-2 underline-offset-4">확실한 수익</span>을 보장받습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOLUTION / USE CASES */}
      <section className="py-32 md:py-48 px-6 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 md:mb-24 text-center">
            <h2 className="text-[32px] md:text-[52px] font-extrabold tracking-tight text-[#191F28] mb-8 leading-[1.3] break-keep">
              진짜 매출이 일어날 때만 정산되니까,<br />
              <span className="text-brand underline decoration-brand/30 decoration-8 underline-offset-[12px]">리스크가 0원입니다.</span>
            </h2>
            <p className="text-[17px] md:text-[22px] text-[#4E5968] font-medium leading-[1.6] break-keep max-w-3xl mx-auto">
              더 이상 효과 없는 광고에 돈 쓰지 마세요. 이미 많은 동네 사장님들이 광고비 낭비를 멈추고 플바와 함께하고 있습니다.
            </p>
          </div>

          <div className="flex flex-col gap-12 md:gap-20">
            {/* Case 1 */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 bg-white p-10 md:p-14 rounded-[48px] shadow-sm border border-gray-100">
              <div className="w-full md:w-5/12 rounded-[32px] overflow-hidden shadow-lg aspect-[4/3] relative bg-gray-200 hover:scale-[1.01] transition-transform duration-500">
                <Image src="/images/bbq.png" alt="고깃집" fill className="object-cover" />
              </div>
              <div className="w-full md:w-7/12">
                <div className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-bold mb-6">
                  마포구 삼겹살 전문점
                </div>
                <h3 className="text-[26px] md:text-[34px] font-bold text-[#191F28] mb-8 leading-[1.4] break-keep">
                  &quot;버려지던 전단지 비용을<br className="hidden md:block" /> 실제 방문객 혜택으로 돌렸어요&quot;
                </h3>
                <p className="text-[17px] md:text-[20px] text-[#4E5968] leading-[1.7] break-keep">
                  &quot;전단지를 뿌려도 몇 명 오는지 몰라 답답했는데, 플바 파트너들이 SNS에 홍보 글을 올리고 실제 손님을 데려오는 게 눈으로 보입니다. 결제가 일어날 때만 예산이 차감되니 1원도 낭비되는 느낌이 없어요.&quot;
                </p>
              </div>
            </div>

            {/* Case 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16 bg-white p-10 md:p-14 rounded-[48px] shadow-sm border border-gray-100">
              <div className="w-full md:w-5/12 rounded-[32px] overflow-hidden shadow-lg aspect-[4/3] relative bg-gray-200 hover:scale-[1.01] transition-transform duration-500">
                <Image src="/images/cafe.png" alt="카페" fill className="object-cover" />
              </div>
              <div className="w-full md:w-7/12">
                <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-6">
                  홍대 로스터리 카페
                </div>
                <h3 className="text-[26px] md:text-[34px] font-bold text-[#191F28] mb-8 leading-[1.4] break-keep">
                  &quot;평일 애매한 시간대,<br className="hidden md:block" /> 빈자리를 동네 주민들이 채워줍니다&quot;
                </h3>
                <p className="text-[17px] md:text-[20px] text-[#4E5968] leading-[1.7] break-keep">
                  &quot;배달 수수료 내면 남는 게 없던 카페 장사에 플바는 완벽한 해결책이었습니다. 파트너들이 올린 감각적인 사진을 보고 온 손님들 덕분에 홀 방문객이 눈에 띄게 늘어 매출이 30% 이상 성장했습니다.&quot;
                </p>
              </div>
            </div>

            {/* Case 3 */}
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 bg-white p-10 md:p-14 rounded-[48px] shadow-sm border border-gray-100">
              <div className="w-full md:w-5/12 rounded-[32px] overflow-hidden shadow-lg aspect-[4/3] relative bg-gray-200 hover:scale-[1.01] transition-transform duration-500">
                <Image src="/images/salon.png" alt="미용실" fill className="object-cover" />
              </div>
              <div className="w-full md:w-7/12">
                <div className="inline-block px-4 py-1.5 bg-pink-100 text-pink-700 rounded-full text-sm font-bold mb-6">
                  강남구 헤어살롱
                </div>
                <h3 className="text-[26px] md:text-[34px] font-bold text-[#191F28] mb-8 leading-[1.4] break-keep">
                  &quot;노쇼 걱정 제로!<br className="hidden md:block" /> 머리 다 하고 결제할 때 정산되니까요&quot;
                </h3>
                <p className="text-[17px] md:text-[20px] text-[#4E5968] leading-[1.7] break-keep">
                  &quot;예약만 하고 안 오는 노쇼 손님들 때문에 마케팅 비용 쓰기가 무서웠어요. 플바는 매장에서 실제로 카드를 긁는 순간에만 리워드가 발생하니 마케팅 효율이 100%입니다.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (Integrated Partners) */}
      <section className="py-32 md:py-48 px-6 bg-[#191F28] text-white overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24 md:mb-32">
            <h2 className="text-[32px] md:text-[52px] font-extrabold tracking-tight mb-8 leading-[1.3] break-keep">
              앱 하나로 끝나는<br className="md:hidden" /> 선순환 마케팅 5단계
            </h2>
            <p className="text-[17px] md:text-[22px] text-[#8B95A1] font-medium break-keep">
              기기 설치나 복잡한 계약 없이, 사장님 스마트폰 하나로 시작하세요.
            </p>
          </div>

          <div className="relative border-l-2 border-[#333D4B] ml-6 md:ml-[50%] space-y-20 md:space-y-32 pb-8">
            
            {/* Step 1 */}
            <div className="relative pl-12 md:pl-0 md:flex md:items-center md:justify-between w-full group">
              <div className="absolute left-[-21px] md:left-1/2 md:-ml-[21px] w-10 h-10 bg-[#191F28] border-2 border-brand rounded-full flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                <span className="text-brand text-base font-bold">1</span>
              </div>
              <div className="md:w-5/12 md:text-right md:pr-16">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#333D4B] mb-6 md:ml-auto md:mr-0 transition-colors group-hover:bg-[#4E5968]">
                  <Wallet className="w-7 h-7 text-[#B0B8C1]" />
                </div>
                <h3 className="text-[24px] font-bold mb-4">포인트 충전</h3>
                <p className="text-[17px] text-[#8B95A1] leading-[1.7] break-keep">
                  이번 달 매장에 유입시키고 싶은 만큼만 마케팅 예산을 간편하게 충전하세요.
                </p>
              </div>
              <div className="hidden md:block md:w-5/12"></div>
            </div>

            {/* Step 2 */}
            <div className="relative pl-12 md:pl-0 md:flex md:items-center md:justify-between w-full group">
              <div className="absolute left-[-21px] md:left-1/2 md:-ml-[21px] w-10 h-10 bg-[#191F28] border-2 border-brand rounded-full flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                <span className="text-brand text-base font-bold">2</span>
              </div>
              <div className="hidden md:block md:w-5/12"></div>
              <div className="md:w-5/12 md:pl-16">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand/20 mb-6 transition-colors group-hover:bg-brand/30">
                  <Gift className="w-7 h-7 text-brand" />
                </div>
                <h3 className="text-[24px] font-bold mb-4 text-brand">캠페인 및 리워드 설정</h3>
                <p className="text-[17px] text-[#8B95A1] leading-[1.7] break-keep">
                  방문 손님에게 줄 할인 혜택과, 홍보해 줄 파트너에게 지급할 리워드 비용을 설정합니다.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative pl-12 md:pl-0 md:flex md:items-center md:justify-between w-full group">
              <div className="absolute left-[-21px] md:left-1/2 md:-ml-[21px] w-10 h-10 bg-[#191F28] border-2 border-brand rounded-full flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                <span className="text-brand text-base font-bold">3</span>
              </div>
              <div className="md:w-5/12 md:text-right md:pr-16">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#333D4B] mb-6 md:ml-auto md:mr-0 transition-colors group-hover:bg-[#4E5968]">
                  <Users className="w-7 h-7 text-[#B0B8C1]" />
                </div>
                <h3 className="text-[24px] font-bold mb-4">파트너스의 자발적 홍보</h3>
                <p className="text-[17px] text-[#8B95A1] leading-[1.7] break-keep">
                  우리 동네 파트너들이 가게 정보를 보고 자신의 링크를 통해 블로그, SNS, 커뮤니티에 활발히 홍보를 시작합니다.
                </p>
              </div>
              <div className="hidden md:block md:w-5/12"></div>
            </div>

            {/* Step 4 */}
            <div className="relative pl-12 md:pl-0 md:flex md:items-center md:justify-between w-full group">
              <div className="absolute left-[-21px] md:left-1/2 md:-ml-[21px] w-10 h-10 bg-[#191F28] border-2 border-brand rounded-full flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                <span className="text-brand text-base font-bold">4</span>
              </div>
              <div className="hidden md:block md:w-5/12"></div>
              <div className="md:w-5/12 md:pl-16">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand mb-6 shadow-xl shadow-brand/40">
                  <QrCode className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-[24px] font-bold mb-4 text-brand">손님 방문 및 QR 스캔</h3>
                <p className="text-[17px] text-[#8B95A1] leading-[1.7] break-keep">
                  홍보 글을 본 손님이 매장에 직접 방문합니다. 사장님은 결제 시 QR 코드만 보여주시면 됩니다.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative pl-12 md:pl-0 md:flex md:items-center md:justify-between w-full group">
              <div className="absolute left-[-21px] md:left-1/2 md:-ml-[21px] w-10 h-10 bg-[#191F28] border-2 border-brand rounded-full flex items-center justify-center z-10 transition-transform group-hover:scale-110">
                <span className="text-brand text-base font-bold">5</span>
              </div>
              <div className="md:w-5/12 md:text-right md:pr-16">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-mint/20 mb-6 md:ml-auto md:mr-0 transition-colors group-hover:bg-mint/30">
                  <CheckCircle2 className="w-7 h-7 text-brand" />
                </div>
                <h3 className="text-[24px] font-bold mb-4 text-brand">자동 정산 및 매출 확정</h3>
                <p className="text-[17px] text-[#8B95A1] leading-[1.7] break-keep">
                  실제 결제가 확인되면 충전한 포인트에서 미리 설정한 금액만큼만 차감되며, 파트너에게 리워드가 지급됩니다.
                </p>
              </div>
              <div className="hidden md:block md:w-5/12"></div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. COMPARISON TABLE */}
      <section className="py-32 md:py-48 px-6 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20 md:mb-24">
            <h2 className="text-[32px] md:text-[48px] font-extrabold tracking-tight text-[#191F28] mb-8 leading-[1.3] break-keep">
              기존 마케팅과 비교해 보세요.<br />
              <span className="text-brand">답은 정해져 있습니다.</span>
            </h2>
          </div>

          <div className="overflow-x-auto rounded-[40px] border border-[#F2F4F6] shadow-2xl pb-4 md:pb-0">
            <table className="w-[900px] md:w-full text-left bg-white min-w-max border-collapse">
              <thead>
                <tr className="bg-[#F9FAFB]">
                  <th className="p-8 md:p-10 text-[17px] text-[#8B95A1] font-bold w-1/4 border-b border-gray-100">비교 항목</th>
                  <th className="p-8 md:p-10 text-[17px] text-[#4E5968] font-bold w-1/4 text-center border-b border-gray-100">전단지/오프라인</th>
                  <th className="p-8 md:p-10 text-[17px] text-[#4E5968] font-bold w-1/4 text-center border-b border-gray-100">SNS/배달앱 광고</th>
                  <th className="p-8 md:p-10 text-[19px] text-brand font-black w-1/4 text-center bg-brand/5 border-b border-brand/10">플바 (PLBA)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F4F6]">
                <tr>
                  <td className="p-8 md:p-10 font-bold text-[17px] text-[#191F28]">비용 과금 시점</td>
                  <td className="p-8 md:p-10 text-[17px] text-[#4E5968] text-center">제작·배포 전 선입금</td>
                  <td className="p-8 md:p-10 text-[17px] text-[#4E5968] text-center">클릭/노출 시 차감</td>
                  <td className="p-8 md:p-10 text-[17px] text-brand font-bold text-center bg-brand/5 font-black">실제 방문·결제 시</td>
                </tr>
                <tr>
                  <td className="p-8 md:p-10 font-bold text-[17px] text-[#191F28]">매출 연결 보장</td>
                  <td className="p-8 md:p-10 text-[17px] text-[#4E5968] text-center">확인 불가</td>
                  <td className="p-8 md:p-10 text-[17px] text-[#4E5968] text-center">낮은 상관관계</td>
                  <td className="p-8 md:p-10 text-[17px] text-brand font-bold text-center bg-brand/5 font-black">100% 보장</td>
                </tr>
                <tr>
                  <td className="p-8 md:p-10 font-bold text-[17px] text-[#191F28]">초기 마케팅비</td>
                  <td className="p-8 md:p-10 text-[17px] text-[#4E5968] text-center">수십만 원 대</td>
                  <td className="p-8 md:p-10 text-[17px] text-[#4E5968] text-center">최소 예산 존재</td>
                  <td className="p-8 md:p-10 text-[17px] text-brand font-bold text-center bg-brand/5 font-black">0원 (지원금 지급)</td>
                </tr>
                <tr>
                  <td className="p-8 md:p-10 font-bold text-[17px] text-[#191F28]">홍보 지속성</td>
                  <td className="p-8 md:p-10 text-[17px] text-[#4E5968] text-center">배포 즉시 종료</td>
                  <td className="p-8 md:p-10 text-[17px] text-[#4E5968] text-center">비용 소진 시 종료</td>
                  <td className="p-8 md:p-10 text-[17px] text-brand font-bold text-center bg-brand/5 font-black">파트너 자발적 지속</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-[#8B95A1] text-sm mt-6 md:hidden">표를 좌우로 스크롤하여 더 자세한 내용을 확인하세요.</p>
        </div>
      </section>

      {/* 7. REGISTRATION FORM */}
      <section id="register" className="py-32 md:py-48 px-6 bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[56px] p-10 md:p-20 shadow-2xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full -mr-16 -mt-16" />
            
            <div className="text-center mb-16 relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-brand/10 text-brand rounded-[28px] mb-8 shadow-inner">
                <Store className="w-10 h-10 md:w-12 md:h-12" />
              </div>
              <h2 className="text-[32px] md:text-[44px] font-extrabold text-[#191F28] mb-6 leading-[1.3] break-keep">지금 바로 선착순 혜택을 잡으세요</h2>
              <p className="text-[17px] md:text-[20px] text-[#4E5968] font-medium leading-[1.6] break-keep px-4">
                초기 등록 사장님 100분께 마케팅으로 즉시 사용할 수 있는<br className="hidden md:block" /> <span className="font-bold text-brand text-[1.1em]">20,000P</span>를 무상 지원해 드립니다.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-8 md:space-y-10 relative z-10">
              <div className="space-y-3">
                <label className="block text-[16px] md:text-[18px] font-bold text-[#333D4B] ml-1">상호명</label>
                <input 
                  type="text" 
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="예: 플바식당 홍대점"
                  className="w-full px-7 py-5 md:py-6 bg-[#F9FAFB] border border-[#E5E8EB] rounded-3xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium text-[17px] shadow-sm"
                />
              </div>
              
              <div className="space-y-3">
                <label className="block text-[16px] md:text-[18px] font-bold text-[#333D4B] ml-1">사장님 연락처</label>
                <input 
                  type="tel" 
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="010-0000-0000"
                  className="w-full px-7 py-5 md:py-6 bg-[#F9FAFB] border border-[#E5E8EB] rounded-3xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium text-[17px] shadow-sm"
                />
              </div>
              
              <div className="space-y-3">
                <label className="block text-[16px] md:text-[18px] font-bold text-[#333D4B] ml-1">가게 업종</label>
                <div className="relative">
                  <select 
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-7 py-5 md:py-6 bg-[#F9FAFB] border border-[#E5E8EB] rounded-3xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all font-medium text-[17px] appearance-none shadow-sm cursor-pointer"
                  >
                    <option value="" disabled>운영하시는 업종을 선택해 주세요</option>
                    <option value="food">음식점 (고깃집/한식/일식/양식 등)</option>
                    <option value="cafe">카페/베이커리/디저트</option>
                    <option value="bar">주점/호프/이자카야</option>
                    <option value="beauty">뷰티/미용실/네일/에스테틱</option>
                    <option value="other">기타 오프라인 매장</option>
                  </select>
                  <ChevronRight className="absolute right-7 top-1/2 -translate-y-1/2 w-6 h-6 text-[#8B95A1] rotate-90 pointer-events-none" />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full py-6 md:py-8 bg-brand text-white rounded-[28px] font-bold text-[20px] md:text-[24px] hover:bg-brand-dark transition-all hover:scale-[1.01] shadow-2xl shadow-brand/30 flex items-center justify-center gap-3"
                >
                  무료로 내 가게 등록하기 <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-[14px] md:text-[16px] text-[#8B95A1] font-semibold pt-4 bg-gray-50/50 py-4 rounded-2xl">
                <ShieldCheck className="w-5 h-5 text-brand" />
                입력하신 정보는 상담 목적으로만 안전하게 사용됩니다.
              </div>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
