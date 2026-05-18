"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, ChevronRight, Flame, MessageCircle, Phone } from "lucide-react";

export default function RegisterSection() {
  const [storeName, setStoreName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          store_name: storeName,
          contact,
          email,
          category,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "등록에 실패했습니다. 다시 시도해 주세요.");
        return;
      }

      // 성공
      setSubmitted(true);
    } catch {
      setError("서버 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  // 제출 완료 — 넥스트 스텝 안내 화면
  if (submitted) {
    return (
      <section id="register" className="bg-[#5b5bd6] px-6 py-16 min-h-[60vh] flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6 shadow-xl">
            <span className="text-[28px]">🎉</span>
          </div>
          <h2 className="text-white font-black text-[26px] mb-3 leading-[1.3]">
            등록 완료!<br />확인 메일을 보냈어요.
          </h2>
          <p className="text-white/75 text-[14px] leading-[1.7] mb-8">
            <span className="text-white font-bold">{email}</span> 으로<br />
            사전등록 확인 이메일을 발송했습니다.<br />
            <span className="text-white font-bold">24시간 내</span> 담당자가 연락드립니다.
          </p>

          {/* 넥스트 스텝 3단계 */}
          <div className="bg-white/12 border border-white/20 rounded-2xl p-5 text-left space-y-4">
            <p className="text-white/60 text-[11px] font-bold uppercase tracking-wider mb-2">다음 단계</p>
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
      {/* 긴박감 배너 — 민트/연두 컬러 */}
      <div className="bg-[#00C896] px-6 py-4">
        <div className="flex items-center gap-2 mb-1">
          <Flame className="w-4 h-4 text-white flex-shrink-0" />
          <p className="text-white font-black text-[15px]">선착순 초기 파트너 가게 모집 중</p>
        </div>
        <p className="text-white/80 text-[12px] font-medium">
          초기 등록 가게에는 <span className="text-white font-bold">2만원 상당 포인트</span>를 무상으로 드립니다 · 현재 마감 임박
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

          {/* 넥스트 스텝 안내 */}
          <div className="flex items-center gap-2 bg-white/12 border border-white/20 rounded-xl px-3 py-2.5 mb-8">
            <MessageCircle className="w-4 h-4 text-[#a8b3ff] flex-shrink-0" />
            <p className="text-white/85 text-[12px] leading-[1.4]">
              등록 완료 후 <span className="font-bold text-white">24시간 내</span> 담당자가 카카오톡 또는 전화로 연락드립니다
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* 상호명 */}
            <div>
              <label className="block text-[12px] font-bold text-white/70 mb-2">상호명</label>
              <input
                type="text" required value={storeName} onChange={e => setStoreName(e.target.value)}
                placeholder="예: 마포 정육식당"
                className="w-full px-4 py-4 bg-white rounded-2xl text-[#191F28] text-[15px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/60"
              />
            </div>

            {/* 연락처 */}
            <div>
              <label className="block text-[12px] font-bold text-white/70 mb-2">연락처</label>
              <input
                type="tel" required value={contact} onChange={e => setContact(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full px-4 py-4 bg-white rounded-2xl text-[#191F28] text-[15px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/60"
              />
            </div>

            {/* 이메일 — 신규 추가 */}
            <div>
              <label className="block text-[12px] font-bold text-white/70 mb-2">
                이메일
                <span className="ml-1.5 text-[#a8b3ff] font-normal">(확인 메일을 보내드립니다)</span>
              </label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full px-4 py-4 bg-white rounded-2xl text-[#191F28] text-[15px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/60"
              />
            </div>

            {/* 업종 */}
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

            {/* 에러 메시지 */}
            {error && (
              <div className="bg-red-500/20 border border-red-400/30 rounded-xl px-4 py-3">
                <p className="text-red-200 text-[13px] font-medium">{error}</p>
              </div>
            )}

            {/* CTA 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-white text-[#5b5bd6] rounded-2xl font-black text-[16px] shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#5b5bd6]/30 border-t-[#5b5bd6] rounded-full animate-spin" />
                  등록 중...
                </>
              ) : (
                <>무료 등록하기 <ArrowRight className="w-5 h-5" /></>
              )}
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
                  <a href="#" className="underline underline-offset-2">개인정보처리방침</a> 및{" "}
                  <a href="#" className="underline underline-offset-2">이용약관</a>
                </p>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
