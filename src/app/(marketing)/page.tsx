"use client";

import Link from "next/link";
import { ArrowRight, Store, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen font-sans bg-[#f8f9ff]">
      
      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-20 overflow-hidden flex flex-col items-center justify-start">
        {/* Abstract Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-r from-[#5B5BD6]/10 to-[#00C896]/10 blur-[100px] rounded-full -z-10" />

        <div className="max-w-5xl mx-auto px-6 text-center z-10 flex flex-col items-center mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#5B5BD6]/20 text-[#5B5BD6] font-semibold text-sm mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#5B5BD6] animate-pulse"></span>
            오프라인 매장 무료 근태관리 & 로컬 리워드 마케팅
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight font-inter">
            단 하나의 링크로<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B5BD6] to-[#00C896]">가장 쉬운 마케팅</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
            사장님은 확실한 방문에만 마케팅 비용을 지불하고,<br />
            파트너는 단골 가게를 홍보하며 수익을 창출하는 스마트한 플랫폼.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-20">
            <Link 
              href="/dashboard" 
              className="px-8 py-4 bg-[#1A1A24] text-white rounded-full font-bold text-lg hover:bg-black transition-all shadow-xl shadow-black/10 flex items-center gap-2 group hover:-translate-y-1"
            >
              지금 바로 시작하기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Target Audience Section - Split View */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">플바(plba)와 함께하는 두 가지 방법</h2>
            <p className="text-lg text-gray-500">원하시는 입장을 선택하고 서비스를 알아보세요.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            
            {/* For Business Owners */}
            <div className="group relative bg-[#f8f9ff] rounded-3xl p-8 md:p-12 border border-[#5B5BD6]/10 hover:border-[#5B5BD6]/30 transition-colors shadow-sm hover:shadow-xl hover:shadow-[#5B5BD6]/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#5B5BD6]/10 to-transparent rounded-bl-full rounded-tr-3xl -z-0" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#5B5BD6] mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Store className="w-8 h-8" />
                </div>
                
                <h3 className="text-3xl font-extrabold text-gray-900 mb-4">매장 사장님이신가요?</h3>
                <p className="text-gray-500 mb-8 font-medium">허수 없는 확실한 로컬 마케팅으로 단골 고객을 늘리세요.</p>
                
                <ul className="space-y-6 mt-auto">
                  <li className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#5B5BD6]/10 flex items-center justify-center text-[#5B5BD6] font-bold shrink-0 mt-0.5">1</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">예산 충전 및 단가 설정</h4>
                      <p className="text-gray-500 text-sm">마케팅 예산을 충전하고 방문 1건당 지불할 비용을 직접 설정하세요.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#5B5BD6]/10 flex items-center justify-center text-[#5B5BD6] font-bold shrink-0 mt-0.5">2</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">실제 매출 발생 시만 차감</h4>
                      <p className="text-gray-500 text-sm">단순 클릭이 아닌, 고객이 매장에 방문하여 결제(매출)가 일어날 때만 예산이 차감됩니다.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#5B5BD6]/10 flex items-center justify-center text-[#5B5BD6] font-bold shrink-0 mt-0.5">3</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">투명한 마케팅 리포트</h4>
                      <p className="text-gray-500 text-sm">어떤 경로로 얼마나 방문했는지 실시간 데이터 리포트를 받아보세요.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* For Partners (Individuals) */}
            <div className="group relative bg-[#f5fffc] rounded-3xl p-8 md:p-12 border border-[#00C896]/10 hover:border-[#00C896]/30 transition-colors shadow-sm hover:shadow-xl hover:shadow-[#00C896]/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00C896]/10 to-transparent rounded-bl-full rounded-tr-3xl -z-0" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#00C896] mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8" />
                </div>
                
                <h3 className="text-3xl font-extrabold text-gray-900 mb-4">개인 (파트너)이신가요?</h3>
                <p className="text-gray-500 mb-8 font-medium">단골 가게를 주변에 알리고 현금 수익을 매일매일 창출하세요.</p>
                
                <ul className="space-y-6 mt-auto">
                  <li className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#00C896]/10 flex items-center justify-center text-[#00C896] font-bold shrink-0 mt-0.5">1</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">홍보할 매장 선택</h4>
                      <p className="text-gray-500 text-sm">평소 자주 가거나 주변 사람들에게 추천하고 싶은 매장을 선택하세요.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#00C896]/10 flex items-center justify-center text-[#00C896] font-bold shrink-0 mt-0.5">2</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">고유 링크 발급 및 홍보</h4>
                      <p className="text-gray-500 text-sm">터치 한 번으로 나만의 고유 링크를 만들고 온/오프라인 어디든 자유롭게 공유하세요.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#00C896]/10 flex items-center justify-center text-[#00C896] font-bold shrink-0 mt-0.5">3</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">방문 즉시 수익금 적립</h4>
                      <p className="text-gray-500 text-sm">내 링크를 받은 사람이 매장을 방문하거나 사용하면, 내 계좌로 바로 수익이 적립됩니다.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Simplified Bottom CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            앱 설치 없이 카카오톡으로 3초만에
          </h2>
          <p className="text-xl text-gray-500 mb-10">
            복잡한 과정 없이 지금 바로 로컬 마케팅을 시작해 보세요.
          </p>
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-10 py-4 bg-[#5B5BD6] text-white rounded-full font-bold text-xl hover:bg-[#4646C0] hover:scale-105 transition-all shadow-xl shadow-[#5B5BD6]/30">
            무료로 시작하기 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
