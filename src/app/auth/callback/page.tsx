"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Suspense } from "react";

function CallbackInner() {
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        const role = localStorage.getItem("plba_role") ?? "alba";
        const kakaoId = session.user.id;
        const nickname =
          session.user.user_metadata?.name ??
          session.user.user_metadata?.full_name ??
          "카카오 사용자";

        const { data: existing } = await supabase
          .from("users")
          .select("id, name, role")
          .eq("id", kakaoId)
          .maybeSingle();

        if (existing && existing.role === role) {
          localStorage.setItem("plba_uid", existing.id);
          localStorage.setItem("plba_name", existing.name);
          const dest = role === "owner" ? "/owner" : "/app/alba";
          router.replace(`${dest}?uid=${existing.id}&name=${encodeURIComponent(existing.name)}`);
          return;
        }

        const dest = role === "owner" ? "/owner-signup" : "/join";
        router.replace(`${dest}?kakao_id=${encodeURIComponent(kakaoId)}&kakao_name=${encodeURIComponent(nickname)}`);
      }
    });
    return () => subscription.unsubscribe();
  }, [router]);

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
    <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}><p>로그인 처리 중...</p></div>}>
      <CallbackInner />
    </Suspense>
  );
}
