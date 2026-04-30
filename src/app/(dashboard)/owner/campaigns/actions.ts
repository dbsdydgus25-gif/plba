"use server";

import { createClient } from "@/lib/supabase/server";

export async function createCampaign(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  // 점주 매장 확인
  const { data: store } = await supabase
    .from("stores")
    .select("id")
    .eq("owner_id", user.id)
    .single();

  if (!store) {
    return { success: false, error: "매장 정보가 없습니다." };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const targetGender = formData.get("target_gender") as string;
  const targetAgeMin = parseInt(formData.get("target_age_min") as string) || 0;
  const targetAgeMax = parseInt(formData.get("target_age_max") as string) || 99;
  const rewardAmount = parseInt(formData.get("reward_amount") as string);
  const totalBudgetCount = parseInt(formData.get("total_budget_count") as string);
  const menuName = formData.get("menu_name") as string || null;

  if (!title || !rewardAmount || !totalBudgetCount) {
    return { success: false, error: "필수 항목을 모두 입력해주세요." };
  }

  // 1. 점주 포인트 확인 (총 예산 = 보상액 * 목표 건수)
  const totalRequiredPoints = rewardAmount * totalBudgetCount;

  const { data: points } = await supabase
    .from("store_points")
    .select("balance")
    .eq("store_id", store.id)
    .single();

  if (!points || points.balance < totalRequiredPoints) {
    return { 
      success: false, 
      error: `포인트가 부족합니다. (필요: ${totalRequiredPoints.toLocaleString()}P, 현재: ${(points?.balance || 0).toLocaleString()}P)`,
      needsRecharge: true 
    };
  }

  // 2. 캠페인 생성
  const { error: insertErr } = await supabase
    .from("campaigns")
    .insert({
      store_id: store.id,
      title,
      description,
      target_gender: targetGender !== "all" ? targetGender : null,
      target_age_min: targetAgeMin > 0 ? targetAgeMin : null,
      target_age_max: targetAgeMax < 99 ? targetAgeMax : null,
      reward_amount: rewardAmount,
      total_budget_count: totalBudgetCount,
      menu_name: menuName,
      status: "active"
    });

  if (insertErr) {
    console.error(insertErr);
    return { success: false, error: "캠페인 생성 중 오류가 발생했습니다." };
  }

  // (실제 결제/포인트 차감은 트리거 또는 여기서 진행.
  // 이 시스템에서는 reward 승인 시 차감하거나, 생성 시 deposit 개념으로 예약할 수 있음.
  // 기획상 "생성 시 포인트 차감은 아니지만 예산 체크는 필요하다" 혹은 "생성 시 차감"인지 결정.
  // 여기서는 단순 체크만 하고 실제 차감은 리워드 승인 시 한다고 가정)

  return { success: true };
}
