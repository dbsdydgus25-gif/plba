import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TossPaymentWidget from "@/components/owner/TossPaymentWidget";

export default async function PointsRechargePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // 점주 본인 매장 및 포인트 조회
  const { data: store } = await supabase
    .from("stores")
    .select(`
      id, name,
      store_points(balance)
    `)
    .eq("owner_id", user.id)
    .single();

  if (!store) redirect("/owner/setup");

  // @ts-ignore
  const balance = store.store_points?.[0]?.balance || 0;

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#FFFFFF] text-[#1A1A24]">
      {/* 헤더 */}
      <div className="px-5 pt-14 pb-5 border-b border-white/5 flex items-center gap-3 sticky top-0 bg-[#FFFFFF]/80 backdrop-blur-md z-10">
        <Link href="/owner" className="p-2 -ml-2 text-[#8888A0] hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">포인트 충전</h1>
      </div>

      <div className="flex-1 px-5 py-6 flex flex-col gap-8 pb-28">
        
        {/* 현재 잔액 표시 */}
        <div className="bg-gradient-to-br from-[#5B5BD6]/20 to-[#00C896]/10 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center">
          <p className="text-[#8888A0] text-sm mb-1">현재 내 포인트</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black font-inter text-[#1A1A24]">
              {balance.toLocaleString()}
            </span>
            <span className="text-lg font-bold text-[#8888A0]">P</span>
          </div>
        </div>

        {/* 결제 위젯 */}
        <TossPaymentWidget storeId={store.id} storeName={store.name} />
        
      </div>
    </div>
  );
}
