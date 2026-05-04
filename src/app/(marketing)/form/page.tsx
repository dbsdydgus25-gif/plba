"use client";

import { useState } from "react";
import { ArrowRight, Check, X, Store, Users, TrendingUp, HelpCircle, Gift, CheckCircle2, Smartphone } from "lucide-react";

// 재사용 가능한 사전등록 폼 컴포넌트
const RegistrationForm = ({ isFooter = false }: { isFooter?: boolean }) => {
  const [formData, setFormData] = useState({
    storeName: "",
    managerName: "",
    phone: "",
    agreed: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }
    alert("사전등록이 완료되었습니다! 런칭 시 가장 먼저 연락드리겠습니다.");
    setFormData({ storeName: "", managerName: "", phone: "", agreed: false });
  };

  return (
    <div className={`relative bg-white rounded-3xl p-8 shadow-xl border ${isFooter ? 'border-[#5B5BD6]/20' : 'border-gray-100'} w-full max-w-md mx-auto`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">무료 사전등록</h2>
      <p className="text-gray-500 text-sm mb-8">가게 이름과 연락처만 남겨주시면 가장 먼저 런칭 소식을 알려드립니다.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor={`storeName-${isFooter}`} className="block text-sm font-medium text-gray-700 mb-1">가게 이름</label>
          <input
            type="text"
            id={`storeName-${isFooter}`}
            placeholder="예: 플바 레스토랑"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]/50 focus:border-[#5B5BD6] transition-all bg-gray-50/50"
            value={formData.storeName}
            onChange={(e) => setFormData({...formData, storeName: e.target.value})}
          />
        </div>

        <div>
          <label htmlFor={`managerName-${isFooter}`} className="block text-sm font-medium text-gray-700 mb-1">담당자 성함</label>
          <input
            type="text"
            id={`managerName-${isFooter}`}
            placeholder="예: 홍길동"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]/50 focus:border-[#5B5BD6] transition-all bg-gray-50/50"
            value={formData.managerName}
            onChange={(e) => setFormData({...formData, managerName: e.target.value})}
          />
        </div>

        <div>
          <label htmlFor={`phone-${isFooter}`} className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
          <input
            type="tel"
            id={`phone-${isFooter}`}
            placeholder="010-0000-0000"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]/50 focus:border-[#5B5BD6] transition-all bg-gray-50/50"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>

        <div className="flex items-start gap-2 pt-2">
          <input
            type="checkbox"
            id={`agreed-${isFooter}`}
            className="mt-1 w-4 h-4 text-[#5B5BD6] border-gray-300 rounded focus:ring-[#5B5BD6]"
            checked={formData.agreed}
            onChange={(e) => setFormData({...formData, agreed: e.target.checked})}
          />
          <label htmlFor={`agreed-${isFooter}`} className="text-sm text-gray-500 cursor-pointer leading-tight">
            (필수) 개인정보 수집 및 이용에 동의합니다. 수집된 정보는 서비스 출시 안내 목적으로만 사용됩니다.
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-4 mt-4 bg-[#5B5BD6] text-white rounded-xl font-bold text-lg hover:bg-[#4646C0] transition-colors shadow-lg shadow-[#5B5BD6]/30 flex items-center justify-center gap-2 group"
        >
          무료 사전등록하기
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
};

export default function PreRegistrationPage() {
  return (
    <div className="flex flex-col w-full min-h-screen font-sans bg-white pt-20">
      
      {/* 1. Hero Section */}
      <section className="relative w-full pt-16 pb-24 overflow-hidden bg-[#f8f9ff]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col items-start z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black text-white font-bold text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              얼리버드 선착순 100팀 한정
            </div>

            <p className="text-[#5B5BD6] font-bold text-lg mb-3">개인 파트너 연계 로컬 마케팅 플랫폼</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1A1A2E] leading-tight mb-6 tracking-tight break-keep">
              단 하나의 링크로 <br />
              <span className="text-[#5B5BD6]">수많은 단골을 모셔오세요</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 font-medium break-keep">
              초기 비용 0원. 앱 설치 없이 바로 시작.<br />
              확실한 매출이 발생할 때만 마케팅 비용을 지불하세요.
            </p>

            <div className="flex flex-wrap gap-4 w-full max-w-lg mb-8">
              <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-[#5B5BD6]/20 flex flex-col items-center justify-center text-center">
                <p className="text-sm text-gray-500 font-medium mb-1">손님 유치 예산</p>
                <p className="text-2xl font-bold text-[#5B5BD6]">자유 설정</p>
              </div>
              <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-[#5B5BD6]/20 flex flex-col items-center justify-center text-center">
                <p className="text-sm text-gray-500 font-medium mb-1">초기 가입비/도입비</p>
                <p className="text-2xl font-bold text-gray-900">0원</p>
              </div>
            </div>
          </div>

          <div className="z-10">
            <RegistrationForm />
          </div>
        </div>
      </section>

      {/* 2. Pain Point & Cost Comparison */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#00C896] font-bold text-lg mb-3">비용 문제 해결</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-6 break-keep">
            오지 않을지도 모르는 불특정 다수에게<br/>언제까지 아까운 돈을 쓰실 건가요?
          </h2>
          <p className="text-xl text-gray-500 mb-16 break-keep">
            기존 마케팅은 돈을 써도 진짜 우리 가게에 왔는지 알 수 없었어요.<br/>
            플바는 <span className="font-bold text-gray-900">링크를 통해 손님이 매장에 방문하여 진짜 매출이 발생할 때만</span> 예산이 차감됩니다.
          </p>

          <div className="flex flex-col gap-4 max-w-2xl mx-auto text-left">
            <div className="bg-gray-50 p-6 rounded-2xl flex items-center justify-between opacity-60 grayscale">
              <div className="flex items-center gap-4">
                <X className="w-6 h-6 text-red-500" />
                <div>
                  <p className="font-bold text-gray-900 text-lg line-through decoration-red-500 decoration-2">배달앱 중개 수수료</p>
                  <p className="text-sm text-gray-500">주문금액 기준 약 15% 이상</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-2xl flex items-center justify-between opacity-60 grayscale">
              <div className="flex items-center gap-4">
                <X className="w-6 h-6 text-red-500" />
                <div>
                  <p className="font-bold text-gray-900 text-lg line-through decoration-red-500 decoration-2">전단지 1,000장 배포</p>
                  <p className="text-sm text-gray-500">최소 10만원 이상 (유입 효과 측정 불가)</p>
                </div>
              </div>
            </div>

            <div className="bg-[#f8f9ff] p-6 rounded-2xl flex items-center justify-between border-2 border-[#5B5BD6] transform scale-105 shadow-xl shadow-[#5B5BD6]/10">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#5B5BD6] flex items-center justify-center text-white">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[#5B5BD6] text-xl">플바 (PLBA)</p>
                  <p className="text-sm text-gray-700 font-medium">파트너 링크를 통한 실제 매출 발생 시에만 예산 차감</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Scenario */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#5B5BD6] font-bold text-lg mb-3">실제 이런 식으로 작동해요</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-6">단골 고객이 우리 가게의 영업사원이 됩니다</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 relative">
            <div className="bg-white p-8 rounded-3xl shadow-md w-full md:w-1/2 relative z-10 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 text-[#5B5BD6] rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">단골 고객 (파트너)</h3>
              <p className="text-gray-500 mb-6">플바에서 우리 가게 고유 홍보 링크를 생성하고, 친구들이나 단톡방에 공유합니다.</p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                <p className="font-medium text-[#5B5BD6]">&quot;여기 진짜 맛있어! 내 링크로 가면 서비스 준대!&quot;</p>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center relative z-0">
              <div className="w-16 border-t-4 border-dashed border-[#00C896] absolute"></div>
              <ArrowRight className="w-8 h-8 text-[#00C896] absolute bg-gray-50 right-0 translate-x-1/2" />
            </div>

            <div className="bg-[#f0fbf8] p-8 rounded-3xl shadow-lg shadow-[#00C896]/10 w-full md:w-1/2 relative z-10 border-2 border-[#00C896]">
              <div className="w-12 h-12 bg-[#00C896]/10 text-[#00C896] rounded-xl flex items-center justify-center mb-4">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">사장님 가게</h3>
              <p className="text-gray-500 mb-6">링크를 받은 지인이 매장에 와서 실제로 결제를 완료합니다.</p>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <p className="font-bold text-[#00C896]">신규 고객 방문 완료 & 진짜 매출 발생!</p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-2xl p-6 md:p-8 max-w-3xl mx-auto shadow-sm border border-gray-100 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#5B5BD6] shrink-0" />
              <p className="text-lg text-gray-800 font-medium">홍보한 파트너는 <span className="font-bold text-[#5B5BD6]">수익(리워드)을 정산 받습니다.</span></p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#00C896] shrink-0" />
              <p className="text-lg text-gray-800 font-medium">사장님은 <span className="font-bold text-[#00C896]">아무것도 안 하고 새로운 단골을 확보합니다. (윈윈)</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#00C896] font-bold text-lg mb-3">사용 방법</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-6">복잡한 절차 없이 아주 단순합니다</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xl mb-6">1</div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">예산 충전 & 마케팅 세팅</h3>
              <p className="text-gray-500 text-sm">플바 대시보드에서 마케팅 예산을 충전하고, 원하는 리워드 금액을 설정합니다.</p>
            </div>
            <div className="flex flex-col items-center text-center relative">
              <ArrowRight className="hidden md:block absolute -right-6 top-8 w-6 h-6 text-gray-300" />
              <div className="w-16 h-16 rounded-2xl bg-[#f8f9ff] flex items-center justify-center text-[#5B5BD6] font-bold text-xl mb-6">2</div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">개인 파트너들의 자발적 홍보</h3>
              <p className="text-gray-500 text-sm">개인 파트너들이 우리 가게 링크를 온/오프라인으로 널리널리 퍼뜨립니다.</p>
            </div>
            <div className="flex flex-col items-center text-center relative">
              <ArrowRight className="hidden md:block absolute -right-6 top-8 w-6 h-6 text-gray-300" />
              <div className="w-16 h-16 rounded-2xl bg-[#f0fbf8] flex items-center justify-center text-[#00C896] font-bold text-xl mb-6">3</div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">확실한 매출과 자동 리포트</h3>
              <p className="text-gray-500 text-sm">링크를 통해 유입된 고객이 결제하면 자동 차감되며, 플바 대시보드에서 성과를 확인합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Benefits */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#00C896] font-bold text-lg mb-3">사장님이 얻는 것</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">사장님은 장사에만 집중하세요<br/>홍보는 플바 파트너들이 대신 해드립니다</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 p-8 rounded-3xl border border-white/5 flex gap-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6 text-[#00C896]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">가장 확실한 비용 대비 효과</h3>
                <p className="text-gray-400">돈만 쓰고 효과를 모르는 홍보는 끝. 링크를 통해 실제 결제(매출)가 일어난 건에만 마케팅 비용이 차감됩니다.</p>
              </div>
            </div>
            
            <div className="bg-white/10 p-8 rounded-3xl border border-white/5 flex gap-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-[#5B5BD6]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">동네 인싸들이 내 영업사원</h3>
                <p className="text-gray-400">동네 마당발 단골 고객들이 자발적으로 사장님의 링크를 뿌려줍니다. 혼자 하는 마케팅보다 백배 낫습니다.</p>
              </div>
            </div>

            <div className="bg-white/10 p-8 rounded-3xl border border-white/5 flex gap-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <Gift className="w-6 h-6 text-[#00C896]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">내 예산에 맞춘 자율 설정</h3>
                <p className="text-gray-400">플랫폼이 강제하는 수수료가 아닙니다. 사장님 예산에 맞춰 마케팅 예산을 충전하고 리워드 금액을 자유롭게 설정하세요.</p>
              </div>
            </div>

            <div className="bg-white/10 p-8 rounded-3xl border border-white/5 flex gap-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <Smartphone className="w-6 h-6 text-[#5B5BD6]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">마케팅 리포트 자동 생성</h3>
                <p className="text-gray-400">이번 달 홍보 링크를 통해 몇 명이 왔고, 얼마의 매출이 올랐는지 대시보드에서 투명하게 리포트로 제공해 드립니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Early Bird */}
      <section className="py-24 bg-[#e8fbf5]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1.5 bg-[#00C896] text-white font-bold rounded-full text-sm mb-6">
            EARLY BIRD 선착순 100팀
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">지금 사전등록 하시는 분들께만</h2>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#00C896]/20 text-left space-y-6">
            <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
              <CheckCircle2 className="w-7 h-7 text-[#00C896] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">출시 후 3개월 기본 이용료 전액 0원</h3>
                <p className="text-gray-600">초기 런칭 파트너로서, 가장 먼저 플바의 폭발적인 유입 효과를 무료로 누려보세요.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
              <CheckCircle2 className="w-7 h-7 text-[#00C896] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">초기 홍보 파트너 집중 매칭</h3>
                <p className="text-gray-600">사장님 매장을 적극적으로 홍보해 줄 지역 내 열성 파트너들을 가장 먼저 매칭해 드립니다.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-7 h-7 text-[#00C896] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">전담 매니저 1:1 캠페인 세팅</h3>
                <p className="text-gray-600">복잡한 설정 없이도 최적의 성과를 내실 수 있도록, 플바 전담 매니저가 직접 캠페인 세팅을 도와드립니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-12 text-center">자주 묻는 질문</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#5B5BD6]" />
                예산 차감은 정확히 언제 이루어지나요?
              </h3>
              <p className="text-gray-600 ml-7">개인 파트너가 공유한 링크를 통해 손님이 매장에 방문하여, **실제로 결제를 마친 것이 확인된 경우에만** 사장님이 미리 충전해둔 마케팅 예산에서 설정한 금액만큼 차감됩니다.</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#5B5BD6]" />
                어떤 업종이든 참여할 수 있나요?
              </h3>
              <p className="text-gray-600 ml-7">네! 식당, 카페, 미용실, 네일샵, 헬스장 등 오프라인 매장을 운영 중이며 실제 매출 발생 확인이 가능한 곳이라면 어디든 참여 가능합니다.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#5B5BD6]" />
                파트너(홍보하는 사람)는 아무나 할 수 있나요?
              </h3>
              <p className="text-gray-600 ml-7">네, 사장님의 단골 손님부터 동네 인플루언서까지 누구나 플바에서 링크를 생성하고 수익을 창출할 수 있습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final CTA Form */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#5B5BD6] font-bold text-lg mb-3">사전등록</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-6">플바를 통해 진짜 매출이 오르는<br/>경험을 가장 먼저 선점하세요</h2>
          <p className="text-lg text-gray-500 mb-12">서비스 런칭 시 등록하신 연락처로 1:1 안내를 도와드립니다.</p>
          
          <RegistrationForm isFooter={true} />
        </div>
      </section>
      
    </div>
  );
}
