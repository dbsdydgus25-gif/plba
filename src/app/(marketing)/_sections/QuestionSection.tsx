"use client";
import { motion } from "framer-motion";

const QUESTIONS = [
  "전단지 돌렸는데 오늘 몇 명 왔는지 알 수 없고...",
  "배달앱 수수료 내면 팔아도 남는 게 없고...",
  "인스타 광고비 썼는데 클릭만 있고 매출은 없고...",
  "체험단 불렀는데 노쇼에 후기도 없고...",
  "그냥 성과가 날 때만 돈 내고 싶고..."
];

export default function QuestionSection() {
  return (
    <section className="py-24 px-5 bg-[#191F28] text-white">
      <div className="max-w-lg mx-auto">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="text-center mb-14">
          <p className="text-brand font-bold text-sm tracking-widest uppercase mb-4">사장님들의 고민</p>
          <h2 className="text-[28px] sm:text-[36px] font-extrabold leading-[1.3]">
            이런 고민,<br />해보신 적 있나요?
          </h2>
        </motion.div>

        <div className="space-y-4 mb-16">
          {QUESTIONS.map((q, i) => (
            <motion.div
              key={i}
              initial={{opacity:0,x:-20}}
              whileInView={{opacity:1,x:0}}
              viewport={{once:true}}
              transition={{duration:0.5,delay:i*0.1}}
              className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-5"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white/10 text-[#8B95A1] text-sm font-bold flex items-center justify-center mt-0.5">{i+1}</span>
              <p className="text-[15px] sm:text-[17px] text-[#B0B8C1] leading-[1.6]">{q}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{opacity:0,scale:0.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:0.6}} className="text-center bg-brand/20 border border-brand/30 rounded-3xl p-8">
          <p className="text-[13px] text-brand font-bold tracking-widest uppercase mb-3">해답</p>
          <h3 className="text-[24px] sm:text-[30px] font-extrabold leading-[1.3]">
            이 모든 고민의 답,<br /><span className="text-brand">플바에 담았습니다.</span>
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
