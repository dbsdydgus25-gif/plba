"use client";

import { useState } from "react";
import { ArrowRight, Check, X, Store, Users, TrendingUp, ShieldCheck, HelpCircle, Gift, CheckCircle2 } from "lucide-react";


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
            placeholder="예: 맛있는 분식"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00C896]/50 focus:border-[#00C896] transition-all bg-gray-50/50"
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
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00C896]/50 focus:border-[#00C896] transition-all bg-gray-50/50"
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
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00C896]/50 focus:border-[#00C896] transition-all bg-gray-50/50"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>

        <div className="flex items-start gap-2 pt-2">
          <input
            type="checkbox"
            id={`agreed-${isFooter}`}
            className="mt-1 w-4 h-4 text-[#00C896] border-gray-300 rounded focus:ring-[#00C896]"
            checked={formData.agreed}
            onChange={(e) => setFormData({...formData, agreed: e.target.checked})}
          />
          <label htmlFor={`agreed-${isFooter}`} className="text-sm text-gray-500 cursor-pointer leading-tight">
            (필수) 개인정보 수집 및 이용에 동의합니다. 수집된 정보는 서비스 출시 안내 목적으로만 사용됩니다.
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-4 mt-4 bg-[#00C896] text-white rounded-xl font-bold text-lg hover:bg-[#00b386] transition-colors shadow-lg shadow-[#00C896]/30 flex items-center justify-center gap-2 group"
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
      <section className="relative w-full pt-16 pb-24 overflow-hidden bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col items-start z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black text-white font-bold text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              현재 128팀 사전등록 중
            </div>

            <p className="text-[#5B5BD6] font-bold text-lg mb-3">오프라인 매장 리워드 연계 플랫폼</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1A1A2E] leading-tight mb-6 tracking-tight break-keep">
              매일 옆 가게 앞을 지나치는 손님, <br />
              <span className="text-[#00C896]">한 번만 들르게 할 수 있다면?</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 font-medium break-keep">
              초기 비용 0원. 내 마음대로 정하는 할인/리워드 혜택.<br />
              옆 가게 손님을 우리 가게로 모셔오세요.
            </p>

            <div className="flex flex-wrap gap-4 w-full max-w-lg mb-8">
              <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                <p className="text-sm text-gray-500 font-medium mb-1">손님 1명 유입 비용</p>
                <p className="text-2xl font-bold text-[#00C896]">자유 설정</p>
              </div>
              <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                <p className="text-sm text-gray-500 font-medium mb-1">초기 도입 비용</p>
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
          <p className="text-[#00C896] font-bold text-lg mb-3">비용</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-6 break-keep">
            오지 않을지도 모르는 불특정 다수에게<br/>언제까지 아까운 돈을 쓰실 건가요?
          </h2>
          <p className="text-xl text-gray-500 mb-16 break-keep">
            기존 마케팅은 돈을 써도 진짜 우리 가게에 왔는지 알 수 없었어요.<br/>
            플바는 <span className="font-bold text-gray-900">손님이 매장에 방문하여 결제할 때만</span> 미리 정한 리워드 예산이 차감됩니다.
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

            <div className="bg-[#f0fbf8] p-6 rounded-2xl flex items-center justify-between border-2 border-[#00C896] transform scale-105 shadow-xl shadow-[#00C896]/10">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#00C896] flex items-center justify-center text-white">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[#00C896] text-xl">플바 (PLBA)</p>
                  <p className="text-sm text-gray-700 font-medium">실제 결제(방문) 발생 시에만 지정 리워드 차감</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-6">점심 먹은 손님이 커피 마시러 옵니다</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 relative">
            <div className="bg-white p-8 rounded-3xl shadow-md w-full md:w-1/2 relative z-10 border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center mb-4">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">행복식당 (한식당)</h3>
              <p className="text-gray-500 mb-6">손님이 점심식사를 마치고 결제합니다.</p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
                <p className="font-medium text-gray-800">&quot;영수증이나 식당 내 NFC를 태그해 보세요!&quot;</p>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center relative z-0">
              <div className="w-16 border-t-4 border-dashed border-[#5B5BD6] absolute"></div>
              <ArrowRight className="w-8 h-8 text-[#5B5BD6] absolute bg-gray-50 right-0 translate-x-1/2" />
            </div>

            <div className="bg-[#f8f9ff] p-8 rounded-3xl shadow-lg shadow-[#5B5BD6]/10 w-full md:w-1/2 relative z-10 border-2 border-[#5B5BD6]">
              <div className="w-12 h-12 bg-[#5B5BD6]/10 text-[#5B5BD6] rounded-xl flex items-center justify-center mb-4">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">모닝카페 (근처 카페)</h3>
              <p className="text-gray-500 mb-6">손님의 스마트폰에 할인 팝업이 뜹니다.</p>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <p className="font-bold text-[#5B5BD6]">아메리카노 1,000원 할인 쿠폰 도착!</p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-2xl p-6 md:p-8 max-w-3xl mx-auto shadow-sm border border-gray-100 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#00C896] shrink-0" />
              <p className="text-lg text-gray-800 font-medium">모닝카페는 <span className="font-bold text-[#00C896]">새로운 식후 손님 1명 유입</span></p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#00C896] shrink-0" />
              <p className="text-lg text-gray-800 font-medium">행복식당은 <span className="font-bold text-[#5B5BD6]">손님 1명당 일정 리워드 수익 창출 (윈윈)</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#00C896] font-bold text-lg mb-3">작동 방식</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-6">NFC나 고유 링크 하나로<br/>동네 손님이 우리 가게 손님이 됩니다</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xl mb-6">1</div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">파트너 매장 방문</h3>
              <p className="text-gray-500 text-sm">손님이 연계된 동네 파트너 매장을 방문하거나 링크를 받습니다.</p>
            </div>
            <div className="flex flex-col items-center text-center relative">
              <ArrowRight className="hidden md:block absolute -right-6 top-8 w-6 h-6 text-gray-300" />
              <div className="w-16 h-16 rounded-2xl bg-[#f8f9ff] flex items-center justify-center text-[#5B5BD6] font-bold text-xl mb-6">2</div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">혜택 자동 노출</h3>
              <p className="text-gray-500 text-sm">NFC 스티커 태그 시, 사장님 가게의 할인/서비스 혜택이 손님 폰에 뜹니다.</p>
            </div>
            <div className="flex flex-col items-center text-center relative">
              <ArrowRight className="hidden md:block absolute -right-6 top-8 w-6 h-6 text-gray-300" />
              <div className="w-16 h-16 rounded-2xl bg-[#f0fbf8] flex items-center justify-center text-[#00C896] font-bold text-xl mb-6">3</div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">자연스러운 방문</h3>
              <p className="text-gray-500 text-sm">혜택을 확인한 손님이 2차, 3차 동선으로 자연스럽게 사장님 가게를 찾습니다.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center text-white font-bold text-xl mb-6">4</div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">데이터로 성과 확인</h3>
              <p className="text-gray-500 text-sm">어디서 몇 명의 손님이 왔는지 플바 대시보드에서 데이터로 봅니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Benefits */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#00C896] font-bold text-lg mb-3">사장님이 얻는 것</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">혼자 하는 마케팅은 그만<br/>같은 상권 매장끼리 뭉치면 모두가 이깁니다</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 p-8 rounded-3xl border border-white/5 flex gap-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6 text-[#00C896]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">확실한 비용 대비 효과</h3>
                <p className="text-gray-400">돈만 쓰고 효과를 모르는 홍보는 끝. 실제 결제/방문한 손님에게만 비용이 발생합니다.</p>
              </div>
            </div>
            
            <div className="bg-white/10 p-8 rounded-3xl border border-white/5 flex gap-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-[#5B5BD6]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">옆 가게가 내 마케터</h3>
                <p className="text-gray-400">인근 매장과 연계하면, 그 매장의 단골이 자연스럽게 우리 가게의 신규 고객으로 유입됩니다.</p>
              </div>
            </div>

            <div className="bg-white/10 p-8 rounded-3xl border border-white/5 flex gap-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <Gift className="w-6 h-6 text-[#00C896]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">내 맘대로 혜택 설정</h3>
                <p className="text-gray-400">할인, 추가 서비스, 사은품 등 원하는 혜택과 마케팅 예산을 자유롭게 설정하고 변경합니다.</p>
              </div>
            </div>

            <div className="bg-white/10 p-8 rounded-3xl border border-white/5 flex gap-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#5B5BD6]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">부정 이용 완벽 차단</h3>
                <p className="text-gray-400">NFC 기반의 실제 방문 인증 시스템으로 허위 청구 및 가짜 트래픽이 원천적으로 불가능합니다.</p>
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">출시 후 3개월 수수료 0원</h3>
                <p className="text-gray-600">정식 오픈 후 3개월 동안 발생하는 플바 중개 수수료를 전액 면제해 드립니다.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
              <CheckCircle2 className="w-7 h-7 text-[#00C896] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">반경 500m 매장 우선 노출 매칭</h3>
                <p className="text-gray-600">사전등록 매장끼리 먼저 연계가 설정되어, 주변 파트너들에게 우리 가게가 최상단에 노출됩니다.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-7 h-7 text-[#00C896] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">NFC 홍보 스티커 무료 제작</h3>
                <p className="text-gray-600">매장 테이블이나 포스기에 부착할 수 있는 프리미엄 NFC 스티커 세트를 무료로 제작, 배송해 드립니다.</p>
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
                결제 수수료는 언제 빠져나가나요?
              </h3>
              <p className="text-gray-600 ml-7">손님이 연계 매장을 거쳐 사장님의 매장에 도착한 뒤, 실제로 결제를 마친 것이 확인된 경우에만 미리 충전해둔 예산에서 차감됩니다.</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#5B5BD6]" />
                어떤 업종이든 참여할 수 있나요?
              </h3>
              <p className="text-gray-600 ml-7">네! 식당, 카페, 미용실, 네일샵, 헬스장, PC방 등 방문 고객을 대상으로 하는 모든 오프라인 매장이 참여 가능합니다.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#5B5BD6]" />
                NFC 스티커 설치가 어렵지 않나요?
              </h3>
              <p className="text-gray-600 ml-7">전혀 어렵지 않습니다. 보내드리는 스티커를 매장 계산대나 테이블에 붙이기만 하면 끝입니다. 스마트폰만 대면 자동으로 인식됩니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final CTA Form */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#5B5BD6] font-bold text-lg mb-3">사전등록</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E] mb-6">출시 전 미리 등록하고,<br/>얼리버드 혜택을 선점하세요</h2>
          <p className="text-lg text-gray-500 mb-12">서비스 런칭 시 등록하신 연락처로 가장 먼저 알려드립니다.</p>
          
          <RegistrationForm isFooter={true} />
        </div>
      </section>
      
    </div>
  );
}
