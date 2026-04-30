"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import QRScanner from "@/components/worker/QRScanner";
import { processClockOut } from "../actions";
import { ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ClockOutPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [hasScanned, setHasScanned] = useState(false);

  const handleScanSuccess = (decodedText: string) => {
    if (hasScanned) return;
    setHasScanned(true);

    startTransition(async () => {
      // 퇴근 처리는 서버 액션을 호출 (프로세스 내부에서 현재 출근 상태 확인)
      // 실제로는 QR에 담긴 정보를 검증하여 같은 매장인지 확인할 수 있음
      const result = await processClockOut();
      
      if (result.success) {
        toast.success("퇴근 처리되었습니다. 고생하셨습니다!");
        // 대시보드로 이동하고 데이터 갱신
        router.push("/worker");
        router.refresh();
      } else {
        toast.error(result.error || "퇴근 처리에 실패했습니다.");
        setHasScanned(false);
      }
    });
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#FFFFFF] text-[#1A1A24]">
      {/* 헤더 */}
      <div className="px-5 pt-14 pb-5 border-b border-white/5 flex items-center gap-3">
        <Link href="/worker" className="p-2 -ml-2 text-[#8888A0] hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">퇴근하기</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">QR 코드를 스캔해주세요</h2>
          <p className="text-[#8888A0] text-sm">
            퇴근 처리를 위해 점주님의 출퇴근용<br />QR 코드를 다시 한번 스캔해주세요.
          </p>
        </div>

        <div className="w-full max-w-sm relative">
          {isPending && (
            <div className="absolute inset-0 z-20 bg-black/60 flex flex-col items-center justify-center rounded-2xl backdrop-blur-sm">
              <Loader2 className="w-10 h-10 text-[#5B5BD6] animate-spin mb-4" />
              <p className="font-semibold">퇴근 처리 중...</p>
            </div>
          )}
          <QRScanner onScanSuccess={handleScanSuccess} />
        </div>
      </div>
    </div>
  );
}
