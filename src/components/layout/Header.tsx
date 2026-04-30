"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Bell } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 로그인 기능은 빼고, UI만 확인하기 위한 가짜 로그인 상태 유지
  useEffect(() => {
    if (pathname.startsWith("/dashboard")) {
      sessionStorage.setItem("mock_logged_in", "true");
      setIsLoggedIn(true);
    } else {
      const loggedIn = sessionStorage.getItem("mock_logged_in") === "true";
      setIsLoggedIn(loggedIn);
    }
  }, [pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem("mock_logged_in");
    setIsLoggedIn(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-white border-b border-gray-100 py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo - 확대 및 mix-blend 유지 */}
        <Link href={isLoggedIn ? "/dashboard" : "/"} className="flex items-center -ml-2">
          <Image 
            src="/logo.png" 
            alt="plba 로고" 
            width={300} 
            height={100} 
            className="h-16 md:h-24 w-auto object-contain mix-blend-multiply"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 font-medium">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="text-gray-900 font-bold hover:text-[#5B5BD6] transition-colors text-lg">홈</Link>
              <Link href="/explore" className="text-gray-600 hover:text-[#5B5BD6] transition-colors text-lg font-bold">캠페인 탐색</Link>
              <Link href="/guide" className="text-gray-600 hover:text-[#5B5BD6] transition-colors text-lg font-bold">플바 이용 안내</Link>
              
              <div className="flex items-center gap-6 ml-6 border-l border-gray-200 pl-6">
                <button className="text-gray-500 hover:text-gray-900 relative">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">N</span>
                </button>
                <Link href="/" onClick={handleLogout} className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors">로그아웃</Link>
              </div>
            </>
          ) : (
            <>
              <Link href="/explore" className="text-gray-600 hover:text-[#5B5BD6] transition-colors text-lg font-bold">캠페인 탐색</Link>
              <Link href="/guide" className="text-gray-600 hover:text-[#5B5BD6] transition-colors text-lg font-bold">플바 이용 안내</Link>
              
              <div className="flex items-center gap-4 ml-6">
                <Link href="/dashboard" className="text-gray-700 hover:text-black transition-colors font-semibold text-lg">로그인</Link>
                <Link href="/dashboard" className="px-6 py-3 bg-[#5B5BD6] text-white rounded-full font-bold text-lg hover:bg-[#4646C0] transition-colors shadow-lg shadow-[#5B5BD6]/30">파트너 시작하기</Link>
              </div>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-gray-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 flex flex-col p-6 gap-6 md:hidden">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="text-xl font-bold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>홈</Link>
              <Link href="/explore" className="text-xl font-bold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>캠페인 탐색</Link>
              <Link href="/guide" className="text-xl font-bold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>플바 이용 안내</Link>
              <hr className="border-gray-100" />
              <Link href="/" onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }} className="text-xl font-bold text-gray-500">로그아웃</Link>
            </>
          ) : (
            <>
              <Link href="/explore" className="text-xl font-bold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>캠페인 탐색</Link>
              <Link href="/guide" className="text-xl font-bold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>플바 이용 안내</Link>
              <hr className="border-gray-100" />
              <Link href="/dashboard" className="text-xl font-bold text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>로그인</Link>
              <Link href="/dashboard" className="w-full py-4 bg-[#5B5BD6] text-white rounded-xl text-center font-bold text-lg" onClick={() => setIsMobileMenuOpen(false)}>파트너 시작하기</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

