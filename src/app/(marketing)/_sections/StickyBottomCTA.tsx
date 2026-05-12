"use client";
import { ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StickyBottomCTA({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 1.5 }}
        className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-5 pt-3 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-[0_-8px_40px_rgba(0,0,0,0.08)]"
      >
        <div className="max-w-[430px] mx-auto flex items-center gap-3">
          <a href="#register" className="flex-1 py-4 bg-brand text-white rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 shadow-lg shadow-brand/30 hover:bg-brand-dark transition-all active:scale-[0.98]">
            무료로 내 가게 등록하기 <ArrowRight className="w-4 h-4"/>
          </a>
          <button onClick={onClose} className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-[#8B95A1] hover:bg-gray-200 transition-colors flex-shrink-0">
            <X className="w-4 h-4"/>
          </button>
        </div>
        <p className="text-center text-[11px] text-[#8B95A1] mt-2">선착순 100곳 한정 · 20,000P 무상 지원</p>
      </motion.div>
    </AnimatePresence>
  );
}
