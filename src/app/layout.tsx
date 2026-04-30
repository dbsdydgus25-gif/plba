import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "플바 (+알바) - 로컬 마케팅 파트너스",
  description: "오프라인 매장 무료 근태관리 + 로컬 리워드 마케팅 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="bg-white min-h-screen flex flex-col font-sans text-gray-900">
        {children}
      </body>
    </html>
  );
}

