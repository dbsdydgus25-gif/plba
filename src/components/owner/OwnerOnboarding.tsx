"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

const DEFAULT_RULES = [
  { title: "출퇴근 방법", body: "매장 입구의 QR 코드를 플바 앱으로 스캔하면 출퇴근이 자동 기록돼요." },
  { title: "지각·결근 시 연락", body: "출근 30분 전까지 사장님께 연락 주세요. 카카오톡 또는 전화로 미리 알려주세요." },
  { title: "유니폼 및 복장", body: "앞치마 착용 필수. 단정한 복장으로 출근해 주세요." },
  { title: "포스 사용법", body: "오픈 전 포스 켜기 → 영수증 용지 확인 → 카드단말기 연결 확인." },
  { title: "청소 구역", body: "오픈: 홀 테이블 닦기 / 마감: 바닥 청소 + 쓰레기 분리수거." },
];

interface Rule { id: string; title: string; body: string; }

export default function OwnerOnboarding({ storeId }: { storeId?: string }) {
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [wageDefault, setWageDefault] = useState("10030");
  const [openTime, setOpenTime] = useState("09:00");
  const [closeTime, setCloseTime] = useState("22:00");
  const [rules, setRules] = useState<Rule[]>(DEFAULT_RULES.map((r, i) => ({ ...r, id: String(i) })));
  const [modal, setModal] = useState<{ idx?: number; title: string; body: string } | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!storeId) return;
    const { data } = await supabase.from("stores").select("name,address").eq("id", storeId).single();
    if (data) { setStoreName(data.name ?? ""); setStoreAddress(data.address ?? ""); }
  }, [storeId]);

  useEffect(() => { load(); }, [load]);

  async function saveBasic() {
    if (!storeId) return;
    setSaving(true);
    await supabase.from("stores").update({ name: storeName, address: storeAddress }).eq("id", storeId);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function saveRule() {
    if (!modal) return;
    if (modal.idx !== undefined) {
      setRules(prev => prev.map((r, i) => i === modal.idx ? { ...r, title: modal.title, body: modal.body } : r));
    } else {
      setRules(prev => [...prev, { id: Date.now().toString(), title: modal.title, body: modal.body }]);
    }
    setModal(null);
  }

  return (
    <div style={{ animation: "fadeUp .3s ease", maxWidth: 700 }}>
      {/* 기본 정보 */}
      <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 24, marginBottom: 18 }}>
        <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text)", marginBottom: 4 }}>기본 가게 정보</div>
        <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", marginBottom: 20 }}>알바생 앱에 표시되는 가게 정보예요.</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          {[
            { label: "가게 이름", val: storeName, set: setStoreName, placeholder: "카페 플바" },
            { label: "주소", val: storeAddress, set: setStoreAddress, placeholder: "서울 성동구 성수동 1가 123-4" },
          ].map(({ label, val, set, placeholder }) => (
            <div key={label}>
              <label style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", display: "block", marginBottom: 6 }}>{label}</label>
              <input value={val} onChange={e => set(e.target.value)} placeholder={placeholder} style={{ width: "100%", height: 46, border: "1.5px solid var(--p-border)", borderRadius: 11, padding: "0 13px", fontSize: 14, boxSizing: "border-box", color: "var(--text)", outline: "none" }} />
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
          {[
            { label: "기본 시급 (원)", val: wageDefault, set: setWageDefault, placeholder: "10030", type: "number" },
            { label: "오픈 시간", val: openTime, set: setOpenTime, placeholder: "09:00", type: "time" },
            { label: "마감 시간", val: closeTime, set: setCloseTime, placeholder: "22:00", type: "time" },
          ].map(({ label, val, set, placeholder, type }) => (
            <div key={label}>
              <label style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", display: "block", marginBottom: 6 }}>{label}</label>
              <input type={type} value={val} onChange={e => set(e.target.value)} placeholder={placeholder} style={{ width: "100%", height: 46, border: "1.5px solid var(--p-border)", borderRadius: 11, padding: "0 13px", fontSize: 14, boxSizing: "border-box", color: "var(--text)", outline: "none" }} />
            </div>
          ))}
        </div>

        <button onClick={saveBasic} disabled={saving} style={{ display: "flex", alignItems: "center", gap: 7, padding: "11px 22px", background: saved ? "var(--positive)" : "var(--p)", border: "none", borderRadius: 11, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "background 0.2s" }}>
          {saved ? (
            <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5 10 17.5 19 7" /></svg>저장됐어요!</>
          ) : saving ? "저장 중..." : (
            <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><path d="M17 21v-8H7v8M7 3v5h8" /></svg>저장</>
          )}
        </button>
      </div>

      {/* 알바생 안내 항목 */}
      <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text)" }}>알바생 첫 안내 항목</div>
            <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-sub)", marginTop: 2 }}>신규 알바생이 앱에 처음 들어오면 아래 내용이 자동으로 표시돼요.</div>
          </div>
          <button onClick={() => setModal({ title: "", body: "" })} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "var(--p)", border: "none", borderRadius: 10, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>추가
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
          {rules.map((rule, i) => (
            <div key={rule.id} style={{ display: "flex", gap: 14, background: "#fafafb", border: "1px solid var(--hairline)", borderRadius: 14, padding: "14px 16px" }}>
              <div style={{ width: 28, height: 28, flexShrink: 0, borderRadius: 9, background: "var(--p-soft)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: "var(--p-tint)" }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{rule.title}</div>
                <div style={{ fontWeight: 500, fontSize: 12, color: "var(--text-sub)", marginTop: 3, lineHeight: 1.6 }}>{rule.body}</div>
              </div>
              <div style={{ display: "flex", gap: 6, alignSelf: "flex-start" }}>
                <button onClick={() => setModal({ idx: i, title: rule.title, body: rule.body })} style={{ width: 30, height: 30, border: "none", borderRadius: 8, background: "#f1f1f3", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-sub)" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                </button>
                <button onClick={() => setRules(r => r.filter((_, idx) => idx !== i))} style={{ width: 30, height: 30, border: "none", borderRadius: 8, background: "var(--negative-bg)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--negative)" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setModal(null)}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 28, width: 420, boxShadow: "0 24px 60px rgba(0,0,0,0.18)" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 800, fontSize: 17, color: "var(--text)", marginBottom: 20 }}>{modal.idx !== undefined ? "항목 수정" : "항목 추가"}</div>
            <label style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", display: "block", marginBottom: 6 }}>제목</label>
            <input value={modal.title} onChange={e => setModal(m => m ? { ...m, title: e.target.value } : m)} placeholder="예: 유니폼 착용 방법" style={{ width: "100%", height: 46, border: "1.5px solid var(--p-border)", borderRadius: 11, padding: "0 13px", fontSize: 14, boxSizing: "border-box", marginBottom: 14, outline: "none" }} />
            <label style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", display: "block", marginBottom: 6 }}>내용</label>
            <textarea value={modal.body} onChange={e => setModal(m => m ? { ...m, body: e.target.value } : m)} placeholder="알바생이 꼭 알아야 할 내용을 입력하세요." rows={4} style={{ width: "100%", border: "1.5px solid var(--p-border)", borderRadius: 11, padding: "12px 13px", fontSize: 14, boxSizing: "border-box", resize: "none", fontFamily: "Pretendard", outline: "none", marginBottom: 22 }} />
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setModal(null)} style={{ flex: 1, height: 48, border: "1.5px solid var(--hairline)", borderRadius: 12, background: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", color: "var(--text-sub)" }}>취소</button>
              <button onClick={saveRule} disabled={!modal.title.trim()} style={{ flex: 2, height: 48, border: "none", borderRadius: 12, background: "var(--p)", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", opacity: !modal.title.trim() ? 0.5 : 1 }}>저장</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
