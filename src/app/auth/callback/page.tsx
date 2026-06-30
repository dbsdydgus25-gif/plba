"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Suspense } from "react";

function CallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") ?? "alba";

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if ((event === "SIGNED_IN" || event === "INITIAL_SESSION") && session) {
        const kakaoId = session.user.id;
        const nickname =
          session.user.user_metadata?.name ??
          session.user.user_metadata?.full_name ??
          "카카오 사용자";

        const { data: existing } = await supabase
          .from("users")
          .select("id, name, phone, role")
          .eq("id", kakaoId)
          .maybeSingle();

        if (existing && existing.role === role) {
          // 역할이 일치하는 기존 유저 → 바로 홈
          localStorage.setItem("plba_uid", existing.id);
          localStorage.setItem("plba_name", existing.name);
          const dest = role === "owner" ? "/owner" : "/app/alba";
          router.replace(`${dest}?uid=${existing.id}&name=${encodeURIComponent(existing.name)}`);
          return;
        }

        // 신규 유저 또는 역할 불일치 → 해당 역할 회원가입
        const dest = role === "owner" ? "/owner-signup" : "/join";
        router.replace(`${dest}?kakao_id=${encodeURIComponent(kakaoId)}&kakao_name=${encodeURIComponent(nickname)}`);
      }
    });
    return () => subscription.unsubscribe();
  }, [role, router]);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", flexDirection: "column", gap: 16 }}>
      <div style={{ width: 32, height: 32, border: "3px solid #6B4DF6", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <p style={{ fontSize: 15, color: "#555" }}>카카오 로그인 처리 중...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <p>로그인 처리 중...</p>
      </div>
    }>
      <CallbackInner />
    </Suspense>
  );
}
