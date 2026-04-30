"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Home, Search, PlusCircle, Link as LinkIcon, BarChart2, 
  Megaphone, ShieldCheck, Bell, User, Menu, X, LogOut 
} from "lucide-react";

const NAV_ITEMS = [
  { name: "홈", href: "/dashboard", icon: Home },
  { name: "캠페인 보기", href: "/campaigns", icon: Search },
  { name: "캠페인 만들기", href: "/campaigns/new", icon: PlusCircle },
  { name: "링크 생성", href: "/links", icon: LinkIcon },
  { name: "리포트", href: "/reports", icon: BarChart2 },
  { name: "공지사항", href: "/notices", icon: Megaphone },
  { name: "약관 및 정책", href: "/policies", icon: ShieldCheck },
  { name: "알림", href: "/notifications", icon: Bell },
  { name: "마이페이지", href: "/mypage", icon: User },
];

export default function DashboardNavigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-50 flex items-center justify-between px-4">
        <Link href="/dashboard">
          <Image 
            src="/logo.png" 
            alt="plba 로고" 
            width={120} 
            height={40} 
            className="h-8 w-auto mix-blend-multiply"
          />
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-700"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Sidebar & Mobile Drawer */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-40 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        md:pt-0 pt-16
      `}>
        {/* Desktop Logo */}
        <div className="hidden md:flex h-20 items-center px-6 border-b border-gray-100">
          <Link href="/dashboard">
            <Image 
              src="/logo.png" 
              alt="plba 로고" 
              width={150} 
              height={50} 
              className="h-10 w-auto mix-blend-multiply"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-sm
                  ${isActive 
                    ? "bg-[#5B5BD6]/10 text-[#5B5BD6] font-bold" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-[#5B5BD6]" : "text-gray-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User / Logout */}
        <div className="p-4 border-t border-gray-100">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
            <LogOut className="w-5 h-5" />
            로그아웃
          </Link>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
