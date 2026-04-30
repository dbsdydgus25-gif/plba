"use client";

import { useState } from "react";
import { Search, MapPin, Coins, Filter, Link as LinkIcon, X, Copy, Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

// Mock data for the campaign marketplace
const MOCK_CAMPAIGNS = [
  {
    id: 1,
    store: "메가커피 강남역점",
    category: "카페/디저트",
    location: "서울 강남구",
    reward: 500,
    totalBudget: 100000,
    spent: 45000,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    store: "바른고기 정육점",
    category: "음식점",
    location: "서울 서초구",
    reward: 2000,
    totalBudget: 500000,
    spent: 120000,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    store: "블루밍 헤어살롱",
    category: "미용/뷰티",
    location: "경기 성남시",
    reward: 3000,
    totalBudget: 300000,
    spent: 290000,
    image: "https://images.unsplash.com/photo-1521590832167-7bfc17484d20?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    store: "런던 베이글 뮤지엄",
    category: "베이커리",
    location: "서울 종로구",
    reward: 300,
    totalBudget: 50000,
    spent: 10000,
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 5,
    store: "크로스핏 강남",
    category: "운동/헬스",
    location: "서울 강남구",
    reward: 5000,
    totalBudget: 1000000,
    spent: 50000,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 6,
    store: "오아시스 브런치",
    category: "음식점",
    location: "서울 용산구",
    reward: 1000,
    totalBudget: 200000,
    spent: 150000,
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=600&auto=format&fit=crop"
  }
];

export default function ExplorePage() {
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 pb-20 relative">
      
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">캠페인 마켓플레이스</h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            원하는 오프라인 매장을 선택하고 고유 홍보 링크를 발급받으세요. 
            손님이 방문할 때마다 높은 리워드가 지급됩니다.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 w-full flex flex-col md:flex-row gap-8">
        
        {/* Filter Sidebar (Desktop) / Topbar (Mobile) */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <div className="flex items-center gap-2 font-bold text-gray-900 mb-6">
              <Filter className="w-5 h-5" />
              필터
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-3">지역</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#5B5BD6]">
                  <option>전체 지역</option>
                  <option>서울 강남구</option>
                  <option>서울 서초구</option>
                  <option>서울 용산구</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-3">업종</label>
                <div className="space-y-2">
                  {["전체", "음식점", "카페/디저트", "미용/뷰티", "운동/헬스"].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="category" className="accent-[#5B5BD6] w-4 h-4 cursor-pointer" defaultChecked={cat === "전체"} />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Grid */}
        <div className="flex-1">
          {/* Search bar */}
          <div className="relative mb-6">
            <input 
              type="text" 
              placeholder="매장명 또는 키워드를 검색해보세요" 
              className="w-full bg-white border border-gray-200 rounded-xl py-4 pl-12 pr-4 shadow-sm outline-none focus:border-[#5B5BD6] focus:ring-1 focus:ring-[#5B5BD6] transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_CAMPAIGNS.map((campaign) => {
              const progress = Math.round((campaign.spent / campaign.totalBudget) * 100);
              const isAlmostDone = progress > 90;

              return (
                <div key={campaign.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col">
                  {/* Image Header */}
                  <div className="w-full h-48 relative overflow-hidden bg-gray-100">
                    <img 
                      src={campaign.image} 
                      alt={campaign.store} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-md text-xs font-semibold text-gray-700 shadow-sm">
                      {campaign.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2 font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      {campaign.location}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-1">
                      {campaign.store}
                    </h3>
                    
                    <div className="bg-indigo-50/50 rounded-xl p-4 mb-4">
                      <p className="text-xs text-gray-500 font-medium mb-1">방문 인증 1건당 리워드</p>
                      <div className="flex items-center gap-1.5 text-[#5B5BD6] font-bold text-xl">
                        <Coins className="w-5 h-5" />
                        ₩{campaign.reward.toLocaleString()}
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="flex justify-between text-xs font-medium mb-1.5">
                        <span className="text-gray-500">예산 소진율</span>
                        <span className={isAlmostDone ? "text-red-500 font-bold" : "text-gray-900"}>{progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-5">
                        <div 
                          className={`h-full rounded-full ${isAlmostDone ? "bg-red-500" : "bg-[#00C896]"}`} 
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <button 
                        onClick={() => setSelectedCampaign(campaign)}
                        className="w-full py-3 bg-white border border-gray-200 text-gray-900 hover:border-[#5B5BD6] hover:text-[#5B5BD6] hover:bg-indigo-50/30 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 group-hover:border-[#5B5BD6]"
                      >
                        <LinkIcon className="w-4 h-4" />
                        홍보 링크 발급받기
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* QR/Link Generation Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative animate-slide-up">
            <button 
              onClick={() => setSelectedCampaign(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCampaign.store}</h2>
              <p className="text-gray-500 mb-8 text-center text-sm">
                해당 QR이나 링크를 통해 소비자가 방문하고 인증하면,<br/>
                <strong className="text-[#5B5BD6]">건당 ₩{selectedCampaign.reward.toLocaleString()}</strong>의 수익이 발생합니다.
              </p>

              <div className="p-4 bg-white border-2 border-gray-100 rounded-2xl shadow-sm mb-8 inline-block">
                <QRCodeSVG 
                  value={`https://plba.kr/v/${selectedCampaign.id}-mock`} 
                  size={160}
                  bgColor={"#ffffff"}
                  fgColor={"#1A1A24"}
                  level={"Q"}
                  includeMargin={false}
                />
              </div>

              <div className="w-full">
                <p className="text-xs font-semibold text-gray-500 mb-2 pl-1">나만의 고유 단축 링크</p>
                <div className="flex items-center w-full bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-4 py-3 text-gray-700 font-medium font-inter text-sm flex-1 truncate select-all">
                    https://plba.kr/v/{selectedCampaign.id}-mock
                  </div>
                  <button 
                    onClick={() => handleCopy(`https://plba.kr/v/${selectedCampaign.id}-mock`)}
                    className="h-full px-5 flex items-center justify-center bg-gray-800 hover:bg-black text-white transition-colors"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                {copied && <p className="text-center text-[#00C896] text-xs font-semibold mt-3 animate-fade-in">링크가 복사되었습니다!</p>}
              </div>
            </div>
            
            <div className="bg-gray-50 px-8 py-5 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                ※ 부적절한 방법(본인 인증, 어뷰징 등)으로 리워드를 획득한 경우,<br/>
                지급이 취소되고 파트너 자격이 정지될 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
