"use client";
import { useState } from "react";

const CHECKLIST = {
  open: [
    { id: "o1", label: "전등 및 에어컨 켜기" },
    { id: "o2", label: "포스 부팅 및 영수증 용지 확인" },
    { id: "o3", label: "원두 잔량 확인 및 보충" },
  ],
  ops: [
    { id: "op1", label: "매 시간 테이블 정리" },
    { id: "op2", label: "쓰레기통 비우기 (가득 찰 때)" },
  ],
  close: [
    { id: "c1", label: "에스프레소 머신 세척" },
    { id: "c2", label: "바닥 청소" },
    { id: "c3", label: "냉장고 온도 확인" },
  ],
};

const TODAY_TASKS = [
  { id: "t1", label: "오픈 전 원두 2kg 보충" },
  { id: "t2", label: "에스프레소 머신 그룹 헤드 청소" },
  { id: "t3", label: "주간 재고 파악 후 점장님께 보고" },
];

type CheckMap = Record<string, boolean>;

export default function GuideOverlay({ onClose, onOpenCamera }: { onClose: () => void; onOpenCamera: () => void }) {
  const [checks, setChecks] = useState<CheckMap>({});
  const [taskChecks, setTaskChecks] = useState<CheckMap>({});
  const [shots, setShots] = useState(0);

  const toggle = (id: string, map: CheckMap, setMap: (m: CheckMap) => void) => {
    setMap({ ...map, [id]: !map[id] });
  };

  const allItems = [...CHECKLIST.open, ...CHECKLIST.ops, ...CHECKLIST.close];
  const done = allItems.filter(i => checks[i.id]).length;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 42, background: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center" }}>
    <div style={{ width: "100%", maxWidth: 430, background: "#f4f4f5", overflow: "hidden", animation: "fadeUp .25s ease", position: "relative" }}>
      <div style={{ height: 48 }} />
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px 0" }}>
        <button onClick={onClose} style={{ width: 38, height: 38, border: "none", borderRadius: 11, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#37383c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <span style={{ fontWeight: 800, fontSize: 18, color: "var(--text)" }}>업무 가이드</span>
      </div>

      <div style={{ height: "calc(100% - 96px)", overflowY: "auto", padding: "16px 20px 24px" }}>
        {/* Today tasks */}
        <Section title="오늘 할 일">
          {TODAY_TASKS.map(t => (
            <CheckItem key={t.id} checked={!!taskChecks[t.id]} label={t.label} onChange={() => toggle(t.id, taskChecks, setTaskChecks)} />
          ))}
        </Section>

        {/* Checklist sections */}
        <Section title={`업무 체크리스트 (${done}/${allItems.length})`}>
          <SubSection label="오픈">
            {CHECKLIST.open.map(i => <CheckItem key={i.id} checked={!!checks[i.id]} label={i.label} onChange={() => toggle(i.id, checks, setChecks)} />)}
          </SubSection>
          <SubSection label="운영">
            {CHECKLIST.ops.map(i => <CheckItem key={i.id} checked={!!checks[i.id]} label={i.label} onChange={() => toggle(i.id, checks, setChecks)} />)}
          </SubSection>
          <SubSection label="마감">
            {CHECKLIST.close.map(i => <CheckItem key={i.id} checked={!!checks[i.id]} label={i.label} onChange={() => toggle(i.id, checks, setChecks)} />)}
          </SubSection>
        </Section>

        {/* Closing photos */}
        <Section title="마감 사진">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 12 }}>
            {Array.from({ length: shots }).map((_, i) => (
              <div key={i} style={{ aspectRatio: "1", borderRadius: 12, background: "linear-gradient(150deg,#7B63E6,#A892F2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L8 6H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-4z" /><circle cx="12" cy="13" r="3.4" /></svg>
              </div>
            ))}
          </div>
          <button onClick={onOpenCamera} style={{ width: "100%", height: 48, border: "1.5px dashed var(--p-border)", borderRadius: 13, background: "var(--p-softer)", color: "var(--p)", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L8 6H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-4z" /><circle cx="12" cy="13" r="3.4" /></svg>
            {shots > 0 ? `${shots}장 촬영됨 · 추가하기` : "마감 사진 촬영하기"}
          </button>
        </Section>
      </div>
    </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)", marginBottom: 10 }}>{title}</div>
      <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 16, overflow: "hidden" }}>{children}</div>
    </div>
  );
}

function SubSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ padding: "10px 16px 4px", fontWeight: 600, fontSize: 12, color: "var(--text-sub)", background: "#fafafb" }}>{label}</div>
      {children}
    </div>
  );
}

function CheckItem({ checked, label, onChange }: { checked: boolean; label: string; onChange: () => void }) {
  return (
    <button onClick={onChange} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", background: "none", border: "none", borderTop: "1px solid var(--hairline)", cursor: "pointer", textAlign: "left" }}>
      <div style={{ width: 22, height: 22, borderRadius: 7, border: checked ? "none" : "2px solid rgba(112,115,124,0.3)", background: checked ? "var(--p)" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
        {checked && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5 10 17.5 19 7" /></svg>}
      </div>
      <span style={{ fontWeight: 500, fontSize: 14, color: checked ? "var(--text-sub)" : "var(--text)", textDecoration: checked ? "line-through" : "none", transition: "all 0.15s" }}>{label}</span>
    </button>
  );
}
