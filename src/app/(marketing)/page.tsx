"use client";

import Link from "next/link";
import { ArrowRight, QrCode, CheckCircle2, MessageCircleQuestion, Users } from "lucide-react";
import { motion, Variants } from "framer-motion";

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen font-sans bg-[#FFFFFF]">
      
      {/* 1. Hero Section */}
      <section className="relative w-full pt-32 pb-24 overflow-hidden flex flex-col items-center justify-start">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-r from-[#5B5BD6]/10 to-[#00C896]/10 blur-[100px] rounded-full -z-10" />

        <motion.div 
          className="max-w-5xl mx-auto px-6 text-center z-10 flex flex-col items-center mt-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#5B5BD6]/20 text-[#5B5BD6] font-semibold text-sm mb-10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#5B5BD6] animate-pulse"></span>
            오프라인 매장 전용 스마트 제휴 마케팅
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold text-[#1A1A24] tracking-tight mb-10 leading-[1.3] break-keep">
            돈 먹는 검색 광고는 그만,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B5BD6] to-[#00C896]">진짜 손님이 올 때만 결제하세요</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-[#66667A] mb-16 max-w-3xl mx-auto font-medium leading-loose break-keep">
            사장님은 확실하게 돈을 번 방문에만 비용을 내고,<br />
            파트너는 내 단골 가게를 홍보하며 돈을 버는 아주 쉬운 상생 플랫폼.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <Link 
              href="/form" 
              className="px-10 py-5 bg-[#5B5BD6] text-white rounded-full font-bold text-xl hover:bg-[#4646C0] transition-all shadow-xl shadow-[#5B5BD6]/20 flex items-center gap-2 group hover:-translate-y-1"
            >
              사장님 100팀 무료 사전등록
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Concept FAQ Section - Very easy explanation */}
      <section className="py-24 bg-[#F8F9FA] border-y border-[#000000]/5">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#1A1A24] mb-8">플바(PLBA), 도대체 뭔가요?</h2>
            <p className="text-xl text-[#66667A] leading-loose break-keep">
              초등학생도 이해할 수 있게 딱 3가지만 설명해 드릴게요.
            </p>
          </motion.div>

          <div className="space-y-24">
            {/* Q1 */}
            <motion.div 
              className="flex flex-col md:flex-row gap-12 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 text-[#5B5BD6] font-bold text-lg">
                  <MessageCircleQuestion className="w-6 h-6" /> Q1. 플바는 무슨 서비스인가요?
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A24] leading-relaxed">
                  &quot;동네 인싸들이 우리 가게 영업사원이 되는 서비스&quot;
                </h3>
                <p className="text-lg text-[#66667A] leading-loose break-keep">
                  블로그, 인스타에 몇백만 원씩 주고 광고를 맡겼는데, 진짜로 손님이 왔는지 알 수 없어 답답하셨죠?<br />
                  플바는 다릅니다. 우리 동네 사람들이 직접 우리 가게의 특별 혜택 링크를 인터넷에 뿌리고 홍보해 줍니다.<br />
                  그 링크를 보고 **실제로 손님이 매장에 찾아와 결제까지 마쳤을 때만** 마케팅 비용이 빠져나갑니다.
                </p>
              </div>
              <div className="flex-1 w-full relative">
                <div className="bg-white p-8 rounded-[32px] shadow-lg border border-gray-100 transform rotate-2">
                  <div className="flex items-center gap-4 mb-6 border-b pb-6">
                    <div className="w-14 h-14 bg-[#5B5BD6]/10 rounded-full flex items-center justify-center text-[#5B5BD6]">
                      <Users className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">동네 마당발 지훈씨</p>
                      <p className="text-gray-500 text-sm">우리 가게 홍보 파트너</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <p className="text-[#5B5BD6] font-bold mb-2">홍보 효과</p>
                    <p className="text-gray-800 text-lg leading-relaxed">&quot;이번 주에 지훈씨 덕분에 신규 손님이 15명이나 왔네요! 광고비 쓴 보람이 확실합니다.&quot;</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Q2 */}
            <motion.div 
              className="flex flex-col md:flex-row-reverse gap-12 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 text-[#00C896] font-bold text-lg">
                  <MessageCircleQuestion className="w-6 h-6" /> Q2. 파트너는 어떻게 홍보하나요?
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A24] leading-relaxed">
                  &quot;나만의 고유 링크와 QR코드로 무제한 공유&quot;
                </h3>
                <p className="text-lg text-[#66667A] leading-loose break-keep">
                  사장님이 캠페인을 올리면, 파트너들은 앱에서 버튼 하나만 눌러서 &apos;나만의 홍보 링크&apos;를 발급받습니다.<br />
                  이 링크를 카카오톡 단톡방, 당근마켓 동네생활, 개인 SNS 등에 자유롭게 공유합니다.<br />
                  손님이 이 링크를 누르거나 QR을 보여주고 매장을 방문하면, 플바가 똑똑하게 추적해서 성과를 기록합니다.
                </p>
              </div>
              <div className="flex-1 w-full flex justify-center">
                {/* Virtual App UI for Partner Share */}
                <div className="relative w-[280px] bg-white rounded-[40px] shadow-2xl border-[10px] border-gray-900 overflow-hidden transform -rotate-2">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-2xl z-20"></div>
                  <div className="pt-8 px-5 pb-6 bg-[#00C896] text-white">
                    <p className="text-sm font-bold opacity-80 mb-1">내 고유 홍보 링크</p>
                    <p className="font-bold text-xl mb-4">플바 커피숍 - 음료 1잔 무료 혜택</p>
                    <div className="bg-white p-4 rounded-xl text-center">
                      <QrCode className="w-20 h-20 text-black mx-auto mb-2" />
                      <p className="text-[#00C896] font-bold text-sm">QR 다운로드</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <button className="w-full py-4 bg-gray-100 text-gray-800 rounded-xl font-bold mb-3 flex justify-center items-center gap-2">
                      카카오톡으로 공유하기
                    </button>
                    <button className="w-full py-4 bg-gray-100 text-gray-800 rounded-xl font-bold flex justify-center items-center gap-2">
                      당근마켓에 자랑하기
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Q3 */}
            <motion.div 
              className="flex flex-col md:flex-row gap-12 items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 text-[#5B5BD6] font-bold text-lg">
                  <MessageCircleQuestion className="w-6 h-6" /> Q3. 파트너스들은 어떤 혜택을 받나요?
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A24] leading-relaxed">
                  &quot;방문이 성사될 때마다 쌓이는 쏠쏠한 현금 수익&quot;
                </h3>
                <p className="text-lg text-[#66667A] leading-loose break-keep">
                  파트너가 뿌린 링크를 통해 손님이 매장에 방문해서 결제를 하면, 파트너의 앱 계좌에 바로바로 현금이 꽂힙니다.<br />
                  동네에 아는 사람이 많거나 글을 잘 쓰는 파트너라면 한 달에 수십만 원의 부수익을 올릴 수 있습니다.<br />
                  이것이 파트너들이 사장님 가게를 발 벗고 나서서 홍보해 주는 이유입니다.
                </p>
              </div>
              <div className="flex-1 w-full flex justify-center">
                {/* Virtual App UI for Partner Revenue */}
                 <div className="relative w-[280px] bg-white rounded-[40px] shadow-2xl border-[10px] border-gray-900 overflow-hidden transform rotate-2">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-2xl z-20"></div>
                  <div className="pt-12 px-6 pb-6 bg-[#F8F9FA] h-[400px] flex flex-col">
                    <p className="text-center text-gray-500 font-bold mb-2">이번 달 출금 가능한 총 수익금</p>
                    <p className="text-center text-[#5B5BD6] text-4xl font-extrabold mb-8">
                      500,000<span className="text-2xl">원</span>
                    </p>
                    
                    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-4">
                      <p className="font-bold text-sm text-gray-800">최근 적립 내역</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">플바 커피숍 (지인 방문)</span>
                        <span className="text-[#00C896] font-bold">+ 5,000원</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">플바 고깃집 (커뮤니티)</span>
                        <span className="text-[#00C896] font-bold">+ 15,000원</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">플바 네일샵 (인스타)</span>
                        <span className="text-[#00C896] font-bold">+ 10,000원</span>
                      </div>
                    </div>
                    <button className="w-full py-4 mt-4 bg-[#1A1A24] text-white rounded-xl font-bold">
                      계좌로 현금 출금하기
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Owner ROI Calculation Section */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className="inline-flex px-4 py-2 bg-[#00C896]/10 text-[#00C896] font-bold rounded-full mb-6">
              사장님 시뮬레이션
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1A1A24] mb-8 leading-tight">
              실제로 매출이 얼마나 오를까요?<br />
              계산기로 직접 두드려 보았습니다.
            </h2>
            <p className="text-xl text-[#66667A] leading-loose break-keep">
              초등학생도 이해할 수 있는 아주 쉽고 확실한 수익 계산법입니다.
            </p>
          </motion.div>

          <motion.div 
            className="bg-[#f0fbf8] rounded-[40px] p-8 md:p-16 border-2 border-[#00C896]/20 shadow-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-bold text-[#1A1A24] mb-10 text-center">
              일반 한식당 사장님의 &quot;음료수 1캔&quot; 캠페인
            </h3>

            <div className="space-y-8 text-lg text-gray-700 leading-loose">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00C896] flex items-center justify-center text-white font-bold shrink-0 mt-1">1</div>
                <div>
                  <p>
                    동네 파트너가 <strong>10팀의 손님</strong>을 가게로 보냈다고 가정해 보겠습니다.<br />
                    보통 2명이 함께 오셔서 기본 3만 원짜리 식사를 하십니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00C896] flex items-center justify-center text-white font-bold shrink-0 mt-1">2</div>
                <div>
                  <p>
                    10팀이 와서 3만 원씩 결제했으니 <strong>총 매출은 30만 원</strong>이 발생했습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#00C896] flex items-center justify-center text-white font-bold shrink-0 mt-1">3</div>
                <div>
                  <p>
                    그럼 사장님이 지출한 마케팅 비용은 얼마일까요?<br />
                    손님 한 팀당 음료수 한 캔(원가 약 1,000원)을 서비스로 드렸다고 치면, <strong>10팀이니까 총 1만 원</strong>입니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-3xl p-8 text-center shadow-lg border border-[#00C896]/30 transform hover:scale-105 transition-transform">
              <p className="text-[#66667A] font-medium text-lg mb-4">결과적으로 사장님은</p>
              <h4 className="text-3xl md:text-4xl font-extrabold text-[#1A1A24] mb-4">
                단돈 <span className="text-[#5B5BD6]">1만 원</span>으로<br className="md:hidden" /> 매출 <span className="text-[#00C896]">30만 원</span>을 달성했습니다.
              </h4>
              <p className="text-xl text-[#66667A] font-medium mt-6 bg-gray-50 py-3 rounded-xl">
                이게 바로 <span className="text-[#00C896] font-bold">검색 광고 대비 3,000% 높은 수익률</span>입니다.<br />
                오지 않을 사람들에게 돈을 버리지 말고, 진짜 온 사람에게만 투자하세요.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Early Bird */}
      <section className="py-32 bg-[#1A1A24] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block px-5 py-2 bg-[#00C896] text-white font-bold rounded-full text-sm mb-10 shadow-lg shadow-[#00C896]/20">
            EARLY BIRD 선착순 100팀
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-16 leading-tight">지금 사전등록 하시는 사장님께만</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-white/10 rounded-3xl p-10 border border-white/5 hover:bg-white/15 transition-colors">
              <CheckCircle2 className="w-10 h-10 text-[#00C896] mb-6" />
              <h3 className="text-2xl font-bold mb-4 leading-relaxed">출시 후 3개월<br />기본 이용료 전액 0원</h3>
              <p className="text-gray-400 text-lg leading-loose">초기 런칭 파트너로서, 가장 먼저 플바의 폭발적인 유입 효과를 완전히 무료로 누려보세요.</p>
            </div>
            
            <div className="bg-white/10 rounded-3xl p-10 border border-white/5 hover:bg-white/15 transition-colors">
              <CheckCircle2 className="w-10 h-10 text-[#00C896] mb-6" />
              <h3 className="text-2xl font-bold mb-4 leading-relaxed">우수 홍보 파트너<br />집중 우선 매칭</h3>
              <p className="text-gray-400 text-lg leading-loose">사장님 매장을 적극적으로 홍보해 줄 지역 내 열성 파트너들을 가장 먼저 연결해 드립니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-40 bg-white">
        <motion.div 
          className="max-w-4xl mx-auto px-6 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#1A1A24] mb-10 leading-tight">
            지금 바로 플바와 함께<br />단골 손님을 쓸어 담으세요.
          </h2>
          <p className="text-2xl text-[#66667A] mb-16 leading-loose">
            가입비 0원, 매달 나가는 고정비 0원.<br />손해가 날 수 없는 완벽한 마케팅을 시작하세요.
          </p>
          <Link href="/form" className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-12 py-6 bg-[#1A1A24] text-white rounded-full font-bold text-2xl hover:bg-[#5B5BD6] hover:scale-105 transition-all shadow-2xl shadow-black/10">
            무료 사전등록 하러 가기 <ArrowRight className="w-7 h-7" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
