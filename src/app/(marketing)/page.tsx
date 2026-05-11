"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Store, ShieldCheck, ChevronRight, Wallet, Gift, Camera, QrCode, CheckCircle2 } from "lucide-react";
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
    <div className="w-full min-h-screen bg-white text-[#191F28] font-sans selection:bg-brand/20 leading-[1.6]">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-20 pb-24 px-6 overflow-hidden flex flex-col items-center text-center min-h-[85vh] justify-center">
        {/* Background Image Slider */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.25, scale: 1 }}
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
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white z-10" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto z-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand/10 text-brand-dark font-bold text-sm md:text-base mb-8 shadow-sm">
            🎉 선착순 100곳 사장님 한정 20,000P 무상 지원
          </div>
          
          <h1 className="text-[38px] md:text-[64px] font-extrabold leading-[1.3] tracking-tight mb-8 break-keep">
            손님이 <span className="text-brand">결제했을 때만</span><br className="hidden md:block" />
            광고비 내세요.
          </h1>
          
          <p className="text-[18px] md:text-[24px] text-[#4E5968] mb-12 font-medium leading-[1.6] break-keep max-w-2xl mx-auto">
            클릭만 하고 안 오는 광고는 그만.<br />
            매장에 방문해서 돈을 쓴 손님에게만 비용을 지불하는<br />
            100% 후불제 마케팅 플랫폼, 플바.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full px-4 sm:px-0">
            <a href="#register" className="w-full sm:w-auto px-8 py-5 md:px-10 md:py-6 bg-brand hover:bg-brand-dark text-white rounded-2xl font-bold text-xl md:text-2xl transition-colors shadow-lg shadow-brand/30 flex items-center justify-center gap-2">
              무료로 내 가게 등록하기
              <ArrowRight className="w-6 h-6 md:w-7 md:h-7" />
            </a>
          </div>
          <p className="mt-6 text-[15px] md:text-[17px] text-[#6B7684] font-medium">가입비 없음 · 월 고정비 0원 · 언제든 해지 가능</p>
        </motion.div>
      </section>

      {/* 2. PROBLEM SECTION */}
      <section className="py-20 md:py-28 px-6 bg-[#F9FAFB]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-[28px] md:text-[42px] font-extrabold tracking-tight text-[#191F28] mb-6 leading-[1.4] break-keep">
              사장님, 혹시 이렇게 돈 쓰고 계신가요?
            </h2>
            <p className="text-[16px] md:text-[20px] text-[#4E5968] font-medium leading-[1.6] break-keep">
              매달 나가는 광고비, 효과를 체감하기 어려우셨을 겁니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-8 md:p-10 rounded-[24px] shadow-sm border border-[#F2F4F6]">
              <div className="text-[44px] mb-6">📱</div>
              <h3 className="text-[22px] font-bold text-[#191F28] mb-4">SNS / 지역 광고</h3>
              <p className="text-[16px] text-[#4E5968] leading-[1.6] break-keep">
                클릭 수는 높은데, 정작 오늘 우리 가게에 방문한 손님은 몇 명이나 될까요?
              </p>
            </div>
            <div className="bg-white p-8 md:p-10 rounded-[24px] shadow-sm border border-[#F2F4F6]">
              <div className="text-[44px] mb-6">🛵</div>
              <h3 className="text-[22px] font-bold text-[#191F28] mb-4">배달앱 수수료</h3>
              <p className="text-[16px] text-[#4E5968] leading-[1.6] break-keep">
                팔면 팔수록 나가는 배달비와 수수료 때문에 오프라인 홀 장사가 절실하지 않으신가요?
              </p>
            </div>
            <div className="bg-white p-8 md:p-10 rounded-[24px] shadow-sm border border-[#F2F4F6]">
              <div className="text-[44px] mb-6">📝</div>
              <h3 className="text-[22px] font-bold text-[#191F28] mb-4">블로그 체험단</h3>
              <p className="text-[16px] text-[#4E5968] leading-[1.6] break-keep">
                음식 제공에 원고료까지 줬는데, 진짜 매출로 이어졌는지 파악하기 막막하시죠?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOLUTION / USE CASES (Structure Kept, Text Shortened) */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 md:mb-20 text-center md:text-left">
            <h2 className="text-[28px] md:text-[42px] font-extrabold tracking-tight text-[#191F28] mb-6 leading-[1.4] break-keep">
              플바는 다릅니다.<br />
              <span className="text-brand">진짜 매출이 일어날 때만</span> 정산됩니다.
            </h2>
            <p className="text-[16px] md:text-[22px] text-[#4E5968] font-medium leading-[1.6] break-keep">
              이미 많은 동네 사장님들이 광고비 낭비를 멈추고 플바를 선택했습니다.
            </p>
          </div>

          <div className="flex flex-col gap-12 md:gap-16">
            {/* Case 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8 bg-[#F9FAFB] p-8 rounded-[32px]">
              <div className="w-full md:w-5/12 rounded-[24px] overflow-hidden shadow-sm aspect-[4/3] relative bg-gray-200">
                <Image src="/images/bbq.png" alt="고깃집" fill className="object-cover" />
              </div>
              <div className="w-full md:w-7/12">
                <div className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold mb-4">
                  마포구 삼겹살 전문점
                </div>
                <h3 className="text-[22px] md:text-[26px] font-bold text-[#191F28] mb-4 leading-[1.4] break-keep">
                  &quot;버려지던 전단지 비용을<br />실제 방문객 혜택으로 돌렸어요&quot;
                </h3>
                <p className="text-[15px] md:text-[17px] text-[#4E5968] leading-[1.6] break-keep">
                  &quot;단골들이 플바 앱으로 방문해서 혜택을 받고, 알아서 주변에 홍보해 주니 일석이조입니다. 진짜 결제가 일어날 때만 예산이 차감되니 1원도 낭비되는 느낌이 없어요.&quot;
                </p>
              </div>
            </div>

            {/* Case 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 bg-[#F9FAFB] p-8 rounded-[32px]">
              <div className="w-full md:w-5/12 rounded-[24px] overflow-hidden shadow-sm aspect-[4/3] relative bg-gray-200">
                <Image src="/images/cafe.png" alt="카페" fill className="object-cover" />
              </div>
              <div className="w-full md:w-7/12">
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-4">
                  홍대 로스터리 카페
                </div>
                <h3 className="text-[22px] md:text-[26px] font-bold text-[#191F28] mb-4 leading-[1.4] break-keep">
                  &quot;평일 애매한 시간대,<br />빈자리를 동네 주민들이 알아서 채워줍니다&quot;
                </h3>
                <p className="text-[15px] md:text-[17px] text-[#4E5968] leading-[1.6] break-keep">
                  &quot;배달 수수료 내면 남는 게 없던 카페 장사에 플바는 완벽한 해결책이었습니다. 오프라인 방문 유도에 직빵이고 바쁠 때도 결제 화면만 확인하면 되니 너무 간편해요.&quot;
                </p>
              </div>
            </div>

            {/* Case 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8 bg-[#F9FAFB] p-8 rounded-[32px]">
              <div className="w-full md:w-5/12 rounded-[24px] overflow-hidden shadow-sm aspect-[4/3] relative bg-gray-200">
                <Image src="/images/salon.png" alt="미용실" fill className="object-cover" />
              </div>
              <div className="w-full md:w-7/12">
                <div className="inline-block px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-bold mb-4">
                  강남구 헤어살롱
                </div>
                <h3 className="text-[22px] md:text-[26px] font-bold text-[#191F28] mb-4 leading-[1.4] break-keep">
                  &quot;노쇼 걱정 제로!<br />머리 다 하고 결제할 때 정산되니까요&quot;
                </h3>
                <p className="text-[15px] md:text-[17px] text-[#4E5968] leading-[1.6] break-keep">
                  &quot;예약만 하고 안 오는 손님들 때문에 광고 효율 따지기가 너무 힘들었어요. 플바는 매장에서 실제로 카드를 긁을 때 성과로 인정되니 마케팅 비용 계산이 명확해졌습니다.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (Replaced with 5-Step Visual Flow) */}
      <section className="py-20 md:py-28 px-6 bg-[#191F28] text-white overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-[28px] md:text-[42px] font-extrabold tracking-tight mb-4 leading-[1.4] break-keep">
              앱 하나로 끝나는<br className="md:hidden" /> 초간단 5단계 마케팅
            </h2>
            <p className="text-[16px] md:text-[20px] text-[#8B95A1] font-medium break-keep">
              복잡한 기기 설치 없이, 사장님 스마트폰 하나면 충분합니다.
            </p>
          </div>

          <div className="relative border-l-2 border-[#333D4B] ml-6 md:ml-[50%] space-y-12 pb-8">
            
            {/* Step 1 */}
            <div className="relative pl-10 md:pl-0 md:flex md:items-center md:justify-between w-full">
              <div className="absolute left-[-17px] md:left-1/2 md:-ml-[17px] w-8 h-8 bg-[#242A32] border-2 border-brand rounded-full flex items-center justify-center z-10">
                <span className="text-brand text-sm font-bold">1</span>
              </div>
              <div className="md:w-5/12 md:text-right md:pr-12">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#333D4B] mb-4 md:ml-auto md:mr-0">
                  <Wallet className="w-6 h-6 text-[#B0B8C1]" />
                </div>
                <h3 className="text-[20px] font-bold mb-2">포인트 충전</h3>
                <p className="text-[15px] text-[#8B95A1] leading-[1.6] break-keep">
                  이번 달 원하는 만큼만 마케팅 예산을 간편하게 충전하세요.
                </p>
              </div>
              <div className="hidden md:block md:w-5/12"></div>
            </div>

            {/* Step 2 */}
            <div className="relative pl-10 md:pl-0 md:flex md:items-center md:justify-between w-full">
              <div className="absolute left-[-17px] md:left-1/2 md:-ml-[17px] w-8 h-8 bg-[#242A32] border-2 border-brand rounded-full flex items-center justify-center z-10">
                <span className="text-brand text-sm font-bold">2</span>
              </div>
              <div className="hidden md:block md:w-5/12"></div>
              <div className="md:w-5/12 md:pl-12">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand/20 mb-4">
                  <Gift className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-[20px] font-bold mb-2">이벤트/리워드 설정</h3>
                <p className="text-[15px] text-[#8B95A1] leading-[1.6] break-keep">
                  방문 손님에게 제공할 할인 혜택이나 리워드(리뷰 작성 시)를 직접 설정합니다.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative pl-10 md:pl-0 md:flex md:items-center md:justify-between w-full">
              <div className="absolute left-[-17px] md:left-1/2 md:-ml-[17px] w-8 h-8 bg-[#242A32] border-2 border-brand rounded-full flex items-center justify-center z-10">
                <span className="text-brand text-sm font-bold">3</span>
              </div>
              <div className="md:w-5/12 md:text-right md:pr-12">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#333D4B] mb-4 md:ml-auto md:mr-0">
                  <Camera className="w-6 h-6 text-[#B0B8C1]" />
                </div>
                <h3 className="text-[20px] font-bold mb-2">홍보 사진 업로드</h3>
                <p className="text-[15px] text-[#8B95A1] leading-[1.6] break-keep">
                  먹음직스러운 메뉴 사진과 매장 사진을 올려 동네 유저들을 유혹하세요.
                </p>
              </div>
              <div className="hidden md:block md:w-5/12"></div>
            </div>

            {/* Step 4 */}
            <div className="relative pl-10 md:pl-0 md:flex md:items-center md:justify-between w-full">
              <div className="absolute left-[-17px] md:left-1/2 md:-ml-[17px] w-8 h-8 bg-[#242A32] border-2 border-brand rounded-full flex items-center justify-center z-10">
                <span className="text-brand text-sm font-bold">4</span>
              </div>
              <div className="hidden md:block md:w-5/12"></div>
              <div className="md:w-5/12 md:pl-12">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand mb-4 shadow-lg shadow-brand/40">
                  <QrCode className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[20px] font-bold mb-2 text-brand">손님 방문 및 QR 스캔</h3>
                <p className="text-[15px] text-[#8B95A1] leading-[1.6] break-keep">
                  앱을 본 손님이 방문하여 사장님이 보여주는 QR 코드를 스캔합니다.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative pl-10 md:pl-0 md:flex md:items-center md:justify-between w-full">
              <div className="absolute left-[-17px] md:left-1/2 md:-ml-[17px] w-8 h-8 bg-[#242A32] border-2 border-brand rounded-full flex items-center justify-center z-10">
                <span className="text-brand text-sm font-bold">5</span>
              </div>
              <div className="md:w-5/12 md:text-right md:pr-12">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-mint/20 mb-4 md:ml-auto md:mr-0">
                  <CheckCircle2 className="w-6 h-6 text-mint" />
                </div>
                <h3 className="text-[20px] font-bold mb-2">결제 확인 후 포인트 차감</h3>
                <p className="text-[15px] text-[#8B95A1] leading-[1.6] break-keep">
                  손님이 카드로 결제한 것이 확인되면, 설정해둔 마케팅비만 안전하게 차감됩니다.
                </p>
              </div>
              <div className="hidden md:block md:w-5/12"></div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. COMPARISON TABLE (Restored & Text Shortened) */}
      <section className="py-20 md:py-28 px-6 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[28px] md:text-[42px] font-extrabold tracking-tight text-[#191F28] mb-4 leading-[1.4]">
              왜 플바를 선택해야 할까요?
            </h2>
          </div>

          <div className="overflow-x-auto rounded-[24px] border border-[#F2F4F6] shadow-sm pb-4 md:pb-0">
            <table className="w-[800px] md:w-full text-left bg-white min-w-max">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#F2F4F6]">
                  <th className="p-5 md:p-8 text-[15px] text-[#8B95A1] font-bold w-1/4">비교 항목</th>
                  <th className="p-5 md:p-8 text-[15px] text-[#4E5968] font-bold w-1/4 text-center">전단지/오프라인</th>
                  <th className="p-5 md:p-8 text-[15px] text-[#4E5968] font-bold w-1/4 text-center">SNS/배달앱 광고</th>
                  <th className="p-5 md:p-8 text-[16px] text-brand font-extrabold w-1/4 text-center bg-brand/5 rounded-tr-[24px]">플바 (PLBA)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F4F6]">
                <tr>
                  <td className="p-5 md:p-8 font-bold text-[15px] text-[#191F28]">비용 발생</td>
                  <td className="p-5 md:p-8 text-[15px] text-[#4E5968] text-center">제작·배포 시점</td>
                  <td className="p-5 md:p-8 text-[15px] text-[#4E5968] text-center">클릭/노출 시점</td>
                  <td className="p-5 md:p-8 text-[15px] text-brand font-bold text-center bg-brand/5">방문·결제 시점</td>
                </tr>
                <tr>
                  <td className="p-5 md:p-8 font-bold text-[15px] text-[#191F28]">매출 연결</td>
                  <td className="p-5 md:p-8 text-[15px] text-[#4E5968] text-center">알 수 없음</td>
                  <td className="p-5 md:p-8 text-[15px] text-[#4E5968] text-center">불확실</td>
                  <td className="p-5 md:p-8 text-[15px] text-brand font-bold text-center bg-brand/5">100% 확실</td>
                </tr>
                <tr>
                  <td className="p-5 md:p-8 font-bold text-[15px] text-[#191F28]">초기 비용</td>
                  <td className="p-5 md:p-8 text-[15px] text-[#4E5968] text-center">수십만 원</td>
                  <td className="p-5 md:p-8 text-[15px] text-[#4E5968] text-center">수십만 원</td>
                  <td className="p-5 md:p-8 text-[15px] text-brand font-bold text-center bg-brand/5">0원 (무료 충전)</td>
                </tr>
                <tr>
                  <td className="p-5 md:p-8 font-bold text-[15px] text-[#191F28]">유지보수</td>
                  <td className="p-5 md:p-8 text-[15px] text-[#4E5968] text-center">매번 재제작</td>
                  <td className="p-5 md:p-8 text-[15px] text-[#4E5968] text-center">계속 관리 필요</td>
                  <td className="p-5 md:p-8 text-[15px] text-brand font-bold text-center bg-brand/5 rounded-br-[24px]">자동 홍보</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-[#8B95A1] text-xs mt-3 md:hidden">표를 좌우로 스크롤하여 확인하세요.</p>
        </div>
      </section>

      {/* 6. REGISTRATION FORM (Text Shortened) */}
      <section id="register" className="py-20 md:py-28 px-6 bg-[#F9FAFB]">
        <div className="max-w-2xl mx-auto pb-24">
          <div className="bg-white rounded-[32px] p-8 md:p-14 shadow-xl border border-[#F2F4F6]">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-brand/10 text-brand rounded-full mb-6">
                <Store className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#191F28] mb-4 leading-[1.4]">지금 바로 시작하세요</h2>
              <p className="text-[15px] md:text-[17px] text-[#4E5968] font-medium leading-[1.6] break-keep">
                초기 등록 사장님 100분께 즉시 사용할 수 있는 <span className="font-bold text-brand">20,000P</span>를 무상 지원합니다.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6 md:space-y-8">
              <div>
                <label className="block text-[15px] md:text-[16px] font-bold text-[#333D4B] mb-2">상호명</label>
                <input 
                  type="text" 
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="예: 플바식당 홍대점"
                  className="w-full px-5 py-4 bg-[#F9FAFB] border border-[#E5E8EB] rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all font-medium text-[15px]"
                />
              </div>
              
              <div>
                <label className="block text-[15px] md:text-[16px] font-bold text-[#333D4B] mb-2">사장님 연락처</label>
                <input 
                  type="tel" 
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="010-0000-0000"
                  className="w-full px-5 py-4 bg-[#F9FAFB] border border-[#E5E8EB] rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all font-medium text-[15px]"
                />
              </div>
              
              <div>
                <label className="block text-[15px] md:text-[16px] font-bold text-[#333D4B] mb-2">가게 업종</label>
                <div className="relative">
                  <select 
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-5 py-4 bg-[#F9FAFB] border border-[#E5E8EB] rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all font-medium text-[15px] appearance-none"
                  >
                    <option value="" disabled>어떤 가게를 운영하시나요?</option>
                    <option value="food">음식점 (고깃집/한식/일식/양식 등)</option>
                    <option value="cafe">카페/베이커리/디저트</option>
                    <option value="bar">주점/호프/이자카야</option>
                    <option value="beauty">뷰티/미용실/네일/에스테틱</option>
                    <option value="other">기타 오프라인 매장</option>
                  </select>
                  <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B95A1] rotate-90 pointer-events-none" />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-5 md:py-6 mt-2 bg-brand text-white rounded-2xl font-bold text-[18px] hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 flex items-center justify-center gap-2"
              >
                무료로 내 가게 등록하기 <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="flex items-center justify-center gap-1.5 text-[13px] md:text-[14px] text-[#8B95A1] font-medium pt-2">
                <ShieldCheck className="w-4 h-4" />
                입력하신 정보는 상담 목적으로만 안전하게 사용됩니다.
              </div>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
