import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-b from-green-50 to-white">
      <div className="text-center space-y-8 max-w-3xl">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-primary">
            용인 그린워치
          </h1>
          <p className="text-sm font-medium text-gray-700 inline-block px-4 py-2 border-2 border-green-500 rounded-lg bg-green-50">
            용인특례시 정책 아이디어 출품작
          </p>
          <p className="text-2xl text-muted-foreground">
            데이터로 숨 쉬는 용인, 시민의 손으로 만드는 투명한 환경도시
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border-2 border-blue-200">
            <div className="text-4xl mb-4">🗺️</div>
            <h3 className="font-semibold text-lg mb-2">실시간 환경 지도</h3>
            <p className="text-sm text-muted-foreground">
              용인시 전역의 대기질을 한눈에 확인하세요
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border-2 border-green-200">
            <div className="text-4xl mb-4">📢</div>
            <h3 className="font-semibold text-lg mb-2">시민 제보</h3>
            <p className="text-sm text-muted-foreground">
              환경 문제를 발견하면 즉시 제보하세요
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition border-2 border-purple-200">
            <div className="text-4xl mb-4">💚</div>
            <h3 className="font-semibold text-lg mb-2">녹색 보상</h3>
            <p className="text-sm text-muted-foreground">
              환경 활동으로 포인트를 받고 혜택을 누리세요
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center mt-12">
          <Link href="/map">
            <Button size="lg" className="text-lg px-8">
              지도 보기
            </Button>
          </Link>
          <Link href="/reports">
            <Button size="lg" variant="outline" className="text-lg px-8">
              제보 보기
            </Button>
          </Link>
        </div>
      </div>
      </main>
    </>
  );
}
