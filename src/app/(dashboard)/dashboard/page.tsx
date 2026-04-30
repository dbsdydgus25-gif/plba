"use client";

import { Search, TrendingUp, MousePointerClick, CheckCircle, Wallet, ArrowRight, Bell, MoreVertical, Play, Flame } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  // 간단한 MOCK 데이터
  const partnerStats = {
    clicks: 124,
    conversions: 8,
    revenue: 4000, 
    conversionRate: 6.45
  };

  return (
    <div className="flex flex-col w-full pb-24 font-sans">
      
      {/* Top Header / Search Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="홍보할 매장이나 키워드를 검색해보세요..." 
            className="w-full bg-white border border-gray-200 rounded-full py-3 pl-12 pr-6 text-sm outline-none focus:border-[#5B5BD6] focus:ring-1 focus:ring-[#5B5BD6] transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-4 justify-end">
          <button className="p-2.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 relative shadow-sm">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
          <div className="flex items-center gap-3 bg-white p-1.5 pr-4 border border-gray-200 rounded-full shadow-sm cursor-pointer hover:bg-gray-50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#5B5BD6] to-[#00C896] flex items-center justify-center text-white font-bold text-xs">
              파트너
            </div>
            <span className="text-sm font-bold text-gray-700">홍길동 님</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Main Content (2/3 width on xl) */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Main Hero Banner (Purple Gradient) */}
          <div className="relative bg-gradient-to-br from-[#5B5BD6] to-[#7B7BFF] rounded-3xl p-8 md:p-10 text-white shadow-lg overflow-hidden">
            {/* Decorative background shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-[#00C896]/20 rounded-full blur-2xl translate-y-1/2" />
            
            <div className="relative z-10 max-w-lg">
              <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wider mb-4 border border-white/10">
                플바 파트너스
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                단골 매장을 홍보하고<br />매일 수익을 창출하세요
              </h1>
              <Link href="/campaigns" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-bold text-sm hover:bg-black transition-colors mt-2 shadow-xl shadow-black/20">
                캠페인 둘러보기 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Stats Filter Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:border-[#5B5BD6]/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#5B5BD6]/10 flex items-center justify-center text-[#5B5BD6] group-hover:scale-110 transition-transform">
                  <MousePointerClick className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">링크 클릭</div>
                  <div className="text-lg font-bold text-gray-900 font-inter">{partnerStats.clicks}건</div>
                </div>
              </div>
              <MoreVertical className="w-4 h-4 text-gray-300" />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:border-[#00C896]/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00C896]/10 flex items-center justify-center text-[#00C896] group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">방문 완료</div>
                  <div className="text-lg font-bold text-gray-900 font-inter">{partnerStats.conversions}건</div>
                </div>
              </div>
              <MoreVertical className="w-4 h-4 text-gray-300" />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:border-orange-500/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">전환율</div>
                  <div className="text-lg font-bold text-gray-900 font-inter">{partnerStats.conversionRate}%</div>
                </div>
              </div>
              <MoreVertical className="w-4 h-4 text-gray-300" />
            </div>
          </div>

          {/* Active Campaigns */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">내가 참여 중인 캠페인</h2>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">&lt;</button>
                <button className="w-8 h-8 rounded-full bg-[#5B5BD6] text-white flex items-center justify-center hover:bg-[#4646C0]">&gt;</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                <div className="h-40 bg-gray-100 relative overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop" alt="cafe" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-md text-[10px] font-bold text-[#5B5BD6]">F&B (카페)</div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-1">메가커피 강남역점 오픈 이벤트</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-1">아메리카노 1잔 무료 방문 시 500원 지급</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden relative">
                        <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" alt="사장님" fill className="object-cover" />
                      </div>
                      <span className="text-xs text-gray-600 font-medium">김사장님</span>
                    </div>
                    <div className="text-sm font-bold text-[#5B5BD6]">₩500 / 건</div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                <div className="h-40 bg-gray-100 relative overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1571772996211-2f08361b2f4a?q=80&w=800&auto=format&fit=crop" alt="pilates" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-md text-[10px] font-bold text-pink-500">뷰티/헬스</div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-1">바디핏 필라테스 신규회원 모집</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-1">1회 무료 체험권 & 등록 시 1만원 리워드</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden relative">
                        <Image src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" alt="원장님" fill className="object-cover" />
                      </div>
                      <span className="text-xs text-gray-600 font-medium">이원장님</span>
                    </div>
                    <div className="text-sm font-bold text-[#5B5BD6]">₩10,000 / 건</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Sidebar Content (1/3 width on xl) */}
        <div className="space-y-6">
          
          {/* Earnings Profile Widget */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col items-center relative overflow-hidden">
            {/* Background Arch */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-indigo-50 to-white" />
            
            <div className="relative w-20 h-20 rounded-full border-4 border-white shadow-md bg-white p-1 mb-4 z-10 mt-2">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#5B5BD6] to-[#00C896] flex items-center justify-center text-white text-2xl font-bold">
                홍
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 z-10">안녕하세요, 홍길동님!</h3>
            <p className="text-sm text-gray-500 mb-6 z-10 text-center">오늘도 힘차게 마케팅을 시작해볼까요?</p>
            
            <div className="w-full bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500 font-medium flex items-center gap-1.5"><Wallet className="w-4 h-4" /> 누적 수익금</span>
                <span className="text-xs font-bold text-[#00C896] bg-[#00C896]/10 px-2 py-0.5 rounded-full">+12%</span>
              </div>
              <div className="text-3xl font-extrabold font-inter text-gray-900 mb-4">₩{partnerStats.revenue.toLocaleString()}</div>
              
              {/* Mini Chart Mockup */}
              <div className="flex items-end justify-between h-12 gap-1.5 px-1 mt-4">
                {[30, 45, 25, 60, 40, 80, 50].map((height, i) => (
                  <div key={i} className="w-full bg-[#5B5BD6]/20 rounded-sm relative group cursor-pointer">
                    <div 
                      className={`absolute bottom-0 left-0 right-0 rounded-sm transition-all duration-500 ${i === 5 ? 'bg-[#5B5BD6]' : 'bg-[#5B5BD6]/40 group-hover:bg-[#5B5BD6]/60'}`} 
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-medium px-1">
                <span>월</span>
                <span>수</span>
                <span>금</span>
                <span>일</span>
              </div>
            </div>
          </div>

          {/* Recent Activity List */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900">최근 활동 내역</h3>
              <button className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                <MoreVertical className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-900">방문 인증 완료</div>
                  <div className="text-xs text-gray-500 mb-1">메가커피 강남역점</div>
                  <div className="text-xs font-medium text-green-600">+ 500원 적립</div>
                </div>
                <div className="text-[10px] font-medium text-gray-400">방금 전</div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MousePointerClick className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-900">새로운 링크 클릭</div>
                  <div className="text-xs text-gray-500 mb-1">바디핏 필라테스</div>
                  <div className="text-xs font-medium text-blue-600">전환 대기 중</div>
                </div>
                <div className="text-[10px] font-medium text-gray-400">2시간 전</div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Play className="w-4 h-4 ml-0.5 text-purple-500" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-900">캠페인 참여 시작</div>
                  <div className="text-xs text-gray-500 mb-1">교촌치킨 서초점</div>
                  <div className="text-xs font-medium text-purple-600">고유 링크 발급 완료</div>
                </div>
                <div className="text-[10px] font-medium text-gray-400">어제</div>
              </div>
            </div>
            
            <button className="w-full mt-6 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-bold rounded-xl transition-colors">
              전체 보기
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
