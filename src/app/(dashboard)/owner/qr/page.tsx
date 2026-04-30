import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft } from "lucide-react";

export default async function OwnerQRPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // 점주 본인 매장 조회
  const { data: store } = await supabase
    .from("stores")
    .select("id, name")
    .eq("owner_id", user.id)
    .maybeSingle();

  if (!store) redirect("/owner/setup");

  // 출퇴근용 QR 코드에 담길 데이터 (JSON 형식)
  const qrPayload = JSON.stringify({
    type: "attendance",
    storeId: store.id,
  });

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#FFFFFF] text-[#1A1A24]">
      {/* 헤더 */}
      <div className="px-5 pt-14 pb-5 border-b border-white/5 flex items-center gap-3">
        <Link href="/owner" className="p-2 -ml-2 text-[#8888A0] hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">출퇴근 QR 생성</h1>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-[#1A1A24]">{store.name}</h2>
          <p className="text-[#8888A0] text-sm">
            알바생이 이 QR 코드를 스캔하여<br />출근 및 퇴근을 기록할 수 있습니다.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-xl">
          <QRCodeSVG
            value={qrPayload}
            size={240}
            bgColor={"#ffffff"}
            fgColor={"#F8F9FA"}
            level={"H"} // High error correction
            includeMargin={false}
          />
        </div>

        <div className="card-sm bg-[#F8F9FA] border border-[#5B5BD6]/30 text-center w-full max-w-sm">
          <p className="text-[#5B5BD6] font-medium text-sm mb-1">
            카운터나 입구에 비치해두세요.
          </p>
          <p className="text-[#8888A0] text-xs">
            이 화면을 켜두거나 캡처해서 프린트하여 사용할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
