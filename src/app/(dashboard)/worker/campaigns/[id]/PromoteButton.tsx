"use client";

import { useState, useTransition } from "react";
import { QRCodeSVG } from "qrcode.react";
import { generatePromotionCode } from "../actions";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function PromoteButton({ campaignId }: { campaignId: string }) {
  const [isPending, startTransition] = useTransition();
  const [trackingCode, setTrackingCode] = useState<string | null>(null);

  const handleGenerate = () => {
    startTransition(async () => {
      const result = await generatePromotionCode(campaignId);
      if (result.success && result.trackingCode) {
        setTrackingCode(result.trackingCode);
        toast.success("홍보용 QR 및 코드가 발급되었습니다!");
      } else {
        toast.error(result.error || "발급 실패");
      }
    });
  };

  if (trackingCode) {
    return (
      <div className="flex flex-col items-center gap-6 mt-6 animate-fade-in pb-10">
        <div className="text-center">
          <p className="text-[#00C896] font-bold text-lg mb-1">발급 완료!</p>
          <p className="text-[#8888A0] text-sm">손님에게 아래 화면이나 코드를 보여주세요.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl">
          <QRCodeSVG
            value={trackingCode}
            size={200}
            bgColor={"#ffffff"}
            fgColor={"#F8F9FA"}
            level={"H"}
            includeMargin={false}
          />
        </div>

        <div className="flex flex-col items-center">
          <p className="text-[#8888A0] text-sm mb-2">또는 고유 확인 코드</p>
          <div className="bg-[#F8F9FA] border border-white/10 px-6 py-3 rounded-2xl">
            <span className="text-3xl font-black tracking-[0.2em] text-[#1A1A24]">
              {trackingCode}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-5 bg-[#FFFFFF] border-t border-white/5 pb-safe z-20">
      <button
        onClick={handleGenerate}
        disabled={isPending}
        className="w-full rounded-2xl bg-[#5B5BD6] text-white font-bold py-4 text-lg flex justify-center items-center"
      >
        {isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : "홍보 QR 발급받기"}
      </button>
    </div>
  );
}
