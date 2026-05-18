"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, ChevronRight, Flame, MessageCircle, Phone } from "lucide-react";

// 선착순 남은 수
const REMAINING = 37;
const TOTAL = 100;
const filled = TOTAL - REMAINING;
const pct = Math.round((filled / TOTAL) * 100);

export default function RegisterSection() {
  const [storeName, setStoreName] = useState("");
  const [contact, setContact] = useState("");
  const [category, setCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true); // #4: 완료 상태 전환
  };

  // #4: 제출 완료 후 넥스트 스텝 안내 화면
  if (submitted) {
    return (
      <section id="register" className="bg-[#5b5bd6] px-6 py-16 min-h-[60vh] flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-full bg-[#FFD600] flex items-center justify-center mx-auto mb-6 shadow-xl">
            <span className="text-[28px]">🎉</span>
          </div>
          <h2 className="text-white font-black text-[26px] mb-3 leading-[1.3]">
            등록 완료!<br />곧 연락드릴게요.
          </h2>
          <p className="text-white/75 text-[14px] leading-[1.7] mb-8">
            등록 완료 후 <span className="text-white font-bold">24시간 내</span> 담당자가<br />
            카카오톡 또는 전화로 연락드립니다.
          </p>

          {/* 넥스트 스텝 안내 카드 */}
          <div className="bg-white/12 border border-white/20 rounded-2xl p-5 text-left space-y-3">
            <p className="text-white/70 text-[11px] font-bold uppercase tracking-wider mb-4">다음 단계</p>
            {[
              { icon: Phone, step: "01", text: "담당자가 24시간 내 연락드립니다" },
              { icon: MessageCircle, step: "02", text: "가게 정보 확인 후 앱 세팅을 도와드립니다" },
              { icon: Flame, step: "03", text: "혜택 등록하고 파트너 홍보 시작!" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-[#a8b3ff] text-[10px] font-bold mr-2">{item.step}</span>
                  <span className="text-white text-[13px] font-semibold">{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="register" className="bg-[#5b5bd6]">
      {/* 긴박감 배너 띠 */}
      <div className="bg-[#FF6B00] px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-white" />
            <span className="text-white font-black text-[14px]">선착순 100곳 한정</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FFD600] animate-pulse" />
            <span className="text-white font-black text-[15px]">현재 {REMAINING}곳 남음</span>
          </div>
        </div>
        <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden mb-2">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="h-full bg-[#FFD600] rounded-full"
          />
        </div>
        <p className="text-white/80 text-[11px] font-medium">
          {filled}곳 등록 완료 · 남은 자리 {REMAINING}곳
        </p>
      </div>

      {/* 폼 본문 */}
      <div className="px-6 pt-10 pb-32">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-white font-extrabold text-[28px] leading-[1.25] mb-2">
            지금 무료로<br />내 가게 등록하기
          </h2>
          <p className="text-white/75 text-[14px] mb-2 leading-[1.6] font-medium">
            이미 광고비로 충분히 태웠잖아요.<br />이제 결제된 만큼만 내세요.
          </p>

          {/* #4: 폼 상단 넥스트 스텝 안내 */}
          <div className="flex items-center gap-2 bg-white/12 border border-white/20 rounded-xl px-3 py-2.5 mb-8">
            <MessageCircle className="w-4 h-4 text-[#a8b3ff] flex-shrink-0" />
            <p className="text-white/85 text-[12px] leading-[1.4]">
              등록 완료 후 <span className="font-bold text-white">24시간 내</span> 담당자가 카카오톡 또는 전화로 연락드립니다
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[12px] font-bold text-white/70 mb-2">상호명</label>
              <input
                type="text" required value={storeName} onChange={e => setStoreName(e.target.value)}
                placeholder="예: 마포 정육식당"
                className="w-full px-4 py-4 bg-white rounded-2xl text-[#191F28] text-[15px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/60"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-white/70 mb-2">연락처</label>
              <input
                type="tel" required value={contact} onChange={e => setContact(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full px-4 py-4 bg-white rounded-2xl text-[#191F28] text-[15px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/60"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold text-white/70 mb-2">업종</label>
              <div className="relative">
                <select
                  required value={category} onChange={e => setCategory(e.target.value)}
                  className="w-full px-4 py-4 bg-white rounded-2xl text-[#191F28] text-[15px] appearance-none focus:outline-none focus:ring-2 focus:ring-white/60"
                >
                  <option value="" disabled>업종을 선택해 주세요</option>
                  <option value="food">음식점 (고깃집/한식/일식/양식)</option>
                  <option value="cafe">카페/베이커리/디저트</option>
                  <option value="bar">주점/호프/이자카야</option>
                  <option value="beauty">뷰티/미용실/네일</option>
                  <option value="other">기타 오프라인 매장</option>
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rotate-90 pointer-events-none" />
              </div>
            </div>

            {/* #7: CTA 버튼 — 보라 계열로 통일 (흰 배경 + 보라 텍스트 고대비) */}
            <button
              type="submit"
              className="w-full py-5 bg-white text-[#5b5bd6] rounded-2xl font-black text-[16px] shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 hover:bg-gray-50"
            >
              무료 등록하기 <ArrowRight className="w-5 h-5" />
            </button>

            {/* 신뢰 요소 */}
            <div className="text-center mt-6 space-y-4">
              <p className="flex justify-center items-center gap-1.5 text-[12px] text-white/75 font-bold bg-white/10 py-2.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                남겨주신 정보는 100% 암호화되어 보호됩니다.
              </p>
              <div className="text-[10px] text-white/35 leading-relaxed font-medium">
                <p>주식회사 플바 | 사업자등록번호: 123-45-67890</p>
                <p className="mt-1">
                  <a href="#" className="underline underline-offset-2">개인정보처리방침</a> 및 <a href="#" className="underline underline-offset-2">이용약관</a>
                </p>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
