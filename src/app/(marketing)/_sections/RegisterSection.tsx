"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, ChevronRight, Flame } from "lucide-react";

// 선착순 남은 수 (실제로는 DB에서 가져와야 함 — 현재는 정적)
const REMAINING = 37;
const TOTAL = 100;
const filled = TOTAL - REMAINING;
const pct = Math.round((filled / TOTAL) * 100);

export default function RegisterSection() {
  const [storeName, setStoreName] = useState("");
  const [contact, setContact] = useState("");
  const [category, setCategory] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert("사전 등록이 완료되었습니다! 빠르게 연락드리겠습니다.");
  };

  return (
    <section id="register" className="bg-[#5b5bd6]">
      {/* ── 긴박감 배너 띠 (banner strip) ── */}
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

        {/* 진행도 바 */}
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

      {/* ── 폼 본문 ── */}
      <div className="px-6 pt-10 pb-32">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-white font-extrabold text-[28px] leading-[1.25] mb-2">
            지금 무료로<br />내 가게 등록하기
          </h2>
          <p className="text-white/75 text-[14px] mb-8 leading-[1.6] font-medium">
            이미 광고비로 충분히 태웠잖아요.<br />이제 결제된 만큼만 내세요.
          </p>

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

            {/* 버튼 — 높은 대비 색상으로 변경 (보라 배경 위에서 눈에 띄게) */}
            <button
              type="submit"
              className="w-full py-5 bg-[#FFD600] text-[#1A1A24] rounded-2xl font-black text-[16px] shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
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
