"use client";

import Link from "next/link";
import { Store, Link as LinkIcon, Share2, Coins, ArrowRight, UserPlus, ShieldCheck } from "lucide-react";

export default function GuidePage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 pb-24">
      
      {/* Hero Section */}
      <div className="bg-[#5B5BD6] text-white py-24 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-block px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-bold mb-6">
            플바 이용 안내
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            사장님도, 파트너도<br />
            모두가 윈윈하는 플랫폼
          </h1>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            플바는 매장 홍보가 필요한 사장님과, 부업으로 돈을 벌고 싶은 파트너를 연결합니다.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-20 w-full space-y-8">
        
        {/* Section 1: 파트너 알바하는 법 */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <span className="text-4xl">💸</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">파트너를 위한 +알바 하는 법</h2>
          </div>
          <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
            진짜 사고 싶은 거, 알바비론 부족하잖아? 내 단골가게 홍보하고 숨만 쉬어도 돈이 들어오는 진짜 파이프라인을 만들어보세요.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#5B5BD6] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">1</div>
              <Store className="w-8 h-8 text-[#5B5BD6] mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">홍보할 매장 찾기</h3>
              <p className="text-gray-500 text-sm leading-relaxed">내가 평소에 자주 가거나 마음에 드는 우리 동네 매장을 고릅니다.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#5B5BD6] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">2</div>
              <LinkIcon className="w-8 h-8 text-[#5B5BD6] mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">링크 / QR 발급</h3>
              <p className="text-gray-500 text-sm leading-relaxed">버튼 클릭 한 번으로 나만의 수익 추적용 링크와 QR 코드를 발급받습니다.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#5B5BD6] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">3</div>
              <Share2 className="w-8 h-8 text-[#5B5BD6] mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">여기저기 공유하기</h3>
              <p className="text-gray-500 text-sm leading-relaxed">블로그, 인스타, 카톡방, 혹은 직접 명함으로 만들어서 뿌려보세요!</p>
            </div>

            <div className="bg-[#00C896]/10 rounded-2xl p-6 border border-[#00C896]/20 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#00C896] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">4</div>
              <Coins className="w-8 h-8 text-[#00C896] mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">돈 벌기 (자동 정산)</h3>
              <p className="text-gray-700 text-sm leading-relaxed font-medium">사람들이 그 링크로 가게를 방문할 때마다 내 통장에 알바비가 꽂힙니다!</p>
            </div>
          </div>
        </div>

        {/* Section 2: 사장님 내 가게 홍보 방법 */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <span className="text-4xl">🏪</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">사장님을 위한 내 가게 홍보 방법</h2>
          </div>
          <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
            마케팅으로 돈은 쓰는데 돌아오는 건 없고 막막하셨죠?<br/>
            이제 <strong>확실한 CAC(고객 획득 비용)</strong> 예산을 걸고, 고객이 진짜 방문했을 때만 차감되는 마케팅을 시작하세요.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Store className="w-10 h-10 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. 매장 등록 & 예산 설정</h3>
              <p className="text-gray-500 text-sm leading-relaxed px-4">
                사업자 인증 후 매장을 등록하고, 파트너들에게 지급할 건당 리워드와 총 마케팅 예산을 충전합니다.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <UserPlus className="w-10 h-10 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. 수많은 파트너의 홍보</h3>
              <p className="text-gray-500 text-sm leading-relaxed px-4">
                가게가 탐색 탭에 노출되면, 수많은 플바 파트너들이 스스로 사장님의 가게를 온·오프라인으로 알아서 홍보해 줍니다.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#5B5BD6]/10 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-10 h-10 text-[#5B5BD6]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. 실방문 시에만 예산 차감</h3>
              <p className="text-gray-700 font-medium text-sm leading-relaxed px-4">
                손님이 파트너의 QR 코드를 통해 매장에 진짜 방문하고 결제/인증을 완료했을 때만 설정한 예산에서 마케팅비가 차감됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gray-900 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden mt-12">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#00C896] rounded-full blur-3xl opacity-20 -translate-y-1/2 -translate-x-1/3" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#5B5BD6] rounded-full blur-3xl opacity-30 translate-y-1/3 translate-x-1/3" />
          
          <h2 className="text-3xl font-bold mb-4 relative z-10">플바와 함께 새로운 수익을 만들어보세요</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 mt-8">
            <Link href="/explore" className="px-8 py-4 bg-[#5B5BD6] text-white rounded-xl font-bold text-lg hover:bg-[#4646C0] transition-colors shadow-lg shadow-[#5B5BD6]/30 flex items-center gap-2 w-full sm:w-auto justify-center">
              파트너로 투잡 시작하기 <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
