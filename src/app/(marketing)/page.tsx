"use client";

import Link from "next/link";

import { ArrowRight, CheckCircle2, Zap, Shield, BarChart3 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen font-sans">
      
      {/* Hero Section (Reference 3rd Image Structure) */}
      <section className="relative w-full pt-32 pb-40 overflow-hidden flex flex-col items-center justify-start min-h-[90vh]">
        {/* Abstract Background (Gradient instead of landscape for modern SaaS look) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f9ff] to-white -z-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-r from-[#5B5BD6]/10 to-[#00C896]/10 blur-[100px] rounded-full -z-10" />

        <div className="max-w-5xl mx-auto px-6 text-center z-10 flex flex-col items-center mt-12">
          
          <h1 className="text-6xl md:text-8xl font-medium text-gray-900 tracking-tight mb-6 leading-tight font-inter">
            단 하나의 링크로<br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#5B5BD6] to-[#4646C0]">가장 쉬운 마케팅</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-500 mb-10 max-w-3xl mx-auto font-normal leading-relaxed">
            자주 가는 단골 가게 홍보하고 돈도 벌어보세요. <br />
            사장님은 확실한 방문에만 마케팅 비용을 지불하는 스마트한 플랫폼입니다.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-20">
            <Link 
              href="/guide" 
              className="px-8 py-4 bg-white text-gray-900 border border-gray-200 hover:border-gray-300 rounded-full font-bold text-lg transition-all"
            >
              이용방법 알아보기
            </Link>
            <Link 
              href="/dashboard" 
              className="px-8 py-4 bg-[#1A1A24] text-white rounded-full font-bold text-lg hover:bg-black transition-all shadow-xl flex items-center gap-2 group"
            >
              지금 바로 시작하기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70 mb-16">
            <div className="flex items-center gap-2 text-gray-600 font-medium text-lg">
              <Zap className="w-6 h-6" /> 실시간 정산
            </div>
            <div className="flex items-center gap-2 text-gray-600 font-medium text-lg">
              <Shield className="w-6 h-6" /> 확실한 방문 인증
            </div>
            <div className="flex items-center gap-2 text-gray-600 font-medium text-lg">
              <BarChart3 className="w-6 h-6" /> 투명한 리포트
            </div>
            <div className="flex items-center gap-2 text-gray-600 font-medium text-lg">
              <CheckCircle2 className="w-6 h-6" /> 무료 간편가입
            </div>
          </div>

          {/* Dashboard Mockup (Floating UI) */}
          <div className="relative w-full max-w-4xl mx-auto rounded-2xl border border-gray-200/50 bg-white/80 backdrop-blur-xl shadow-2xl shadow-indigo-500/10 overflow-hidden mt-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
            {/* Mockup Header */}
            <div className="h-12 border-b border-gray-100 flex items-center px-4 gap-2 bg-gray-50/50">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="ml-4 text-xs text-gray-400 font-medium">plba dashboard</div>
            </div>
            {/* Mockup Body */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                <div className="flex gap-6">
                  <div className="font-bold text-gray-900 border-b-2 border-[#5B5BD6] pb-4 -mb-[18px]">Overview</div>
                  <div className="font-medium text-gray-500">Campaigns</div>
                  <div className="font-medium text-gray-500">Reports</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-1 border border-gray-100 rounded-xl p-6 bg-gray-50/30">
                  <div className="text-sm text-gray-500 mb-2">Total Revenue</div>
                  <div className="text-3xl font-bold font-inter text-gray-900">₩1,250,000</div>
                  <div className="text-xs text-[#00C896] font-medium mt-2">+12.5% this month</div>
                </div>
                <div className="col-span-1 border border-gray-100 rounded-xl p-6 bg-gray-50/30">
                  <div className="text-sm text-gray-500 mb-2">Active Links</div>
                  <div className="text-3xl font-bold font-inter text-gray-900">24</div>
                  <div className="text-xs text-gray-400 font-medium mt-2">Across 5 campaigns</div>
                </div>
                <div className="col-span-1 border border-gray-100 rounded-xl p-6 bg-gray-50/30">
                  <div className="text-sm text-gray-500 mb-2">Total Clicks</div>
                  <div className="text-3xl font-bold font-inter text-gray-900">8,402</div>
                  <div className="text-xs text-[#5B5BD6] font-medium mt-2">Conversion rate: 4.2%</div>
                </div>
              </div>
            </div>
            {/* Gradient Overlay for bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
          </div>
        </div>
      </section>

      {/* Simplified Bottom CTA */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            지금 바로 파트너로 활동하세요
          </h2>
          <p className="text-xl text-gray-500 mb-10">
            앱 설치 없이 카카오톡 간편가입으로 3초만에 시작할 수 있습니다.
          </p>
          <Link href="/dashboard" className="inline-flex px-10 py-4 bg-[#5B5BD6] text-white rounded-full font-bold text-xl hover:bg-[#4646C0] transition-all shadow-xl shadow-[#5B5BD6]/30">
            무료로 시작하기
          </Link>
        </div>
      </section>
    </div>
  );
}
