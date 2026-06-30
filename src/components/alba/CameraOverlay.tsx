"use client";
import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

export default function CameraOverlay({ onClose, onQrDetected }: {
  onClose: () => void;
  onQrDetected?: (data: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number>(0);
  const [error, setError] = useState("");
  const [detected, setDetected] = useState("");

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        videoRef.current.onloadedmetadata = () => scanLoop();
      }
    } catch {
      setError("카메라 권한이 필요해요.\n브라우저 설정에서 카메라를 허용해주세요.");
    }
  }

  function stopCamera() {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach(t => t.stop());
  }

  function scanLoop() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      rafRef.current = requestAnimationFrame(scanLoop);
      return;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const qr = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });
    if (qr?.data) {
      setDetected(qr.data);
      stopCamera();
      onQrDetected?.(qr.data);
      setTimeout(onClose, 1200);
      return;
    }
    rafRef.current = requestAnimationFrame(scanLoop);
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 44, background: "#000", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 430, position: "relative", background: "#000" }}>

        {/* 실제 카메라 영상 */}
        <video ref={videoRef} playsInline muted style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* 어두운 오버레이 + 스캔 윈도우 */}
        {!error && !detected && (
          <>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
            {/* 스캔 사각형 */}
            <div style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%,-60%)",
              width: 220, height: 220,
              boxShadow: "0 0 0 9999px rgba(0,0,0,0.55)",
              borderRadius: 16,
            }}>
              {/* 모서리 가이드 */}
              {[{t:0,l:0},{t:0,r:0},{b:0,l:0},{b:0,r:0}].map((pos,i)=>(
                <span key={i} style={{
                  position:"absolute", width:36, height:36,
                  borderTop: i<2?"3px solid #fff":undefined,
                  borderBottom: i>=2?"3px solid #fff":undefined,
                  borderLeft: i%2===0?"3px solid #fff":undefined,
                  borderRight: i%2!==0?"3px solid #fff":undefined,
                  borderRadius: i===0?"12px 0 0 0":i===1?"0 12px 0 0":i===2?"0 0 0 12px":"0 0 12px 0",
                  top:"t" in pos?(pos as {t:number}).t:undefined,
                  bottom:"b" in pos?(pos as {b:number}).b:undefined,
                  left:"l" in pos?(pos as {l:number}).l:undefined,
                  right:"r" in pos?(pos as {r:number}).r:undefined,
                }} />
              ))}
              {/* 스캔 라인 */}
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,transparent,var(--p),transparent)", animation:"scanLine 2s linear infinite" }} />
            </div>
            <div style={{ position:"absolute", top:"calc(50% - 60% + 130px)", left:0, right:0, textAlign:"center", color:"rgba(255,255,255,0.8)", fontWeight:600, fontSize:14 }}>
              QR 코드를 사각형 안에 맞춰주세요
            </div>
          </>
        )}

        {/* QR 인식 성공 */}
        {detected && (
          <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.8)" }}>
            <div style={{ width:72, height:72, borderRadius:"50%", background:"#22c55e", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5 10 17.5 19 7"/></svg>
            </div>
            <div style={{ color:"#fff", fontWeight:800, fontSize:20 }}>QR 인식 완료!</div>
            <div style={{ color:"rgba(255,255,255,0.6)", fontSize:13, marginTop:6, maxWidth:240, textAlign:"center", wordBreak:"break-all" }}>{detected}</div>
          </div>
        )}

        {/* 카메라 오류 */}
        {error && (
          <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, background:"rgba(0,0,0,0.9)" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom:20}}><path d="M14.5 4h-5L8 6H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-4z"/><circle cx="12" cy="13" r="3.4"/><line x1="2" y1="2" x2="22" y2="22" stroke="rgba(255,80,80,0.8)"/></svg>
            <div style={{ color:"#fff", fontWeight:700, fontSize:16, textAlign:"center", whiteSpace:"pre-line" }}>{error}</div>
            <button onClick={onClose} style={{ marginTop:24, padding:"12px 28px", border:"1.5px solid rgba(255,255,255,0.4)", borderRadius:12, background:"transparent", color:"#fff", fontWeight:700, fontSize:15, cursor:"pointer" }}>
              닫기
            </button>
          </div>
        )}

        {/* 상단 닫기 */}
        {!detected && (
          <button onClick={() => { stopCamera(); onClose(); }} style={{ position:"absolute", top:16, left:16, width:38, height:38, border:"none", borderRadius:"50%", background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", zIndex:10 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
          </button>
        )}
      </div>

      <style>{`
        @keyframes scanLine {
          0% { top: 0; }
          100% { top: calc(100% - 2px); }
        }
      `}</style>
    </div>
  );
}
