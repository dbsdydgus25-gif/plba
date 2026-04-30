import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function OwnerDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // 점주 본인 매장 조회
  const { data: store } = await supabase
    .from("stores")
    .select("id, name, hourly_wage")
    .eq("owner_id", user.id)
    .maybeSingle();

  // 매장이 없으면 매장 생성 페이지로
  if (!store) redirect("/owner/setup");

  // 포인트 잔액
  const { data: points } = await supabase
    .from("store_points")
    .select("balance")
    .eq("store_id", store.id)
    .single();

  // 오늘 출근 중인 알바생
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { data: workingNow } = await supabase
    .from("work_logs")
    .select("id, clock_in_at, users(name)")
    .eq("store_id", store.id)
    .is("clock_out_at", null)
    .gte("clock_in_at", todayStart.toISOString());

  // 진행 중인 캠페인
  const { data: campaigns } = await supabase
    .from("campaigns")
    .select("id, title, used_count, total_budget_count, reward_amount, status")
    .eq("store_id", store.id)
    .eq("status", "active")
    .limit(3);

  // 승인 대기 리워드 수
  const { count: pendingCount } = await supabase
    .from("reward_logs")
    .select("id", { count: "exact", head: true })
    .eq("store_id", store.id)
    .eq("status", "pending");

  const balance = points?.balance ?? 0;

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFFFF] text-[#1A1A24]">
      {/* 헤더 */}
      <div className="px-5 pt-14 pb-5 border-b border-white/5">
        <p className="text-sm text-[#8888A0] mb-1">점주 대시보드</p>
        <h1 className="text-xl font-bold">{store.name}</h1>
      </div>

      <div className="flex-1 px-5 py-6 flex flex-col gap-5 pb-28">
        {/* 포인트 잔액 */}
        <div className="rounded-2xl bg-[#F8F9FA] border border-white/5 p-5">
          <p className="text-sm text-[#8888A0] mb-1">현재 포인트 잔액</p>
          <div className="flex items-end gap-1 mb-4">
            <span className="text-4xl font-bold font-mono text-[#1A1A24]">
              {balance.toLocaleString()}
            </span>
            <span className="text-xl text-[#8888A0] mb-1">P</span>
          </div>
          <Link href="/owner/points" className="text-sm text-[#5B5BD6] font-medium">
            포인트 충전하기 →
          </Link>
        </div>

        {/* 리워드 승인 버튼 (1/3 높이) */}
        <Link
          href="/owner/approve"
          className="relative flex items-center justify-center rounded-2xl"
          style={{
            background: "#5B5BD6",
            minHeight: "calc(33dvh - 40px)",
          }}
        >
          {pendingCount && pendingCount > 0 ? (
            <span className="absolute top-4 right-4 bg-[#FF4D6D] text-white text-xs font-bold px-2 py-1 rounded-full">
              {pendingCount}건 대기
            </span>
          ) : null}
          <div className="flex flex-col items-center gap-3">
            <span className="text-5xl">✅</span>
            <span className="text-2xl font-black text-white">리워드 승인</span>
            <span className="text-sm text-white/70">QR 스캔 또는 코드 입력</span>
          </div>
        </Link>

        {/* 오늘 근무 중 알바생 */}
        <div className="rounded-2xl bg-[#F8F9FA] border border-white/5 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-[#8888A0]">오늘 근무 중</p>
            <Link href="/owner/workers" className="text-xs text-[#5B5BD6]">전체보기</Link>
          </div>
          {workingNow && workingNow.length > 0 ? (
            <div className="flex flex-col gap-2">
              {workingNow.map((log: any) => (
                <div key={log.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00C896] inline-block"></span>
                    <span className="text-sm font-medium">{log.users?.name ?? "알바생"}</span>
                  </div>
                  <span className="text-xs text-[#8888A0]">
                    {new Date(log.clock_in_at).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })} 출근
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#555568] py-2">현재 근무 중인 알바생이 없습니다</p>
          )}
        </div>

        {/* 활성 캠페인 현황 */}
        <div className="rounded-2xl bg-[#F8F9FA] border border-white/5 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-[#8888A0]">진행 중 캠페인</p>
            <Link href="/owner/campaigns" className="text-xs text-[#5B5BD6]">관리하기</Link>
          </div>
          {campaigns && campaigns.length > 0 ? (
            <div className="flex flex-col gap-3">
              {campaigns.map((c) => {
                const pct = Math.round((c.used_count / c.total_budget_count) * 100);
                const isLow = pct >= 90;
                return (
                  <div key={c.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium truncate">{c.title}</span>
                      <span className={isLow ? "text-[#FFB830] text-xs font-bold" : "text-[#8888A0] text-xs"}>
                        {c.used_count}/{c.total_budget_count}건
                        {isLow && " ⚠️"}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10">
                      <div
                        className="h-1.5 rounded-full transition-all"
                        style={{
                          width: `${Math.min(pct, 100)}%`,
                          background: isLow ? "#FFB830" : "#5B5BD6",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-[#555568] py-1">진행 중인 캠페인이 없습니다</p>
              <Link href="/owner/campaigns/new" className="text-sm text-[#5B5BD6] font-medium">
                캠페인 만들기 →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
