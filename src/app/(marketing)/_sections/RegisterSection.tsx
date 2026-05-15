"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, ChevronRight } from "lucide-react";

export default function RegisterSection() {
  const [storeName, setStoreName] = useState("");
  const [contact, setContact] = useState("");
  const [category, setCategory] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert("사전 등록이 완료되었습니다! 빠르게 연락드리겠습니다.");
  };

  return (
    <section id="register" className="px-6 pt-12 pb-32 bg-[#5b5bd6] border-t border-[#4f4fc4]">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        {/* 얼리버드 배너 */}
        <div className="bg-[#FF6B00] rounded-2xl p-5 mb-8 shadow-xl shadow-black/10 relative overflow-hidden">
          {/* 장식용 패턴 */}
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
          
          <div className="flex flex-col gap-1 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/90 font-bold text-[12px] bg-black/20 px-2 py-1 rounded-md">
                특별 혜택
              </span>
              <span className="flex items-center gap-1.5 text-white font-black text-[14px]">
                <span className="w-2 h-2 rounded-full bg-[#FFD600] animate-pulse" />
                현재 37곳 남음
              </span>
            </div>
            <h3 className="text-white font-black text-[22px] leading-[1.3]">
              지금 등록하면<br />마케팅 20,000P 무상 지원
            </h3>
            <p className="text-white/80 text-[12px] mt-1">
              *1P = 현금 1원, 손님 최대 20명 유치 가능
            </p>
          </div>
        </div>

        <h2 className="text-white font-extrabold text-[28px] leading-[1.25] mb-2">
          지금 무료로<br />내 가게 등록하기
        </h2>
        <p className="text-white/90 text-[14px] mb-8 leading-[1.6] font-medium">
          이미 광고비로 충분히 태웠잖아요.<br />이제 결제된 만큼만 내세요.
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-[12px] font-bold text-white/80 mb-2">상호명</label>
            <input
              type="text" required value={storeName} onChange={e => setStoreName(e.target.value)}
              placeholder="예: 마포 정육식당"
              className="w-full px-4 py-4 bg-white rounded-2xl text-[#191F28] text-[15px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
          </div>
          <div>
            <label className="block text-[12px] font-bold text-white/80 mb-2">연락처</label>
            <input
              type="tel" required value={contact} onChange={e => setContact(e.target.value)}
              placeholder="010-0000-0000"
              className="w-full px-4 py-4 bg-white rounded-2xl text-[#191F28] text-[15px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
          </div>
          <div>
            <label className="block text-[12px] font-bold text-white/80 mb-2">업종</label>
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

          <button
            type="submit"
            className="w-full py-5 bg-[#1A1A24] text-white rounded-2xl font-black text-[16px] shadow-xl hover:bg-black transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
          >
            무료 등록하기 <ArrowRight className="w-5 h-5" />
          </button>
          
          {/* 신뢰 요소 하단 배치 */}
          <div className="text-center mt-6 space-y-4">
            <p className="flex justify-center items-center gap-1.5 text-[12px] text-white/80 font-bold bg-white/10 py-2.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              남겨주신 정보는 100% 암호화되어 보호됩니다.
            </p>
            <div className="text-[10px] text-white/40 leading-relaxed font-medium">
              <p>주식회사 플바 | 사업자등록번호: 123-45-67890</p>
              <p className="mt-1">
                <a href="#" className="underline underline-offset-2">개인정보처리방침</a> 및 <a href="#" className="underline underline-offset-2">이용약관</a>
              </p>
            </div>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
