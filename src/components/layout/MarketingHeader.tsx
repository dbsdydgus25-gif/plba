"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function MarketingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

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
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-white/90 backdrop-blur-md py-4 md:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center -ml-2">
          <Image 
            src="/logo.png" 
            alt="plba 로고" 
            width={300} 
            height={100} 
            className="h-10 md:h-14 w-auto object-contain mix-blend-multiply"
            priority
          />
        </Link>

        {/* Action Button */}
        <div className="flex items-center">
          <Link href="#register" className="px-5 py-2.5 md:px-8 md:py-3.5 bg-brand text-white rounded-full font-bold text-[15px] md:text-lg hover:bg-brand-dark transition-colors shadow-lg shadow-brand/30">
            사전등록하기
          </Link>
        </div>
      </div>
    </header>
  );
}
