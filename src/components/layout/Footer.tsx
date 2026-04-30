import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand & Info */}
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="inline-block mb-6 -ml-2">
            <Image 
              src="/logo.png" 
              alt="plba 로고" 
              width={200} 
              height={80} 
              className="h-16 w-auto object-contain mix-blend-multiply opacity-80"
            />
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-6">
            플바(+알바)는 오프라인 소상공인과 로컬 파트너를 연결하여
            합리적이고 투명한 성과 기반 마케팅 생태계를 만들어 갑니다.
          </p>
          <div className="text-gray-400 text-xs space-y-1">
            <p>상호명: (주)와이에이치컴퍼니 | 대표: 윤용현</p>
            <p>사업자등록번호: 123-45-67890</p>
            <p>고객센터: 1588-0000 (평일 10:00 - 18:00)</p>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">서비스</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><Link href="/explore" className="hover:text-[#5B5BD6]">캠페인 탐색</Link></li>
            <li><Link href="/for-business" className="hover:text-[#5B5BD6]">사장님 제휴 안내</Link></li>
            <li><Link href="/pricing" className="hover:text-[#5B5BD6]">수수료 안내</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4">고객지원</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><Link href="/notice" className="hover:text-[#5B5BD6]">공지사항</Link></li>
            <li><Link href="/faq" className="hover:text-[#5B5BD6]">자주 묻는 질문</Link></li>
            <li><Link href="/terms" className="hover:text-black font-semibold">이용약관</Link></li>
            <li><Link href="/policy" className="hover:text-black font-semibold">운영정책</Link></li>
            <li><Link href="/privacy" className="hover:text-black font-semibold">개인정보처리방침</Link></li>
          </ul>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between">
        <p className="text-gray-400 text-xs">© 2026 Plus Alba. All rights reserved.</p>
      </div>
    </footer>
  );
}
