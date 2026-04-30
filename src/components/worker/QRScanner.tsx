"use client";

import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { Loader2 } from "lucide-react";

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (errorMessage: string) => void;
}

export default function QRScanner({ onScanSuccess, onScanError }: QRScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // html5-qrcode 스캐너 초기화
    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        aspectRatio: 1.0,
      },
      /* verbose= */ false
    );

    const onScanSuccessCallback = (decodedText: string, decodedResult: any) => {
      // 스캔 성공 시 한 번만 호출되도록 스캐너 정리 (또는 외부에서 관리)
      scannerRef.current?.clear().catch(console.error);
      onScanSuccess(decodedText);
    };

    const onScanErrorCallback = (errorMessage: string) => {
      // 주로 QR 코드를 못 찾았을 때 발생하는 로그성 에러
      if (onScanError) {
        onScanError(errorMessage);
      }
    };

    scannerRef.current.render(onScanSuccessCallback, onScanErrorCallback);
    
    // 약간의 딜레이 후 로딩 UI 제거 (카메라 권한 요청 등)
    setTimeout(() => setIsInitializing(false), 800);

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, [onScanSuccess, onScanError]);

  return (
    <div className="relative w-full max-w-sm mx-auto overflow-hidden rounded-2xl bg-black">
      {isInitializing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#16161E] z-10">
          <Loader2 className="w-8 h-8 text-[#5B5BD6] animate-spin mb-4" />
          <p className="text-sm text-[#8888A0]">카메라를 준비하고 있습니다...</p>
        </div>
      )}
      
      {/* html5-qrcode가 이 div 내부에 비디오 태그와 UI를 주입함 */}
      <div id="qr-reader" className="w-full border-none"></div>

      {/* 스타일 오버라이딩 (html5-qrcode 기본 UI를 다크 테마에 맞게 조정) */}
      <style jsx global>{`
        #qr-reader {
          border: none !important;
        }
        #qr-reader__scan_region {
          background-color: black;
        }
        #qr-reader__dashboard {
          background-color: #16161E;
          padding: 16px;
        }
        #qr-reader__dashboard_section_csr span {
          color: #F0F0F5 !important;
          font-family: inherit;
        }
        #html5-qrcode-button-camera-permission,
        #html5-qrcode-button-camera-start,
        #html5-qrcode-button-camera-stop {
          background-color: #5B5BD6 !important;
          color: white !important;
          border: none !important;
          padding: 8px 16px !important;
          border-radius: 8px !important;
          font-weight: 600 !important;
          margin-top: 8px !important;
          cursor: pointer;
        }
        #qr-reader__status_span {
          color: #8888A0 !important;
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
}
