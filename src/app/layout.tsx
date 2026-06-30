import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "plba — QR 알바 근태관리",
  description: "매장 QR 하나로 끝내는 알바 출퇴근 관리 서비스",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" async />
      </head>
      <body>{children}</body>
    </html>
  );
}
