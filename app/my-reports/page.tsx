'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/contexts/AuthContext';
import { getReportTypeInfo, STATUS_COLORS, STATUS_TEXT } from '@/lib/types/report';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface MyReport {
  id: string;
  type: string;
  description: string | null;
  address: string | null;
  status: string;
  empathy_count: number;
  created_at: string;
  report_media: Array<{
    media_url: string;
  }>;
}

export default function MyReportsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createClientComponentClient();

  const [reports, setReports] = useState<MyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    totalEmpathy: 0,
  });

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    fetchMyReports();
  }, [user]);

  const fetchMyReports = async () => {
    if (!user) return;

    try {
      console.log('Fetching reports for user:', user.id);

      const { data, error } = await supabase
        .from('reports')
        .select(`
          *,
          report_media (
            media_url
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Fetched reports:', data);
      setReports(data || []);

      // 통계 계산
      const total = data?.length || 0;
      const pending = data?.filter(r => r.status === 'pending').length || 0;
      const resolved = data?.filter(r => r.status === 'resolved').length || 0;
      const totalEmpathy = data?.reduce((sum, r) => sum + r.empathy_count, 0) || 0;

      setStats({ total, pending, resolved, totalEmpathy });
    } catch (error) {
      console.error('Error fetching my reports:', error);
    } finally {
      setLoading(false);
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1586339277861-b0b895343ba5?w=1600&q=80"
            alt="내 제보"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 via-amber-600/90 to-yellow-600/90"></div>
        <div className="relative container mx-auto px-4 py-12 max-w-6xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-3">내 제보</h1>
              <p className="text-lg text-white/90">내가 작성한 환경 제보를 관리하세요</p>
            </div>
            <Button
              onClick={() => {
                setLoading(true);
                fetchMyReports();
              }}
              disabled={loading}
              className="bg-white text-orange-600 hover:bg-orange-50"
            >
              {loading ? '새로고침 중...' : '🔄 새로고침'}
            </Button>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">

          {/* 통계 카드 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-sm text-gray-600 mb-1">총 제보</p>
              <p className="text-3xl font-bold text-primary">{stats.total}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-sm text-gray-600 mb-1">처리 대기</p>
              <p className="text-3xl font-bold text-orange-500">{stats.pending}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-sm text-gray-600 mb-1">해결 완료</p>
              <p className="text-3xl font-bold text-green-500">{stats.resolved}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-sm text-gray-600 mb-1">받은 공감</p>
              <p className="text-3xl font-bold text-red-500">{stats.totalEmpathy}</p>
            </div>
          </div>

          {/* 제보 목록 */}
          {reports.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 mb-4">아직 작성한 제보가 없습니다.</p>
              <Button onClick={() => router.push('/report/new')}>
                첫 제보 작성하기
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => {
                const typeInfo = getReportTypeInfo(report.type as any);
                const statusColor = STATUS_COLORS[report.status as keyof typeof STATUS_COLORS];

                return (
                  <div
                    key={report.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                    onClick={() => router.push(`/reports/${report.id}`)}
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        {/* 이미지 */}
                        {report.report_media && report.report_media.length > 0 ? (
                          <img
                            src={report.report_media[0].media_url}
                            alt="제보 사진"
                            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-4xl">{typeInfo.emoji}</span>
                          </div>
                        )}

                        {/* 내용 */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{typeInfo.emoji}</span>
                            <h3 className="font-semibold text-lg">{typeInfo.label}</h3>
                            <span
                              className="px-3 py-1 rounded-full text-xs font-medium text-white ml-auto"
                              style={{ backgroundColor: statusColor }}
                            >
                              {STATUS_TEXT[report.status as keyof typeof STATUS_TEXT]}
                            </span>
                          </div>

                          {report.description && (
                            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                              {report.description}
                            </p>
                          )}

                          {report.address && (
                            <p className="text-gray-400 text-xs mb-2">
                              📍 {report.address}
                            </p>
                          )}

                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>
                              {new Date(report.created_at).toLocaleDateString('ko-KR')}
                            </span>
                            <span>❤️ 공감 {report.empathy_count}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 새 제보 작성 버튼 */}
          {reports.length > 0 && (
            <div className="mt-8 text-center">
              <Button
                size="lg"
                onClick={() => router.push('/report/new')}
              >
                + 새 제보 작성하기
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
