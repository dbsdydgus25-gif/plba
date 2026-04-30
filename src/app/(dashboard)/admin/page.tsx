import { Shield, Users, Store, CheckCircle } from "lucide-react";
import WithdrawalActionButtons from "./WithdrawalActionButtons";

export default async function AdminDashboardPage() {
  // 프론트엔드 UI 구축을 위해 임시로 하드코딩된 데이터 사용 (백엔드 미연결 상태)
  const usersCount = 120;
  const storesCount = 15;
  const campaignsCount = 42;

  const pendingWithdrawals = [
    { id: 1, users: { name: "홍길동", phone: "010-1234-5678" }, amount: 50000, bank_name: "국민은행", account_number: "123456-00-123456", created_at: new Date().toISOString(), status: "pending" },
    { id: 2, users: { name: "김철수", phone: "010-9876-5432" }, amount: 15000, bank_name: "신한은행", account_number: "110-123-456789", created_at: new Date().toISOString(), status: "pending" },
  ];
  const otherWithdrawals = [
    { id: 3, users: { name: "이영희" }, amount: 30000, status: "approved", created_at: new Date(Date.now() - 86400000).toISOString() },
  ];

  return (
    <div className="flex flex-col min-h-[100dvh] bg-bg-base text-text-primary">
      {/* 헤더 */}
      <div className="px-5 pt-14 pb-5 border-b border-border-subtle flex items-center gap-3 sticky top-0 bg-bg-base/80 backdrop-blur-md z-10">
        <Shield className="w-6 h-6 text-brand" />
        <h1 className="text-xl font-bold text-brand">슈퍼관리자 대시보드</h1>
      </div>

      <div className="flex-1 px-5 py-6 flex flex-col gap-8 pb-28">
        
        {/* 통계 요약 */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-bg-card rounded-2xl p-4 flex flex-col items-center justify-center gap-1 border border-border-default shadow-sm">
            <Users className="w-5 h-5 text-text-muted mb-1" />
            <span className="text-xs text-text-muted">총 가입자</span>
            <span className="font-bold text-lg text-text-primary">{usersCount}</span>
          </div>
          <div className="bg-bg-card rounded-2xl p-4 flex flex-col items-center justify-center gap-1 border border-border-default shadow-sm">
            <Store className="w-5 h-5 text-text-muted mb-1" />
            <span className="text-xs text-text-muted">등록 매장</span>
            <span className="font-bold text-lg text-text-primary">{storesCount}</span>
          </div>
          <div className="bg-bg-card rounded-2xl p-4 flex flex-col items-center justify-center gap-1 border border-border-default shadow-sm">
            <CheckCircle className="w-5 h-5 text-text-muted mb-1" />
            <span className="text-xs text-text-muted">캠페인 수</span>
            <span className="font-bold text-lg text-text-primary">{campaignsCount}</span>
          </div>
        </div>

        {/* 미처리 출금 신청 */}
        <div>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            처리 대기중인 출금 신청
            <span className="bg-brand/10 text-brand text-xs font-bold px-2 py-0.5 rounded-full">
              {pendingWithdrawals.length}
            </span>
          </h2>
          
          <div className="flex flex-col gap-4">
            {pendingWithdrawals.length > 0 ? (
              pendingWithdrawals.map((req: any) => (
                <div key={req.id} className="bg-bg-card border border-border-default rounded-2xl p-5 flex flex-col gap-3 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-text-primary">{req.users?.name || "알 수 없음"}</h3>
                      <p className="text-sm text-text-secondary">{req.users?.phone || "연락처 없음"}</p>
                    </div>
                    <span className="text-mint font-bold text-xl">{req.amount.toLocaleString()}원</span>
                  </div>

                  <div className="bg-bg-base border border-border-subtle p-3 rounded-xl mt-1">
                    <p className="text-sm font-medium text-text-primary">{req.bank_name}</p>
                    <p className="text-text-secondary font-mono mt-1">{req.account_number}</p>
                  </div>

                  <div className="text-xs text-text-muted mt-1 text-right">
                    신청일: {new Date(req.created_at).toLocaleString('ko-KR')}
                  </div>

                  <WithdrawalActionButtons requestId={req.id} />
                </div>
              ))
            ) : (
              <div className="bg-bg-card rounded-2xl p-8 text-center border border-border-subtle">
                <p className="text-text-secondary">대기중인 출금 신청이 없습니다.</p>
              </div>
            )}
          </div>
        </div>

        {/* 최근 처리 내역 */}
        {otherWithdrawals.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-text-secondary mb-4">최근 처리 내역</h2>
            <div className="flex flex-col gap-3">
              {otherWithdrawals.map((req: any) => (
                <div key={req.id} className="bg-bg-card border border-border-subtle rounded-2xl p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-text-primary">{req.users?.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-md font-bold ${
                      req.status === 'approved' ? 'bg-mint/10 text-mint' : 'bg-red-100 text-red-500'
                    }`}>
                      {req.status === 'approved' ? '승인됨' : '반려됨'}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-text-secondary">
                    <span>{req.amount.toLocaleString()}원</span>
                    <span>{new Date(req.created_at).toLocaleDateString()}</span>
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
