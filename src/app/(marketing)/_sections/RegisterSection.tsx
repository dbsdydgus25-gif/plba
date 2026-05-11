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
    <section id="register" className="py-20 px-5 bg-[#0D0D0D] border-t border-white/5">
      <div className="max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>

          <div className="mb-10">
            <span className="inline-block text-[11px] font-black tracking-[0.3em] text-brand uppercase bg-brand/10 border border-brand/20 px-4 py-1.5 rounded-full mb-5">
              사전 등록
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-extrabold leading-[1.25] text-white">
              지금 바로<br />선착순 혜택을 잡으세요
            </h2>
            <p className="mt-3 text-[14px] text-[#8B95A1] leading-[1.7]">
              초기 등록 사장님 100분께<br />
              <span className="text-brand font-black text-[18px]">20,000P</span>를 무상 지원해 드립니다.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[13px] font-bold text-[#8B95A1] mb-2">상호명</label>
              <input type="text" required value={storeName} onChange={e => setStoreName(e.target.value)}
                placeholder="예: 플바식당 홍대점"
                className="w-full px-5 py-4 bg-[#141414] border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand text-white text-[15px] placeholder:text-[#333D4B] transition-all" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#8B95A1] mb-2">사장님 연락처</label>
              <input type="tel" required value={contact} onChange={e => setContact(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full px-5 py-4 bg-[#141414] border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand text-white text-[15px] placeholder:text-[#333D4B] transition-all" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#8B95A1] mb-2">가게 업종</label>
              <div className="relative">
                <select required value={category} onChange={e => setCategory(e.target.value)}
                  className="w-full px-5 py-4 bg-[#141414] border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand text-white text-[15px] appearance-none cursor-pointer transition-all">
                  <option value="" disabled className="bg-[#141414]">업종을 선택해 주세요</option>
                  <option value="food" className="bg-[#141414]">음식점 (고깃집/한식/일식/양식)</option>
                  <option value="cafe" className="bg-[#141414]">카페/베이커리/디저트</option>
                  <option value="bar" className="bg-[#141414]">주점/호프/이자카야</option>
                  <option value="beauty" className="bg-[#141414]">뷰티/미용실/네일</option>
                  <option value="other" className="bg-[#141414]">기타 오프라인 매장</option>
                </select>
                <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4E5968] rotate-90 pointer-events-none" />
              </div>
            </div>

            <button type="submit" className="w-full py-5 bg-brand text-white rounded-2xl font-bold text-[16px] hover:bg-brand-dark transition-all active:scale-[0.98] shadow-xl shadow-brand/30 flex items-center justify-center gap-2 mt-2">
              무료로 내 가게 등록하기 <ArrowRight className="w-5 h-5" />
            </button>

            <p className="flex items-center justify-center gap-2 text-[12px] text-[#4E5968] font-medium">
              <ShieldCheck className="w-4 h-4 text-brand" />
              입력 정보는 상담 목적으로만 안전하게 사용됩니다.
            </p>
          </form>

        </motion.div>
      </div>
    </section>
  );
}
