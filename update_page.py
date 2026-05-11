import re

with open("src/app/(marketing)/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Update imports
content = content.replace(
    'import { ArrowRight, Store, ShieldCheck, ChevronRight } from "lucide-react";',
    'import { ArrowRight, Store, ShieldCheck, ChevronRight, Wallet, Gift, Camera, QrCode, CheckCircle2 } from "lucide-react";'
)

# Replace section 4
section_4_start = content.find('{/* 4. HOW IT WORKS */}')
section_5_start = content.find('{/* 5. COMPARISON */}')

if section_4_start != -1 and section_5_start != -1:
    new_section_4 = """{/* 4. HOW IT WORKS */}
      <section className="py-24 md:py-32 px-6 bg-[#191F28] text-white overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-[30px] md:text-[42px] font-extrabold tracking-tight mb-6 leading-[1.4] break-keep">
              앱 하나로 끝나는<br className="block md:hidden"/> 초간단 5단계 마케팅
            </h2>
            <p className="text-[18px] md:text-[20px] text-[#8B95A1] font-medium leading-[1.8] break-keep">
              복잡한 기기 설치 없이, 사장님 스마트폰 하나면 충분합니다.
            </p>
          </div>

          <div className="relative border-l-2 border-[#333D4B] ml-6 md:ml-1/2 space-y-16 pb-8">
            
            {/* Step 1 */}
            <div className="relative pl-12 md:pl-0 md:flex md:items-center md:justify-between w-full">
              <div className="absolute left-[-17px] md:left-1/2 md:-ml-[17px] w-8 h-8 bg-[#242A32] border-2 border-brand rounded-full flex items-center justify-center z-10">
                <span className="text-brand text-sm font-bold">1</span>
              </div>
              <div className="md:w-5/12 md:text-right md:pr-12">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#333D4B] mb-6 md:ml-auto md:mr-0">
                  <Wallet className="w-7 h-7 text-[#B0B8C1]" />
                </div>
                <h3 className="text-[22px] md:text-[24px] font-bold mb-3 text-white">포인트 충전</h3>
                <p className="text-[16px] md:text-[17px] text-[#B0B8C1] leading-[1.8] break-keep">
                  원하는 만큼만 마케팅 예산을 간편하게 충전하세요.
                </p>
              </div>
              <div className="hidden md:block md:w-5/12"></div>
            </div>

            {/* Step 2 */}
            <div className="relative pl-12 md:pl-0 md:flex md:items-center md:justify-between w-full">
              <div className="absolute left-[-17px] md:left-1/2 md:-ml-[17px] w-8 h-8 bg-[#242A32] border-2 border-brand rounded-full flex items-center justify-center z-10">
                <span className="text-brand text-sm font-bold">2</span>
              </div>
              <div className="hidden md:block md:w-5/12"></div>
              <div className="md:w-5/12 md:pl-12">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand/20 mb-6">
                  <Gift className="w-7 h-7 text-brand" />
                </div>
                <h3 className="text-[22px] md:text-[24px] font-bold mb-3 text-white">이벤트/리워드 설정</h3>
                <p className="text-[16px] md:text-[17px] text-[#B0B8C1] leading-[1.8] break-keep">
                  방문 손님에게 제공할 할인 혜택이나 리워드를 직접 설정합니다.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative pl-12 md:pl-0 md:flex md:items-center md:justify-between w-full">
              <div className="absolute left-[-17px] md:left-1/2 md:-ml-[17px] w-8 h-8 bg-[#242A32] border-2 border-brand rounded-full flex items-center justify-center z-10">
                <span className="text-brand text-sm font-bold">3</span>
              </div>
              <div className="md:w-5/12 md:text-right md:pr-12">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#333D4B] mb-6 md:ml-auto md:mr-0">
                  <Camera className="w-7 h-7 text-[#B0B8C1]" />
                </div>
                <h3 className="text-[22px] md:text-[24px] font-bold mb-3 text-white">홍보 사진 업로드</h3>
                <p className="text-[16px] md:text-[17px] text-[#B0B8C1] leading-[1.8] break-keep">
                  먹음직스러운 메뉴 사진과 매장 사진을 올려 유저들을 유혹하세요.
                </p>
              </div>
              <div className="hidden md:block md:w-5/12"></div>
            </div>

            {/* Step 4 */}
            <div className="relative pl-12 md:pl-0 md:flex md:items-center md:justify-between w-full">
              <div className="absolute left-[-17px] md:left-1/2 md:-ml-[17px] w-8 h-8 bg-[#242A32] border-2 border-brand rounded-full flex items-center justify-center z-10">
                <span className="text-brand text-sm font-bold">4</span>
              </div>
              <div className="hidden md:block md:w-5/12"></div>
              <div className="md:w-5/12 md:pl-12">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand mb-6 shadow-lg shadow-brand/40">
                  <QrCode className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-[22px] md:text-[24px] font-bold mb-3 text-brand">손님 방문 및 QR 스캔</h3>
                <p className="text-[16px] md:text-[17px] text-[#B0B8C1] leading-[1.8] break-keep">
                  앱을 본 손님이 방문하여 사장님이 보여주는 QR 코드를 스캔합니다.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative pl-12 md:pl-0 md:flex md:items-center md:justify-between w-full">
              <div className="absolute left-[-17px] md:left-1/2 md:-ml-[17px] w-8 h-8 bg-[#242A32] border-2 border-brand rounded-full flex items-center justify-center z-10">
                <span className="text-brand text-sm font-bold">5</span>
              </div>
              <div className="md:w-5/12 md:text-right md:pr-12">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#333D4B] mb-6 md:ml-auto md:mr-0">
                  <CheckCircle2 className="w-7 h-7 text-[#B0B8C1]" />
                </div>
                <h3 className="text-[22px] md:text-[24px] font-bold mb-3 text-white">결제 확인 후 마케팅비 차감</h3>
                <p className="text-[16px] md:text-[17px] text-[#B0B8C1] leading-[1.8] break-keep">
                  손님이 결제한 것이 확인되면, 설정해둔 마케팅비만 안전하게 차감됩니다.
                </p>
              </div>
              <div className="hidden md:block md:w-5/12"></div>
            </div>

          </div>
        </div>
      </section>

      """
    
    content = content[:section_4_start] + new_section_4 + content[section_5_start:]

with open("src/app/(marketing)/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
