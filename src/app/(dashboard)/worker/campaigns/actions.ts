"use server";

import { createClient } from "@/lib/supabase/server";

function generateTrackingCode() {
  // 6자리 영문+숫자 혼합 (대문자)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function generatePromotionCode(campaignId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  // 1. 캠페인 정보 조회 (유효한지 확인)
  const { data: campaign } = await supabase
    .from("campaigns")
    .select("store_id, reward_amount, status")
    .eq("id", campaignId)
    .single();

  if (!campaign || campaign.status !== "active") {
    return { success: false, error: "유효하지 않거나 종료된 캠페인입니다." };
  }

  // 2. 고유 트래킹 코드 생성
  const trackingCode = generateTrackingCode();

  // 3. reward_logs 에 pending 상태로 등록
  const { data: rewardLog, error: insertErr } = await supabase
    .from("reward_logs")
    .insert({
      campaign_id: campaignId,
      user_id: user.id,
      store_id: campaign.store_id,
      reward_amount: campaign.reward_amount,
      status: "pending",
      tracking_code: trackingCode
    })
    .select()
    .single();

  if (insertErr) {
    console.error(insertErr);
    return { success: false, error: "홍보 코드 발급에 실패했습니다." };
  }

  return { success: true, trackingCode };
}
