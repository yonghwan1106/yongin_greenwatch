'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/contexts/AuthContext';
import { supabase } from '@/lib/supabase/client';

interface UserPoints {
  total_points: number;
  available_points: number;
  used_points: number;
}

interface PointTransaction {
  id: string;
  type: string;
  amount: number;
  balance_after: number;
  description: string | null;
  created_at: string;
}

const TRANSACTION_TYPE_TEXT: Record<string, string> = {
  signup_bonus: '가입 보너스',
  report_submitted: '제보 작성',
  report_empathized: '제보 공감 받음',
  empathy_given: '제보 공감',
  monthly_bonus: '월간 보너스',
  challenge_completed: '챌린지 완료',
  point_used: '포인트 사용',
  point_refund: '포인트 환불',
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const [points, setPoints] = useState<UserPoints | null>(null);
  const [transactions, setTransactions] = useState<PointTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      // 포인트 정보 조회
      const { data: pointsData, error: pointsError } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (pointsError) {
        console.error('Points error:', pointsError);
      } else if (pointsData) {
        setPoints(pointsData);
      } else {
        // 포인트 레코드가 없으면 0으로 표시
        console.log('No points record found');
        setPoints({
          total_points: 0,
          available_points: 0,
          used_points: 0,
        });
      }

      // 포인트 거래 내역 조회
      const { data: transactionsData, error: txError } = await supabase
        .from('point_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (txError) {
        console.error('Transactions error:', txError);
      } else if (transactionsData) {
        setTransactions(transactionsData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* 사용자 정보 */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">내 프로필</h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
              <Button variant="outline" onClick={handleSignOut}>
                로그아웃
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-primary to-green-600 text-white rounded-lg p-6">
                <p className="text-sm opacity-90 mb-1">보유 포인트</p>
                <p className="text-3xl font-bold">{points?.available_points || 0}P</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-1">누적 포인트</p>
                <p className="text-2xl font-bold text-gray-800">
                  {points?.total_points || 0}P
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-1">사용 포인트</p>
                <p className="text-2xl font-bold text-gray-800">
                  {points?.used_points || 0}P
                </p>
              </div>
            </div>
          </div>

          {/* 빠른 메뉴 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => router.push('/my-reports')}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="text-3xl mb-2">📋</div>
              <p className="font-semibold">내 제보</p>
            </button>
            <button
              onClick={() => router.push('/report/new')}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="text-3xl mb-2">✍️</div>
              <p className="font-semibold">제보하기</p>
            </button>
            <button
              onClick={() => router.push('/map')}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="text-3xl mb-2">🗺️</div>
              <p className="font-semibold">환경 지도</p>
            </button>
          </div>

          {/* 포인트 내역 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">포인트 내역</h2>

            {transactions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                아직 포인트 내역이 없습니다.
              </p>
            ) : (
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between py-3 border-b last:border-b-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium">
                        {TRANSACTION_TYPE_TEXT[tx.type] || tx.type}
                      </p>
                      {tx.description && (
                        <p className="text-sm text-gray-500">{tx.description}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(tx.created_at).toLocaleString('ko-KR')}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <p
                        className={`text-lg font-bold ${
                          tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {tx.amount > 0 ? '+' : ''}
                        {tx.amount}P
                      </p>
                      <p className="text-xs text-gray-500">
                        잔액: {tx.balance_after}P
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 안내 */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">
              💡 포인트 적립 방법
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 환경 문제 제보: 50P</li>
              <li>• 제보 5회 이상 공감 받기: 추가 50P</li>
              <li>• 다른 제보에 공감: 5P (하루 최대 5회)</li>
              <li>• 월 1회 이상 활동: 30P 보너스</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
