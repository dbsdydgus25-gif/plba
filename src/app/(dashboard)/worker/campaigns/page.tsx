import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Search, MapPin } from "lucide-react";

export default async function ExploreCampaignsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // 현재 사용자의 지역 정보 가져오기
  const { data: userData } = await supabase
    .from("users")
    .select("region_city, region_district")
    .eq("id", user.id)
    .single();

  const userCity = userData?.region_city;
  const userDistrict = userData?.region_district;

  // 지역에 맞는 캠페인 목록 조회
  // 실제로는 PostGIS나 거리 계산 로직이 필요하지만, 현재는 텍스트 기반 시/구/동 매칭
  // 여기서는 단순히 모든 active 캠페인을 가져오되, store 정보와 조인하여 클라이언트에서 필터링하거나
  // 서버에서 지역명으로 필터링
  
  let query = supabase
    .from("campaigns")
    .select(`
      id, title, reward_amount, 
      stores(name, region_city, region_district)
    `)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  // 동일한 시/구 조건 (시/구가 있을 경우에만 필터 추가)
  // 외래키 관계 필터링 (PostgREST 문법)
  if (userCity) {
    query = query.eq("stores.region_city", userCity);
  }
  if (userDistrict) {
    query = query.eq("stores.region_district", userDistrict);
  }

  const { data: campaigns } = await query;

  // 조인 실패 또는 null인 항목 필터링 (inner join 흉내)
  const filteredCampaigns = campaigns?.filter(c => c.stores !== null) || [];

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#FFFFFF] text-[#1A1A24]">
      {/* 헤더 */}
      <div className="px-5 pt-14 pb-5 border-b border-white/5 sticky top-0 bg-[#FFFFFF] z-10">
        <h1 className="text-xl font-bold mb-3">내 주변 꿀알바 탐색</h1>
        
        {/* 지역 표시 */}
        <div className="flex items-center gap-1 text-sm text-[#8888A0]">
          <MapPin className="w-4 h-4 text-[#5B5BD6]" />
          <span>
            {userCity} {userDistrict} 주변
          </span>
          <button className="text-[#5B5BD6] text-xs ml-2 underline underline-offset-2">변경</button>
        </div>
      </div>

      <div className="flex-1 px-5 py-6 pb-28">
        <div className="flex flex-col gap-4">
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((campaign: any) => (
              <Link
                key={campaign.id}
                href={`/worker/campaigns/${campaign.id}`}
                className="bg-[#F8F9FA] border border-white/5 rounded-2xl p-4 flex flex-col gap-3 active:scale-[0.98] transition-transform"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-[#8888A0] mb-1">{campaign.stores.name}</p>
                    <h3 className="font-semibold text-[#1A1A24] leading-snug">
                      {campaign.title}
                    </h3>
                  </div>
                  <div className="bg-[#5B5BD6]/10 text-[#5B5BD6] text-xs font-bold px-2 py-1 rounded-md whitespace-nowrap">
                    추천
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                  <span className="text-sm text-[#8888A0]">건당 리워드</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold font-inter text-[#00C896]">
                      {campaign.reward_amount.toLocaleString()}
                    </span>
                    <span className="text-sm text-[#8888A0]">원</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-3 opacity-60">
              <Search className="w-10 h-10 text-[#8888A0]" />
              <p className="text-[#8888A0] text-sm">
                주변에 진행 중인<br />캠페인이 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
