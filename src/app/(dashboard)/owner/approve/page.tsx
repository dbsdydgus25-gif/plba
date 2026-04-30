"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface RewardInfo {
  id: string;
  campaign: { title: string; menu_name: string | null };
  reward_amount: number;
  user: { name: string };
  tracking_code: string;
}

export default function ApprovePage() {
  const router = useRouter();
  const supabase = createClient();
  const [isPending, startTransition] = useTransition();

  const [code, setCode] = useState("");
  const [rewardInfo, setRewardInfo] = useState<RewardInfo | null>(null);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setRewardInfo(null);

    const { data, error: fetchErr } = await supabase
      .from("reward_logs")
      .select(`
        id, reward_amount, tracking_code,
        campaigns(title, menu_name),
        users(name)
      `)
      .eq("tracking_code", code.trim())
      .eq("status", "pending")
      .single();

    if (fetchErr || !data) {
      setError("유효하지 않은 코드이거나 이미 처리된 건입니다.");
      return;
    }

    setRewardInfo({
      id: data.id,
      campaign: data.campaigns as any,
      reward_amount: data.reward_amount,
      user: data.users as any,
      tracking_code: data.tracking_code,
    });
  };

  const handleApprove = () => {
    if (!rewardInfo) return;
    startTransition(async () => {
      const { error: updateErr } = await supabase
        .from("reward_logs")
        .update({ status: "approved", approved_at: new Date().toISOString() })
        .eq("id", rewardInfo.id);

      if (updateErr) {
        setError("승인 처리 중 오류가 발생했습니다: " + updateErr.message);
        return;
      }
      setDone(true);
    });
  };

  if (done) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center px-5 gap-6">
        <span className="text-7xl">✅</span>
        <h2 className="text-2xl font-bold text-[#1A1A24]">승인 완료!</h2>
        <p className="text-[#8888A0] text-center">
          {rewardInfo?.user?.name}님의 리워드<br />
          <span className="text-[#00C896] font-bold">{rewardInfo?.reward_amount.toLocaleString()}원</span>이 확정되었습니다.
        </p>
        <button
          onClick={() => { setDone(false); setCode(""); setRewardInfo(null); }}
          className="w-full rounded-2xl bg-[#5B5BD6] text-white text-lg font-bold py-4 mt-4"
        >
          다음 승인하기
        </button>
        <button onClick={() => router.back()} className="text-sm text-[#8888A0]">
          대시보드로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1A1A24] flex flex-col">
      {/* 헤더 */}
      <div className="px-5 pt-14 pb-5 border-b border-white/5">
        <button onClick={() => router.back()} className="text-[#8888A0] text-sm mb-3 flex items-center gap-1">
          ← 뒤로
        </button>
        <h1 className="text-xl font-bold">리워드 승인</h1>
      </div>

      <div className="flex-1 flex flex-col px-5 py-6 gap-5">
        {/* 코드 입력 */}
        <form onSubmit={handleSearch} className="flex flex-col gap-3">
          <label className="text-sm text-[#8888A0]">추적 코드 또는 QR 입력</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="코드를 입력하세요"
            className="w-full bg-[#F8F9FA] border border-white/10 rounded-xl px-4 py-3 text-[#1A1A24] text-base focus:outline-none focus:border-[#5B5BD6]"
          />
          {error && <p className="text-[#FF4D6D] text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-[#F8F9FA] border border-[#5B5BD6] text-[#5B5BD6] font-semibold py-3"
          >
            코드 확인
          </button>
        </form>

        {/* 승인 정보 표시 */}
        {rewardInfo && (
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl bg-[#F8F9FA] border border-white/10 p-5 flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#8888A0]">알바생</span>
                <span className="font-semibold">{rewardInfo.user?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#8888A0]">캠페인</span>
                <span className="font-semibold">{rewardInfo.campaign?.title}</span>
              </div>
              {rewardInfo.campaign?.menu_name && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#8888A0]">메뉴</span>
                  <span className="font-semibold">{rewardInfo.campaign.menu_name}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#8888A0] text-sm">리워드 금액</span>
                <span className="text-[#00C896] font-bold text-xl">
                  {rewardInfo.reward_amount.toLocaleString()}원
                </span>
              </div>
            </div>

            {/* 승인 버튼 - 화면 1/3 높이 */}
            <button
              onClick={handleApprove}
              disabled={isPending}
              className="w-full rounded-2xl bg-[#5B5BD6] text-white flex items-center justify-center"
              style={{ minHeight: "33dvh", fontSize: "28px", fontWeight: 900 }}
            >
              {isPending ? "처리 중..." : "✅  승인 완료"}
            </button>

            <button
              onClick={() => {
                startTransition(async () => {
                  await supabase.from("reward_logs").update({ status: "rejected" }).eq("id", rewardInfo.id);
                  setCode(""); setRewardInfo(null);
                });
              }}
              className="w-full rounded-xl border border-[#FF4D6D]/30 text-[#FF4D6D] py-3 text-sm font-medium"
            >
              거절하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
