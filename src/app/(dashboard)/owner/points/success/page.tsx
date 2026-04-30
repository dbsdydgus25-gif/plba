import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { paymentKey: string; orderId: string; amount: string };
}) {
  const { paymentKey, orderId, amount } = searchParams;

  if (!paymentKey || !orderId || !amount) {
    redirect("/owner/points");
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // 점주 매장 확인
  const { data: store } = await supabase
    .from("stores")
    .select("id")
    .eq("owner_id", user.id)
    .single();

  if (!store) redirect("/owner/setup");

  const secretKey = process.env.TOSS_SECRET_KEY || "test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R";
  const encryptedSecretKey = Buffer.from(`${secretKey}:`).toString("base64");

  let isSuccess = false;
  let errorMessage = "";

  try {
    // 1. 토스 페이먼츠 결제 승인 API 호출
    const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
      method: "POST",
      headers: {
        Authorization: `Basic ${encryptedSecretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount: Number(amount),
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // 2. 결제 승인 성공 시 DB 업데이트
      
      // point_charges 테이블에 기록 (존재한다고 가정)
      // 실제 구현 시 point_charges 테이블 스키마에 맞게 조정 필요
      // 현재 스키마에 point_charges 가 없다면 store_points 만 업데이트
      
      const chargeAmount = Number(amount);
      
      // store_points 잔액 증가 (RPC 호출 권장되나 임시로 upsert 또는 select 후 update 사용)
      const { data: currentPoint } = await supabase
        .from("store_points")
        .select("balance")
        .eq("store_id", store.id)
        .maybeSingle();
        
      const currentBalance = currentPoint?.balance || 0;
      
      await supabase
        .from("store_points")
        .upsert({
          store_id: store.id,
          balance: currentBalance + chargeAmount
        });
        
      // point_charges 기록 (스키마에 존재 시)
      await supabase
        .from("point_charges")
        .insert({
          store_id: store.id,
          amount: chargeAmount,
          payment_key: paymentKey,
          status: "success"
        });

      isSuccess = true;
    } else {
      isSuccess = false;
      errorMessage = data.message || "결제 승인에 실패했습니다.";
    }
  } catch (err) {
    console.error(err);
    isSuccess = false;
    errorMessage = "결제 처리 중 오류가 발생했습니다.";
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#FFFFFF] text-[#1A1A24] items-center justify-center p-6">
      {isSuccess ? (
        <div className="flex flex-col items-center text-center animate-fade-in">
          <div className="w-20 h-20 bg-[#00C896]/20 rounded-full flex items-center justify-center mb-6 text-[#00C896]">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold mb-2">포인트 충전 완료!</h1>
          <p className="text-[#8888A0] mb-8">
            <span className="text-white font-bold">{Number(amount).toLocaleString()}P</span>가 성공적으로 충전되었습니다.
          </p>
          <Link href="/owner/points" className="w-full max-w-sm rounded-2xl bg-[#5B5BD6] text-white font-bold py-4 text-lg">
            돌아가기
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center animate-fade-in">
          <div className="w-20 h-20 bg-[#FF4D6D]/20 rounded-full flex items-center justify-center mb-6 text-[#FF4D6D]">
            <XCircle className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold mb-2">결제 실패</h1>
          <p className="text-[#8888A0] mb-8 max-w-xs break-keep">
            {errorMessage}
          </p>
          <Link href="/owner/points" className="w-full max-w-sm rounded-2xl bg-[#F8F9FA] border border-white/10 text-white font-bold py-4 text-lg">
            다시 시도하기
          </Link>
        </div>
      )}
    </div>
  );
}
