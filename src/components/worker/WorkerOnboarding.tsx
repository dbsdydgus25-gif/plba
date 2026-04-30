"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, QrCode } from "lucide-react";
import toast from "react-hot-toast";

export default function WorkerOnboarding() {
  const router = useRouter();
  const supabase = createClient();
  const [inviteCode, setInviteCode] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleJoinStore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteCode.length !== 6) {
      toast.error("6자리 초대 코드를 입력해주세요.");
      return;
    }

    startTransition(async () => {
      // 1. 초대 코드로 매장 찾기
      const { data: store, error: storeError } = await supabase
        .from("stores")
        .select("id, name")
        .eq("invite_code", inviteCode.toUpperCase())
        .single();

      if (storeError || !store) {
        toast.error("유효하지 않은 초대 코드입니다.");
        return;
      }

      // 2. 현재 로그인한 유저 ID 가져오기
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("로그인이 필요합니다.");
        return;
      }

      // 3. 매장 멤버로 등록 (pending 상태)
      const { error: joinError } = await supabase
        .from("store_members")
        .insert({
          store_id: store.id,
          user_id: user.id,
          status: "pending", // 점주 승인 대기
        });

      if (joinError) {
        if (joinError.code === "23505") { // unique violation
          toast.error("이미 등록 요청된 매장입니다.");
        } else {
          toast.error("등록 요청 중 오류가 발생했습니다.");
        }
        return;
      }

      toast.success(`${store.name} 매장에 등록 요청되었습니다! 점주의 승인을 기다려주세요.`);
      // 온보딩 완료 시 페이지 새로고침하여 대시보드 상태 업데이트
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 animate-fade-in">
      <div className="w-16 h-16 bg-brand/20 rounded-full flex items-center justify-center mb-6 text-brand">
        <QrCode className="w-8 h-8" />
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-2">
        아직 소속된 매장이 없어요
      </h2>
      <p className="text-text-secondary text-center mb-8">
        점주님께 받은 6자리 초대 코드를 입력하고<br />알바를 시작해보세요.
      </p>

      <form onSubmit={handleJoinStore} className="w-full max-w-sm flex flex-col gap-4">
        <div className="input-group">
          <input
            type="text"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
            placeholder="초대 코드 6자리 입력"
            className="input text-center text-xl font-bold tracking-widest uppercase"
            maxLength={6}
          />
        </div>
        
        <button
          type="submit"
          disabled={isPending || inviteCode.length !== 6}
          className="btn btn-primary btn-full text-lg"
        >
          {isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : "매장 등록하기"}
        </button>
      </form>

      <div className="divider w-full max-w-sm my-8 relative">
        <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-bg-base px-4 text-sm text-text-muted">
          또는
        </span>
      </div>

      <button className="btn btn-outline btn-full max-w-sm">
        내 주변 꿀알바 캠페인 먼저 둘러보기
      </button>
    </div>
  );
}
