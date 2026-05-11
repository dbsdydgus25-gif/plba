"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function StatCard({ target, unit, label, sub }: { target: number; unit: string; label: string; sub: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start: number;
      const duration = 1800;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        setVal(Math.floor(p * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return (
    <div ref={ref} className="text-center py-8 px-4 rounded-2xl bg-[#141414] border border-white/5">
      <div className="text-[36px] sm:text-[44px] font-extrabold text-brand leading-none mb-2 tabular-nums">
        {val.toLocaleString()}{unit}
      </div>
      <div className="text-[14px] font-bold text-white mb-1">{label}</div>
      <div className="text-[12px] text-[#4E5968]">{sub}</div>
    </div>
  );
}

const STATS = [
  { target: 847, unit: "곳", label: "등록 사장님", sub: "전국 오프라인 매장" },
  { target: 3200, unit: "명", label: "파트너스", sub: "자발적 홍보 인원" },
  { target: 94, unit: "%", label: "만족도", sub: "이용 사장님 기준" },
];

export default function CounterSection() {
  return (
    <section className="py-16 px-5 bg-[#0D0D0D] border-t border-white/5">
      <div className="max-w-lg mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[12px] font-bold tracking-[0.25em] text-[#4E5968] uppercase mb-8"
        >
          숫자로 증명합니다
        </motion.p>
        <div className="grid grid-cols-3 gap-3">
          {STATS.map((s, i) => <StatCard key={i} {...s} />)}
        </div>
      </div>
    </section>
  );
}
