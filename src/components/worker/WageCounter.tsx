"use client";

import { useEffect, useState } from "react";
import { PlayCircle } from "lucide-react";

interface WageCounterProps {
  clockInAt: string | null;
  hourlyWage: number;
}

export default function WageCounter({ clockInAt, hourlyWage }: WageCounterProps) {
  const [estimatedWage, setEstimatedWage] = useState(0);
  const [workingTimeStr, setWorkingTimeStr] = useState("0시간 0분");

  useEffect(() => {
    if (!clockInAt) {
      setEstimatedWage(0);
      setWorkingTimeStr("0시간 0분");
      return;
    }

    const clockInTime = new Date(clockInAt).getTime();

    const calculateWage = () => {
      const now = Date.now();
      const diffMs = now - clockInTime;
      
      // 근무 시간 문자열 포맷팅
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      setWorkingTimeStr(`${hours}시간 ${minutes}분`);

      // 실시간 예상 급여 계산 (소수점 버림)
      const wage = Math.floor((diffMs / (1000 * 60 * 60)) * hourlyWage);
      setEstimatedWage(wage > 0 ? wage : 0);
    };

    // 초기 1회 실행
    calculateWage();

    // 1초마다 갱신
    const interval = setInterval(calculateWage, 1000);

    return () => clearInterval(interval);
  }, [clockInAt, hourlyWage]);

  if (!clockInAt) {
    return (
      <div className="flex flex-col items-center justify-center py-6">
        <p className="text-text-muted mb-2">오늘의 예상 급여</p>
        <div className="text-4xl font-inter font-bold text-text-secondary">
          0<span className="text-2xl font-sans ml-1 text-text-muted">원</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="badge badge-mint mb-4 animate-fade-in">
        <span className="pulse-dot mr-1"></span>
        현재 근무중 ({workingTimeStr})
      </div>
      
      <p className="text-text-muted mb-1">실시간 예상 급여</p>
      
      <div className="flex items-end gap-1 counter-animate">
        <span className="text-5xl font-inter font-black tracking-tight text-text-primary">
          {estimatedWage.toLocaleString()}
        </span>
        <span className="text-2xl font-bold text-text-secondary mb-1">원</span>
      </div>
    </div>
  );
}
