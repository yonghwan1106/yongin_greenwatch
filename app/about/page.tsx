'use client';

import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  Users,
  Sparkles,
  Award,
  TrendingUp,
  Shield,
  Leaf,
  Heart
} from 'lucide-react';

export default function AboutPage() {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* 히어로 섹션 */}
        <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              용인 그린워치
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              AI 기반 시민 참여형 환경 거버넌스 플랫폼
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              시민의 제보와 인공지능 분석이 만나 용인시의 환경을 보호하고,
              <br />
              더 나은 도시 환경을 만들어갑니다.
            </p>
          </div>
        </section>

        {/* 프로젝트 비전 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              🌱 프로젝트 비전
            </h2>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-8 border border-green-200">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                용인 그린워치는 <strong>시민 참여</strong>와 <strong>AI 기술</strong>을 결합하여
                환경 문제를 조기에 발견하고 신속하게 대응하는 혁신적인 플랫폼입니다.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                우리는 투명한 정보 공유와 데이터 기반 의사결정을 통해
                시민과 행정이 함께 만드는 지속가능한 도시를 꿈꿉니다.
              </p>
            </div>
          </div>
        </section>

        {/* 핵심 기능 */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              🎯 핵심 기능
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 실시간 환경 지도 */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">실시간 환경 지도</h3>
                <p className="text-gray-600 text-sm">
                  용인시 전역의 대기질을 실시간으로 모니터링하고 시각화합니다.
                </p>
              </div>

              {/* 시민 제보 */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">시민 제보 시스템</h3>
                <p className="text-gray-600 text-sm">
                  환경 문제를 사진과 위치로 간편하게 제보하고 공유합니다.
                </p>
              </div>

              {/* AI 분석 */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">AI 자동 분석</h3>
                <p className="text-gray-600 text-sm">
                  Claude AI가 제보를 분석하여 문제 유형과 심각도를 자동 판정합니다.
                </p>
              </div>

              {/* 녹색 보상 */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">녹색 보상 시스템</h3>
                <p className="text-gray-600 text-sm">
                  환경 활동에 포인트를 적립하고 지역 파트너 상점에서 사용합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 기술 스택 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              🛠️ 기술 스택
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-lg mb-4 text-gray-900">Frontend</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Next.js 14 (App Router)</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• shadcn/ui</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-lg mb-4 text-gray-900">Backend</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Supabase (PostgreSQL)</li>
                  <li>• Supabase Auth</li>
                  <li>• Supabase Storage</li>
                  <li>• Supabase Realtime</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-lg mb-4 text-gray-900">AI & Data</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Anthropic Claude 3.5 Sonnet</li>
                  <li>• Claude Vision API</li>
                  <li>• 에어코리아 Open API</li>
                  <li>• Kakao Map SDK</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-lg mb-4 text-gray-900">Deploy</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Vercel</li>
                  <li>• GitHub</li>
                  <li>• Edge Functions</li>
                  <li>• CDN</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 주요 성과 */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              📊 주요 성과
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">AI 분석</h3>
                <p className="text-gray-600">자동 문제 분류 및 심각도 판정</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">패턴 감지</h3>
                <p className="text-gray-600">이상 패턴 자동 감지 및 알림</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">시민 참여</h3>
                <p className="text-gray-600">공감 기반 커뮤니티 형성</p>
              </div>
            </div>
          </div>
        </section>

        {/* 개발 로드맵 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              🚀 개발 로드맵
            </h2>
            <div className="space-y-6">
              {/* Phase 1 */}
              <div className="border-l-4 border-green-500 pl-6 py-4 bg-green-50 rounded-r-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                    완료
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">Phase 1: MVP (0~6개월)</h3>
                </div>
                <ul className="text-gray-700 space-y-1">
                  <li>✅ 실시간 환경 지도</li>
                  <li>✅ 시민 제보 시스템</li>
                  <li>✅ 사용자 인증 및 포인트 시스템</li>
                  <li>✅ 제보 피드 및 공감 기능</li>
                </ul>
              </div>

              {/* Phase 2 */}
              <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                    완료
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">Phase 2: AI 분석 (6~9개월)</h3>
                </div>
                <ul className="text-gray-700 space-y-1">
                  <li>✅ Claude AI 제보 자동 분석</li>
                  <li>✅ Vision API 이미지 분석</li>
                  <li>✅ 이상 패턴 감지 시스템</li>
                  <li>⏳ 알림 시스템 (진행 예정)</li>
                </ul>
              </div>

              {/* Phase 3 */}
              <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50 rounded-r-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-purple-500 text-white text-sm font-medium rounded-full">
                    예정
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">Phase 3: 생태계 확장 (9~12개월)</h3>
                </div>
                <ul className="text-gray-700 space-y-1">
                  <li>⏳ 녹색 보상 마켓플레이스</li>
                  <li>⏳ 파트너 상점 연동</li>
                  <li>⏳ 친환경 챌린지</li>
                  <li>⏳ 관리자 대시보드</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 팀 정보 */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              👥 프로젝트 팀
            </h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">박용환</h3>
                <p className="text-gray-600">프로젝트 관리자</p>
              </div>
              <div className="text-center">
                <p className="text-gray-700 leading-relaxed">
                  AI 기술과 시민 참여를 결합하여 용인시의 환경 문제를 해결하고,
                  <br />
                  지속가능한 도시를 만들기 위해 노력하고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-600">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              함께 만드는 깨끗한 용인
            </h2>
            <p className="text-xl text-green-50 mb-8">
              지금 바로 환경 지킴이가 되어주세요!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100"
                onClick={() => router.push('/report/new')}
              >
                제보하기
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600"
                onClick={() => router.push('/map')}
              >
                환경 지도 보기
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
