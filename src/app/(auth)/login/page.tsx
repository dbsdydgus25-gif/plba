"use client";

import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
        
        <div className="flex justify-center mb-8">
          <Image 
            src="/logo.png" 
            alt="plba 로고" 
            width={160} 
            height={50} 
            className="h-12 w-auto object-contain"
          />
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">환영합니다!</h2>
        <p className="text-center text-gray-500 mb-8">로그인하고 단골가게 홍보를 시작하세요.</p>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">이메일</label>
            <input 
              type="email" 
              placeholder="example@plusalba.com" 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B5BD6] focus:bg-white transition-all"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-gray-700">비밀번호</label>
              <Link href="#" className="text-sm text-[#5B5BD6] hover:underline">비밀번호 찾기</Link>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B5BD6] focus:bg-white transition-all"
            />
          </div>

          <button 
            type="button"
            className="w-full py-4 mt-2 bg-[#5B5BD6] hover:bg-[#4646C0] text-white rounded-xl font-bold text-lg transition-colors shadow-lg shadow-[#5B5BD6]/20"
          >
            로그인
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-500">
            아직 계정이 없으신가요?{" "}
            <Link href="/login" className="text-[#5B5BD6] font-bold hover:underline">
              3초만에 회원가입
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  );
}
