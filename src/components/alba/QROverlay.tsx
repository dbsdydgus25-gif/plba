"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import jsQR from "jsqr";

export default function QROverlay({ mode, storeCode, onSuccess, onClose }: {
  mode: "in" | "out";
  storeCode?: string;
  onSuccess: () => void;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number>(0);
  const [state, setState] = useState<"scanning" | "success" | "error">("scanning");
  const [successTime, setSuccessTime] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const doneRef = useRef(false);

  const stopCamera = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
  }, []);

  const handleSuccess = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    stopCamera();
    const now = new Date();
    setSuccessTime(`${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`);
    setState("success");
    onSuccess();
  }, [stopCamera, onSuccess]);

  useEffect(() => {
    let cancelled = false;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });
        if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        scan();
      } catch {
        if (!cancelled) {
          setErrorMsg("카메라 권한이 필요해요. 브라우저 설정에서 허용해주세요.");
          setState("error");
        }
      }
    }

    function scan() {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas || doneRef.current) return;
      if (video.readyState < video.HAVE_ENOUGH_DATA) {
        rafRef.current = requestAnimationFrame(scan);
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code) {
        // plba.co.kr/qr/{storeCode} 형식 검증
        const url = code.data;
        const match = url.match(/\/qr\/(\w+)/);
        const scannedCode = match?.[1];
        if (storeCode && scannedCode !== storeCode) {
          setErrorMsg("다른 매장의 QR이에요. 우리 매장 QR을 찍어주세요.");
          setState("error");
          stopCamera();
          return;
        }
        handleSuccess();
        return;
      }
      rafRef.current = requestAnimationFrame(scan);
    }

    startCamera();
    return () => {
      cancelled = true;
      stopCamera();
    };
  }, [handleSuccess, stopCamera, storeCode]);

  const title = mode === "in" ? "QR 출근" : "QR 퇴근";
  const successTitle = mode === "in" ? "출근 완료!" : "퇴근 완료!";

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 40, background: "#0c0c10", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 430, position: "relative", overflow: "hidden" }}>
        {/* 실제 카메라 화면 */}
        <video
          ref={videoRef}
          playsInline
          muted
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: state === "scanning" ? 1 : 0 }}
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* 어두운 오버레이 */}
        {state === "scanning" && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
        )}

        {/* 닫기 버튼 */}
        <button onClick={() => { stopCamera(); onClose(); }} style={{ position: "absolute", top: 54, left: 20, zIndex: 10, width: 38, height: 38, border: "none", borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>

        {/* 헤더 */}
        <div style={{ position: "absolute", top: 60, left: 0, right: 0, textAlign: "center", zIndex: 5 }}>
          <div style={{ fontWeight: 700, fontSize: 17, color: "#fff" }}>{title}</div>
          {state === "scanning" && (
            <div style={{ fontWeight: 500, fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>매장에 부착된 QR을 카메라에 비춰주세요</div>
          )}
        </div>

        {/* 스캔 중: 뷰파인더 */}
        {state === "scanning" && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-52%)", width: 240, height: 240, zIndex: 5 }}>
            {/* 모서리 */}
            {[
              { top: -2, left: -2, borderTop: "4px solid var(--p)", borderLeft: "4px solid var(--p)", borderRadius: "14px 0 0 0" },
              { top: -2, right: -2, borderTop: "4px solid var(--p)", borderRight: "4px solid var(--p)", borderRadius: "0 14px 0 0" },
              { bottom: -2, left: -2, borderBottom: "4px solid var(--p)", borderLeft: "4px solid var(--p)", borderRadius: "0 0 0 14px" },
              { bottom: -2, right: -2, borderBottom: "4px solid var(--p)", borderRight: "4px solid var(--p)", borderRadius: "0 0 14px 0" },
            ].map((s, i) => (
              <span key={i} style={{ position: "absolute", width: 34, height: 34, ...s }} />
            ))}
            {/* 스캔 라인 */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,transparent,var(--p),transparent)", boxShadow: "0 0 16px 3px var(--p)", animation: "scanline 2s ease-in-out infinite" }} />
          </div>
        )}

        {/* 성공 */}
        {state === "success" && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 5 }}>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--p)", animation: "ringPulse 1.2s ease-out infinite" }} />
              <div style={{ position: "relative", width: 96, height: 96, borderRadius: "50%", background: "var(--p)", display: "flex", alignItems: "center", justifyContent: "center", animation: "popIn .5s cubic-bezier(.2,.8,.3,1.2)" }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5 10 17.5 19 7" /></svg>
              </div>
            </div>
            <div style={{ marginTop: 28, fontWeight: 800, fontSize: 22, color: "#fff" }}>{successTitle}</div>
            <div style={{ fontWeight: 600, fontSize: 16, color: "rgba(255,255,255,0.7)", marginTop: 6 }}>{successTime}</div>
          </div>
        )}

        {/* 오류 */}
        {state === "error" && (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", zIndex: 5 }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(239,68,68,0.2)", border: "2px solid #EF4444", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#fff", textAlign: "center", lineHeight: 1.5 }}>{errorMsg}</div>
            <button onClick={() => { doneRef.current = false; setState("scanning"); }} style={{ marginTop: 24, padding: "12px 28px", borderRadius: 12, border: "none", background: "var(--p)", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
              다시 시도
            </button>
          </div>
        )}

        {/* 하단 상태 */}
        {state === "scanning" && (
          <div style={{ position: "absolute", bottom: 84, left: 0, right: 0, textAlign: "center", zIndex: 5 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "rgba(0,0,0,0.5)", borderRadius: 9999 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--p)", animation: "softPulse 1s infinite" }} />
              <span style={{ fontWeight: 600, fontSize: 14, color: "#fff" }}>스캔 중...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
