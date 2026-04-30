import WorkerOnboarding from "@/components/worker/WorkerOnboarding";
import WageCounter from "@/components/worker/WageCounter";
import { QrCode, Clock, ChevronRight, Gift } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function WorkerDashboard() {
  // 프론트엔드 UI 구축을 위해 임시로 하드코딩된 데이터 사용 (백엔드 미연결 상태)
  const storeName = "플바카페 강남점";
  const hourlyWage = 10000;
  const totalReward = 15500;
  
  const currentWorkLog = null; // 출근 전 상태를 보려면 null, 근무 중 상태를 보려면 { clock_in_at: new Date().toISOString() }

  const recentLogs = [
    { clock_in_at: new Date(Date.now() - 86400000).toISOString(), clock_out_at: new Date(Date.now() - 68400000).toISOString(), calculated_wage: 50000 },
    { clock_in_at: new Date(Date.now() - 172800000).toISOString(), clock_out_at: new Date(Date.now() - 154800000).toISOString(), calculated_wage: 50000 },
  ];

  return (
    <div className="flex flex-col h-full bg-bg-base">
      <div className="px-5 py-6 flex flex-col gap-6 flex-1">
        
        {/* 헤더 영역 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-bg-card flex items-center justify-center overflow-hidden border border-border-default">
              <Image src="/symbol.png" alt="logo" width={24} height={24} className="object-contain" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-text-primary">{storeName}</h2>
              <p className="text-xs text-text-muted">알바생 모드</p>
            </div>
          </div>
        </div>

        {/* Apple Wallet Style Card (출퇴근 & 리워드) */}
        <div className="wallet-card wallet-card-primary flex flex-col justify-between min-h-[220px]">
          <div className="flex items-start justify-between z-10 relative">
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">내 누적 리워드</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-inter font-black text-white">
                  {totalReward.toLocaleString()}
                </span>
                <span className="text-lg font-bold text-white/90">원</span>
              </div>
            </div>
            <Link href="/worker/rewards" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md transition-transform active:scale-95">
              <Gift className="w-5 h-5 text-white" />
            </Link>
          </div>

          <div className="z-10 relative mt-6 bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
            {currentWorkLog ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-xs mb-1">근무 중</p>
                  <WageCounter clockInAt={currentWorkLog.clock_in_at} hourlyWage={hourlyWage} />
                </div>
                <Link href="/worker/clock-out" className="btn bg-white text-brand px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-gray-50 active:scale-95">
                  <Clock className="w-4 h-4 mr-1" />
                  퇴근
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-xs mb-1">오늘도 화이팅!</p>
                  <p className="text-white font-bold text-lg">출근 전</p>
                </div>
                <Link href="/worker/clock-in" className="btn bg-white text-brand px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-gray-50 active:scale-95">
                  <QrCode className="w-4 h-4 mr-1" />
                  QR 출근
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Howmuch Style Simple List */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-text-primary">최근 근무 기록</h3>
            <Link href="/worker/schedule" className="text-sm font-medium text-text-muted hover:text-brand flex items-center">
              전체보기 <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="flex flex-col gap-3">
            {recentLogs && recentLogs.length > 0 ? (
              recentLogs.map((log, idx) => {
                const dateObj = new Date(log.clock_in_at);
                const dayStr = dateObj.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric', weekday: 'short' });
                const inTime = dateObj.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
                const outTime = new Date(log.clock_out_at!).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

                return (
                  <div key={idx} className="bg-bg-card p-4 rounded-[20px] border border-border-subtle flex items-center justify-between active:bg-bg-card-hover transition-colors">
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-bold text-text-primary">{dayStr}</span>
                      <span className="text-sm text-text-muted flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {inTime} ~ {outTime}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-inter text-lg font-bold text-brand">
                        +{log.calculated_wage?.toLocaleString() || 0}원
                      </span>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="bg-bg-card p-8 rounded-[20px] border border-border-subtle flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-bg-elevated rounded-full flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6 text-text-muted" />
                </div>
                <p className="text-text-primary font-medium">아직 근무 기록이 없어요.</p>
                <p className="text-text-muted text-sm mt-1">출근 QR을 찍고 근무를 시작해보세요!</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
