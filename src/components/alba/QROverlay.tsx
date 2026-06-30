"use client";
import { useState, useEffect } from "react";

const QR_PATTERN = (() => {
  const cells: boolean[] = [];
  for (let r = 0; r < 13; r++) {
    for (let c = 0; c < 13; c++) {
      const inTL = r < 5 && c < 5;
      const inTR = r < 5 && c > 7;
      const inBL = r > 7 && c < 5;
      if (inTL || inTR || inBL) { cells.push(true); continue; }
      cells.push(Math.random() > 0.5);
    }
  }
  return cells;
})();

export default function QROverlay({ mode, onSuccess, onClose }: {
  mode: "in" | "out";
  onSuccess: () => void;
  onClose: () => void;
}) {
  const [state, setState] = useState<"scanning" | "success">("scanning");
  const [successTime, setSuccessTime] = useState("");

  useEffect(() => {
    const t1 = setTimeout(() => {
      const now = new Date();
      setSuccessTime(`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
      setState("success");
      onSuccess();
    }, 1900);
    return () => clearTimeout(t1);
  }, [onSuccess]);

  const title = mode === "in" ? "QR 출근" : "QR 퇴근";
  const successTitle = mode === "in" ? "출근 완료!" : "퇴근 완료!";

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center" }}>
    <div style={{ width: "100%", maxWidth: 430, background: "#0c0c10", overflow: "hidden", animation: "fadeUp .25s ease", position: "relative" }}>
      {/* Status */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 48, zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 6 }}>
        <span style={{ fontWeight: 600, fontSize: 14, color: "#fff" }}>9:41</span>
      </div>

      {/* Close */}
      <button onClick={onClose} style={{ position: "absolute", top: 54, left: 20, zIndex: 3, width: 38, height: 38, border: "none", borderRadius: "50%", background: "rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
      </button>

      {/* Header */}
      <div style={{ position: "absolute", top: 60, left: 0, right: 0, textAlign: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 17, color: "#fff" }}>{title}</div>
        <div style={{ fontWeight: 500, fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>매장에 부착된 QR을 카메라에 비춰주세요</div>
      </div>

      {/* Viewfinder */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 240, height: 240 }}>
        {state === "scanning" && (
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <div style={{ position: "absolute", inset: 0, background: "#fff", borderRadius: 20, padding: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(13,1fr)", gridTemplateRows: "repeat(13,1fr)", width: "100%", height: "100%", gap: 1 }}>
                {QR_PATTERN.map((filled, i) => (
                  <span key={i} style={{ background: filled ? "#0f0f10" : "#fff", borderRadius: 1 }} />
                ))}
              </div>
            </div>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,transparent,var(--p),transparent)", boxShadow: "0 0 16px 3px var(--p)", animation: "scanline 2s ease-in-out infinite" }} />
            {/* Corners */}
            {[
              { top: -2, left: -2, borderTop: "4px solid var(--p)", borderLeft: "4px solid var(--p)", borderRadius: "14px 0 0 0" },
              { top: -2, right: -2, borderTop: "4px solid var(--p)", borderRight: "4px solid var(--p)", borderRadius: "0 14px 0 0" },
              { bottom: -2, left: -2, borderBottom: "4px solid var(--p)", borderLeft: "4px solid var(--p)", borderRadius: "0 0 0 14px" },
              { bottom: -2, right: -2, borderBottom: "4px solid var(--p)", borderRight: "4px solid var(--p)", borderRadius: "0 0 14px 0" },
            ].map((s, i) => (
              <span key={i} style={{ position: "absolute", width: 34, height: 34, ...s }} />
            ))}
          </div>
        )}
        {state === "success" && (
          <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--p)", animation: "ringPulse 1.2s ease-out infinite" }} />
              <div style={{ position: "relative", width: 96, height: 96, borderRadius: "50%", background: "var(--p)", display: "flex", alignItems: "center", justifyContent: "center", animation: "popIn .5s cubic-bezier(.2,.8,.3,1.2)" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5 10 17.5 19 7" /></svg>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom status */}
      <div style={{ position: "absolute", bottom: 84, left: 0, right: 0, textAlign: "center", animation: "fadeUp .3s ease" }}>
        {state === "scanning" && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "rgba(255,255,255,0.1)", borderRadius: 9999 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--p)", animation: "softPulse 1s infinite" }} />
            <span style={{ fontWeight: 600, fontSize: 14, color: "#fff" }}>스캔 중...</span>
          </div>
        )}
        {state === "success" && (
          <div>
            <div style={{ fontWeight: 800, fontSize: 20, color: "#fff" }}>{successTitle}</div>
            <div style={{ fontWeight: 600, fontSize: 15, color: "var(--p-soft)", marginTop: 4 }}>{successTime}</div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
