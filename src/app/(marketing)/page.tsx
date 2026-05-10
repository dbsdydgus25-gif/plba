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
    <div className="w-full min-h-screen bg-white text-[#191F28] font-sans selection:bg-brand/20">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-24 pb-20 px-6 overflow-hidden flex flex-col items-center text-center min-h-[75vh] justify-center">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.3, scale: 1 }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto z-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand font-bold text-sm mb-6 shadow-sm">
            🎉 선착순 100곳 사장님 한정 20,000P 지원
          </div>
          
          <h1 className="text-[36px] md:text-[56px] font-extrabold leading-[1.3] tracking-tight mb-6 break-keep">
            손님이 <span className="text-brand">결제했을 때만</span><br />
            마케팅비 내세요.
          </h1>
          
          <p className="text-[17px] md:text-[22px] text-[#4E5968] mb-10 font-medium leading-[1.6] break-keep max-w-xl mx-auto">
            클릭만 하고 안 오는 광고는 그만.<br />
            진짜 방문해서 결제한 손님에게만 과금되는<br />
            100% 후불제 마케팅 플랫폼.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
            <a href="#register" className="w-full sm:w-auto px-8 py-4 bg-brand hover:bg-brand-dark text-white rounded-2xl font-bold text-lg transition-colors shadow-lg shadow-brand/30 flex items-center justify-center gap-2">
              무료로 시작하기
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* 2. PROBLEM SECTION (Shortened) */}
      <section className="py-20 px-6 bg-[#F9FAFB]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[28px] md:text-[36px] font-extrabold tracking-tight mb-12 leading-[1.4] break-keep">
            사장님, 혹시 이렇게 돈 쓰고 계신가요?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-[24px] shadow-sm border border-[#F2F4F6] flex flex-col items-center">
              <div className="text-[40px] mb-4">📱</div>
              <h3 className="text-[18px] font-bold text-[#191F28] mb-2">SNS / 지역 광고</h3>
              <p className="text-[15px] text-[#4E5968] leading-[1.6] break-keep">
                클릭만 하고 정작 가게엔 안 오면?
              </p>
            </div>
            <div className="bg-white p-8 rounded-[24px] shadow-sm border border-[#F2F4F6] flex flex-col items-center">
              <div className="text-[40px] mb-4">🛵</div>
              <h3 className="text-[18px] font-bold text-[#191F28] mb-2">배달앱 수수료</h3>
              <p className="text-[15px] text-[#4E5968] leading-[1.6] break-keep">
                홀 장사 비중을 늘리고 싶다면?
              </p>
            </div>
            <div className="bg-white p-8 rounded-[24px] shadow-sm border border-[#F2F4F6] flex flex-col items-center">
              <div className="text-[40px] mb-4">📝</div>
              <h3 className="text-[18px] font-bold text-[#191F28] mb-2">블로그 체험단</h3>
              <p className="text-[15px] text-[#4E5968] leading-[1.6] break-keep">
                진짜 매출로 이어졌는지 모르겠다면?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (5-Step Visual Flow) */}
      <section className="py-24 px-6 bg-[#191F28] text-white overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[28px] md:text-[38px] font-extrabold tracking-tight mb-4 leading-[1.4] break-keep">
              앱 하나로 끝나는<br/>초간단 5단계 마케팅
            </h2>
            <p className="text-[16px] text-[#8B95A1] font-medium break-keep">
              복잡한 기기 설치 없이, 사장님 스마트폰 하나면 충분합니다.
            </p>
          </div>

          <div className="relative border-l-2 border-[#333D4B] ml-4 md:ml-1/2 space-y-12 pb-8">
            
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
                  원하는 만큼만 마케팅 예산을 간편하게 충전하세요.
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
                  방문 손님에게 제공할 할인 혜택이나 리워드를 직접 설정합니다.
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
                  먹음직스러운 메뉴 사진과 매장 사진을 올려 유저들을 유혹하세요.
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
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#333D4B] mb-4 md:ml-auto md:mr-0">
                  <CheckCircle2 className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-[20px] font-bold mb-2">결제 확인 후 마케팅비 차감</h3>
                <p className="text-[15px] text-[#8B95A1] leading-[1.6] break-keep">
                  손님이 카드로 결제한 것이 확인되면, 설정해둔 마케팅비만 안전하게 차감됩니다.
                </p>
              </div>
              <div className="hidden md:block md:w-5/12"></div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SOLUTION / USE CASES (Shortened) */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-[28px] md:text-[38px] font-extrabold tracking-tight text-[#191F28] mb-4 leading-[1.4] break-keep">
              진짜 매출이 일어날 때만 정산되니까!
            </h2>
            <p className="text-[16px] text-[#4E5968] font-medium break-keep">
              이미 많은 동네 사장님들이 광고비 낭비를 멈췄습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F9FAFB] rounded-[24px] overflow-hidden">
              <div className="relative h-48 bg-gray-200">
                <Image src="/images/bbq.png" alt="고깃집" fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="text-sm font-bold text-orange-600 mb-2">마포구 삼겹살 전문점</div>
                <h3 className="text-[18px] font-bold text-[#191F28] mb-2 leading-[1.4]">
                  &quot;버려지던 전단지 비용,<br/>실제 방문객 혜택으로!&quot;
                </h3>
              </div>
            </div>

            <div className="bg-[#F9FAFB] rounded-[24px] overflow-hidden">
              <div className="relative h-48 bg-gray-200">
                <Image src="/images/cafe.png" alt="카페" fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="text-sm font-bold text-blue-600 mb-2">홍대 로스터리 카페</div>
                <h3 className="text-[18px] font-bold text-[#191F28] mb-2 leading-[1.4]">
                  &quot;평일 애매한 시간대,<br/>동네 주민들로 가득 찼어요!&quot;
                </h3>
              </div>
            </div>

            <div className="bg-[#F9FAFB] rounded-[24px] overflow-hidden">
              <div className="relative h-48 bg-gray-200">
                <Image src="/images/salon.png" alt="미용실" fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="text-sm font-bold text-pink-600 mb-2">강남구 헤어살롱</div>
                <h3 className="text-[18px] font-bold text-[#191F28] mb-2 leading-[1.4]">
                  &quot;결제할 때 정산되니까<br/>노쇼 걱정이 완전히 사라졌어요&quot;
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. REGISTRATION FORM */}
      <section id="register" className="py-24 px-6 bg-[#F9FAFB]">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-[#F2F4F6]">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand/10 text-brand rounded-full mb-6">
                <Store className="w-8 h-8" />
              </div>
              <h2 className="text-[28px] font-extrabold text-[#191F28] mb-4">지금 바로 시작하세요</h2>
              <p className="text-[15px] text-[#4E5968] font-medium leading-[1.6] break-keep">
                초기 등록 사장님 100분께 마케팅으로 즉시 사용할 수 있는 <span className="font-bold text-brand">20,000P</span>를 무상 지원합니다.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-[15px] font-bold text-[#333D4B] mb-2">상호명</label>
                <input 
                  type="text" 
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="예: 플바식당 홍대점"
                  className="w-full px-5 py-4 bg-[#F9FAFB] border border-[#E5E8EB] rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all font-medium text-[16px]"
                />
              </div>
              
              <div>
                <label className="block text-[15px] font-bold text-[#333D4B] mb-2">사장님 연락처</label>
                <input 
                  type="tel" 
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="010-0000-0000"
                  className="w-full px-5 py-4 bg-[#F9FAFB] border border-[#E5E8EB] rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all font-medium text-[16px]"
                />
              </div>
              
              <div>
                <label className="block text-[15px] font-bold text-[#333D4B] mb-2">가게 업종</label>
                <div className="relative">
                  <select 
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-5 py-4 bg-[#F9FAFB] border border-[#E5E8EB] rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all font-medium text-[16px] appearance-none"
                  >
                    <option value="" disabled>어떤 가게를 운영하시나요?</option>
                    <option value="food">음식점 (고깃집/한식/일식 등)</option>
                    <option value="cafe">카페/베이커리</option>
                    <option value="bar">주점/호프/이자카야</option>
                    <option value="beauty">뷰티/미용실/네일</option>
                    <option value="other">기타 오프라인 매장</option>
                  </select>
                  <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B95A1] rotate-90 pointer-events-none" />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-5 mt-2 bg-brand text-white rounded-2xl font-bold text-[18px] hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 flex items-center justify-center gap-2"
              >
                무료로 내 가게 등록하기 <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="flex items-center justify-center gap-1.5 text-[13px] text-[#8B95A1] font-medium pt-2">
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
