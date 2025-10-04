'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { supabase } from '@/lib/supabase/client';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';

export default function DebugPage() {
  const { user } = useAuth();
  const [allReports, setAllReports] = useState<any[]>([]);
  const [myReports, setMyReports] = useState<any[]>([]);
  const [points, setPoints] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchReports();
    }
  }, [user]);

  const fetchReports = async () => {
    if (!user) return;

    // 전체 제보 조회
    const { data: all } = await supabase
      .from('reports')
      .select('id, user_id, type, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    // 내 제보 조회
    const { data: mine } = await supabase
      .from('reports')
      .select('id, user_id, type, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setAllReports(all || []);
    setMyReports(mine || []);

    // 포인트 정보 조회
    console.log('🔍 포인트 조회 시작 - User ID:', user.id);

    // 현재 세션 확인
    const { data: { session: currentSession } } = await supabase.auth.getSession();
    const sessionUserId = currentSession?.user?.id;
    const sessionMatches = sessionUserId === user.id;

    console.log('Current session user:', sessionUserId);
    console.log('Target user_id:', user.id);
    console.log('Session matches:', sessionMatches);

    // 디버그 정보 저장
    setDebugInfo({
      sessionUserId,
      targetUserId: user.id,
      sessionMatches,
    });

    const { data: pointsData, error: pointsError } = await supabase
      .from('user_points')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    console.log('포인트 조회 결과:', { pointsData, pointsError });

    if (pointsError) {
      console.error('❌ 포인트 조회 에러:', pointsError);
      setPoints({
        total_points: 0,
        available_points: 0,
        used_points: 0,
      });
    } else if (pointsData) {
      console.log('✅ 포인트 데이터:', pointsData);
      setPoints(pointsData);
    } else {
      console.log('⚠️ 포인트 레코드 없음');
      setPoints({
        total_points: 0,
        available_points: 0,
        used_points: 0,
      });
    }

    // 포인트 거래 내역 조회
    console.log('🔍 거래 내역 조회 시작');
    const { data: txData, error: txError } = await supabase
      .from('point_transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    console.log('거래 내역 조회 결과:', { txData, txError });

    if (txError) {
      console.error('❌ 거래 내역 조회 에러:', txError);
      setTransactions([]);
    } else {
      console.log('✅ 거래 내역 데이터:', txData);
      setTransactions(txData || []);
    }
  };

  if (!user) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">디버깅 페이지</h1>
          <p>로그인이 필요합니다.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">🔍 디버깅 페이지</h1>

        <Button onClick={fetchReports} className="mb-6">
          🔄 새로고침
        </Button>

        {/* 사용자 정보 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">사용자 정보</h2>
          <div className="space-y-2 font-mono text-sm">
            <p>
              <strong>User ID:</strong> {user.id}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </div>

        {/* 세션 디버그 정보 */}
        {debugInfo && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">🔍 세션 디버그</h2>
            <div className="space-y-2 font-mono text-sm">
              <p>
                <strong>Session User ID:</strong>{' '}
                <span className={debugInfo.sessionUserId ? 'text-green-600' : 'text-red-600'}>
                  {debugInfo.sessionUserId || 'NULL'}
                </span>
              </p>
              <p>
                <strong>Target User ID:</strong> {debugInfo.targetUserId}
              </p>
              <p>
                <strong>Session Matches:</strong>{' '}
                <span className={debugInfo.sessionMatches ? 'text-green-600' : 'text-red-600'}>
                  {debugInfo.sessionMatches ? '✓ YES' : '✗ NO'}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* 최근 전체 제보 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">최근 전체 제보 (10개)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">ID</th>
                  <th className="text-left p-2">User ID</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Created</th>
                  <th className="text-left p-2">Is Mine?</th>
                </tr>
              </thead>
              <tbody>
                {allReports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-mono text-xs">
                      {report.id.substring(0, 8)}...
                    </td>
                    <td className="p-2 font-mono text-xs">
                      {report.user_id ? report.user_id.substring(0, 8) + '...' : '(익명)'}
                    </td>
                    <td className="p-2">{report.type}</td>
                    <td className="p-2 text-xs">
                      {new Date(report.created_at).toLocaleString('ko-KR')}
                    </td>
                    <td className="p-2">
                      {report.user_id === user.id ? (
                        <span className="text-green-600 font-bold">✓ YES</span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 내 제보 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">
            내 제보 ({myReports.length}개)
          </h2>
          {myReports.length === 0 ? (
            <p className="text-gray-500">제보가 없습니다.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">ID</th>
                    <th className="text-left p-2">Type</th>
                    <th className="text-left p-2">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {myReports.map((report) => (
                    <tr key={report.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-mono text-xs">
                        {report.id.substring(0, 8)}...
                      </td>
                      <td className="p-2">{report.type}</td>
                      <td className="p-2 text-xs">
                        {new Date(report.created_at).toLocaleString('ko-KR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 포인트 정보 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">포인트 정보</h2>
          {points ? (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">보유 포인트</p>
                  <p className="text-2xl font-bold text-green-600">
                    {points.available_points}P
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">누적 포인트</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {points.total_points}P
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">사용 포인트</p>
                  <p className="text-2xl font-bold text-gray-600">
                    {points.used_points}P
                  </p>
                </div>
              </div>

              {/* 최근 포인트 거래 내역 */}
              {transactions.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">최근 포인트 거래 내역</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">타입</th>
                          <th className="text-left p-2">금액</th>
                          <th className="text-left p-2">잔액</th>
                          <th className="text-left p-2">설명</th>
                          <th className="text-left p-2">생성일</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((tx) => (
                          <tr key={tx.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">{tx.type}</td>
                            <td
                              className={`p-2 font-semibold ${
                                tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                              }`}
                            >
                              {tx.amount > 0 ? '+' : ''}
                              {tx.amount}P
                            </td>
                            <td className="p-2">{tx.balance_after}P</td>
                            <td className="p-2 text-xs">{tx.description || '-'}</td>
                            <td className="p-2 text-xs">
                              {new Date(tx.created_at).toLocaleString('ko-KR')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">포인트 정보를 불러오는 중...</p>
          )}
        </div>

        {/* 진단 결과 */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">💡 진단</h3>
          {myReports.length === 0 ? (
            <div className="text-sm text-blue-800 space-y-2">
              <p>❌ 내 제보가 없습니다. 다음을 확인하세요:</p>
              <ul className="list-disc list-inside ml-4">
                <li>제보 시 "익명으로 제보하기" 체크박스가 체크되지 않았는지</li>
                <li>로그인 상태로 제보를 작성했는지</li>
                <li>위 "최근 전체 제보" 테이블에서 "Is Mine?" 열 확인</li>
              </ul>
            </div>
          ) : (
            <div className="text-sm space-y-2">
              <p className="text-green-800">
                ✅ 제보: {myReports.length}개의 제보가 정상적으로 저장되었습니다.
              </p>
              {points && (
                <>
                  {transactions.length > 0 ? (
                    <p className="text-green-800">
                      ✅ 포인트: {transactions.length}건의 거래 내역이 있습니다.
                    </p>
                  ) : (
                    <p className="text-orange-700">
                      ⚠️ 포인트: 거래 내역이 없습니다. 제보 시 포인트가 지급되지
                      않았을 수 있습니다.
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
