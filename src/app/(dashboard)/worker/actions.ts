"use server";

import { createClient } from "@/lib/supabase/server";

export async function processClockIn(qrPayload: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  try {
    const data = JSON.parse(qrPayload);
    
    if (data.type !== "attendance" || !data.storeId) {
      return { success: false, error: "유효하지 않은 QR 코드입니다." };
    }

    // 1. 해당 매장의 활성 멤버인지 확인
    const { data: membership } = await supabase
      .from("store_members")
      .select("status")
      .eq("user_id", user.id)
      .eq("store_id", data.storeId)
      .eq("status", "active")
      .maybeSingle();

    if (!membership) {
      return { success: false, error: "해당 매장의 알바생으로 등록되어 있지 않습니다." };
    }

    // 2. 이미 출근 중인지 확인 (clock_out_at 이 null 인 기록)
    const { data: currentLog } = await supabase
      .from("work_logs")
      .select("id")
      .eq("user_id", user.id)
      .eq("store_id", data.storeId)
      .is("clock_out_at", null)
      .maybeSingle();

    if (currentLog) {
      return { success: false, error: "이미 출근 처리되어 근무 중입니다." };
    }

    // 3. 출근 기록 생성
    const { error: insertErr } = await supabase
      .from("work_logs")
      .insert({
        user_id: user.id,
        store_id: data.storeId,
        clock_in_at: new Date().toISOString(),
      });

    if (insertErr) {
      console.error(insertErr);
      return { success: false, error: "출근 기록에 실패했습니다." };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: "QR 코드를 인식할 수 없습니다." };
  }
}

export async function processClockOut() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  // 1. 현재 출근 중인 기록 찾기
  const { data: currentLog } = await supabase
    .from("work_logs")
    .select("id, store_id, clock_in_at, stores(hourly_wage)")
    .eq("user_id", user.id)
    .is("clock_out_at", null)
    .maybeSingle();

  if (!currentLog) {
    return { success: false, error: "출근 기록을 찾을 수 없습니다." };
  }

  const clockOutAt = new Date();
  const clockInAt = new Date(currentLog.clock_in_at);
  const diffMs = clockOutAt.getTime() - clockInAt.getTime();
  
  // @ts-ignore
  const hourlyWage = currentLog.stores.hourly_wage;
  const calculatedWage = Math.floor((diffMs / (1000 * 60 * 60)) * hourlyWage);

  // 2. 퇴근 기록 업데이트 (급여 계산 포함)
  const { error: updateErr } = await supabase
    .from("work_logs")
    .update({
      clock_out_at: clockOutAt.toISOString(),
      calculated_wage: calculatedWage > 0 ? calculatedWage : 0,
      status: "completed",
    })
    .eq("id", currentLog.id);

  if (updateErr) {
    console.error(updateErr);
    return { success: false, error: "퇴근 처리에 실패했습니다." };
  }

  return { success: true };
}
