"use client";

import { useState, useTransition } from "react";
import { requestWithdrawal } from "./actions";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface WithdrawalFormProps {
  withdrawableAmount: number;
}

export default function WithdrawalForm({ withdrawableAmount }: WithdrawalFormProps) {
  const [isPending, startTransition] = useTransition();
  const [amount, setAmount] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (amount === "" || amount < 10000) {
      toast.error("최소 10,000원부터 출금할 수 있습니다.");
      return;
    }
    if (amount > withdrawableAmount) {
      toast.error("출금 가능 금액을 초과했습니다.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await requestWithdrawal(formData);
      
      if (result.success) {
        toast.success("출금 신청이 완료되었습니다.");
        setAmount("");
        // router.refresh() will be called implicitly if needed, or window.location.reload()
        window.location.reload(); // 단순화를 위해 리로드
      } else {
        toast.error(result.error || "출금 신청 실패");
      }
    });
  };

  const handleMaxAmount = () => {
    setAmount(withdrawableAmount);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#F8F9FA] rounded-3xl p-5 border border-white/5 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-sm font-semibold text-[#8888A0]">출금할 금액</label>
        <div className="relative">
          <input
            type="number"
            id="amount"
            name="amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
            placeholder="10,000"
            className="w-full bg-[#FFFFFF] border border-white/10 rounded-xl pl-4 pr-16 py-3 font-bold text-lg focus:outline-none focus:border-[#00C896] text-[#1A1A24]"
          />
          <span className="absolute right-14 top-1/2 -translate-y-1/2 text-[#8888A0]">원</span>
          <button
            type="button"
            onClick={handleMaxAmount}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#00C896] bg-[#00C896]/10 px-2 py-1 rounded"
          >
            전액
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-1 flex flex-col gap-2">
          <label htmlFor="bank_name" className="text-sm font-semibold text-[#8888A0]">은행</label>
          <select
            id="bank_name"
            name="bank_name"
            required
            className="w-full bg-[#FFFFFF] border border-white/10 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-[#00C896] text-[#1A1A24]"
          >
            <option value="국민은행">국민은행</option>
            <option value="신한은행">신한은행</option>
            <option value="우리은행">우리은행</option>
            <option value="하나은행">하나은행</option>
            <option value="농협은행">농협은행</option>
            <option value="기업은행">기업은행</option>
            <option value="토스뱅크">토스뱅크</option>
            <option value="카카오뱅크">카카오뱅크</option>
            <option value="케이뱅크">케이뱅크</option>
          </select>
        </div>
        
        <div className="col-span-2 flex flex-col gap-2">
          <label htmlFor="account_number" className="text-sm font-semibold text-[#8888A0]">계좌번호</label>
          <input
            type="text"
            id="account_number"
            name="account_number"
            required
            placeholder="- 없이 입력"
            className="w-full bg-[#FFFFFF] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00C896] text-[#1A1A24]"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending || withdrawableAmount < 10000}
        className="w-full rounded-2xl bg-[#00C896] text-[#FFFFFF] font-bold py-4 text-lg flex items-center justify-center mt-2 disabled:opacity-50 disabled:bg-[#F8F9FA] disabled:text-[#8888A0]"
      >
        {isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : "출금 신청하기"}
      </button>
      
      {withdrawableAmount < 10000 && (
        <p className="text-center text-xs text-[#FFB830]">
          잔액이 10,000원 이상일 때 출금 가능합니다.
        </p>
      )}
    </form>
  );
}
