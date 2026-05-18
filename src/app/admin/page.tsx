"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "로그인에 실패했습니다.");
        return;
      }

      // 성공 → 대시보드로 이동
      router.push("/admin/dashboard");
    } catch {
      setError("서버 연결에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0F14] flex items-center justify-center px-6">
      <div className="w-full max-w-[380px]">
        {/* 로고 */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-[#5b5bd6] flex items-center justify-center mx-auto mb-4 shadow-xl shadow-[#5b5bd6]/30">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-white font-black text-[24px] tracking-tight">플바 어드민</h1>
          <p className="text-white/40 text-[13px] mt-1">관리자 전용 페이지입니다</p>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              autoComplete="current-password"
              className="w-full bg-white/8 border border-white/12 rounded-2xl px-5 py-4 text-white text-[15px] placeholder:text-white/30 focus:outline-none focus:border-[#5b5bd6] focus:bg-white/10 transition-all pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-[13px] font-medium px-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-4 bg-[#5b5bd6] text-white rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "로그인"}
          </button>
        </form>

        <p className="text-center text-white/20 text-[11px] mt-8">
          비밀번호는 .env.local의 ADMIN_PASSWORD_HASH로 관리됩니다
        </p>
      </div>
    </div>
  );
}
