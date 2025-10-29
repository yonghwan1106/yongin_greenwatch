'use client';

import Image from 'next/image';
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
      <div className="min-h-screen bg-gray-50">
        {/* 히어로 섹션 */}
        <section className="relative bg-gradient-to-br from-blue-600 via-green-600 to-emerald-600 text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80"
              alt="환경 보호"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-green-600/90 to-emerald-600/90"></div>
          <div className="relative container mx-auto px-4 max-w-4xl text-center py-24">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                용인특례시 환경 거버넌스 플랫폼
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              용인 그린워치
            </h1>
            <p className="text-xl md:text-2xl text-blue-50 mb-8">
              AI 기반 시민 참여형 환경 거버넌스 플랫폼
            </p>
            <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
              시민의 제보와 인공지능 분석이 만나 용인시의 환경을 보호하고,
              더 나은 도시 환경을 만들어갑니다.
            </p>
          </div>
        </section>

        {/* 프로젝트 배경 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              📖 프로젝트 배경
            </h2>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-8 border border-amber-200">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                용인시는 급격한 도시 개발과 인구 증가로 <strong>대기질 저하</strong>, <strong>불법 소각</strong>,
                <strong>산업 폐기물 무단 투기</strong> 등 다양한 환경 문제에 직면해 있습니다.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                기존의 환경 모니터링은 제한된 측정소와 인력으로 인해 사각지대가 많고,
                시민 신고는 처리 과정이 불투명하여 참여 동기가 낮은 상황입니다.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>용인 그린워치</strong>는 이러한 문제를 해결하기 위해
                시민의 눈과 귀를 활용한 <strong>분산형 환경 모니터링</strong>과
                <strong>AI 자동 분석</strong>을 결합하여 누구나 쉽게 환경 지킴이가 될 수 있는 플랫폼을 만들었습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 프로젝트 비전 */}
        <section className="py-16 bg-gray-50">
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
        <section className="py-16 bg-white">
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

        {/* 실제 활용 사례 */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              💡 실제 활용 사례
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🏭 불법 소각 신고 및 대응</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  시민이 불법 소각 현장을 발견하여 사진과 위치를 제보하면,
                  AI가 자동으로 연기 유형과 심각도를 분석합니다.
                </p>
                <p className="text-gray-600 text-sm">
                  → 고위험으로 판정된 제보는 우선 처리되어 신속한 단속이 가능합니다.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🗑️ 불법 투기 패턴 감지</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  특정 지역에서 반복되는 폐기물 투기 제보를 AI가 자동으로 패턴 분석하여
                  핫스팟을 식별하고 관리자에게 알림을 전송합니다.
                </p>
                <p className="text-gray-600 text-sm">
                  → 상습 불법 투기 지역에 대한 집중 관리와 CCTV 설치 근거 자료로 활용됩니다.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🌫️ 대기질 실시간 모니터링</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  에어코리아 API를 통해 용인시 전역의 미세먼지, 초미세먼지, 오존 등
                  대기질 데이터를 실시간으로 시각화하여 제공합니다.
                </p>
                <p className="text-gray-600 text-sm">
                  → 시민들이 외출 전 대기질을 확인하고, 건강을 보호할 수 있습니다.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🏆 녹색 보상 시스템</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  환경 제보, 공감하기, 챌린지 참여 등 환경 활동마다 포인트를 적립하고,
                  지역 친환경 상점에서 사용할 수 있습니다.
                </p>
                <p className="text-gray-600 text-sm">
                  → 지속적인 시민 참여를 유도하고 환경 거버넌스 생태계를 활성화합니다.
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

        {/* 데이터 투명성 */}
        <section className="py-16 bg-gradient-to-br from-cyan-50 to-blue-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              🔒 데이터 투명성 및 개인정보 보호
            </h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">수집하는 데이터</h3>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>✓ <strong>사용자 정보:</strong> 이메일 주소 (회원가입 시)</li>
                <li>✓ <strong>제보 데이터:</strong> 사진, 위치, 설명, 작성 시간</li>
                <li>✓ <strong>활동 데이터:</strong> 공감, 포인트 적립 내역</li>
                <li>✓ <strong>환경 데이터:</strong> 에어코리아 API를 통한 대기질 정보</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-4">데이터 활용 방식</h3>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>✓ <strong>AI 분석:</strong> 제보 이미지를 Claude Vision API로 분석하여 환경 문제 유형 및 심각도 판정</li>
                <li>✓ <strong>패턴 감지:</strong> 시간별, 지역별 제보 데이터를 분석하여 이상 패턴 탐지</li>
                <li>✓ <strong>통계 생성:</strong> 익명화된 데이터를 활용하여 지역별 환경 통계 제공</li>
                <li>✓ <strong>행정 지원:</strong> 환경 문제 핫스팟 식별 및 정책 수립 근거 자료 제공</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-900 mb-4">개인정보 보호</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ <strong>암호화 저장:</strong> 모든 사용자 데이터는 Supabase를 통해 암호화되어 저장됩니다</li>
                <li>✓ <strong>익명 제보 가능:</strong> 로그인 없이도 제보할 수 있으며, 공개되는 정보는 제한됩니다</li>
                <li>✓ <strong>위치 정보 선택:</strong> 제보 시 정확한 위치 또는 대략적인 위치를 선택할 수 있습니다</li>
                <li>✓ <strong>데이터 삭제 권리:</strong> 언제든지 본인의 제보 및 계정을 삭제할 수 있습니다</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 주요 성과 */}
        <section className="py-16 bg-white">
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

            {/* 현재 구현된 기능 */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-green-600">✓</span> 현재 구현된 기능
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">핵심 플랫폼</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span>실시간 환경 지도 (에어코리아 API 연동)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span>사진 및 위치 기반 시민 제보 시스템</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span>제보 피드 및 실시간 공유</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span>사용자 인증 및 프로필 관리</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">AI 분석 시스템</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span>Claude 3.5 Sonnet AI 제보 자동 분석</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span>Vision API를 통한 이미지 인식 및 분류</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span>환경 문제 유형 및 심각도 자동 판정</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span>이상 패턴 감지 및 핫스팟 식별</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">커뮤니티 기능</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span>제보 공감하기 시스템</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span>포인트 적립 시스템</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span>내 제보 관리 페이지</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span>사용자 프로필 및 활동 내역</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">데이터 시각화</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span>카카오 맵 기반 대화형 지도</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span>대기질 실시간 측정값 표시</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span>제보 위치 마커 및 클러스터링</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span>이상 패턴 시각화 페이지</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 앞으로 구현할 기능 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-blue-600">⏳</span> 앞으로 구현할 기능
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                      우선순위: 높음
                    </span>
                    <h4 className="font-bold text-lg text-gray-900">알림 및 소통 강화</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>실시간 알림 시스템 (제보 반응, 패턴 감지, 처리 상태 변경)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>제보 댓글 및 토론 기능</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>이메일/푸시 알림 설정</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                      우선순위: 높음
                    </span>
                    <h4 className="font-bold text-lg text-gray-900">행정 연동 시스템</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>관리자 대시보드 (제보 모니터링, 통계, 우선순위 관리)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>제보 처리 상태 업데이트 (접수/진행중/완료)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>용인시청 환경부서 연동 API</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-purple-600 text-white text-sm font-medium rounded-full">
                      우선순위: 중간
                    </span>
                    <h4 className="font-bold text-lg text-gray-900">녹색 보상 생태계</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-0.5">•</span>
                      <span>포인트 마켓플레이스 (상품 교환, 할인 쿠폰)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-0.5">•</span>
                      <span>지역 친환경 상점 파트너십 연동</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-0.5">•</span>
                      <span>친환경 챌린지 및 캠페인 시스템</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 mt-0.5">•</span>
                      <span>월간/연간 환경지킴이 리더보드</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-indigo-600 text-white text-sm font-medium rounded-full">
                      우선순위: 중간
                    </span>
                    <h4 className="font-bold text-lg text-gray-900">AI 고도화</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 mt-0.5">•</span>
                      <span>과거 제보 데이터 기반 예측 모델</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 mt-0.5">•</span>
                      <span>계절별/시간대별 환경 리스크 예측</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 mt-0.5">•</span>
                      <span>다중 제보 통합 분석 (동일 사건 자동 연결)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-600 mt-0.5">•</span>
                      <span>AI 챗봇을 통한 제보 가이드</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-amber-600 text-white text-sm font-medium rounded-full">
                      우선순위: 낮음
                    </span>
                    <h4 className="font-bold text-lg text-gray-900">확장 기능</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">•</span>
                      <span>모바일 앱 개발 (iOS/Android)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">•</span>
                      <span>다른 지역으로 플랫폼 확장</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">•</span>
                      <span>오픈 API 제공 (연구자, 개발자용)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-0.5">•</span>
                      <span>환경 데이터 시각화 대시보드 고도화</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              ❓ 자주 묻는 질문
            </h2>
            <div className="space-y-4">
              <details className="bg-white rounded-lg shadow-md p-6 group">
                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                  제보는 어떻게 하나요?
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  상단 메뉴의 <strong>'제보하기'</strong> 버튼을 클릭하여 환경 문제 사진을 업로드하고,
                  위치와 설명을 입력하면 됩니다. 로그인 없이도 제보할 수 있지만,
                  로그인하면 포인트를 적립하고 내 제보를 관리할 수 있습니다.
                </p>
              </details>

              <details className="bg-white rounded-lg shadow-md p-6 group">
                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                  AI는 어떻게 제보를 분석하나요?
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  <strong>Anthropic의 Claude 3.5 Sonnet</strong> AI 모델을 사용하여 제보 이미지를 분석합니다.
                  AI는 사진에서 환경 문제의 유형(불법 소각, 쓰레기 투기, 수질 오염 등)과
                  심각도(낮음/중간/높음)를 자동으로 판정하고, 적절한 대응 방안을 제시합니다.
                </p>
              </details>

              <details className="bg-white rounded-lg shadow-md p-6 group">
                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                  포인트는 어떻게 사용하나요?
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  현재는 포인트 적립 기능만 제공되며, 향후 <strong>Phase 3</strong>에서
                  지역 친환경 상점과 제휴하여 포인트로 제품 할인, 친환경 제품 구매 등을
                  할 수 있는 마켓플레이스를 오픈할 예정입니다.
                </p>
              </details>

              <details className="bg-white rounded-lg shadow-md p-6 group">
                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                  제보한 내용은 어떻게 처리되나요?
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  제보는 <strong>'제보 피드'</strong>에 공개되어 다른 시민들과 공유됩니다.
                  AI가 고위험으로 판정한 제보는 우선 처리 대상으로 표시되며,
                  향후 용인시청 환경부서와 연동하여 실제 행정 조치로 이어질 수 있도록 개발 중입니다.
                </p>
              </details>

              <details className="bg-white rounded-lg shadow-md p-6 group">
                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                  개인정보는 안전한가요?
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  모든 데이터는 <strong>Supabase</strong>를 통해 암호화되어 저장되며,
                  개인정보 보호법을 준수합니다. 제보 시 위치 정보는 선택적으로 공개할 수 있으며,
                  언제든지 본인의 제보 및 계정을 삭제할 수 있습니다.
                </p>
              </details>

              <details className="bg-white rounded-lg shadow-md p-6 group">
                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                  이상 패턴 감지는 어떻게 작동하나요?
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  AI가 제보 데이터를 시간별, 지역별로 분석하여 비정상적인 패턴을 자동으로 감지합니다.
                  예를 들어, 특정 지역에서 짧은 시간 내 동일 유형의 제보가 반복되거나,
                  평소보다 높은 심각도의 제보가 집중될 경우 이상 패턴으로 분류되어
                  <strong>'이상 패턴'</strong> 페이지에 표시됩니다.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* 팀 정보 */}
        <section className="py-16 bg-white">
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
