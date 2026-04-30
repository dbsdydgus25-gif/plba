"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRole } from "@/types";
import { Store, User, Loader2, ArrowRight } from "lucide-react";
import Image from "next/image";

type Step = "role" | "social";

export default function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState<string | null>(null);

  // 1. 역할 선택 핸들러
  const handleSelectRole = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep("social");
  };

  // 2. 소셜 로그인 핸들러 (UI용 가짜 액션)
  const handleSocialLogin = (provider: string) => {
    setIsLoading(provider);
    
    // 임시로 역할에 맞는 대시보드로 이동
    setTimeout(() => {
      if (role === "owner") {
        router.push("/admin"); // owner dashboard
      } else {
        router.push("/worker"); // worker dashboard
      }
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-in">
      {/* 헤더 타이틀 */}
      <div className="flex flex-col gap-2 mb-2 text-center">
        {step === "role" && (
          <>
            <h1 className="text-2xl font-bold text-black">누구신가요?</h1>
            <p className="text-sm text-gray-600">가입하실 계정 유형을 선택해주세요.</p>
          </>
        )}
        {step === "social" && (
          <>
            <h1 className="text-2xl font-bold text-black">간편 로그인</h1>
            <p className="text-sm text-gray-600">
              {role === "owner" ? "점주(사업자)님, 환영합니다!" : "알바생님, 환영합니다!"}
            </p>
          </>
        )}
      </div>

      <div className="w-full">
        {/* Step 1: 역할 선택 */}
        {step === "role" && (
          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleSelectRole("worker")}
              className="w-full p-6 bg-white border border-border-default rounded-[24px] shadow-sm text-left transition-all active:scale-[0.98] hover:border-brand hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-1">알바생 (개인)</h3>
                    <p className="text-sm text-gray-400">무료 근태관리와 꿀알바 찾기</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>

            <button
              onClick={() => handleSelectRole("owner")}
              className="w-full p-6 bg-white border border-border-default rounded-[24px] shadow-sm text-left transition-all active:scale-[0.98] hover:border-mint hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-mint/10 flex items-center justify-center text-mint">
                    <Store className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-1">점주 (사업자)</h3>
                    <p className="text-sm text-gray-400">매장 관리와 리워드 마케팅</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          </div>
        )}

        {/* Step 2: 소셜 로그인 버튼 */}
        {step === "social" && (
          <div className="flex flex-col gap-4 animate-slide-up">
            <button
              onClick={() => handleSocialLogin("kakao")}
              disabled={isLoading !== null}
              className="relative w-full flex items-center justify-center gap-3 py-4 bg-[#FEE500] hover:bg-[#FDD800] text-[#000000] text-lg font-semibold rounded-[20px] transition-transform active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
            >
              {isLoading === "kakao" ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C6.477 3 2 6.425 2 10.648c0 2.72 1.838 5.111 4.545 6.423-.19.704-.687 2.544-.72 2.684-.04.168.057.162.115.124.08-.052 2.822-1.92 3.936-2.673.682.096 1.393.146 2.124.146 5.523 0 10-3.425 10-7.648C22 6.425 17.523 3 12 3z"/>
                  </svg>
                  카카오로 시작하기
                </>
              )}
            </button>

            <button
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading !== null}
              className="relative w-full flex items-center justify-center gap-3 py-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 text-lg font-semibold rounded-[20px] shadow-sm transition-transform active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
            >
              {isLoading === "google" ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  구글로 시작하기
                </>
              )}
            </button>

            <button
              onClick={() => setStep("role")}
              className="mt-6 text-sm text-gray-400 hover:text-black text-center underline underline-offset-4"
            >
              역할 다시 선택하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
