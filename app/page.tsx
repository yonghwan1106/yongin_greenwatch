import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import {
  MapPin,
  MessageSquare,
  TrendingUp,
  Bell,
  Users,
  Award,
  ChevronRight,
  Leaf,
  Wind,
  Droplets,
  AlertTriangle
} from 'lucide-react';

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero Section with Background */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                용인특례시 환경 거버넌스 플랫폼
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold">
              용인 그린워치
            </h1>
            <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto">
              데이터로 숨 쉬는 용인, 시민의 손으로 만드는 투명한 환경도시
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <Link href="/map">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold text-lg px-8 py-6">
                  <MapPin className="w-5 h-5 mr-2" />
                  환경지도 보기
                </Button>
              </Link>
              <Link href="/reports">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8 py-6">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  제보하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-sm text-gray-600 mt-1">실시간 모니터링</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">100+</div>
              <div className="text-sm text-gray-600 mt-1">시민 제보</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">AI</div>
              <div className="text-sm text-gray-600 mt-1">자동 분석</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">1,500P</div>
              <div className="text-sm text-gray-600 mt-1">녹색 포인트</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">주요 서비스</h2>
            <p className="text-gray-600">용인 그린워치가 제공하는 핵심 기능을 확인하세요</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service Card 1 */}
            <Link href="/map" className="group">
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 h-full border border-gray-100 hover:border-blue-300">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition">
                  <MapPin className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">실시간 환경지도</h3>
                <p className="text-sm text-gray-600 mb-4">용인시 전역의 대기질 데이터를 실시간으로 확인하세요</p>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  바로가기 <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>

            {/* Service Card 2 */}
            <Link href="/reports" className="group">
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 h-full border border-gray-100 hover:border-green-300">
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition">
                  <MessageSquare className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">시민 환경 제보</h3>
                <p className="text-sm text-gray-600 mb-4">환경 문제를 발견하면 사진과 함께 즉시 제보하세요</p>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  바로가기 <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>

            {/* Service Card 3 */}
            <Link href="/anomaly" className="group">
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 h-full border border-gray-100 hover:border-purple-300">
                <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition">
                  <TrendingUp className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">이상 패턴 감지</h3>
                <p className="text-sm text-gray-600 mb-4">AI가 환경 데이터의 이상 패턴을 자동으로 분석합니다</p>
                <div className="flex items-center text-purple-600 text-sm font-medium">
                  바로가기 <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>

            {/* Service Card 4 */}
            <Link href="/profile" className="group">
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 h-full border border-gray-100 hover:border-orange-300">
                <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition">
                  <Award className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">녹색 포인트</h3>
                <p className="text-sm text-gray-600 mb-4">환경 보호 활동으로 포인트를 모아 혜택을 받으세요</p>
                <div className="flex items-center text-orange-600 text-sm font-medium">
                  바로가기 <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">이용 방법</h2>
            <p className="text-gray-600">간단한 3단계로 환경 보호에 동참하세요</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">환경 문제 발견</h3>
              <p className="text-gray-600">
                악취, 쓰레기, 오염수 등 환경 문제를 발견하면 사진을 찍으세요
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">즉시 제보하기</h3>
              <p className="text-gray-600">
                앱에서 위치와 사진을 첨부하여 간편하게 제보를 등록하세요
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">포인트 적립</h3>
              <p className="text-gray-600">
                제보 완료 시 녹색 포인트를 받고 친환경 매장에서 사용하세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">핵심 기능</h2>
            <p className="text-gray-600">데이터 기반의 스마트한 환경 관리</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Wind className="w-10 h-10 text-blue-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">실시간 대기질</h3>
              <p className="text-sm text-gray-600">에어코리아 API 연동으로 정확한 대기질 정보 제공</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <AlertTriangle className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">AI 자동 분석</h3>
              <p className="text-sm text-gray-600">Claude AI가 제보 내용을 자동 분류하고 담당 부서 추천</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Users className="w-10 h-10 text-green-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">시민 참여</h3>
              <p className="text-sm text-gray-600">공감 기능으로 다른 시민들과 환경 이슈 공유</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Bell className="w-10 h-10 text-orange-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">맞춤형 알림</h3>
              <p className="text-sm text-gray-600">내 지역의 환경 이슈를 실시간으로 알림</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Leaf className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            지금 시작하세요
          </h2>
          <p className="text-xl text-blue-50 mb-8">
            용인시민이라면 누구나 참여할 수 있습니다
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold text-lg px-10 py-6">
                회원가입
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-10 py-6">
                로그인
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">용인 그린워치</h3>
              <p className="text-sm">
                시민 참여형 환경 거버넌스 플랫폼
              </p>
              <p className="text-sm mt-2 text-gray-400">
                용인특례시 정책 아이디어 공모전 출품작
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">바로가기</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/map" className="hover:text-white">환경지도</Link></li>
                <li><Link href="/reports" className="hover:text-white">제보 피드</Link></li>
                <li><Link href="/anomaly" className="hover:text-white">이상 패턴</Link></li>
                <li><Link href="/about" className="hover:text-white">서비스 소개</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">문의하기</h3>
              <p className="text-sm">
                서비스 이용 중 문의사항이 있으시면<br />
                언제든지 연락주세요
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-400">
            <p>&copy; 2025 용인 그린워치. Made with 💚 for Yongin City</p>
          </div>
        </div>
      </footer>
    </>
  );
}
