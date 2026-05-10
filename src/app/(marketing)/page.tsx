"use client";

import Link from "next/link";
import { 
  ArrowRight,
  CheckCircle2,
  Star,
  ChevronRight
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function LandingPage() {
  const [storeName, setStoreName] = useState("");
  const [contact, setContact] = useState("");
  const [category, setCategory] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Pre-registration logic would go here
    alert("사전 등록이 완료되었습니다. (테스트)");
  };

  return (
    <div className="flex flex-col w-full min-h-screen font-sans bg-white overflow-x-hidden selection:bg-blue-500/20 text-gray-900">
      
      {/* S1. HERO */}
      <section className="relative w-full pt-32 pb-20 px-6 flex flex-col items-center justify-center bg-gray-50/50">
        <motion.div 
          className="max-w-4xl w-full mx-auto text-center z-10"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-blue-100/50 border border-blue-200 text-blue-600 font-bold text-sm mb-6 shadow-sm">
            오프라인 매장을 위한 성과 기반 마케팅
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6 break-keep">
            이제 광고비는 <br className="hidden md:block" />
            <span className="text-blue-600">손님이 왔을 때만 내세요</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto font-medium leading-relaxed break-keep">
            플바는 실제 방문·구매가 이루어졌을 때만 비용이 발생합니다.<br className="hidden md:block" />
            노출도, 클릭도, 체험단도 아닌 — 진짜 매출에만 반응하는 마케팅.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col items-center justify-center gap-6 w-full">
            <Link 
              href="#register" 
              className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-black transition-all shadow-xl shadow-gray-900/20 flex items-center justify-center gap-2 group"
            >
              사장님 무료 등록하기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="flex flex-wrap justify-center items-center gap-3 text-sm font-medium text-gray-500 border-t border-gray-200 pt-6 px-4">
              <span className="flex items-center gap-1.5 text-gray-900 whitespace-nowrap">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span> 
                지금 100여 개 매장이 사전 등록
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block"></span>
              <span className="whitespace-nowrap">무료 시작</span>
              <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block"></span>
              <span className="whitespace-nowrap">등록 1분 완료</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* S2. Problem Empathy */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">사장님, 이런 적 있으시죠?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-[28px] p-8 border border-gray-100 flex flex-col"
            >
              <div className="text-4xl mb-6">💸</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 break-keep leading-snug">
                광고비는 나가는데<br/>효과를 모르겠다
              </h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed break-keep">
                SNS 광고, 블로그 체험단, 지역 카드사 광고 매달 수십만 원인데 매출 연결은 불투명
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 rounded-[28px] p-8 border border-gray-100 flex flex-col"
            >
              <div className="text-4xl mb-6">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 break-keep leading-snug">
                매출은 그대로인데<br/>비용만 늘고 있다
              </h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed break-keep">
                배달앱 수수료에 포스팅 비용까지, 나가는 돈 대비 체감이 없다
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 rounded-[28px] p-8 border border-gray-100 flex flex-col"
            >
              <div className="text-4xl mb-6">🤷</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 break-keep leading-snug">
                어디서 왔는지<br/>알 수가 없다
              </h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed break-keep">
                클릭 수는 보이는데 실제 내 가게에 온 건지 광고 덕분인지 측정이 안 된다
              </p>
            </motion.div>
          </div>

          <div className="text-center max-w-2xl mx-auto bg-blue-50/50 p-8 rounded-3xl border border-blue-100">
            <p className="text-lg md:text-xl text-gray-700 font-bold leading-relaxed break-keep">
              광고비는 쓸수록 쌓이는데, 매출 기여는 여전히 불확실합니다.<br/>
              <span className="text-blue-600 mt-2 block text-2xl">플바는 이 구조를 완전히 뒤집습니다.</span>
            </p>
          </div>
        </div>
      </section>

      {/* S3. Solution Definition */}
      <section className="py-32 px-6 bg-[#1A1A24] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-8 break-keep">
              &quot;플바는 동네 사람들이<br className="hidden sm:block"/>
              직접 매장을 소개하고,<br/>
              <span className="text-[#00C896]">실제 방문·결제가 일어났을 때만</span><br/>
              사장님 예산에서 비용이 차감됩니다&quot;
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-medium">
              광고를 사는 게 아니라, 매출을 사는 겁니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* S4. How it works */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">사장님은 딱 이것만 하면 됩니다</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-16 relative">
            {/* Step connectors (desktop only) */}
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-gray-200 z-0"></div>

            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative z-10 flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 mb-6 border-4 border-white shadow-sm">1</div>
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">가게 무료 등록</h3>
              <hr className="w-full border-gray-100 mb-3"/>
              <p className="text-sm text-gray-500 font-medium break-keep">메뉴·위치·사진만<br/>입력하면 완료<br/>1분이면 끝납니다</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative z-10 flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 mb-6 border-4 border-white shadow-sm">2</div>
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">원하는 만큼 예산 충전</h3>
              <hr className="w-full border-gray-100 mb-3"/>
              <p className="text-sm text-gray-500 font-medium break-keep">최소 충전 후<br/>언제든 중지 가능<br/>소진 전까지 자동 운영</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative z-10 flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 mb-6 border-4 border-white shadow-sm">3</div>
              <div className="text-4xl mb-4">🚶</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">손님이 방문·결제</h3>
              <hr className="w-full border-gray-100 mb-3"/>
              <p className="text-sm text-gray-500 font-medium break-keep">플바 앱 사용자가<br/>실제 구매하면<br/>그때만 비용 차감</p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative z-10 flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 mb-6 border-4 border-white shadow-sm">4</div>
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">대시보드 확인</h3>
              <hr className="w-full border-gray-100 mb-3"/>
              <p className="text-sm text-gray-500 font-medium break-keep">누가, 언제,<br/>얼마를 쓰고<br/>왔는지 실시간</p>
            </div>
          </div>

          <div className="flex justify-center">
            <Link 
              href="#register" 
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
            >
              사장님 무료 등록하기
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* S5. Core Benefits */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">플바로 바뀌는 것들</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Benefit 1 */}
            <div className="bg-[#f0fbf8] rounded-[28px] p-8 border border-[#00C896]/20">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-[#00C896]" />
                <h3 className="text-xl font-bold text-gray-900">확실한 CAC</h3>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed break-keep">
                고객 1명 유치에 정확히 얼마가 들었는지 처음으로 알 수 있습니다.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-blue-50/50 rounded-[28px] p-8 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">리스크 제로</h3>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed break-keep">
                충전한 예산 안에서만 운영되고, 실구매 없으면 비용은 0원입니다.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-purple-50/50 rounded-[28px] p-8 border border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900">별도 관리 없음</h3>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed break-keep">
                등록 후 가게를 신경 쓰지 않아도 자동으로 홍보됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* S6. Comparison Table */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">기존 광고와 무엇이 다른가요?</h2>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="p-5 text-gray-500 font-bold w-1/4"></th>
                  <th className="p-5 text-gray-900 font-bold w-1/4 text-center">SNS 광고</th>
                  <th className="p-5 text-gray-900 font-bold w-1/4 text-center">당근 광고</th>
                  <th className="p-5 text-blue-600 font-extrabold w-1/4 text-center bg-blue-50/30">플바</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-5 font-bold text-gray-900">비용 발생 시점</td>
                  <td className="p-5 text-gray-600 text-center">노출 or 클릭마다</td>
                  <td className="p-5 text-gray-600 text-center">클릭마다</td>
                  <td className="p-5 text-blue-600 font-bold text-center bg-blue-50/30">실구매 시에만</td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-gray-900">매출 직결 여부</td>
                  <td className="p-5 text-gray-600 text-center">불확실</td>
                  <td className="p-5 text-gray-600 text-center">불확실</td>
                  <td className="p-5 text-blue-600 font-bold text-center bg-blue-50/30">100% 확실</td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-gray-900">성과 측정</td>
                  <td className="p-5 text-gray-600 text-center">어려움</td>
                  <td className="p-5 text-gray-600 text-center">제한적</td>
                  <td className="p-5 text-blue-600 font-bold text-center bg-blue-50/30">실시간 대시보드</td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-gray-900">초기 비용</td>
                  <td className="p-5 text-gray-600 text-center">수십만 원↑</td>
                  <td className="p-5 text-gray-600 text-center">수만 원↑</td>
                  <td className="p-5 text-blue-600 font-bold text-center bg-blue-50/30">무료 (예산만)</td>
                </tr>
                <tr>
                  <td className="p-5 font-bold text-gray-900">오프라인 구매 연결</td>
                  <td className="p-5 text-gray-400 text-center text-xl font-bold">✕</td>
                  <td className="p-5 text-gray-400 text-center text-xl font-bold">△</td>
                  <td className="p-5 text-blue-600 text-center text-xl font-bold bg-blue-50/30">✔</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* S7. Social Proof */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="text-center p-8 bg-gray-50 rounded-3xl border border-gray-100">
              <p className="text-4xl font-extrabold text-gray-900 mb-2">100<span className="text-2xl text-gray-500 font-bold">개+</span></p>
              <p className="text-gray-500 font-bold">사전 등록 매장</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-3xl border border-gray-100">
              <p className="text-4xl font-extrabold text-gray-900 mb-2">3<span className="text-2xl text-gray-500 font-bold">억 원+</span></p>
              <p className="text-gray-500 font-bold">예상 절감 광고 비용</p>
            </div>
            <div className="text-center p-8 bg-blue-50 rounded-3xl border border-blue-100">
              <p className="text-4xl font-extrabold text-blue-600 mb-2">0<span className="text-2xl text-blue-400 font-bold">원</span></p>
              <p className="text-blue-600 font-bold">매출 없으면 비용 없음</p>
            </div>
          </div>

          {/* Review Slider Placeholder (CSS Scroll Snapping) */}
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8 -mx-6 px-6 md:mx-0 md:px-0">
            <div className="snap-center shrink-0 w-[85vw] md:w-[400px] bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
              <div className="flex gap-1 mb-4 text-[#FFD700]">
                <Star fill="currentColor" className="w-5 h-5" />
                <Star fill="currentColor" className="w-5 h-5" />
                <Star fill="currentColor" className="w-5 h-5" />
                <Star fill="currentColor" className="w-5 h-5" />
                <Star fill="currentColor" className="w-5 h-5" />
              </div>
              <p className="text-gray-700 font-medium leading-relaxed mb-6 break-keep">
                &quot;매달 광고비 50만 원 썼는데 효과를 몰랐어요. 플바는 실제로 온 손님 기준으로 비용이 나가니까 계산이 딱 됩니다.&quot;
              </p>
              <p className="text-sm font-bold text-gray-400">홍대 카페 운영, 32세</p>
            </div>
            <div className="snap-center shrink-0 w-[85vw] md:w-[400px] bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
              <div className="flex gap-1 mb-4 text-[#FFD700]">
                <Star fill="currentColor" className="w-5 h-5" />
                <Star fill="currentColor" className="w-5 h-5" />
                <Star fill="currentColor" className="w-5 h-5" />
                <Star fill="currentColor" className="w-5 h-5" />
                <Star fill="currentColor" className="w-5 h-5" />
              </div>
              <p className="text-gray-700 font-medium leading-relaxed mb-6 break-keep">
                &quot;배달앱 빼고 오프라인 손님 늘릴 방법이 없었는데 동네 사람들이 직접 소개해준다는 게 신선했어요.&quot;
              </p>
              <p className="text-sm font-bold text-gray-400">마포구 고깃집 운영, 45세</p>
            </div>
          </div>
        </div>
      </section>

      {/* S8. Pre-registration CTA */}
      <section id="register" className="py-24 px-6 bg-[#1A1A24] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">지금 등록하면 얼리버드 혜택</h2>
            <p className="text-gray-400 text-lg">초기 매장 한정 특별 지원</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 mb-10 space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-2xl">🎁</div>
              <p className="text-white font-bold">출시 즉시 우선 등록 매장 노출</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-2xl">💰</div>
              <p className="text-white font-bold">첫 캠페인 예산 20,000p 지급</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-2xl">📞</div>
              <p className="text-white font-bold">1:1 운영 온보딩 지원</p>
            </div>
          </div>

          <form onSubmit={handleRegister} className="bg-white rounded-[32px] p-8 md:p-10 shadow-2xl">
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">상호명</label>
                <input 
                  type="text" 
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="예: 플바식당 홍대점"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">연락처</label>
                <input 
                  type="tel" 
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="010-0000-0000"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">매장 카테고리</label>
                <div className="relative">
                  <select 
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium appearance-none"
                  >
                    <option value="" disabled>카테고리 선택</option>
                    <option value="food">음식점 (한식/중식/일식/양식 등)</option>
                    <option value="cafe">카페/디저트</option>
                    <option value="bar">주점/호프</option>
                    <option value="beauty">뷰티/미용 (헤어/네일/에스테틱)</option>
                    <option value="other">기타</option>
                  </select>
                  <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rotate-90 pointer-events-none" />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-blue-600 text-white rounded-xl font-bold text-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 mb-4"
            >
              사장님 무료 등록하기 <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center text-sm text-gray-500 font-medium">무료 등록 · 의무 없음 · 언제든 취소</p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-extrabold text-2xl tracking-tighter text-gray-900">
            PLBA
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-500">
            <Link href="#" className="hover:text-gray-900 transition-colors">플바란?</Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">개인정보처리방침</Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">이용약관</Link>
            <a href="mailto:whyhcompany@gmail.com" className="hover:text-gray-900 transition-colors">문의: whyhcompany@gmail.com</a>
          </div>
          <div className="text-sm text-gray-400 font-medium">
            ⓒ 2026 PLBA. All rights reserved.
          </div>
        </div>
      </footer>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
