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
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/96 backdrop-blur-xl border-t border-gray-200 shadow-[0_-8px_40px_rgba(0,0,0,0.10)]"
      >
        <div className="max-w-[430px] mx-auto px-4 pt-3 pb-5">
          {/* recatch 스타일 — 질문 + 버튼 분리 */}
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-[12.5px] font-semibold text-[#6B7684] leading-[1.35] flex-1 pr-3">
              결제된 만큼만 광고비 내고 싶다면?
            </p>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[#8B95A1] hover:bg-gray-200 transition-colors flex-shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <a
            href="#register"
            className="flex items-center justify-center w-full py-3.5 bg-[#5b5bd6] text-white rounded-2xl font-bold text-[15px] gap-2 shadow-lg shadow-[#5b5bd6]/30 active:scale-[0.98] transition-all"
          >
            선착순 37곳 남음 · 지금 무료 등록 <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
