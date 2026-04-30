"use server";

import { createClient } from "@/lib/supabase/server";

export async function requestWithdrawal(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  const amount = parseInt(formData.get("amount") as string);
  const bankName = formData.get("bank_name") as string;
  const accountNumber = formData.get("account_number") as string;

  if (!amount || amount < 10000) {
    return { success: false, error: "최소 출금 금액은 10,000원입니다." };
  }
  if (!bankName || !accountNumber) {
    return { success: false, error: "계좌 정보를 정확히 입력해주세요." };
  }

  // 출금 가능 금액 확인 (여기서는 단순히 approved된 reward_logs의 총합 - 이미 출금된 금액 이지만,
  // users 테이블이나 worker_profiles 테이블에 accumulated_reward, withdrawn_reward 필드가 있다고 가정하거나
  // 매번 쿼리로 계산할 수 있습니다. 여기서는 쿼리로 계산합니다.)

  const { data: approvedRewards } = await supabase
    .from("reward_logs")
    .select("reward_amount")
    .eq("user_id", user.id)
    .eq("status", "approved");

  const totalApproved = approvedRewards?.reduce((sum, row) => sum + row.reward_amount, 0) || 0;

  const { data: withdrawals } = await supabase
    .from("withdrawal_requests")
    .select("amount")
    .eq("user_id", user.id)
    .neq("status", "rejected"); // 승인됨(approved) + 대기중(pending) 모두 출금된(될) 금액으로 간주

  const totalWithdrawn = withdrawals?.reduce((sum, row) => sum + row.amount, 0) || 0;
  const withdrawableAmount = totalApproved - totalWithdrawn;

  if (amount > withdrawableAmount) {
    return { 
      success: false, 
      error: `출금 가능 금액을 초과했습니다. (출금 가능: ${withdrawableAmount.toLocaleString()}원)` 
    };
  }

  // 출금 신청 기록 생성
  const { error: insertErr } = await supabase
    .from("withdrawal_requests")
    .insert({
      user_id: user.id,
      amount: amount,
      bank_name: bankName,
      account_number: accountNumber,
      status: "pending"
    });

  if (insertErr) {
    console.error(insertErr);
    return { success: false, error: "출금 신청 중 오류가 발생했습니다." };
  }

  return { success: true };
}
