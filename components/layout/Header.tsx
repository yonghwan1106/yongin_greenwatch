'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Map, FileText, PlusCircle, User, LogIn, LogOut, Leaf, Menu } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent hidden sm:inline">
              용인 그린워치
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/map"
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <Map className="w-4 h-4" />
              <span>환경 지도</span>
            </Link>
            <Link
              href="/reports"
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <FileText className="w-4 h-4" />
              <span>제보 피드</span>
            </Link>
            <Link
              href="/report/new"
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <PlusCircle className="w-4 h-4" />
              <span>제보하기</span>
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link href="/profile" className="hidden sm:block">
                  <Button variant="ghost" size="sm" className="gap-2 hover:bg-emerald-50">
                    <User className="w-4 h-4" />
                    <span>프로필</span>
                  </Button>
                </Link>
                <Button onClick={handleSignOut} variant="outline" size="sm" className="gap-2 border-gray-200">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">로그아웃</span>
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="hidden sm:block">
                  <Button variant="outline" size="sm" className="gap-2 border-emerald-200 hover:bg-emerald-50">
                    <LogIn className="w-4 h-4" />
                    <span>로그인</span>
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                    <span>회원가입</span>
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-2">
            <Link
              href="/map"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Map className="w-4 h-4" />
              <span>환경 지도</span>
            </Link>
            <Link
              href="/reports"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FileText className="w-4 h-4" />
              <span>제보 피드</span>
            </Link>
            <Link
              href="/report/new"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              <PlusCircle className="w-4 h-4" />
              <span>제보하기</span>
            </Link>
            {user && (
              <>
                <Link
                  href="/my-reports"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FileText className="w-4 h-4" />
                  <span>내 제보</span>
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span>프로필</span>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
