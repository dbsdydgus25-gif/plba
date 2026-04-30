import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, CheckCircle, Clock } from "lucide-react";

export default async function OwnerCampaignsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // 점주 매장 확인
  const { data: store } = await supabase
    .from("stores")
    .select("id")
    .eq("owner_id", user.id)
    .maybeSingle();

  if (!store) redirect("/owner/setup");

  // 점주의 모든 캠페인 목록 조회
  const { data: campaigns } = await supabase
    .from("campaigns")
    .select("id, title, status, used_count, total_budget_count, reward_amount, created_at")
    .eq("store_id", store.id)
    .order("created_at", { ascending: false });

  // 활성/종료 분리
  const activeCampaigns = campaigns?.filter(c => c.status === "active") || [];
  const closedCampaigns = campaigns?.filter(c => c.status === "closed" || c.status === "blinded") || [];

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#FFFFFF] text-[#1A1A24]">
      {/* 헤더 */}
      <div className="px-5 pt-14 pb-5 border-b border-white/5 sticky top-0 bg-[#FFFFFF]/80 backdrop-blur-md z-10 flex justify-between items-center">
        <h1 className="text-xl font-bold">캠페인 관리</h1>
        <Link href="/owner/campaigns/new" className="text-[#00C896] text-sm font-semibold flex items-center gap-1">
          <Plus className="w-4 h-4" />
          새 캠페인
        </Link>
      </div>

      <div className="flex-1 px-5 py-6 flex flex-col gap-8 pb-28">
        
        {/* 진행 중인 캠페인 */}
        <div>
          <h2 className="text-sm font-semibold text-[#8888A0] mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00C896] animate-pulse" />
            진행 중 ({activeCampaigns.length})
          </h2>
          
          <div className="flex flex-col gap-4">
            {activeCampaigns.length > 0 ? (
              activeCampaigns.map(c => {
                const pct = Math.round((c.used_count / c.total_budget_count) * 100);
                const isLow = pct >= 90;

                return (
                  <div key={c.id} className="bg-[#F8F9FA] border border-white/5 rounded-2xl p-5 flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-[#1A1A24] pr-4">{c.title}</h3>
                      <span className="text-[#00C896] font-bold shrink-0">{c.reward_amount.toLocaleString()}원</span>
                    </div>

                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#8888A0]">진행률 ({pct}%)</span>
                        <span className={isLow ? "text-[#FFB830] font-bold" : "text-[#8888A0]"}>
                          {c.used_count} / {c.total_budget_count}건
                          {isLow && " ⚠️"}
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full transition-all duration-500 ease-out"
                          style={{
                            width: `${Math.min(pct, 100)}%`,
                            background: isLow ? "#FFB830" : "#5B5BD6",
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 mt-2 pt-3 border-t border-white/5">
                      {/* 상태 변경 폼은 클라이언트 컴포넌트나 서버 액션으로 처리해야 하지만, 
                          여기서는 UI만 구성하고 향후 개선 */}
                      <span className="text-xs text-[#555568]">
                        {new Date(c.created_at).toLocaleDateString('ko-KR')} 생성
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-[#F8F9FA]/50 border border-white/5 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[#8888A0]">
                  <Plus className="w-6 h-6" />
                </div>
                <p className="text-[#8888A0] text-sm">
                  진행 중인 캠페인이 없습니다.<br />새로운 캠페인을 만들어 알바생 홍보를 시작하세요!
                </p>
                <Link href="/owner/campaigns/new" className="text-[#5B5BD6] text-sm font-semibold mt-2">
                  새 캠페인 만들기
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* 종료된 캠페인 */}
        {closedCampaigns.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-[#555568] mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              종료됨 ({closedCampaigns.length})
            </h2>
            
            <div className="flex flex-col gap-3">
              {closedCampaigns.map(c => (
                <div key={c.id} className="bg-[#F8F9FA]/50 border border-white/5 rounded-2xl p-4 flex flex-col gap-2 opacity-70">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-[#8888A0] truncate">{c.title}</h3>
                    <span className="text-xs px-2 py-1 bg-white/5 text-[#8888A0] rounded-md">
                      {c.status === "blinded" ? "예산소진 (블라인드)" : "종료됨"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-[#555568]">
                    <span>달성: {c.used_count}/{c.total_budget_count}건</span>
                    <span>리워드: {c.reward_amount.toLocaleString()}원</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
