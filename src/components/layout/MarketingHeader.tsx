"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MarketingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-white border-b border-gray-100 py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center -ml-2">
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
          <Link href="/guide" className={`text-lg font-bold transition-colors ${pathname === '/guide' ? 'text-[#5B5BD6]' : 'text-gray-600 hover:text-[#5B5BD6]'}`}>
            플바란?
          </Link>
          <Link href="/form" className={`text-lg font-bold transition-colors ${pathname === '/form' ? 'text-[#5B5BD6]' : 'text-gray-600 hover:text-[#5B5BD6]'}`}>
            사전등록
          </Link>
          <Link href="/terms" className={`text-lg font-bold transition-colors ${pathname === '/terms' ? 'text-[#5B5BD6]' : 'text-gray-600 hover:text-[#5B5BD6]'}`}>
            이용약관
          </Link>
          
          <div className="flex items-center ml-4">
            <Link href="/dashboard" className="px-8 py-3.5 bg-[#5B5BD6] text-white rounded-full font-bold text-lg hover:bg-[#4646C0] transition-colors shadow-lg shadow-[#5B5BD6]/30">
              시작하기
            </Link>
          </div>
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
          <Link href="/guide" className={`text-xl font-bold ${pathname === '/guide' ? 'text-[#5B5BD6]' : 'text-gray-800'}`} onClick={() => setIsMobileMenuOpen(false)}>
            플바란?
          </Link>
          <Link href="/form" className={`text-xl font-bold ${pathname === '/form' ? 'text-[#5B5BD6]' : 'text-gray-800'}`} onClick={() => setIsMobileMenuOpen(false)}>
            사전등록
          </Link>
          <Link href="/terms" className={`text-xl font-bold ${pathname === '/terms' ? 'text-[#5B5BD6]' : 'text-gray-800'}`} onClick={() => setIsMobileMenuOpen(false)}>
            이용약관
          </Link>
          <hr className="border-gray-100" />
          <Link href="/dashboard" className="w-full py-4 bg-[#5B5BD6] text-white rounded-xl text-center font-bold text-lg" onClick={() => setIsMobileMenuOpen(false)}>
            시작하기
          </Link>
        </div>
      )}
    </header>
  );
}
