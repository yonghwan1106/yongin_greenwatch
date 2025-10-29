'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/lib/contexts/AuthContext';
import { getReportTypeInfo, STATUS_COLORS, STATUS_TEXT, ReportType, ReportStatus } from '@/lib/types/report';
import { Header } from '@/components/layout/Header';

interface ReportWithDetails {
  id: string;
  type: ReportType;
  description: string | null;
  address: string | null;
  status: ReportStatus;
  empathy_count: number;
  created_at: string;
  user_id: string | null;
  media: { media_url: string }[];
  hasEmpathized: boolean;
}

export default function ReportsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [reports, setReports] = useState<ReportWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'latest' | 'empathy'>('latest');

  useEffect(() => {
    fetchReports();
  }, [sortBy, user]);

  const fetchReports = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/reports?sortBy=${sortBy}&limit=20`);
      const result = await response.json();

      if (!result.success) throw new Error(result.error);

      // 현재 사용자가 공감했는지 확인
      const reportsWithEmpathy = await Promise.all(
        (result.data || []).map(async (report: any) => {
          let hasEmpathized = false;

          if (user) {
            const { data: empathyData } = await supabase
              .from('report_empathy')
              .select('id')
              .eq('report_id', report.id)
              .eq('user_id', user.id)
              .maybeSingle();

            hasEmpathized = !!empathyData;
          }

          return {
            ...report,
            media: report.report_media || [],
            hasEmpathized,
          };
        })
      );

      setReports(reportsWithEmpathy as any);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmpathy = async (reportId: string) => {
    if (!user) {
      alert('로그인이 필요합니다.');
      router.push('/auth/login');
      return;
    }

    try {
      const report = reports.find((r) => r.id === reportId);
      if (!report) return;

      if (report.hasEmpathized) {
        // 공감 취소
        await supabase
          .from('report_empathy')
          .delete()
          .eq('report_id', reportId)
          .eq('user_id', user.id);
      } else {
        // 공감 추가
        await supabase
          .from('report_empathy')
          .insert({ report_id: reportId, user_id: user.id });
      }

      // 목록 갱신
      fetchReports();
    } catch (error) {
      console.error('Failed to empathize:', error);
    }
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1573167710701-35950a41e251?w=1600&q=80"
            alt="커뮤니티"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/90 via-emerald-600/90 to-teal-600/90"></div>
        <div className="relative container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-3">제보 피드</h1>
          <p className="text-lg text-white/90">
            시민들의 환경 제보를 확인하고 공감하세요
          </p>
        </div>
      </section>

      <div className="min-h-screen bg-gray-50">
        {/* 정렬 옵션 */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'latest' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('latest')}
              >
                최신순
              </Button>
              <Button
                variant={sortBy === 'empathy' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('empathy')}
              >
                공감순
              </Button>
            </div>
          </div>
        </div>

      {/* 제보 목록 */}
      <div className="container mx-auto px-4 py-6">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
            <p className="text-muted-foreground mt-4">로딩 중...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-muted-foreground">아직 제보가 없습니다.</p>
            <Link href="/report/new">
              <Button className="mt-4">첫 제보 작성하기</Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report) => {
              const typeInfo = getReportTypeInfo(report.type);
              const statusColor = STATUS_COLORS[report.status];

              return (
                <div
                  key={report.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <Link href={`/reports/${report.id}`}>
                    {/* 이미지 */}
                    {report.media.length > 0 && (
                      <div className="aspect-video bg-gray-200 relative cursor-pointer">
                        <img
                          src={report.media[0].media_url}
                          alt="제보 이미지"
                          className="w-full h-full object-cover"
                        />
                        <div
                          className="absolute top-2 right-2 px-2 py-1 rounded text-white text-xs font-medium"
                          style={{ backgroundColor: statusColor }}
                        >
                          {STATUS_TEXT[report.status]}
                        </div>
                      </div>
                    )}

                    {/* 내용 */}
                    <div className="p-4 cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{typeInfo.emoji}</span>
                        <span className="font-semibold">{typeInfo.label}</span>
                      </div>

                      {report.description && (
                        <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                          {report.description}
                        </p>
                      )}

                      {report.address && (
                        <p className="text-xs text-muted-foreground mb-3">
                          📍 {report.address}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleEmpathy(report.id);
                          }}
                          className={`flex items-center gap-1 text-sm ${
                            report.hasEmpathized
                              ? 'text-red-500 font-medium'
                              : 'text-gray-500 hover:text-red-500'
                          }`}
                        >
                          {report.hasEmpathized ? '❤️' : '🤍'} 공감{' '}
                          {report.empathy_count}
                        </button>

                        <span className="text-xs text-muted-foreground">
                          {new Date(report.created_at).toLocaleDateString('ko-KR')}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 플로팅 버튼 */}
      <Link href="/report/new">
        <button className="fixed bottom-8 right-8 bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-primary/90 transition">
          <span className="text-2xl">+</span>
        </button>
      </Link>
      </div>
    </>
  );
}
