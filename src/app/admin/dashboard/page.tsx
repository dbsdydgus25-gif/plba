"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2, RefreshCw, Mail, MailCheck, Check,
  LogOut, Search, Send
} from "lucide-react";

type Registration = {
  id: string;
  store_name: string;
  contact: string;
  email: string;
  category: string;
  email_sent: boolean;
  email_sent_at: string | null;
  admin_memo: string | null;
  created_at: string;
};

const CATEGORY_LABELS: Record<string, string> = {
  food: "음식점",
  cafe: "카페/베이커리",
  bar: "주점/이자카야",
  beauty: "뷰티/미용",
  other: "기타",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<Registration[]>([]);
  const [filtered, setFiltered] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [sendResult, setSendResult] = useState<string>("");

  // 목록 가져오기
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/registrations");
      if (res.status === 401) { router.push("/admin"); return; }
      const json = await res.json();
      setData(json.data ?? []);
      setFiltered(json.data ?? []);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // 검색 필터
  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      q ? data.filter(r =>
        r.store_name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.contact.includes(q)
      ) : data
    );
  }, [search, data]);

  // 전체 선택 토글
  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map(r => r.id)));
    }
  };

  const toggleOne = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    setSelected(next);
  };

  // 이메일 일괄 발송
  const handleSendEmails = async () => {
    if (selected.size === 0) return;
    if (!confirm(`선택한 ${selected.size}명에게 이메일을 발송할까요?`)) return;

    setSending(true);
    setSendResult("");
    try {
      const res = await fetch("/api/admin/send-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selected) }),
      });
      const json = await res.json();
      setSendResult(`✅ ${json.successCount}/${json.total}건 발송 완료`);
      setSelected(new Set());
      await fetchData();
    } catch {
      setSendResult("❌ 발송 중 오류가 발생했습니다.");
    } finally {
      setSending(false);
    }
  };

  // 로그아웃
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("ko-KR", {
      year: "2-digit", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit",
    });

  return (
    <div className="min-h-screen bg-[#0D0F14] text-white">
      {/* 헤더 */}
      <div className="bg-[#13161D] border-b border-white/8 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <p className="text-[#5b5bd6] text-[11px] font-bold uppercase tracking-widest">플바 어드민</p>
          <h1 className="text-white font-black text-[18px] tracking-tight mt-0.5">사전등록 관리</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center hover:bg-white/12 transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-white/60" />
          </button>
          <button
            onClick={handleLogout}
            className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center hover:bg-white/12 transition-colors"
          >
            <LogOut className="w-4 h-4 text-white/60" />
          </button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4 max-w-5xl mx-auto">
        {/* 통계 카드 */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "전체 등록", val: data.length, color: "text-white" },
            { label: "이메일 발송 완료", val: data.filter(r => r.email_sent).length, color: "text-[#00C896]" },
            { label: "미발송", val: data.filter(r => !r.email_sent).length, color: "text-yellow-400" },
          ].map((s, i) => (
            <div key={i} className="bg-[#13161D] border border-white/8 rounded-2xl p-4">
              <p className="text-white/40 text-[11px] font-medium mb-1">{s.label}</p>
              <p className={`font-black text-[26px] ${s.color}`}>{s.val}</p>
            </div>
          ))}
        </div>

        {/* 액션 바 */}
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="상호명, 이메일, 연락처 검색"
              className="w-full bg-white/8 border border-white/12 rounded-xl pl-10 pr-4 py-3 text-white text-[14px] placeholder:text-white/25 focus:outline-none focus:border-[#5b5bd6] transition-all"
            />
          </div>
          {selected.size > 0 && (
            <button
              onClick={handleSendEmails}
              disabled={sending}
              className="flex items-center gap-2 px-4 py-3 bg-[#5b5bd6] rounded-xl text-white font-bold text-[14px] disabled:opacity-60 transition-all hover:bg-[#4f4fc4] whitespace-nowrap"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {sending ? "발송 중..." : `${selected.size}명에게 이메일 발송`}
            </button>
          )}
        </div>

        {sendResult && (
          <div className="bg-[#13161D] border border-white/8 rounded-xl px-4 py-3 text-[13px] text-white/80">
            {sendResult}
          </div>
        )}

        {/* 테이블 */}
        <div className="bg-[#13161D] border border-white/8 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-[#5b5bd6] animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-white/30">
              <p className="text-[15px]">등록된 데이터가 없습니다</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="px-4 py-3 text-left">
                      <button
                        onClick={toggleAll}
                        className="w-5 h-5 rounded-md border border-white/20 flex items-center justify-center hover:border-[#5b5bd6] transition-colors"
                        style={{ background: selected.size === filtered.length && filtered.length > 0 ? "#5b5bd6" : "transparent" }}
                      >
                        {selected.size === filtered.length && filtered.length > 0 && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </button>
                    </th>
                    {["상호명", "연락처", "이메일", "업종", "이메일", "등록일"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-white/40 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr
                      key={r.id}
                      className={`border-b border-white/5 hover:bg-white/3 transition-colors ${selected.has(r.id) ? "bg-[#5b5bd6]/8" : ""}`}
                    >
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleOne(r.id)}
                          className="w-5 h-5 rounded-md border flex items-center justify-center transition-colors"
                          style={{
                            borderColor: selected.has(r.id) ? "#5b5bd6" : "rgba(255,255,255,0.2)",
                            background: selected.has(r.id) ? "#5b5bd6" : "transparent"
                          }}
                        >
                          {selected.has(r.id) && <Check className="w-3 h-3 text-white" />}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-white text-[14px] font-semibold">{r.store_name}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-white/70 text-[13px] font-mono">{r.contact}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-white/70 text-[13px]">{r.email}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[11px] font-bold text-[#5b5bd6] bg-[#5b5bd6]/15 px-2 py-0.5 rounded-full">
                          {CATEGORY_LABELS[r.category] ?? r.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {r.email_sent ? (
                          <div className="flex items-center gap-1 text-[#00C896]">
                            <MailCheck className="w-4 h-4" />
                            <span className="text-[11px] font-bold">발송완료</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Mail className="w-4 h-4" />
                            <span className="text-[11px] font-bold">미발송</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-white/40 text-[12px]">{formatDate(r.created_at)}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
