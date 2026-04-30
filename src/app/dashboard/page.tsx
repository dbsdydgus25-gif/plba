"use client";

import { Search, TrendingUp, MousePointerClick, CheckCircle, Wallet, Store, ChevronRight, Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  // 간단한 MOCK 데이터
  const partnerStats = {
    clicks: 124,
    conversions: 8,
    revenue: 4000, // 8건 * 500원
    conversionRate: 6.45
  };

  // 사업자 미등록 상태 (Empty state 구현용)
  const isBusinessRegistered = false;

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 pb-24">
      
      {/* 1. 통합 검색바 영역 (쿠팡 파트너스 홈 벤치마킹) */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="relative max-w-3xl mx-auto">
            <input 
              type="text" 
              placeholder="홍보할 매장이나 키워드를 검색해보세요!" 
              className="w-full bg-gray-50 border-2 border-[#5B5BD6]/20 rounded-2xl py-5 pl-6 pr-16 text-lg shadow-sm outline-none focus:border-[#5B5BD6] focus:bg-white transition-all focus:shadow-md"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#5B5BD6] text-white rounded-xl flex items-center justify-center hover:bg-[#4646C0] transition-colors">
              <Search className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex justify-center gap-3 mt-4 text-sm">
            <span className="text-gray-400 font-medium">추천 키워드:</span>
            {["강남역 카페", "홍대 맛집", "필라테스", "신규 오픈"].map(keyword => (
              <Link key={keyword} href="/explore" className="text-[#5B5BD6] hover:underline font-medium">
                {keyword}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-6 py-10 space-y-12">
        
        {/* 2. 파트너 실적 요약 (보라색 박스) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">내 파트너 활동 실적</h2>
            <Link href="/dashboard/report" className="text-sm font-medium text-gray-500 hover:text-[#5B5BD6] flex items-center">
              상세 리포트 보기 <ChevronRight className="w-4 h-4 ml-0.5" />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-[#5B5BD6] to-[#4646C0] rounded-3xl p-8 text-white shadow-xl shadow-[#5B5BD6]/20">
            <div className="flex flex-col md:flex-row gap-8 justify-between">
              
              <div className="flex-1">
                <p className="text-indigo-200 font-medium mb-2 flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  이번 달 누적 수익금
                </p>
                <div className="text-4xl md:text-5xl font-extrabold font-inter tracking-tight">
                  ₩{partnerStats.revenue.toLocaleString()}
                </div>
                <button className="mt-6 px-6 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-sm font-bold transition-colors">
                  수익금 정산받기
                </button>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-4 md:border-l border-white/10 md:pl-8">
                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-indigo-100 text-sm mb-1.5 font-medium">
                    <MousePointerClick className="w-4 h-4" /> 링크 클릭
                  </div>
                  <div className="text-2xl font-bold font-inter">{partnerStats.clicks}</div>
                </div>
                
                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-indigo-100 text-sm mb-1.5 font-medium">
                    <CheckCircle className="w-4 h-4" /> 방문 인증
                  </div>
                  <div className="text-2xl font-bold font-inter">{partnerStats.conversions}</div>
                </div>

                <div className="col-span-2 bg-white/10 rounded-2xl p-4 backdrop-blur-sm flex items-center justify-between">
                  <div className="flex items-center gap-2 text-indigo-100 text-sm font-medium">
                    <TrendingUp className="w-4 h-4" /> 구매 전환율
                  </div>
                  <div className="text-xl font-bold font-inter">{partnerStats.conversionRate}%</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 3. 사장님 리워드 마케팅 효율 (Empty State 처리 포함) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-gray-500" />
              <h2 className="text-xl font-bold text-gray-900">내 매장 마케팅 효율 (사장님 전용)</h2>
            </div>
          </div>

          {isBusinessRegistered ? (
            // 사업자 등록 시 보이는 통계 화면 (향후 구현)
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
              <p>사업자 통계 대시보드</p>
            </div>
          ) : (
            // 사업자 미등록 시 보이는 Empty State
            <div className="bg-white rounded-3xl p-10 border border-gray-200 border-dashed text-center flex flex-col items-center shadow-sm">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Store className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">현재 등록된 내 매장이 없습니다.</h3>
              <p className="text-gray-500 mb-6 text-sm">
                사업자이신가요? 매장을 등록하고 리워드 캠페인을 생성하여<br/>
                수많은 파트너들을 통해 우리 동네 단골을 만들어보세요!
              </p>
              <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-sm transition-colors shadow-lg">
                <Plus className="w-4 h-4" />
                사업자 인증하고 캠페인 만들기
              </button>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
