"use client";

import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget, PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { Loader2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid"; // We'll need uuid for unique order IDs. Let's just use crypto.randomUUID or a simple generator

interface TossPaymentWidgetProps {
  storeId: string;
  storeName: string;
}

export default function TossPaymentWidget({ storeId, storeName }: TossPaymentWidgetProps) {
  const [paymentWidget, setPaymentWidget] = useState<PaymentWidgetInstance | null>(null);
  const [price, setPrice] = useState(10000); // 기본 충전 금액 1만 원
  const [isWidgetLoading, setIsWidgetLoading] = useState(true);

  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
  const customerKey = storeId; // 매장 ID를 고객 키로 사용

  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const widget = await loadPaymentWidget(clientKey, customerKey);
        setPaymentWidget(widget);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    };

    fetchPaymentWidget();
  }, [clientKey, customerKey]);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: price },
      { variantKey: "DEFAULT" }
    );

    paymentWidget.renderAgreement(
      "#agreement", 
      { variantKey: "AGREEMENT" }
    );

    paymentMethodsWidget.on("ready", () => {
      setIsWidgetLoading(false);
    });

  }, [paymentWidget, price]);

  const handlePaymentRequest = async () => {
    if (!paymentWidget) return;
    
    // 단순한 유니크 주문번호 생성
    const orderId = `order_${storeId.substring(0, 8)}_${Date.now()}`;

    try {
      await paymentWidget.requestPayment({
        orderId: orderId,
        orderName: `${storeName} 포인트 충전 (${price.toLocaleString()}원)`,
        successUrl: `${window.location.origin}/owner/points/success`,
        failUrl: `${window.location.origin}/owner/points/fail`,
        customerEmail: "owner@plusalba.com", // 임시 (실제로는 점주 이메일)
        customerName: storeName,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const priceOptions = [10000, 30000, 50000, 100000];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold text-[#8888A0] mb-3">충전 금액 선택</h3>
        <div className="grid grid-cols-2 gap-3">
          {priceOptions.map((amount) => (
            <button
              key={amount}
              onClick={() => setPrice(amount)}
              className={`py-3 rounded-xl border font-bold transition-all ${
                price === amount 
                  ? "bg-[#5B5BD6]/20 border-[#5B5BD6] text-[#5B5BD6]" 
                  : "bg-[#16161E] border-white/5 text-[#F0F0F5]"
              }`}
            >
              {amount.toLocaleString()}원
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-2 relative min-h-[300px]">
        {isWidgetLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10 rounded-2xl">
            <Loader2 className="w-8 h-8 text-[#3182F6] animate-spin mb-2" />
            <p className="text-sm text-gray-500 font-medium">결제 모듈을 불러오는 중...</p>
          </div>
        )}
        <div id="payment-widget" className="w-full" />
        <div id="agreement" className="w-full" />
      </div>

      <button
        onClick={handlePaymentRequest}
        disabled={isWidgetLoading}
        className="w-full rounded-2xl bg-[#3182F6] text-white font-bold py-4 text-lg mt-2 flex items-center justify-center disabled:opacity-50"
      >
        {price.toLocaleString()}원 충전하기
      </button>
    </div>
  );
}
