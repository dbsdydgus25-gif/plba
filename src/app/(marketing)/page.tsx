"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Store, ShieldCheck, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function LandingPage() {
  const [storeName, setStoreName] = useState("");
  const [contact, setContact] = useState("");
  const [category, setCategory] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert("사전 등록이 완료되었습니다.");
  };

  return (
    <div className="w-full min-h-screen bg-white text-[#191F28] font-sans selection:bg-[#3182F6]/20">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-20 pb-32 px-6 overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#3182F6]/5 rounded-full blur-[100px] -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8F3FF] text-[#1B64DA] font-bold text-sm mb-6">
            🎉 선착순 100곳 사장님 한정 20,000P 무상 지원
          </div>
          
          <h1 className="text-[40px] md:text-[64px] font-extrabold leading-[1.2] tracking-tight mb-6 break-keep">
            손님이 <span className="text-[#3182F6]">결제했을 때만</span><br className="hidden md:block" />
            광고비 내세요.
          </h1>
          
          <p className="text-[18px] md:text-[22px] text-[#4E5968] mb-12 font-medium leading-[1.6] break-keep max-w-2xl mx-auto">
            노출, 클릭, 체험단? 다 필요 없습니다.<br />
            우리 가게에 진짜 방문해서 돈을 쓴 손님에게만 비용을 지불하는<br />
            사장님을 위한 100% 후불제 마케팅 플랫폼, 플바.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full px-4 sm:px-0">
            <a href="#register" className="w-full sm:w-auto px-8 py-5 bg-[#3182F6] hover:bg-[#1B64DA] text-white rounded-2xl font-bold text-xl transition-colors shadow-lg shadow-[#3182F6]/30 flex items-center justify-center gap-2">
              무료로 내 가게 등록하기
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>
          <p className="mt-4 text-[15px] text-[#8B95A1] font-medium">가입비 없음 · 월 고정비 0원 · 언제든 해지 가능</p>
        </motion.div>
      </section>

      {/* 2. PROBLEM SECTION */}
      <section className="py-32 px-6 bg-[#F9FAFB]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[42px] font-extrabold tracking-tight text-[#191F28] mb-4">
              사장님, 혹시 이렇게 돈 쓰고 계신가요?
            </h2>
            <p className="text-[18px] text-[#4E5968] font-medium">매달 나가는 광고비 대비 효과를 체감하기 어려우셨을 겁니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-[24px] shadow-sm border border-[#F2F4F6]">
              <div className="text-[40px] mb-4">📱</div>
              <h3 className="text-[20px] font-bold text-[#191F28] mb-3">SNS / 지역 광고</h3>
              <p className="text-[16px] text-[#4E5968] leading-relaxed break-keep">
                &quot;몇 명이 봤다는데, 정작 오늘 우리 가게 문 열고 들어온 손님이 그 광고를 본 건지 알 수가 없어요.&quot;
              </p>
            </div>
            <div className="bg-white p-8 rounded-[24px] shadow-sm border border-[#F2F4F6]">
              <div className="text-[40px] mb-4">🛵</div>
              <h3 className="text-[20px] font-bold text-[#191F28] mb-3">배달앱 수수료</h3>
              <p className="text-[16px] text-[#4E5968] leading-relaxed break-keep">
                &quot;팔면 팔수록 수수료랑 배달비로 다 나가니까, 오프라인 홀 장사를 늘려야 하는데 방법이 없네요.&quot;
              </p>
            </div>
            <div className="bg-white p-8 rounded-[24px] shadow-sm border border-[#F2F4F6]">
              <div className="text-[40px] mb-4">📝</div>
              <h3 className="text-[20px] font-bold text-[#191F28] mb-3">블로그 체험단</h3>
              <p className="text-[16px] text-[#4E5968] leading-relaxed break-keep">
                &quot;음식 공짜로 주고 포스팅 비용까지 줬는데, 그 글 보고 진짜 찾아오는 사람이 몇 명인지 측정이 안 됩니다.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOLUTION / USE CASES */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20">
            <h2 className="text-[32px] md:text-[42px] font-extrabold tracking-tight text-[#191F28] mb-6 leading-tight break-keep">
              플바는 다릅니다.<br />
              <span className="text-[#3182F6]">진짜 매출이 일어날 때만</span> 정산됩니다.
            </h2>
            <p className="text-[20px] text-[#4E5968] font-medium break-keep">
              이미 많은 동네 사장님들이 광고비 낭비를 멈추고 플바를 선택했습니다.
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {/* Case 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-[#F9FAFB] p-6 md:p-10 rounded-[32px]">
              <div className="w-full md:w-1/2 rounded-[24px] overflow-hidden shadow-lg aspect-[4/3] relative bg-gray-200">
                <Image src="/images/bbq.png" alt="고깃집" fill className="object-cover" />
              </div>
              <div className="w-full md:w-1/2">
                <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-bold mb-4">
                  마포구 삼겹살 전문점
                </div>
                <h3 className="text-[24px] font-bold text-[#191F28] mb-4 break-keep">
                  &quot;매달 버려지던 전단지 비용을<br />실제 방문객 혜택으로 돌렸어요&quot;
                </h3>
                <p className="text-[16px] text-[#4E5968] leading-relaxed break-keep">
                  &quot;전단지 알바 쓰고 인스타 광고 돌리던 돈을 플바 포인트로 충전해뒀습니다. 손님이 밥 다 먹고 결제할 때만 예산이 차감되니까, 진짜 1원도 낭비되는 느낌이 없어요. 단골들이 알아서 주변에 홍보해주니 일석이조입니다.&quot;
                </p>
              </div>
            </div>

            {/* Case 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 bg-[#F9FAFB] p-6 md:p-10 rounded-[32px]">
              <div className="w-full md:w-1/2 rounded-[24px] overflow-hidden shadow-lg aspect-[4/3] relative bg-gray-200">
                <Image src="/images/cafe.png" alt="카페" fill className="object-cover" />
              </div>
              <div className="w-full md:w-1/2">
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-bold mb-4">
                  홍대 로스터리 카페
                </div>
                <h3 className="text-[24px] font-bold text-[#191F28] mb-4 break-keep">
                  &quot;평일 애매한 시간대,<br />빈자리를 동네 주민들이 알아서 채워줍니다&quot;
                </h3>
                <p className="text-[16px] text-[#4E5968] leading-relaxed break-keep">
                  &quot;카페는 객단가가 낮아서 배달 앱 수수료 내면 남는 게 없거든요. 플바는 오프라인 홀 장사에 딱 맞습니다. 방문한 손님 앱 화면 확인하고 결제만 해주면 되니까 바쁠 때도 전혀 번거롭지 않아요.&quot;
                </p>
              </div>
            </div>

            {/* Case 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-[#F9FAFB] p-6 md:p-10 rounded-[32px]">
              <div className="w-full md:w-1/2 rounded-[24px] overflow-hidden shadow-lg aspect-[4/3] relative bg-gray-200">
                <Image src="/images/salon.png" alt="미용실" fill className="object-cover" />
              </div>
              <div className="w-full md:w-1/2">
                <div className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-bold mb-4">
                  강남구 헤어살롱
                </div>
                <h3 className="text-[24px] font-bold text-[#191F28] mb-4 break-keep">
                  &quot;노쇼 걱정 제로!<br />머리 다 하고 결제할 때 정산되니까요&quot;
                </h3>
                <p className="text-[16px] text-[#4E5968] leading-relaxed break-keep">
                  &quot;예약만 걸어두고 안 오는 손님들 때문에 광고 효율 따지기가 너무 힘들었어요. 플바는 100% 매장에서 카드 긁을 때 성과로 인정되니까, 마케팅 비용 계산이 초등학생도 할 수 있을 만큼 명확해졌습니다.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-32 px-6 bg-[#191F28] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[42px] font-extrabold tracking-tight mb-4">
              딱 3단계면 충분합니다
            </h2>
            <p className="text-[18px] text-[#8B95A1] font-medium">복잡한 기기 설치? 전혀 필요 없습니다. 스마트폰만 있으면 됩니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-[#242A32] p-8 rounded-[24px] border border-[#333D4B]">
              <div className="w-12 h-12 bg-[#3182F6] rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-[#3182F6]/30">1</div>
              <h3 className="text-[22px] font-bold mb-3">내 가게 무료 등록</h3>
              <p className="text-[16px] text-[#B0B8C1] leading-relaxed break-keep">
                1분이면 끝납니다. 매장 사진, 메뉴, 원하는 마케팅 예산만 충전해두세요. 소진 전까지 알아서 돌아갑니다.
              </p>
            </div>
            
            <div className="bg-[#242A32] p-8 rounded-[24px] border border-[#333D4B]">
              <div className="w-12 h-12 bg-[#3182F6] rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-[#3182F6]/30">2</div>
              <h3 className="text-[22px] font-bold mb-3">동네 주민의 방문·결제</h3>
              <p className="text-[16px] text-[#B0B8C1] leading-relaxed break-keep">
                플바 유저들이 앱을 보고 매장에 방문합니다. 밥을 다 먹고 평소처럼 카드로 결제합니다.
              </p>
            </div>

            <div className="bg-[#242A32] p-8 rounded-[24px] border border-[#333D4B]">
              <div className="w-12 h-12 bg-[#3182F6] rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-[#3182F6]/30">3</div>
              <h3 className="text-[22px] font-bold mb-3">결제 시에만 비용 차감</h3>
              <p className="text-[16px] text-[#B0B8C1] leading-relaxed break-keep">
                실제 결제가 일어난 것이 확인된 손님에 한해서만, 사장님이 설정해둔 마케팅 예산에서 비용이 차감됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMPARISON */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[42px] font-extrabold tracking-tight text-[#191F28] mb-4">
              왜 플바를 선택해야 할까요?
            </h2>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-[#F2F4F6] shadow-sm">
            <table className="w-full text-left bg-white">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#F2F4F6]">
                  <th className="p-6 text-[15px] text-[#8B95A1] font-bold w-1/4">비교 항목</th>
                  <th className="p-6 text-[16px] text-[#4E5968] font-bold w-1/4 text-center">전단지/오프라인</th>
                  <th className="p-6 text-[16px] text-[#4E5968] font-bold w-1/4 text-center">SNS/배달앱 광고</th>
                  <th className="p-6 text-[18px] text-[#3182F6] font-extrabold w-1/4 text-center bg-[#E8F3FF]/50">플바 (PLBA)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F4F6]">
                <tr>
                  <td className="p-6 font-bold text-[#191F28]">비용 발생</td>
                  <td className="p-6 text-[#4E5968] text-center font-medium">제작·배포 시점</td>
                  <td className="p-6 text-[#4E5968] text-center font-medium">클릭/노출 시점</td>
                  <td className="p-6 text-[#3182F6] font-bold text-center bg-[#E8F3FF]/50">실 방문·결제 시점</td>
                </tr>
                <tr>
                  <td className="p-6 font-bold text-[#191F28]">매출 연결</td>
                  <td className="p-6 text-[#4E5968] text-center font-medium">알 수 없음</td>
                  <td className="p-6 text-[#4E5968] text-center font-medium">불확실</td>
                  <td className="p-6 text-[#3182F6] font-bold text-center bg-[#E8F3FF]/50">100% 확실</td>
                </tr>
                <tr>
                  <td className="p-6 font-bold text-[#191F28]">초기 비용</td>
                  <td className="p-6 text-[#4E5968] text-center font-medium">수십만 원</td>
                  <td className="p-6 text-[#4E5968] text-center font-medium">수십만 원</td>
                  <td className="p-6 text-[#3182F6] font-bold text-center bg-[#E8F3FF]/50">0원 (충전식)</td>
                </tr>
                <tr>
                  <td className="p-6 font-bold text-[#191F28]">유지보수</td>
                  <td className="p-6 text-[#4E5968] text-center font-medium">매번 재제작</td>
                  <td className="p-6 text-[#4E5968] text-center font-medium">계속 관리 필요</td>
                  <td className="p-6 text-[#3182F6] font-bold text-center bg-[#E8F3FF]/50">등록 후 자동 홍보</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. REGISTRATION FORM */}
      <section id="register" className="py-32 px-6 bg-[#F9FAFB]">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-[#F2F4F6]">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E8F3FF] text-[#3182F6] rounded-full mb-6">
                <Store className="w-8 h-8" />
              </div>
              <h2 className="text-[32px] font-extrabold text-[#191F28] mb-4">지금 바로 시작하세요</h2>
              <p className="text-[16px] text-[#4E5968] font-medium break-keep">
                초기 등록 사장님 100분께 마케팅으로 즉시 사용할 수 있는 <span className="font-bold text-[#3182F6]">20,000P</span>를 무상 지원해 드립니다.
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
                  placeholder="가게 이름을 입력해주세요 (예: 플바식당 홍대점)"
                  className="w-full px-5 py-4 bg-[#F9FAFB] border border-[#E5E8EB] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3182F6] focus:border-transparent transition-all font-medium text-[16px]"
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
                  className="w-full px-5 py-4 bg-[#F9FAFB] border border-[#E5E8EB] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3182F6] focus:border-transparent transition-all font-medium text-[16px]"
                />
              </div>
              
              <div>
                <label className="block text-[15px] font-bold text-[#333D4B] mb-2">가게 업종</label>
                <div className="relative">
                  <select 
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-5 py-4 bg-[#F9FAFB] border border-[#E5E8EB] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#3182F6] focus:border-transparent transition-all font-medium text-[16px] appearance-none"
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
                className="w-full py-5 mt-4 bg-[#3182F6] text-white rounded-2xl font-bold text-[18px] hover:bg-[#1B64DA] transition-all shadow-lg shadow-[#3182F6]/20 flex items-center justify-center gap-2"
              >
                무료로 내 가게 등록하기 <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="flex items-center justify-center gap-2 text-[14px] text-[#8B95A1] font-medium pt-2">
                <ShieldCheck className="w-4 h-4" />
                입력하신 정보는 상담 목적으로만 안전하게 사용됩니다.
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 7. MINIMAL FOOTER */}
      <footer className="py-12 px-6 bg-white border-t border-[#F2F4F6]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-extrabold text-2xl tracking-tighter text-[#191F28]">
            PLBA
          </div>
          <div className="text-[14px] text-[#8B95A1] font-medium text-center md:text-left">
            광고비 낭비 없는 진짜 오프라인 마케팅 플랫폼
            <br className="block md:hidden" />
            <span className="hidden md:inline"> · </span>
            제휴 및 문의: <a href="mailto:whyhcompany@gmail.com" className="hover:text-[#4E5968]">whyhcompany@gmail.com</a>
          </div>
          <div className="text-[14px] text-[#B0B8C1] font-medium">
            ⓒ 2026 PLBA. All rights reserved.
          </div>
        </div>
      </footer>
      
    </div>
  );
}
