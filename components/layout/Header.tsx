'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Leaf } from 'lucide-react';

export function Header() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-primary">용인 그린워치</span>
          </Link>

          {/* 네비게이션 */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-gray-700 hover:text-primary transition">
              소개
            </Link>
            <Link href="/map" className="text-gray-700 hover:text-primary transition">
              환경 지도
            </Link>
            <Link href="/reports" className="text-gray-700 hover:text-primary transition">
              제보 피드
            </Link>
            <Link href="/anomaly" className="text-gray-700 hover:text-primary transition">
              이상 패턴
            </Link>
            <Link href="/report/new" className="text-gray-700 hover:text-primary transition">
              제보하기
            </Link>
            {user && (
              <Link href="/my-reports" className="text-gray-700 hover:text-primary transition">
                내 제보
              </Link>
            )}
          </nav>

          {/* 사용자 메뉴 */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="hidden sm:flex">
                    👤 {user.email?.split('@')[0] || '프로필'}
                  </Button>
                </Link>
                <Button onClick={handleSignOut} variant="outline" size="sm">
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    로그인
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">
                    회원가입
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* 모바일 네비게이션 */}
        <nav className="md:hidden flex items-center gap-4 mt-3 pt-3 border-t overflow-x-auto">
          <Link href="/about" className="text-sm text-gray-700 hover:text-primary transition whitespace-nowrap">
            소개
          </Link>
          <Link href="/map" className="text-sm text-gray-700 hover:text-primary transition whitespace-nowrap">
            지도
          </Link>
          <Link href="/reports" className="text-sm text-gray-700 hover:text-primary transition whitespace-nowrap">
            피드
          </Link>
          <Link href="/anomaly" className="text-sm text-gray-700 hover:text-primary transition whitespace-nowrap">
            패턴
          </Link>
          <Link href="/report/new" className="text-sm text-gray-700 hover:text-primary transition whitespace-nowrap">
            제보
          </Link>
          {user && (
            <>
              <Link href="/my-reports" className="text-sm text-gray-700 hover:text-primary transition whitespace-nowrap">
                내 제보
              </Link>
              <Link href="/profile" className="text-sm text-gray-700 hover:text-primary transition whitespace-nowrap">
                프로필
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
