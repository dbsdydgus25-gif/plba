import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Wallet, Clock, CheckCircle } from "lucide-react";
import WithdrawalForm from "./WithdrawalForm";

export default async function WorkerRewardsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // 1. 승인된 리워드 (전체 누적)
  const { data: approvedRewards } = await supabase
    .from("reward_logs")
    .select("reward_amount")
    .eq("user_id", user.id)
    .eq("status", "approved");

  const totalApproved = approvedRewards?.reduce((sum, row) => sum + row.reward_amount, 0) || 0;

  // 2. 대기 중인 리워드 (승인 대기)
  const { data: pendingRewards } = await supabase
    .from("reward_logs")
    .select("reward_amount")
    .eq("user_id", user.id)
    .eq("status", "pending");

  const totalPending = pendingRewards?.reduce((sum, row) => sum + row.reward_amount, 0) || 0;

  // 3. 출금(신청 포함)된 리워드
  const { data: withdrawals } = await supabase
    .from("withdrawal_requests")
    .select("amount, status")
    .eq("user_id", user.id)
    .neq("status", "rejected"); // 승인됨 + 대기중 모두 포함

  const totalWithdrawn = withdrawals?.reduce((sum, row) => sum + row.amount, 0) || 0;
  
  // 4. 출금 가능 리워드
  const withdrawableAmount = totalApproved - totalWithdrawn;

  // 5. 최근 출금 내역
  const { data: recentWithdrawals } = await supabase
    .from("withdrawal_requests")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#FFFFFF] text-[#1A1A24]">
      {/* 헤더 */}
      <div className="px-5 pt-14 pb-5 border-b border-white/5 flex items-center gap-3 sticky top-0 bg-[#FFFFFF]/80 backdrop-blur-md z-10">
        <Link href="/worker" className="p-2 -ml-2 text-[#8888A0] hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">리워드 정산</h1>
      </div>

      <div className="flex-1 px-5 py-6 flex flex-col gap-8 pb-28">
        
        {/* 잔액 카드 */}
        <div className="bg-gradient-to-br from-[#00C896]/20 to-[#5B5BD6]/10 border border-[#00C896]/30 rounded-3xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(0,200,150,0.1)]">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-[#00C896] mb-2">
              <Wallet className="w-5 h-5" />
              <span className="font-semibold text-sm">출금 가능 리워드</span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-4xl font-black font-inter text-white">
                {withdrawableAmount.toLocaleString()}
              </span>
              <span className="text-lg font-bold text-[#8888A0]">원</span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Wallet className="w-32 h-32" />
          </div>
        </div>

        {/* 요약 상태 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#F8F9FA] rounded-2xl p-4 flex flex-col gap-1 border border-white/5">
            <span className="text-xs text-[#8888A0] flex items-center gap-1">
              <Clock className="w-3 h-3" /> 승인 대기
            </span>
            <span className="font-bold text-[#1A1A24]">{totalPending.toLocaleString()}원</span>
          </div>
          <div className="bg-[#F8F9FA] rounded-2xl p-4 flex flex-col gap-1 border border-white/5">
            <span className="text-xs text-[#8888A0] flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> 누적 획득
            </span>
            <span className="font-bold text-[#1A1A24]">{totalApproved.toLocaleString()}원</span>
          </div>
        </div>

        {/* 출금 폼 */}
        <div className="mt-2">
          <h2 className="text-lg font-bold mb-4">내 계좌로 출금하기</h2>
          <WithdrawalForm withdrawableAmount={withdrawableAmount} />
        </div>

        {/* 최근 내역 */}
        {recentWithdrawals && recentWithdrawals.length > 0 && (
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-[#8888A0] mb-4">최근 출금 신청 내역</h2>
            <div className="flex flex-col gap-3">
              {recentWithdrawals.map(req => (
                <div key={req.id} className="bg-[#F8F9FA] rounded-2xl p-4 flex flex-col gap-2 border border-white/5">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#1A1A24]">{req.amount.toLocaleString()}원</span>
                    <span className={`text-xs px-2 py-1 rounded-md font-bold ${
                      req.status === 'pending' ? 'bg-[#FFB830]/10 text-[#FFB830]' :
                      req.status === 'approved' ? 'bg-[#00C896]/10 text-[#00C896]' :
                      'bg-[#FF4D6D]/10 text-[#FF4D6D]'
                    }`}>
                      {req.status === 'pending' ? '입금 대기' :
                       req.status === 'approved' ? '입금 완료' : '반려됨'}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-[#8888A0]">
                    <span>{req.bank_name} {req.account_number}</span>
                    <span>{new Date(req.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
