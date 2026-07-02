"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Suspense } from "react";

function CallbackInner() {
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event !== "SIGNED_IN" || !session) return;

      // 이메일/비번 가입자는 항상 owner (알바생은 Kakao만 사용)
      const provider = session.user.app_metadata?.provider ?? "";
      const role = provider === "email" ? "owner" : (localStorage.getItem("plba_role") ?? "alba");
      const authId = session.user.id;
      const nickname =
        session.user.user_metadata?.name ??
        session.user.user_metadata?.full_name ??
        session.user.user_metadata?.preferred_username ??
        "사용자";

      if (role === "owner") {
        // 사장님: Google OAuth → Supabase auth user ID = users.id
        const { data: existing } = await supabase
          .from("users")
          .select("id, name")
          .eq("id", authId)
          .maybeSingle();

        if (existing) {
          localStorage.setItem("plba_uid", existing.id);
          localStorage.setItem("plba_name", existing.name);
          // store 정보 로드
          const { data: store } = await supabase
            .from("stores")
            .select("id, name, code")
            .eq("owner_id", existing.id)
            .maybeSingle();
          if (store) {
            localStorage.setItem("plba_store_id", store.id);
            localStorage.setItem("plba_store_name", store.name);
            localStorage.setItem("plba_store_code", store.code);
          }
          router.replace("/owner");
        } else {
          // 신규 사장님 → 가입 플로우
          router.replace(`/owner-signup?google_id=${encodeURIComponent(authId)}&google_name=${encodeURIComponent(nickname)}`);
        }
      } else {
        // 알바생: 카카오 OAuth → kakao_id 컬럼으로 매칭
        const { data: existing } = await supabase
          .from("users")
          .select("id, name")
          .eq("kakao_id", authId)
          .maybeSingle();

        if (existing) {
          localStorage.setItem("plba_uid", existing.id);
          localStorage.setItem("plba_name", existing.name);
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
          router.replace("/app/alba");
        } else {
          // 신규 알바생 → 가입 플로우
          router.replace(`/join?kakao_id=${encodeURIComponent(authId)}&kakao_name=${encodeURIComponent(nickname)}`);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", flexDirection: "column", gap: 16 }}>
      <div style={{ width: 32, height: 32, border: "3px solid #6B4DF6", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <p style={{ fontSize: 15, color: "#555" }}>로그인 처리 중...</p>
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
