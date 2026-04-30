"use server";

import { createClient } from "@/lib/supabase/server";

export async function processWithdrawal(requestId: string, action: "approve" | "reject") {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  // 어드민 권한 재확인
  const { data: userData } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (userData?.role !== "admin") {
    return { success: false, error: "권한이 없습니다." };
  }

  const newStatus = action === "approve" ? "approved" : "rejected";

  const { error } = await supabase
    .from("withdrawal_requests")
    .update({ status: newStatus })
    .eq("id", requestId);

  if (error) {
    console.error(error);
    return { success: false, error: "처리 중 오류가 발생했습니다." };
  }

  return { success: true };
}
