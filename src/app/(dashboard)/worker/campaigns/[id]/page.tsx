import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Store, Users, CheckCircle } from "lucide-react";
import PromoteButton from "./PromoteButton";

export default async function CampaignDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: campaign } = await supabase
    .from("campaigns")
    .select(`
      *,
      stores(name, address)
    `)
    .eq("id", params.id)
    .single();

  if (!campaign) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FFFFFF] text-[#1A1A24] items-center justify-center">
        <p>캠페인을 찾을 수 없습니다.</p>
        <Link href="/worker/campaigns" className="text-[#5B5BD6] mt-4">목록으로 돌아가기</Link>
      </div>
    );
  }

  // 남은 예산/리워드 계산
  const remainCount = campaign.total_budget_count - campaign.used_count;
  const isAvailable = campaign.status === "active" && remainCount > 0;

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#FFFFFF] text-[#1A1A24]">
      {/* 헤더 */}
      <div className="px-5 pt-14 pb-5 border-b border-white/5 flex items-center gap-3 sticky top-0 bg-[#FFFFFF]/80 backdrop-blur-md z-10">
        <Link href="/worker/campaigns" className="p-2 -ml-2 text-[#8888A0] hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold truncate">{campaign.stores?.name}</h1>
      </div>

      <div className="flex-1 flex flex-col pb-32">
        {/* 리워드 하이라이트 영역 */}
        <div className="bg-gradient-to-b from-[#5B5BD6]/20 to-transparent px-6 py-10 flex flex-col items-center justify-center text-center">
          <p className="text-[#8888A0] text-sm mb-2">홍보 성공 시 건당 리워드</p>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black font-inter text-[#00C896]">
              {campaign.reward_amount.toLocaleString()}
            </span>
            <span className="text-xl text-[#8888A0]">원</span>
          </div>
          
          <div className="mt-6 inline-flex flex-col gap-1 items-center bg-[#F8F9FA]/80 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
            <span className="text-xs text-[#8888A0]">남은 참여 가능 횟수</span>
            <span className="font-bold text-[#1A1A24]">{remainCount}건 <span className="text-[#8888A0] font-normal">/ {campaign.total_budget_count}건</span></span>
          </div>
        </div>

        {/* 상세 정보 */}
        <div className="px-6 py-6 flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-3">{campaign.title}</h2>
            {campaign.description && (
              <p className="text-[#8888A0] whitespace-pre-line leading-relaxed">
                {campaign.description}
              </p>
            )}
          </div>

          <div className="w-full h-px bg-white/5 my-2"></div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">조건 및 정보</h3>
            
            {campaign.menu_name && (
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-6 flex justify-center text-[#5B5BD6]"><CheckCircle className="w-5 h-5" /></div>
                <div>
                  <p className="text-sm text-[#8888A0]">대상 메뉴</p>
                  <p className="font-medium text-[#1A1A24]">{campaign.menu_name}</p>
                </div>
              </div>
            )}

            {(campaign.target_gender || campaign.target_age_min || campaign.target_age_max) && (
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-6 flex justify-center text-[#5B5BD6]"><Users className="w-5 h-5" /></div>
                <div>
                  <p className="text-sm text-[#8888A0]">타겟 고객</p>
                  <p className="font-medium text-[#1A1A24]">
                    {campaign.target_gender === 'female' ? '여성' : campaign.target_gender === 'male' ? '남성' : '남녀무관'}
                    {campaign.target_age_min ? ` · ${campaign.target_age_min}세 이상` : ''}
                    {campaign.target_age_max ? ` · ${campaign.target_age_max}세 이하` : ''}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="mt-0.5 w-6 flex justify-center text-[#5B5BD6]"><Store className="w-5 h-5" /></div>
              <div>
                <p className="text-sm text-[#8888A0]">매장 위치</p>
                <p className="font-medium text-[#1A1A24]">{campaign.stores?.address || "주소 정보 없음"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 고정 버튼 (클라이언트 컴포넌트) */}
      {isAvailable ? (
        <PromoteButton campaignId={campaign.id} />
      ) : (
        <div className="fixed bottom-0 left-0 right-0 p-5 bg-[#FFFFFF] border-t border-white/5 pb-safe z-20">
          <div className="w-full rounded-2xl bg-[#F8F9FA] text-[#8888A0] font-bold py-4 text-center">
            종료된 캠페인입니다
          </div>
        </div>
      )}
    </div>
  );
}
