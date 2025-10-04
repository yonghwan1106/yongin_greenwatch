'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingUp, MapPin, RefreshCw } from 'lucide-react';

interface Anomaly {
  type: 'cluster' | 'repeated_type' | 'high_severity' | 'keyword_pattern';
  description: string;
  severity: 'low' | 'medium' | 'high';
  affected_reports: string[];
  recommendation: string;
}

interface AnomalyData {
  anomalies: Anomaly[];
  summary: string;
  report_count: number;
  period: string;
}

const ANOMALY_TYPE_LABELS = {
  cluster: '지역 집중',
  repeated_type: '반복 유형',
  high_severity: '높은 심각도',
  keyword_pattern: '키워드 패턴',
};

const ANOMALY_TYPE_ICONS = {
  cluster: MapPin,
  repeated_type: RefreshCw,
  high_severity: AlertTriangle,
  keyword_pattern: TrendingUp,
};

export default function AnomalyDetectionPage() {
  const [data, setData] = useState<AnomalyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnomalies = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/anomaly-detection');
      const result = await response.json();

      if (!result.success) throw new Error(result.error);

      setData(result);
    } catch (err: any) {
      console.error('Failed to fetch anomalies:', err);
      setError(err.message || '이상 패턴을 불러올 수 없습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnomalies();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'high':
        return '높음';
      case 'medium':
        return '보통';
      case 'low':
        return '낮음';
      default:
        return severity;
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* 헤더 */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">이상 패턴 감지</h1>
                <p className="text-gray-600 mt-2">
                  AI가 최근 제보 데이터에서 이상 패턴을 분석합니다
                </p>
              </div>
              <Button onClick={fetchAnomalies} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                새로고침
              </Button>
            </div>
          </div>

          {/* 로딩 */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
              <p className="text-gray-600 mt-4">분석 중...</p>
            </div>
          )}

          {/* 에러 */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <p className="text-red-700">{error}</p>
              <Button onClick={fetchAnomalies} className="mt-4">
                다시 시도
              </Button>
            </div>
          )}

          {/* 데이터 */}
          {!isLoading && !error && data && (
            <>
              {/* 통계 카드 */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <p className="text-sm text-gray-600">분석 기간</p>
                  <p className="text-2xl font-bold text-primary mt-1">{data.period}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <p className="text-sm text-gray-600">분석 제보 수</p>
                  <p className="text-2xl font-bold text-primary mt-1">{data.report_count}건</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <p className="text-sm text-gray-600">감지된 패턴</p>
                  <p className="text-2xl font-bold text-primary mt-1">{data.anomalies.length}개</p>
                </div>
              </div>

              {/* 요약 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 mb-6 border border-blue-200">
                <h2 className="font-semibold text-blue-900 mb-3">📊 분석 요약</h2>
                <p className="text-gray-700 leading-relaxed">{data.summary}</p>
              </div>

              {/* 이상 패턴 목록 */}
              {data.anomalies.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <p className="text-gray-600">감지된 이상 패턴이 없습니다.</p>
                  <p className="text-sm text-gray-500 mt-2">
                    환경 상태가 양호합니다 ✨
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">감지된 패턴</h2>
                  {data.anomalies.map((anomaly, index) => {
                    const Icon = ANOMALY_TYPE_ICONS[anomaly.type];
                    return (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-6 border-l-4"
                        style={{
                          borderLeftColor:
                            anomaly.severity === 'high'
                              ? '#dc2626'
                              : anomaly.severity === 'medium'
                              ? '#f59e0b'
                              : '#10b981',
                        }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Icon className="w-6 h-6 text-gray-600" />
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900">
                                {ANOMALY_TYPE_LABELS[anomaly.type]}
                              </h3>
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 border ${getSeverityColor(
                                  anomaly.severity
                                )}`}
                              >
                                심각도: {getSeverityText(anomaly.severity)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">패턴 설명</p>
                            <p className="text-gray-800">{anomaly.description}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-600 mb-1">영향받은 제보</p>
                            <p className="text-sm text-gray-700">
                              {anomaly.affected_reports.length}건의 제보
                            </p>
                          </div>

                          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <p className="text-sm text-blue-700 font-medium mb-1">
                              💡 권장 조치사항
                            </p>
                            <p className="text-sm text-blue-900">{anomaly.recommendation}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
