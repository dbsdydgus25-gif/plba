"use server";

import { createClient } from "@/lib/supabase/server";
import { UserRole } from "@/types";
import { redirect } from "next/navigation";

export async function processLoginAction(phone: string, role: UserRole) {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "인증 정보를 확인할 수 없습니다." };
  }

  // users 테이블에서 현재 사용자 정보 조회
  const { data: userData, error: dbError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (dbError && dbError.code !== "PGRST116") {
    // PGRST116: 리소스 없음 (신규 유저일 가능성)
    console.error("DB Error:", dbError);
    return { error: "사용자 정보를 조회하는 중 오류가 발생했습니다." };
  }

  // 신규 유저 또는 이름(name)/지역(region_city) 정보가 없는 경우 -> 온보딩(가입) 페이지로 이동
  if (!userData || !userData.name || !userData.region_city) {
    // 사용자가 로그인 화면에서 선택한 역할(role)을 가지고 온보딩으로 넘어가야 함
    // URL 파라미터로 전달하거나, DB에 초기 상태로 업데이트 후 이동할 수 있음
    
    // DB에 역할(role) 정보가 아직 없거나, 현재 선택한 역할과 다를 경우 업데이트
    if (!userData || userData.role !== role) {
      await supabase.from("users").upsert({
        id: user.id,
        phone: phone,
        role: role,
        name: userData?.name || "", // 기존 이름이 있으면 유지
      });
    }

    return { redirect: "/onboarding" };
  }

  // 기존 유저 & 필수 정보 있음 -> 대시보드로 이동
  // 선택한 역할(role)과 DB의 역할(role)이 다를 경우
  // 정책상 변경 불가라면 에러 반환 가능, 여기서는 로그인 시 선택한 role이 맞는지 확인
  if (userData.role !== role) {
    return { error: `이 계정은 이미 ${userData.role === 'owner' ? '점주' : '알바생'}로 가입되어 있습니다.` };
  }

  if (role === "owner") {
    return { redirect: "/owner" };
  } else {
    return { redirect: "/worker" };
  }
}
