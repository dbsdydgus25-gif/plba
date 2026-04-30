"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createCampaign } from "../actions";
import { ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function NewCampaignPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createCampaign(formData);
      
      if (result.success) {
        toast.success("캠페인이 생성되었습니다.");
        router.push("/owner/campaigns");
        router.refresh();
      } else {
        toast.error(result.error || "생성 실패");
        if (result.needsRecharge) {
          router.push("/owner/points");
        }
      }
    });
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#FFFFFF] text-[#1A1A24]">
      {/* 헤더 */}
      <div className="px-5 pt-14 pb-5 border-b border-white/5 flex items-center gap-3 sticky top-0 bg-[#FFFFFF] z-10">
        <Link href="/owner/campaigns" className="p-2 -ml-2 text-[#8888A0] hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">새 캠페인 만들기</h1>
      </div>

      <div className="flex-1 px-5 py-6 pb-32">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm text-[#8888A0]">캠페인 제목 *</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="예: 인스타그램 스토리 인증"
              className="bg-[#F8F9FA] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#5B5BD6]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm text-[#8888A0]">상세 설명</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="조건을 상세히 적어주세요."
              className="bg-[#F8F9FA] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#5B5BD6] resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="menu_name" className="text-sm text-[#8888A0]">보상 메뉴명 (옵션)</label>
            <input
              type="text"
              id="menu_name"
              name="menu_name"
              placeholder="예: 아메리카노 1잔"
              className="bg-[#F8F9FA] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#5B5BD6]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="reward_amount" className="text-sm text-[#8888A0]">건당 리워드 *</label>
              <div className="relative">
                <input
                  type="number"
                  id="reward_amount"
                  name="reward_amount"
                  required
                  min="100"
                  placeholder="1000"
                  className="w-full bg-[#F8F9FA] border border-white/10 rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:border-[#5B5BD6]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888A0]">원</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="total_budget_count" className="text-sm text-[#8888A0]">목표 건수 *</label>
              <div className="relative">
                <input
                  type="number"
                  id="total_budget_count"
                  name="total_budget_count"
                  required
                  min="1"
                  placeholder="10"
                  className="w-full bg-[#F8F9FA] border border-white/10 rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:border-[#5B5BD6]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888A0]">건</span>
              </div>
            </div>
          </div>

          {/* 타겟 설정 (간단히) */}
          <div className="p-4 bg-[#F8F9FA] rounded-2xl border border-white/5 mt-2">
            <h3 className="text-sm font-semibold mb-4 text-[#1A1A24]">타겟 설정 (선택)</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <label className="text-sm text-[#8888A0] w-12">성별</label>
                <select name="target_gender" className="flex-1 bg-transparent border border-white/10 rounded-lg px-3 py-2 text-sm text-[#1A1A24] focus:outline-none">
                  <option value="all" className="bg-[#F8F9FA]">제한없음</option>
                  <option value="female" className="bg-[#F8F9FA]">여성</option>
                  <option value="male" className="bg-[#F8F9FA]">남성</option>
                </select>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-5 bg-[#FFFFFF] border-t border-white/5 pb-safe">
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-2xl bg-[#5B5BD6] text-white font-bold py-4 text-lg flex justify-center items-center"
            >
              {isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : "캠페인 만들기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
