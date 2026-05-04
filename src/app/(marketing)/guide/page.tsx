export default function GuidePage() {
  return (
    <div className="flex flex-col w-full min-h-screen font-sans bg-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 w-full">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">플바(plba) 이용 가이드</h1>
        <p className="text-xl text-gray-500 mb-12">
          플바를 200% 활용하는 방법을 자세히 알려드립니다.
        </p>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold text-[#5B5BD6] mb-4 border-b border-gray-100 pb-4">사장님을 위한 가이드</h2>
            <div className="bg-gray-50 rounded-2xl p-8 text-gray-600 leading-relaxed">
              <p>여기에 사장님들이 어떻게 캠페인을 만들고 예산을 관리하는지에 대한 상세한 가이드라인과 스크린샷이 들어갈 예정입니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#00C896] mb-4 border-b border-gray-100 pb-4">파트너를 위한 가이드</h2>
            <div className="bg-gray-50 rounded-2xl p-8 text-gray-600 leading-relaxed">
              <p>여기에 파트너분들이 어떻게 링크를 생성하고 수익금을 출금하는지에 대한 상세한 가이드라인과 스크린샷이 들어갈 예정입니다.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
