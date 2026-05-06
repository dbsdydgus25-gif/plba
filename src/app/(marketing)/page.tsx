"use client";

import Link from "next/link";
import { ArrowRight, Store, Users, TrendingUp, HandCoins, QrCode, CheckCircle2, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen font-sans bg-[#FFFFFF]">
      
      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-20 overflow-hidden flex flex-col items-center justify-start">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-r from-[#5B5BD6]/10 to-[#00C896]/10 blur-[100px] rounded-full -z-10" />

        <motion.div 
          className="max-w-5xl mx-auto px-6 text-center z-10 flex flex-col items-center mt-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#5B5BD6]/20 text-[#5B5BD6] font-semibold text-sm mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#5B5BD6] animate-pulse"></span>
            오프라인 매장 전용 스마트 제휴 마케팅
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-[#1A1A24] tracking-tight mb-8 leading-tight">
            돈 먹는 검색 광고는 그만,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B5BD6] to-[#00C896]">진짜 손님이 올 때만 결제하세요</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-[#66667A] mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
            사장님은 확실한 방문 성과에만 비용을 내고,<br />
            파트너는 단골 가게를 홍보하며 수익을 챙기는 상생 플랫폼.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mb-20">
            <Link 
              href="/form" 
              className="px-8 py-4 bg-[#5B5BD6] text-white rounded-full font-bold text-xl hover:bg-[#4646C0] transition-all shadow-xl shadow-[#5B5BD6]/20 flex items-center gap-2 group hover:-translate-y-1"
            >
              사장님 사전등록 하기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* How it Works - Animation Flow Section */}
      <section className="py-24 bg-[#F8F9FA] border-y border-[#000000]/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A24] mb-4">어떻게 작동하나요?</h2>
            <p className="text-lg text-[#66667A]">복잡한 광고 세팅 없이, 딱 3단계면 충분합니다.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Step 1 */}
            <motion.div variants={fadeInUp} className="bg-white rounded-3xl p-8 border border-[#000000]/5 shadow-sm text-center flex flex-col items-center relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#5B5BD6]/10 text-[#5B5BD6] flex items-center justify-center mb-6">
                <Store className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A24] mb-3">1. 캠페인 등록</h3>
              <p className="text-[#66667A] leading-relaxed">
                사장님이 우리 매장만의 특별한 혜택(예: 음료 1잔)을 담은 캠페인을 등록합니다.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div variants={fadeInUp} className="bg-white rounded-3xl p-8 border border-[#000000]/5 shadow-sm text-center flex flex-col items-center relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#00C896]/10 text-[#00C896] flex items-center justify-center mb-6">
                <QrCode className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A24] mb-3">2. 파트너 홍보</h3>
              <p className="text-[#66667A] leading-relaxed">
                동네를 잘 아는 파트너들이 나만의 고유 링크(QR)로 매장을 대신 홍보합니다.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div variants={fadeInUp} className="bg-white rounded-3xl p-8 border border-[#000000]/5 shadow-sm text-center flex flex-col items-center relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#5B5BD6]/10 text-[#5B5BD6] flex items-center justify-center mb-6">
                <HandCoins className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A24] mb-3">3. 방문 & 정산</h3>
              <p className="text-[#66667A] leading-relaxed">
                손님이 매장에 방문하여 혜택을 이용하면, 사장님 예산에서 비용이 차감되고 파트너는 수익을 얻습니다.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Owner Benefits Section (Danggeun Business Style) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Left: Text */}
            <div className="flex-1">
              <motion.div variants={fadeInUp} className="inline-flex px-3 py-1 bg-[#00C896]/10 text-[#00C896] font-bold rounded-md mb-6">
                사장님 혜택
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-[#1A1A24] mb-6 leading-tight">
                효과 없는 광고비,<br />이제 1원도 버리지 마세요.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-[#66667A] mb-10 leading-relaxed">
                플바의 마케팅은 <strong>'성과(방문)'가 발생했을 때만</strong> 비용이 차감됩니다.<br />
                리스크 제로의 확실한 로컬 마케팅을 경험하세요.
              </motion.p>
              
              <motion.ul variants={staggerContainer} className="space-y-6">
                <motion.li variants={fadeInUp} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#5B5BD6]/10 flex items-center justify-center text-[#5B5BD6] font-bold shrink-0 mt-1">✓</div>
                  <div>
                    <h4 className="font-bold text-[#1A1A24] text-xl mb-1">성과 기반 과금 (CPA)</h4>
                    <p className="text-[#66667A]">단순 노출이나 클릭이 아닌, 실제 손님이 찾아와서 코드를 입력했을 때만 과금됩니다.</p>
                  </div>
                </motion.li>
                <motion.li variants={fadeInUp} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#5B5BD6]/10 flex items-center justify-center text-[#5B5BD6] font-bold shrink-0 mt-1">✓</div>
                  <div>
                    <h4 className="font-bold text-[#1A1A24] text-xl mb-1">강력한 바이럴 마케팅</h4>
                    <p className="text-[#66667A]">우리 동네 주민들(파트너)이 직접 내 매장을 홍보해주므로, 진성 고객 유입 확률이 높습니다.</p>
                  </div>
                </motion.li>
              </motion.ul>
            </div>

            {/* Right: Mockup Image */}
            <motion.div variants={fadeInUp} className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#5B5BD6]/20 to-[#00C896]/20 rounded-[40px] blur-3xl -z-10" />
              <div className="relative w-[300px] md:w-[400px] mx-auto aspect-[1/2] bg-white rounded-[40px] shadow-2xl border-[12px] border-gray-900 overflow-hidden flex items-center justify-center relative">
                {/* Dynamic Island / Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-3xl z-20"></div>
                
                <div className="w-full h-full bg-[#F8F9FA] flex flex-col relative z-10 pt-2">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-6 py-2 text-xs font-bold text-gray-800">
                    <span>9:41</span>
                    <div className="flex gap-1.5 items-center">
                      <div className="w-4 h-3 rounded-sm bg-gray-800"></div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="h-20 bg-white rounded-2xl shadow-sm mb-6 flex items-center p-4">
                      <div className="w-12 h-12 bg-[#5B5BD6]/10 rounded-xl flex items-center justify-center"><Store className="text-[#5B5BD6]"/></div>
                      <div className="ml-4">
                        <div className="w-24 h-4 bg-gray-200 rounded-full mb-2"></div>
                        <div className="w-16 h-3 bg-gray-100 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1 bg-white rounded-2xl shadow-sm p-4 flex flex-col items-center justify-center">
                      <TrendingUp className="w-16 h-16 text-[#00C896] mb-4" />
                      <h4 className="font-bold text-[#1A1A24] text-lg">실제 방문 성과</h4>
                      <p className="text-[#00C896] text-4xl font-extrabold mt-2">1,240<span className="text-xl">명</span></p>
                    </div>
                    <div className="mt-4 h-16 bg-[#5B5BD6] rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      새 캠페인 만들기
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Partner Benefits Section */}
      <section className="py-24 bg-[#f5fffc]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="flex flex-col md:flex-row-reverse items-center gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Right: Text */}
            <div className="flex-1">
              <motion.div variants={fadeInUp} className="inline-flex px-3 py-1 bg-[#5B5BD6]/10 text-[#5B5BD6] font-bold rounded-md mb-6">
                파트너 혜택
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-[#1A1A24] mb-6 leading-tight">
                단골 가게 홍보하고,<br />매일 현금 수익을 만드세요.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-[#66667A] mb-10 leading-relaxed">
                복잡한 조건 없이, 내 링크를 통해 누군가 매장에 방문하면<br />
                바로 내 통장에 현금이 쌓입니다.
              </motion.p>
              
              <motion.ul variants={staggerContainer} className="space-y-6">
                <motion.li variants={fadeInUp} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#00C896]/10 flex items-center justify-center text-[#00C896] font-bold shrink-0 mt-1">✓</div>
                  <div>
                    <h4 className="font-bold text-[#1A1A24] text-xl mb-1">무제한 수익 창출</h4>
                    <p className="text-[#66667A]">온라인 커뮤니티, 카카오톡, 당근마켓 어디든 링크를 공유하고 횟수 제한 없이 수익을 올리세요.</p>
                  </div>
                </motion.li>
              </motion.ul>
            </div>

            {/* Left: Mockup Image */}
            <motion.div variants={fadeInUp} className="flex-1 relative w-full flex justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00C896]/20 to-[#5B5BD6]/20 rounded-[40px] blur-3xl -z-10" />
              <div className="relative w-[300px] md:w-[400px] aspect-[1/2] bg-white rounded-[40px] shadow-2xl border-[12px] border-gray-900 overflow-hidden flex items-center justify-center relative">
                 {/* Dynamic Island / Notch */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-3xl z-20"></div>
                 
                 <div className="w-full h-full bg-[#F8F9FA] flex flex-col relative z-10 pt-2">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-6 py-2 text-xs font-bold text-gray-800">
                    <span>9:41</span>
                    <div className="flex gap-1.5 items-center">
                      <div className="w-4 h-3 rounded-sm bg-gray-800"></div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="h-64 bg-gradient-to-br from-[#5B5BD6] to-[#00C896] rounded-2xl shadow-lg mb-6 flex flex-col items-center justify-center p-6 text-white">
                      <QrCode className="w-24 h-24 bg-white text-black p-2 rounded-xl mb-4" />
                      <p className="font-bold text-lg">내 홍보 링크 발급 완료</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100 flex-1 flex flex-col justify-center">
                      <p className="text-[#66667A] text-sm font-bold mb-2">출금 가능한 총 수익금</p>
                      <p className="text-[#00C896] text-4xl font-extrabold flex items-center justify-center gap-1">
                        15,000 <span className="text-xl">원</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Early Bird */}
      <section className="py-24 bg-[#e8fbf5]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1.5 bg-[#00C896] text-white font-bold rounded-full text-sm mb-6">
            EARLY BIRD 선착순 100팀
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">지금 사전등록 하시는 사장님께만</h2>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#00C896]/20 text-left space-y-6">
            <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
              <CheckCircle2 className="w-7 h-7 text-[#00C896] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">출시 후 3개월 기본 이용료 전액 0원</h3>
                <p className="text-gray-600">초기 런칭 파트너로서, 가장 먼저 플바의 폭발적인 유입 효과를 무료로 누려보세요.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
              <CheckCircle2 className="w-7 h-7 text-[#00C896] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">초기 홍보 파트너 집중 매칭</h3>
                <p className="text-gray-600">사장님 매장을 적극적으로 홍보해 줄 지역 내 열성 파트너들을 가장 먼저 매칭해 드립니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white">
        <motion.div 
          className="max-w-4xl mx-auto px-6 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A24] mb-8 leading-tight">
            지금 바로 플바와 함께<br />새로운 성장을 경험하세요.
          </h2>
          <p className="text-xl text-[#66667A] mb-12">
            초기 등록 사장님들께는 추가 마케팅 포인트를 지원합니다.
          </p>
          <Link href="/form" className="inline-flex items-center gap-2 px-12 py-5 bg-[#1A1A24] text-white rounded-full font-bold text-xl hover:bg-black hover:scale-105 transition-all shadow-xl shadow-black/10">
            사전등록 하고 혜택받기 <ArrowRight className="w-6 h-6" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
