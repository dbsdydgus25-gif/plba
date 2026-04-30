"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-[#FF4D6D]/10 p-4 rounded-full mb-6">
        <AlertCircle className="w-12 h-12 text-[#FF4D6D]" />
      </div>
      <h2 className="text-2xl font-bold text-[#1A1A24] mb-2">서버 통신 오류가 발생했습니다</h2>
      <p className="text-[#8888A0] mb-8 max-w-md">
        환경 변수 설정이 올바르지 않거나 (예: Supabase URL 등), 데이터베이스에 연결할 수 없습니다.
        <br/><br/>
        <span className="text-xs font-mono text-[#FF4D6D] break-all">
          {error.message || "Unknown error"}
        </span>
      </p>
      
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-[#5B5BD6] text-white font-bold rounded-xl hover:bg-[#5B5BD6]/80 transition-colors"
      >
        다시 시도하기
      </button>
    </div>
  );
}
