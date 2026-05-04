"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Gift, Shield, Users } from "lucide-react";

export default function PreRegistrationForm() {
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
    // TODO: Supabase 연동 시 여기에 DB Insert 로직 추가
    alert("사전등록이 완료되었습니다! 런칭 시 가장 먼저 연락드리겠습니다.");
    setFormData({ storeName: "", managerName: "", phone: "", agreed: false });
  };

  return (
    <div className="flex flex-col w-full min-h-screen font-sans bg-[#f8f9ff]">
      
      {/* Hero & Form Section */}
      <section className="relative w-full pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#5B5BD6]/5 to-transparent -z-10" />
        
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Left: Copy & Value Proposition */}
          <div className="flex flex-col items-start animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 font-bold text-sm mb-6 border border-red-100">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              얼리버드 선착순 100팀 한정 혜택
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
              가게 앞을 지나치는 손님, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B5BD6] to-[#00C896]">단골로 만들 수 있다면?</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 font-medium">
              초기 비용 0원. 복잡한 기기 설치 없음.<br />
              확실한 방문에만 마케팅 비용을 지불하는 가장 쉬운 플랫폼.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#00C896]/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896]" />
                </div>
                <span className="text-lg font-medium text-gray-800">초기 가입비 및 설치비 <span className="font-bold text-[#5B5BD6]">전액 무료</span></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#00C896]/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896]" />
                </div>
                <span className="text-lg font-medium text-gray-800">실제 매출 발생 시에만 <span className="font-bold text-[#5B5BD6]">수수료 차감</span></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#00C896]/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-[#00C896]" />
                </div>
                <span className="text-lg font-medium text-gray-800">스마트폰 하나로 <span className="font-bold text-[#5B5BD6]">모든 성과 확인</span></span>
              </div>
            </div>
          </div>

          {/* Right: Registration Form Card */}
          <div className="relative w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#5B5BD6] to-[#00C896] rounded-3xl blur opacity-20"></div>
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">무료 사전등록</h2>
              <p className="text-gray-500 text-sm mb-8">가게 이름과 연락처만 남겨주시면 가장 먼저 런칭 소식을 알려드립니다.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">가게 이름</label>
                  <input
                    type="text"
                    id="storeName"
                    placeholder="예: 플바 식당"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]/50 focus:border-[#5B5BD6] transition-all bg-gray-50/50"
                    value={formData.storeName}
                    onChange={(e) => setFormData({...formData, storeName: e.target.value})}
                  />
                </div>

                <div>
                  <label htmlFor="managerName" className="block text-sm font-medium text-gray-700 mb-1">담당자 성함</label>
                  <input
                    type="text"
                    id="managerName"
                    placeholder="예: 홍길동"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]/50 focus:border-[#5B5BD6] transition-all bg-gray-50/50"
                    value={formData.managerName}
                    onChange={(e) => setFormData({...formData, managerName: e.target.value})}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                  <input
                    type="tel"
                    id="phone"
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
                    id="agreed"
                    className="mt-1 w-4 h-4 text-[#5B5BD6] border-gray-300 rounded focus:ring-[#5B5BD6]"
                    checked={formData.agreed}
                    onChange={(e) => setFormData({...formData, agreed: e.target.checked})}
                  />
                  <label htmlFor="agreed" className="text-sm text-gray-500 cursor-pointer">
                    (필수) 개인정보 수집 및 이용에 동의합니다. 수집된 정보는 서비스 출시 안내 외 다른 목적으로 사용되지 않습니다.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 mt-4 bg-[#5B5BD6] text-white rounded-xl font-bold text-lg hover:bg-[#4646C0] transition-colors shadow-lg shadow-[#5B5BD6]/30 flex items-center justify-center gap-2 group"
                >
                  사전등록 완료하기
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-[#00C896]/10 text-[#00C896] font-bold rounded-full text-sm mb-4">
              EARLY BIRD
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">지금 사전등록하면 드리는 특별한 혜택</h2>
            <p className="text-lg text-gray-500">초기 런칭 파트너 사장님들께만 제공되는 파격적인 지원을 놓치지 마세요.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#f8f9ff] p-8 rounded-3xl border border-[#5B5BD6]/10 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#5B5BD6] mb-6">
                <Gift className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">출시 후 3개월 수수료 0원</h3>
              <p className="text-gray-600 leading-relaxed">
                정식 오픈 후 3개월 동안 발생하는 모든 마케팅 유입 수수료를 전액 면제해 드립니다. (100팀 한정)
              </p>
            </div>

            <div className="bg-[#f8f9ff] p-8 rounded-3xl border border-[#5B5BD6]/10 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#5B5BD6] mb-6">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">지역 내 홍보 우선 매칭</h3>
              <p className="text-gray-600 leading-relaxed">
                가게 주변의 영향력 있는 파트너(개인)들에게 사장님의 매장이 가장 먼저 최상단에 노출되도록 지원합니다.
              </p>
            </div>

            <div className="bg-[#f8f9ff] p-8 rounded-3xl border border-[#5B5BD6]/10 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#5B5BD6] mb-6">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1:1 전담 마케터 배정</h3>
              <p className="text-gray-600 leading-relaxed">
                복잡한 설정 없이도 최적의 성과를 내실 수 있도록, 플바 전담 매니저가 1:1로 캠페인 세팅을 도와드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
