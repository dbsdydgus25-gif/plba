"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, HandCoins, QrCode, CheckCircle2, Store, Users, Gift, Smartphone } from "lucide-react";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.15 } }
};

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen font-sans bg-[#F9FAFB] overflow-x-hidden selection:bg-[#5B5BD6]/20">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-32 pb-24 px-6 flex flex-col items-center justify-center min-h-[90vh]">
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#5B5BD6]/20 rounded-full blur-[120px] mix-blend-multiply opacity-70 -z-10 animate-pulse" />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-[#00C896]/20 rounded-full blur-[100px] mix-blend-multiply opacity-70 -z-10" />

        <motion.div 
          className="max-w-4xl w-full mx-auto text-center z-10"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-[#5B5BD6] font-bold text-xs md:text-sm mb-8 shadow-sm tracking-tight">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5B5BD6] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5B5BD6]"></span>
            </span>
            성과 보장형 오프라인 마케팅
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tighter leading-[1.15] md:leading-[1.1] mb-6 text-balance break-keep">
            진짜 손님이 올 때만 <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B5BD6] to-[#00C896]">결제하세요</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-lg md:text-2xl text-gray-500 mb-12 max-w-2xl mx-auto font-medium tracking-tight leading-relaxed text-balance break-keep">
            초기 비용 0원. 배달앱 수수료 0원. <br />
            확실한 방문 성과가 증명될 때만 마케팅비를 냅니다.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 sm:px-0">
            <Link 
              href="/form" 
              className="w-full sm:w-auto px-8 py-5 bg-[#1A1A24] text-white rounded-2xl font-bold text-lg md:text-xl hover:bg-black transition-all shadow-2xl shadow-black/20 flex items-center justify-center gap-2 group"
            >
              얼리버드 20,000P 받기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating UI Elements for visual impact */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 hidden md:flex justify-between -z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 transform -rotate-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><TrendingUp className="text-[#00C896] w-5 h-5" /></div>
              <div><p className="text-xs text-gray-500 font-bold">실제 방문 객수</p><p className="font-extrabold text-gray-900">+124명</p></div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 transform rotate-6 translate-y-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center"><HandCoins className="text-[#5B5BD6] w-5 h-5" /></div>
              <div><p className="text-xs text-gray-500 font-bold">사용된 마케팅비</p><p className="font-extrabold text-gray-900">12,000원</p></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. CORE FEATURES (BENTO GRID) - Less text, more visual */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">왜 플바인가요?</h2>
            <p className="text-gray-500 text-lg tracking-tight">딱 3가지만 기억하세요.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f0fbf8] rounded-[32px] p-8 md:p-10 border border-[#00C896]/10 col-span-1 md:col-span-2 flex flex-col justify-between overflow-hidden relative group">
              <div className="z-10">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                  <HandCoins className="w-7 h-7 text-[#00C896]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
                  100% 후불제 <br />성과형 마케팅
                </h3>
                <p className="text-gray-600 font-medium tracking-tight text-balance">
                  검색 광고처럼 클릭만 해도 돈이 나가는 시대는 끝. <br />
                  진짜 손님이 결제까지 마쳤을 때만 돈을 냅니다.
                </p>
              </div>
              {/* Decorative element */}
              <div className="absolute right-[-20%] bottom-[-20%] opacity-10 group-hover:scale-110 transition-transform duration-500">
                <TrendingUp className="w-96 h-96 text-[#00C896]" />
              </div>
            </div>

            <div className="bg-[#F8F9FA] rounded-[32px] p-8 md:p-10 border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                  <Store className="w-7 h-7 text-[#5B5BD6]" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-3 tracking-tight">
                  초기 도입비<br /><span className="text-[#5B5BD6]">완전 무료</span>
                </h3>
                <p className="text-gray-600 text-sm font-medium tracking-tight text-balance">
                  가입비, 월 고정비 절대 없습니다. 리스크 제로.
                </p>
              </div>
            </div>

            <div className="bg-[#F8F9FA] rounded-[32px] p-8 md:p-10 border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-orange-500" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-3 tracking-tight">
                  단골이<br />영업사원으로
                </h3>
                <p className="text-gray-600 text-sm font-medium tracking-tight text-balance">
                  동네 마당발들이 스스로 내 가게를 홍보합니다.
                </p>
              </div>
            </div>

            <div className="bg-[#f5f5ff] rounded-[32px] p-8 md:p-10 border border-[#5B5BD6]/10 col-span-1 md:col-span-2 flex flex-col justify-between overflow-hidden relative group">
              <div className="z-10">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                  <Smartphone className="w-7 h-7 text-[#5B5BD6]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
                  앱 설치 없이 <br />QR 하나로 끝
                </h3>
                <p className="text-gray-600 font-medium tracking-tight text-balance">
                  복잡한 기기 설치? 필요 없습니다. <br />
                  사장님도, 손님도 스마트폰 하나면 끝납니다.
                </p>
              </div>
              {/* Decorative element */}
              <div className="absolute right-[-10%] bottom-[-10%] opacity-10 group-hover:scale-110 transition-transform duration-500">
                <QrCode className="w-64 h-64 text-[#5B5BD6]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISUAL EXPLANATION (VIRTUAL APPS) */}
      <section className="py-32 px-6 bg-[#1A1A24] text-white overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">어떻게 작동하나요?</h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium tracking-tight">앱 화면으로 직관적으로 보여드릴게요.</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24">
            
            {/* Step 1: Partner App */}
            <motion.div 
              className="flex-1 w-full max-w-[320px] flex flex-col items-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-1.5 bg-[#00C896]/20 text-[#00C896] rounded-full font-bold text-sm mb-4">
                  STEP 1. 파트너 홍보
                </div>
                <h3 className="text-2xl font-bold tracking-tight">고유 링크 생성 & 공유</h3>
              </div>
              
              {/* Virtual App UI */}
              <div className="w-full aspect-[1/2.1] bg-white rounded-[40px] shadow-2xl border-[8px] border-gray-800 relative overflow-hidden flex flex-col">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-[20px] z-20"></div>
                <div className="w-full pt-10 px-5 pb-6 bg-[#00C896] flex-shrink-0">
                  <p className="text-white/80 text-xs font-bold mb-1">내 홍보 링크</p>
                  <p className="text-white font-extrabold text-lg leading-tight break-keep">플바 삼겹살<br/>음료 1캔 무료 증정!</p>
                </div>
                <div className="flex-1 bg-gray-50 p-5 flex flex-col gap-4">
                  <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-gray-900" />
                  </div>
                  <button className="w-full py-4 bg-[#FEE500] text-[#000000] font-bold rounded-xl text-sm shadow-sm">
                    카카오톡 공유하기
                  </button>
                  <button className="w-full py-4 bg-[#FF7E36] text-white font-bold rounded-xl text-sm shadow-sm">
                    당근마켓 공유하기
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Step 2: Owner App */}
            <motion.div 
              className="flex-1 w-full max-w-[320px] flex flex-col items-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-1.5 bg-[#5B5BD6]/20 text-[#5B5BD6] rounded-full font-bold text-sm mb-4">
                  STEP 2. 사장님 성과 확인
                </div>
                <h3 className="text-2xl font-bold tracking-tight">즉시 꽂히는 매출 데이터</h3>
              </div>
              
              {/* Virtual App UI */}
              <div className="w-full aspect-[1/2.1] bg-white rounded-[40px] shadow-2xl border-[8px] border-gray-800 relative overflow-hidden flex flex-col">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-[20px] z-20"></div>
                <div className="flex-1 bg-[#F8F9FA] pt-12 px-5 flex flex-col">
                  <div className="bg-white p-4 rounded-2xl shadow-sm mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#5B5BD6]/10 rounded-full flex items-center justify-center">
                      <Store className="w-5 h-5 text-[#5B5BD6]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold">내 가게</p>
                      <p className="text-gray-900 font-bold">플바 삼겹살</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl shadow-sm mb-4 flex-1 flex flex-col justify-center items-center text-center">
                    <TrendingUp className="w-12 h-12 text-[#00C896] mb-4" />
                    <p className="text-gray-500 text-sm font-bold mb-1">오늘 링크 방문 결제</p>
                    <p className="text-[#00C896] text-4xl font-extrabold tracking-tighter">
                      12<span className="text-lg text-gray-900">팀</span>
                    </p>
                  </div>

                  <div className="bg-[#5B5BD6] p-4 rounded-t-2xl mt-auto shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
                    <div className="flex justify-between items-center text-white">
                      <span className="text-sm font-bold opacity-80">이번 달 총 매출 증가</span>
                      <span className="font-extrabold text-xl">+ 3,450,000원</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. ROI CALCULATOR - Big Visual Numbers */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              압도적인 수익률 증명
            </h2>
            <p className="text-gray-500 text-lg md:text-xl font-medium tracking-tight break-keep">
              초등학생이 봐도 이해되는 가장 확실한 마케팅 계산법
            </p>
          </div>

          <motion.div 
            className="bg-gradient-to-br from-[#f0fbf8] to-white rounded-[40px] p-8 md:p-16 border-2 border-[#00C896]/20 shadow-2xl relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
          >
            {/* Background Icon */}
            <HandCoins className="absolute -right-10 -bottom-10 w-64 h-64 text-[#00C896]/5" />

            <div className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
                  <p className="text-gray-500 font-bold mb-2">마케팅 비용 (음료 1캔 원가)</p>
                  <p className="text-4xl font-extrabold text-[#5B5BD6] tracking-tighter">1,000원</p>
                </div>
                <div className="hidden md:flex justify-center">
                  <ArrowRight className="w-12 h-12 text-gray-300" />
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
                  <p className="text-gray-500 font-bold mb-2">실제 결제 매출 (2인 기준)</p>
                  <p className="text-4xl font-extrabold text-[#00C896] tracking-tighter">30,000원</p>
                </div>
              </div>

              <div className="text-center">
                <div className="inline-block px-6 py-2 bg-black text-white rounded-full font-bold text-lg mb-6 shadow-lg shadow-black/20">
                  ROAS (광고비 대비 매출액)
                </div>
                <h3 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00C896] to-[#5B5BD6] tracking-tighter drop-shadow-sm">
                  3,000%
                </h3>
                <p className="text-gray-500 font-bold mt-6 text-xl tracking-tight">
                  오지 않을 사람에게 버리는 돈은 0원.<br />
                  가장 합리적인 장사를 시작하세요.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. EARLY BIRD CTA */}
      <section className="py-24 px-6 bg-[#1A1A24] relative overflow-hidden">
        {/* Abstract Backgrounds */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-[#5B5BD6]/20 to-transparent rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#FFD700] to-[#FF8C00] text-black font-extrabold rounded-full text-sm md:text-base mb-8 shadow-xl shadow-[#FFD700]/20 transform -rotate-2">
              <Gift className="w-5 h-5" /> 선착순 100팀 한정 혜택
            </motion.div>
            
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter leading-tight mb-12 text-balance">
              지금 가입하면<br />마케팅 포인트 <span className="text-[#FFD700]">20,000P</span> 즉시 지급!
            </motion.h2>

            <motion.div variants={fadeUp} className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/10 max-w-2xl mx-auto mb-12 text-left space-y-6">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-8 h-8 text-[#00C896] shrink-0" />
                <p className="text-white text-lg md:text-xl font-bold tracking-tight">마케팅으로 바로 쓸 수 있는 20,000P 충전</p>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-8 h-8 text-[#00C896] shrink-0" />
                <p className="text-white text-lg md:text-xl font-bold tracking-tight">출시 후 3개월간 시스템 기본 이용료 0원</p>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-8 h-8 text-[#00C896] shrink-0" />
                <p className="text-white text-lg md:text-xl font-bold tracking-tight">우수 동네 파트너 우선 배정 혜택</p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link 
                href="/form" 
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-12 py-6 bg-white text-[#1A1A24] rounded-full font-extrabold text-2xl hover:bg-gray-100 hover:scale-105 transition-all shadow-2xl shadow-white/10"
              >
                20,000P 받고 무료 등록하기 <ArrowRight className="w-7 h-7" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
