"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Store, ShieldCheck, ArrowRight, ChevronRight } from "lucide-react";

export default function RegisterSection() {
  const [storeName, setStoreName] = useState("");
  const [contact, setContact] = useState("");
  const [category, setCategory] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert("사전 등록이 완료되었습니다! 빠르게 연락드리겠습니다.");
  };

  return (
    <section id="register" className="py-24 px-5 bg-[#F9FAFB]">
      <div className="max-w-lg mx-auto">
        <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="bg-white rounded-[40px] p-8 sm:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-brand/5 rounded-full -mr-20 -mt-20"/>

          <div className="text-center mb-10 relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand/10 rounded-[20px] mb-5">
              <Store className="w-8 h-8 text-brand"/>
            </div>
            <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#191F28] mb-3 leading-[1.3]">
              지금 바로<br />선착순 혜택을 잡으세요
            </h2>
            <p className="text-[15px] text-[#4E5968] leading-[1.6]">
              초기 등록 사장님 100분께<br />
              <span className="font-black text-brand text-[18px]">20,000P</span>를 무상 지원해 드립니다.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5 relative z-10">
            <div>
              <label className="block text-[14px] font-bold text-[#333D4B] mb-2">상호명</label>
              <input type="text" required value={storeName} onChange={e=>setStoreName(e.target.value)}
                placeholder="예: 플바식당 홍대점"
                className="w-full px-5 py-4 bg-[#F9FAFB] border border-[#E5E8EB] rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all text-[15px]"/>
            </div>
            <div>
              <label className="block text-[14px] font-bold text-[#333D4B] mb-2">사장님 연락처</label>
              <input type="tel" required value={contact} onChange={e=>setContact(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full px-5 py-4 bg-[#F9FAFB] border border-[#E5E8EB] rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all text-[15px]"/>
            </div>
            <div>
              <label className="block text-[14px] font-bold text-[#333D4B] mb-2">가게 업종</label>
              <div className="relative">
                <select required value={category} onChange={e=>setCategory(e.target.value)}
                  className="w-full px-5 py-4 bg-[#F9FAFB] border border-[#E5E8EB] rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand transition-all text-[15px] appearance-none cursor-pointer">
                  <option value="" disabled>업종을 선택해 주세요</option>
                  <option value="food">음식점 (고깃집/한식/일식/양식)</option>
                  <option value="cafe">카페/베이커리/디저트</option>
                  <option value="bar">주점/호프/이자카야</option>
                  <option value="beauty">뷰티/미용실/네일</option>
                  <option value="other">기타 오프라인 매장</option>
                </select>
                <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B95A1] rotate-90 pointer-events-none"/>
              </div>
            </div>
            <button type="submit" className="w-full py-5 bg-brand text-white rounded-2xl font-bold text-[17px] hover:bg-brand-dark transition-all hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-brand/30 flex items-center justify-center gap-2 mt-2">
              무료로 내 가게 등록하기 <ArrowRight className="w-5 h-5"/>
            </button>
            <p className="flex items-center justify-center gap-2 text-[12px] text-[#8B95A1] font-medium">
              <ShieldCheck className="w-4 h-4 text-brand"/> 입력 정보는 상담 목적으로만 안전하게 사용됩니다.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
