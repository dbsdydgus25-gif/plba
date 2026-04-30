"use client";

import { useTransition } from "react";
import { processWithdrawal } from "./actions";
import toast from "react-hot-toast";

interface Props {
  requestId: string;
}

export default function WithdrawalActionButtons({ requestId }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleAction = (action: "approve" | "reject") => {
    if (!confirm(`정말로 ${action === "approve" ? "승인" : "반려"}하시겠습니까?`)) {
      return;
    }

    startTransition(async () => {
      const result = await processWithdrawal(requestId, action);
      
      if (result.success) {
        toast.success(`처리되었습니다.`);
        window.location.reload();
      } else {
        toast.error(result.error || "처리 실패");
      }
    });
  };

  return (
    <div className="flex gap-2 mt-3">
      <button
        onClick={() => handleAction("approve")}
        disabled={isPending}
        className="flex-1 py-2 bg-[#00C896]/20 text-[#00C896] rounded-lg text-sm font-bold disabled:opacity-50"
      >
        승인 (지급완료)
      </button>
      <button
        onClick={() => handleAction("reject")}
        disabled={isPending}
        className="flex-1 py-2 bg-[#FF4D6D]/20 text-[#FF4D6D] rounded-lg text-sm font-bold disabled:opacity-50"
      >
        반려
      </button>
    </div>
  );
}
