"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Store, QrCode, UserCheck, Coins } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#5B5BD6]/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00C896]/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto px-6 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5B5BD6]/10 text-[#5B5BD6] font-bold text-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5B5BD6] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5B5BD6]"></span>
            </span>
            단골 가게 홍보하고 현금 벌기
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-[1.15]">
            사고 싶은 건 많은데<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B5BD6] to-[#00C896]">알바비론 부족하잖아?</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            자주 가는 단골 가게 홍보하고 돈도 벌어보세요!<br/>
            <span className="text-gray-400 text-lg md:text-xl block mt-3">사장님, 마케팅에 돈만 쓰고 돌아오는 건 없으셨죠?<br/>확실한 방문에만 차감되는 스마트한 마케팅을 시작하세요.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <Link 
              href="/explore" 
              className="w-full sm:w-auto px-8 py-4 bg-[#5B5BD6] text-white rounded-xl font-bold text-lg hover:bg-[#4646C0] transition-all shadow-xl shadow-[#5B5BD6]/25 flex items-center justify-center gap-2 group"
            >
              캠페인 둘러보기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/for-business" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl font-bold text-lg transition-all flex items-center justify-center"
            >
              사장님이신가요?
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-gray-200/50">
            <div className="flex flex-col items-center text-center pl-0">
              <p className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 font-inter">1,200+</p>
              <p className="text-sm font-medium text-gray-500">제휴 매장</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <p className="text-4xl md:text-5xl font-extrabold text-[#5B5BD6] mb-2 font-inter">85K+</p>
              <p className="text-sm font-medium text-gray-500">활동 파트너</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <p className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 font-inter">4.8</p>
              <p className="text-sm font-medium text-gray-500">평균 만족도</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <p className="text-4xl md:text-5xl font-extrabold text-[#00C896] mb-2 font-inter">₩1.2B</p>
              <p className="text-sm font-medium text-gray-500">누적 리워드 지급</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              플바는 어떻게 작동하나요?
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              사장님은 손님을 얻고, 파트너는 수익을 얻는 가장 확실한 방법입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-100 -z-10" />

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative bg-white">
              <div className="w-24 h-24 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 shadow-sm border border-indigo-100/50">
                <Store className="w-10 h-10 text-[#5B5BD6]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. 캠페인 등록</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                사장님이 플바에 매장을 등록하고<br/>
                방문당 지급할 리워드를 설정합니다.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative bg-white">
              <div className="w-24 h-24 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 shadow-sm border border-indigo-100/50">
                <QrCode className="w-10 h-10 text-[#5B5BD6]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. 홍보 링크 발급</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                파트너가 캠페인을 선택하고<br/>
                본인만의 고유 QR/링크를 발급받아 공유합니다.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative bg-white">
              <div className="w-24 h-24 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 shadow-sm border border-indigo-100/50">
                <UserCheck className="w-10 h-10 text-[#5B5BD6]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. 손님 방문 및 인증</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                소비자가 링크를 통해 매장에 방문하고<br/>
                QR을 스캔하여 혜택을 받습니다.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center relative bg-white">
              <div className="w-24 h-24 rounded-2xl bg-[#00C896]/10 flex items-center justify-center mb-6 shadow-sm border border-[#00C896]/20">
                <Coins className="w-10 h-10 text-[#00C896]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. 리워드 즉시 지급</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                인증과 동시에 리워드가 차감되며<br/>
                파트너에게 수익금의 80%가 즉시 적립됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#1A1A24] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            지금 바로 파트너로 활동하세요
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            내가 자주 가는 단골집, 동네 맛집을 홍보하고 매일 수익을 창출할 수 있습니다.
          </p>
          <button className="px-10 py-5 bg-[#5B5BD6] text-white rounded-2xl font-bold text-xl hover:bg-[#4646C0] transition-all shadow-2xl shadow-[#5B5BD6]/40">
            3초만에 무료 회원가입
          </button>
        </div>
      </section>

    </div>
  );
}
