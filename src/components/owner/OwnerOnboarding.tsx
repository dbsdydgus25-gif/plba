"use client";
import { useState } from "react";

interface Step { id: string; title: string; body: string; }
interface Task { id: string; label: string; }

const INIT_STEPS: Step[] = [
  { id: "1", title: "음료 레시피 숙지", body: "메뉴판 옆 레시피 북을 참고하세요. 모르는 메뉴는 선배에게 꼭 물어보세요." },
  { id: "2", title: "포스 사용법", body: "오픈 전 포스 켜기 → 영수증 용지 확인 → 카드단말기 연결 확인." },
  { id: "3", title: "청소 구역 안내", body: "오픈: 홀 테이블 닦기 / 마감: 에스프레소 머신 세척 + 바닥 청소." },
  { id: "4", title: "비상 연락망", body: "점장 010-1234-5678. 지각 시 반드시 30분 전 연락." },
  { id: "5", title: "주차 안내", body: "건물 지하 1층 직원 전용 구역. 시간당 1,000원 지원됩니다." },
];

const INIT_TASKS: Task[] = [
  { id: "t1", label: "오픈 전 원두 2kg 보충" },
  { id: "t2", label: "에스프레소 머신 그룹 헤드 청소" },
  { id: "t3", label: "주간 재고 파악 후 점장님께 보고" },
];

type ModalMode = "add-step" | "edit-step" | "add-task" | "edit-task";

export default function OwnerOnboarding() {
  const [steps, setSteps] = useState<Step[]>(INIT_STEPS);
  const [tasks, setTasks] = useState<Task[]>(INIT_TASKS);
  const [modal, setModal] = useState<{ mode: ModalMode; idx?: number; title: string; body: string } | null>(null);

  function openAddStep() { setModal({ mode: "add-step", title: "", body: "" }); }
  function openEditStep(i: number) { setModal({ mode: "edit-step", idx: i, title: steps[i].title, body: steps[i].body }); }
  function openAddTask() { setModal({ mode: "add-task", title: "", body: "" }); }
  function openEditTask(i: number) { setModal({ mode: "edit-task", idx: i, title: tasks[i].label, body: "" }); }

  function saveModal() {
    if (!modal) return;
    if (modal.mode === "add-step") {
      setSteps([...steps, { id: Date.now().toString(), title: modal.title, body: modal.body }]);
    } else if (modal.mode === "edit-step" && modal.idx !== undefined) {
      setSteps(steps.map((s, i) => i === modal.idx ? { ...s, title: modal.title, body: modal.body } : s));
    } else if (modal.mode === "add-task") {
      setTasks([...tasks, { id: Date.now().toString(), label: modal.title }]);
    } else if (modal.mode === "edit-task" && modal.idx !== undefined) {
      setTasks(tasks.map((t, i) => i === modal.idx ? { ...t, label: modal.title } : t));
    }
    setModal(null);
  }

  function deleteStep(i: number) { setSteps(steps.filter((_, idx) => idx !== i)); }
  function deleteTask(i: number) { setTasks(tasks.filter((_, idx) => idx !== i)); }

  return (
    <div style={{ animation: "fadeUp .3s ease" }}>
      {/* Banner */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, background: "var(--p-soft)", borderRadius: 14, padding: "13px 16px", marginBottom: 22 }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--p-tint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 8v4.5M12 16v.5" /></svg>
        <span style={{ fontWeight: 500, fontSize: 13, color: "var(--p-tint)" }}>신규 알바생이 처음 입장하면 이 내용이 자동으로 표시돼요.</span>
      </div>

      {/* Onboarding steps */}
      <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 22, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ fontWeight: 700, fontSize: 16, color: "var(--text)" }}>가게 안내 항목</span>
          <button onClick={openAddStep} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 13px", background: "var(--p)", border: "none", borderRadius: 9, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
            항목 추가
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {steps.map((s, i) => (
            <div key={s.id} style={{ display: "flex", gap: 14, background: "#fafafb", border: "1px solid var(--hairline)", borderRadius: 14, padding: 16 }}>
              <div style={{ width: 30, height: 30, flexShrink: 0, borderRadius: 10, background: "var(--p-soft)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "var(--p-tint)" }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{s.title}</div>
                <div style={{ fontWeight: 500, fontSize: 12, color: "var(--text-sub)", marginTop: 3, lineHeight: 1.5 }}>{s.body}</div>
              </div>
              <div style={{ display: "flex", gap: 6, alignSelf: "flex-start" }}>
                <button onClick={() => openEditStep(i)} style={{ width: 30, height: 30, border: "none", borderRadius: 8, background: "#f1f1f3", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-sub)" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                </button>
                <button onClick={() => deleteStep(i)} style={{ width: 30, height: 30, border: "none", borderRadius: 8, background: "var(--negative-bg)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--negative)" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today tasks */}
      <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: 18, padding: 22 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ fontWeight: 700, fontSize: 16, color: "var(--text)" }}>오늘 할 일</span>
          <button onClick={openAddTask} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 13px", background: "var(--p)", border: "none", borderRadius: 9, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
            할 일 추가
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tasks.map((t, i) => (
            <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#fafafb", border: "1px solid var(--hairline)", borderRadius: 13 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--p)", flexShrink: 0 }} />
              <span style={{ flex: 1, fontWeight: 600, fontSize: 14, color: "var(--text)" }}>{t.label}</span>
              <button onClick={() => openEditTask(i)} style={{ width: 28, height: 28, border: "none", borderRadius: 7, background: "#f1f1f3", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-sub)" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
              </button>
              <button onClick={() => deleteTask(i)} style={{ width: 28, height: 28, border: "none", borderRadius: 7, background: "var(--negative-bg)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--negative)" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setModal(null)}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 28, width: 400, boxShadow: "0 24px 60px rgba(0,0,0,0.24)" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 800, fontSize: 17, color: "var(--text)", marginBottom: 18 }}>
              {modal.mode === "add-step" ? "항목 추가" : modal.mode === "edit-step" ? "항목 수정" : modal.mode === "add-task" ? "할 일 추가" : "할 일 수정"}
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", display: "block", marginBottom: 6 }}>제목</label>
              <input value={modal.title} onChange={e => setModal({ ...modal, title: e.target.value })} placeholder="제목 입력" style={{ width: "100%", height: 44, border: "1.5px solid var(--p-border)", borderRadius: 11, padding: "0 14px", fontSize: 14, fontFamily: "Pretendard", fontWeight: 500, outline: "none" }} />
            </div>
            {(modal.mode === "add-step" || modal.mode === "edit-step") && (
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", display: "block", marginBottom: 6 }}>설명</label>
                <textarea value={modal.body} onChange={e => setModal({ ...modal, body: e.target.value })} rows={3} placeholder="설명 입력" style={{ width: "100%", border: "1.5px solid var(--p-border)", borderRadius: 11, padding: "12px 14px", fontSize: 14, fontFamily: "Pretendard", fontWeight: 500, outline: "none", resize: "none" }} />
              </div>
            )}
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setModal(null)} style={{ flex: 1, height: 48, border: "1px solid var(--hairline)", borderRadius: 13, background: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>취소</button>
              <button onClick={saveModal} disabled={!modal.title.trim()} style={{ flex: 1, height: 48, border: "none", borderRadius: 13, background: modal.title.trim() ? "var(--p)" : "rgba(112,115,124,0.2)", color: modal.title.trim() ? "#fff" : "var(--text-sub)", fontWeight: 700, fontSize: 14, cursor: modal.title.trim() ? "pointer" : "not-allowed" }}>저장</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
