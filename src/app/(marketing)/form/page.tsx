"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PreRegistrationFormPage() {
  const [formData, setFormData] = useState({
    storeName: "",
    managerName: "",
    phone: "",
    agreed: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }
    alert("사전등록이 완료되었습니다! 런칭 시 가장 먼저 연락드리겠습니다.");
    setFormData({ storeName: "", managerName: "", phone: "", agreed: false });
  };

  return (
    <div className="flex flex-col w-full min-h-screen font-sans bg-[#F8F9FA] items-center justify-center p-6">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-[32px] p-8 shadow-xl shadow-black/5 border border-gray-100"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <div className="w-12 h-12 bg-[#5B5BD6]/10 text-[#5B5BD6] rounded-2xl flex items-center justify-center mx-auto font-bold text-xl tracking-tighter">
              plba
            </div>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C896]/10 text-[#00C896] font-bold text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C896] animate-pulse"></span>
            얼리버드 선착순 100팀 한정
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A24] mb-2">사장님 무료 사전등록</h1>
          <p className="text-[#66667A] text-sm">가게 이름과 연락처만 남겨주시면<br/>런칭 시 가장 먼저 특별한 혜택을 안내해 드립니다.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="storeName" className="block text-sm font-bold text-[#1A1A24] mb-2">가게 이름</label>
            <input
              type="text"
              id="storeName"
              placeholder="예: 플바 커피숍"
              required
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]/50 focus:border-[#5B5BD6] transition-all bg-gray-50/50"
              value={formData.storeName}
              onChange={(e) => setFormData({...formData, storeName: e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="managerName" className="block text-sm font-bold text-[#1A1A24] mb-2">담당자 성함</label>
            <input
              type="text"
              id="managerName"
              placeholder="예: 홍길동"
              required
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]/50 focus:border-[#5B5BD6] transition-all bg-gray-50/50"
              value={formData.managerName}
              onChange={(e) => setFormData({...formData, managerName: e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-[#1A1A24] mb-2">연락처</label>
            <input
              type="tel"
              id="phone"
              placeholder="010-0000-0000"
              required
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#5B5BD6]/50 focus:border-[#5B5BD6] transition-all bg-gray-50/50"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="flex items-start gap-2 pt-2 bg-gray-50 p-4 rounded-xl border border-gray-100 mt-6">
            <input
              type="checkbox"
              id="agreed"
              className="mt-0.5 w-4 h-4 text-[#5B5BD6] border-gray-300 rounded focus:ring-[#5B5BD6]"
              checked={formData.agreed}
              onChange={(e) => setFormData({...formData, agreed: e.target.checked})}
            />
            <label htmlFor="agreed" className="text-xs text-gray-500 cursor-pointer leading-relaxed">
              (필수) 개인정보 수집 및 이용에 동의합니다. 수집된 정보는 서비스 출시 안내 및 사전등록 혜택 지급 목적으로만 사용됩니다.
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-6 bg-[#1A1A24] text-white rounded-xl font-bold text-lg hover:bg-black transition-colors shadow-lg shadow-black/10 flex items-center justify-center gap-2 group"
          >
            무료 사전등록 완료하기
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 text-center flex flex-col items-center gap-3"
      >
        <div className="flex items-center gap-2 text-sm text-[#66667A]">
          <CheckCircle2 className="w-4 h-4 text-[#00C896]" />
          <span>초기 가입비 & 시스템 도입비 평생 0원</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#66667A]">
          <CheckCircle2 className="w-4 h-4 text-[#00C896]" />
          <span>실제 방문 성과(결제) 발생 시에만 과금</span>
        </div>
      </motion.div>
    </div>
  );
}
