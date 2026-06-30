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

        // id(owner용) 또는 kakao_id(alba용) 둘 다 검색
        const [{ data: byId }, { data: byKakaoId }] = await Promise.all([
          supabase.from("users").select("id, name, role").eq("id", kakaoId).maybeSingle(),
          supabase.from("users").select("id, name, role").eq("kakao_id", kakaoId).maybeSingle(),
        ]);
        const existing = byId ?? byKakaoId;

        if (existing && existing.role === role) {
          localStorage.setItem("plba_uid", existing.id);
          localStorage.setItem("plba_name", existing.name);
          // alba는 storeId/storeCode도 불러와서 저장
          if (role === "alba") {
            const { data: member } = await supabase
              .from("store_members")
              .select("store_id, stores(name, code)")
              .eq("user_id", existing.id)
              .eq("status", "active")
              .limit(1)
              .single();
            if (member) {
              const store = member.stores as unknown as { name: string; code: string } | null;
              localStorage.setItem("plba_store_id", member.store_id);
              localStorage.setItem("plba_store_name", store?.name ?? "");
              localStorage.setItem("plba_store_code", store?.code ?? "");
            }
          }
          const dest = role === "owner" ? "/owner" : "/app/alba";
          router.replace(dest);
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
