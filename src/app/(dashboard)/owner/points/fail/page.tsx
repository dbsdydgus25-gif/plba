import Link from "next/link";
import { XCircle } from "lucide-react";

export default function PaymentFailPage({
  searchParams,
}: {
  searchParams: { code: string; message: string; orderId: string };
}) {
  const { message } = searchParams;

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#FFFFFF] text-[#1A1A24] items-center justify-center p-6">
      <div className="flex flex-col items-center text-center animate-fade-in">
        <div className="w-20 h-20 bg-[#FF4D6D]/20 rounded-full flex items-center justify-center mb-6 text-[#FF4D6D]">
          <XCircle className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold mb-2">결제가 취소되었거나 실패했습니다.</h1>
        <p className="text-[#8888A0] mb-8 max-w-xs break-keep">
          {message || "사용자가 결제를 취소하셨거나, 처리 중 오류가 발생했습니다."}
        </p>
        <Link href="/owner/points" className="w-full max-w-sm rounded-2xl bg-[#F8F9FA] border border-white/10 text-white font-bold py-4 text-lg">
          다시 충전하기
        </Link>
      </div>
    </div>
  );
}
