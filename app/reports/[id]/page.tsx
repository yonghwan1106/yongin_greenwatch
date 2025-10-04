'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/lib/contexts/AuthContext';
import { getReportTypeInfo, STATUS_COLORS, STATUS_TEXT } from '@/lib/types/report';
import { supabase } from '@/lib/supabase/client';
import { Sparkles, Building2, AlertTriangle } from 'lucide-react';

interface AIAnalysis {
  id: string;
  report_id: string;
  keywords: string[];
  detailed_type: string;
  severity: string;
  recommended_department: string;
  confidence_score: number;
  analyzed_at: string;
}

interface ReportDetail {
  id: string;
  user_id: string | null;
  type: string;
  description: string | null;
  lat: number;
  lng: number;
  address: string | null;
  status: string;
  empathy_count: number;
  created_at: string;
  report_media: Array<{
    media_url: string;
    media_type: string;
  }>;
  report_ai_analysis: AIAnalysis[];
}

export default function ReportDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const supabase = createClientComponentClient();

  const [report, setReport] = useState<ReportDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasEmpathized, setHasEmpathized] = useState(false);
  const [empathyCount, setEmpathyCount] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchReport();
      checkEmpathy();
    }
  }, [params.id, user]);

  const fetchReport = async () => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select(`
          *,
          report_media (
            media_url,
            media_type
          ),
          report_ai_analysis (
            id,
            keywords,
            detailed_type,
            severity,
            recommended_department,
            confidence_score,
            analyzed_at
          )
        `)
        .eq('id', params.id)
        .single();

      if (error) throw error;

      setReport(data);
      setEmpathyCount(data.empathy_count);
    } catch (error) {
      console.error('Error fetching report:', error);
      alert('제보를 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  const checkEmpathy = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('report_empathy')
        .select('id')
        .eq('report_id', params.id)
        .eq('user_id', user.id)
        .single();

      setHasEmpathized(!!data);
    } catch (error) {
      // 공감하지 않은 경우 에러 발생 (정상)
      setHasEmpathized(false);
    }
  };

  const handleEmpathy = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      router.push('/auth/login');
      return;
    }

    try {
      if (hasEmpathized) {
        // 공감 취소
        const { error } = await supabase
          .from('report_empathy')
          .delete()
          .eq('report_id', params.id)
          .eq('user_id', user.id);

        if (error) throw error;

        setHasEmpathized(false);
        setEmpathyCount(prev => prev - 1);
      } else {
        // 공감 추가
        const { error } = await supabase
          .from('report_empathy')
          .insert({
            report_id: params.id,
            user_id: user.id,
          });

        if (error) throw error;

        setHasEmpathized(true);
        setEmpathyCount(prev => prev + 1);

        // 공감 포인트 지급 (하루 최대 5회)
        await supabase.rpc('add_user_points', {
          p_user_id: user.id,
          p_type: 'empathy_given',
          p_amount: 5,
          p_reference_id: params.id,
          p_description: '제보 공감 참여',
        });
      }
    } catch (error: any) {
      console.error('Error toggling empathy:', error);
      if (error.message?.includes('한도')) {
        alert('오늘의 공감 포인트 적립 한도를 초과했습니다.');
      } else {
        alert('공감 처리 중 오류가 발생했습니다.');
      }
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

  if (!report) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <p className="text-gray-600">제보를 찾을 수 없습니다.</p>
          <Button onClick={() => router.push('/reports')}>목록으로 돌아가기</Button>
        </div>
      </>
    );
  }

  const typeInfo = getReportTypeInfo(report.type as any);
  const statusColor = STATUS_COLORS[report.status as keyof typeof STATUS_COLORS];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* 헤더 */}
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="mb-4"
            >
              ← 돌아가기
            </Button>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{typeInfo.emoji}</span>
                <div>
                  <h1 className="text-2xl font-bold">{typeInfo.label}</h1>
                  <p className="text-sm text-gray-500">
                    {new Date(report.created_at).toLocaleString('ko-KR')}
                  </p>
                </div>
              </div>

              <div
                className="px-4 py-2 rounded-full text-white font-medium"
                style={{ backgroundColor: statusColor }}
              >
                {STATUS_TEXT[report.status as keyof typeof STATUS_TEXT]}
              </div>
            </div>
          </div>

          {/* 이미지 갤러리 */}
          {report.report_media && report.report_media.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="font-semibold mb-4">첨부 사진</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.report_media.map((media, index) => (
                  <img
                    key={index}
                    src={media.media_url}
                    alt={`제보 사진 ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* 상세 정보 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="font-semibold mb-4">상세 내용</h2>

            {report.description ? (
              <p className="text-gray-700 leading-relaxed mb-4">
                {report.description}
              </p>
            ) : (
              <p className="text-gray-400 mb-4">상세 설명이 없습니다.</p>
            )}

            {report.address && (
              <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <span>📍</span>
                <span>{report.address}</span>
              </div>
            )}
          </div>

          {/* AI 분석 결과 */}
          {report.report_ai_analysis && report.report_ai_analysis.length > 0 && (
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-md p-6 mb-6 border border-purple-200">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h2 className="font-semibold text-purple-900">AI 분석 결과</h2>
                <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  Claude AI
                </span>
              </div>

              {report.report_ai_analysis.map((analysis) => (
                <div key={analysis.id} className="space-y-4">
                  {/* 키워드 */}
                  {analysis.keywords && analysis.keywords.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">핵심 키워드</p>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white text-purple-700 text-sm rounded-full border border-purple-200"
                          >
                            #{keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 상세 유형 */}
                  {analysis.detailed_type && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">문제 유형</p>
                      <p className="text-lg font-medium text-gray-800">
                        {analysis.detailed_type}
                      </p>
                    </div>
                  )}

                  {/* 심각도 */}
                  {analysis.severity && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">심각도</p>
                      <div className="flex items-center gap-2">
                        <AlertTriangle
                          className={`w-5 h-5 ${
                            analysis.severity === 'high'
                              ? 'text-red-600'
                              : analysis.severity === 'medium'
                              ? 'text-yellow-600'
                              : 'text-green-600'
                          }`}
                        />
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            analysis.severity === 'high'
                              ? 'bg-red-100 text-red-700'
                              : analysis.severity === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {analysis.severity === 'high'
                            ? '높음'
                            : analysis.severity === 'medium'
                            ? '보통'
                            : '낮음'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* 추천 부서 */}
                  {analysis.recommended_department && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">추천 담당 부서</p>
                      <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-purple-200">
                        <Building2 className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-800">
                          {analysis.recommended_department}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* 신뢰도 */}
                  {analysis.confidence_score && (
                    <div className="pt-2 border-t border-purple-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">분석 신뢰도</span>
                        <span className="font-medium text-purple-700">
                          {(analysis.confidence_score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${analysis.confidence_score * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 공감 섹션 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">이 제보에 공감하시나요?</p>
                <p className="text-2xl font-bold text-primary">
                  ❤️ {empathyCount}명이 공감했습니다
                </p>
              </div>

              <Button
                size="lg"
                variant={hasEmpathized ? 'outline' : 'default'}
                onClick={handleEmpathy}
                className={hasEmpathized ? 'border-primary text-primary' : ''}
              >
                {hasEmpathized ? '공감 취소' : '공감하기'}
              </Button>
            </div>
          </div>

          {/* 지도 보기 버튼 */}
          <div className="mt-6">
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => router.push(`/map?lat=${report.lat}&lng=${report.lng}&reportId=${report.id}`)}
            >
              🗺️ 지도에서 위치 확인하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
