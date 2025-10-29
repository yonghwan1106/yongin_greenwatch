# 용인 그린워치 (Yongin GreenWatch)

> 데이터로 숨 쉬는 용인, 시민의 손으로 만드는 투명한 환경도시

용인시 시민 참여형 환경 거버넌스 플랫폼

## 📋 프로젝트 개요

용인 그린워치는 용인시 시민들이 실시간 환경 데이터를 확인하고, 환경 문제를 제보하며, 친환경 활동에 참여할 수 있는 통합 플랫폼입니다.

### 주요 기능

**Phase 1 (MVP) - 완료 (100%)** 🎉✨
- ✅ 실시간 대기질 지도 (에어코리아 API 연동)
- ✅ 시민 환경 제보 시스템 (사진 업로드, GPS 위치 태깅, 포인트 지급)
- ✅ 제보 피드 및 공감 기능
- ✅ 제보 상세 페이지
- ✅ 내 제보 목록 페이지
- ✅ 사용자 프로필 및 포인트 관리
- ✅ 지도에 제보 마커 표시 (이모지 + 상태별 색상)
- ✅ Toast 알림 시스템
- ✅ 사용자 인증 (Supabase Auth)

**Phase 2 (V1.0)**
- 📅 Claude AI 자동 태깅 및 분류
- 📅 이상 패턴 감지 및 알림
- 📅 맞춤형 환경 알림
- 📅 시간대별 데이터 조회 및 히트맵

**Phase 3 (V1.5)**
- 📅 녹색 포인트 사용 시스템
- 📅 파트너 상점 마켓플레이스
- 📅 월간 AI 리포트 생성

## 🛠 기술 스택

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand, React Query
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Map**: Kakao Map SDK
- **AI**: Claude API (Anthropic)
- **Charts**: Recharts
- **Deployment**: Vercel

## 🎯 데모 계정 체험하기

회원가입 없이 데모 계정으로 바로 서비스를 체험해보세요!

### 방법 1: 웹사이트에서 직접 로그인
1. 로그인 페이지 접속
2. **"데모 계정으로 체험하기"** 버튼 클릭
3. 자동으로 로그인되어 모든 기능 체험 가능

### 방법 2: 수동 로그인
- 이메일: `demo@yongin-greenwatch.com`
- 비밀번호: `demo1234!@`

### 데모 계정에서 확인 가능한 데이터
- 📍 **환경지도**: 용인시 실시간 대기질 데이터 (24시간 이력)
- 📝 **제보 피드**: 6개의 샘플 환경 제보 (악취, 오염수, 쓰레기, 미세먼지, 소음, 수질)
- 🤖 **AI 분석**: 각 제보에 대한 자동 키워드 추출 및 부서 추천
- 🏪 **제휴 매장**: 3개의 친환경 파트너 상점
- 💰 **포인트**: 1,500P (가입 보너스 + 활동 포인트 + 월간 보너스)
- 📊 **포인트 거래 내역**: 8개의 샘플 거래 내역

## 🚀 시작하기

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn
- Supabase 계정
- 카카오 개발자 계정
- 에어코리아 API 키
- Anthropic API 키 (Phase 2부터 필요)

### 설치

1. 저장소 클론
```bash
git clone https://github.com/your-org/yongin-greenwatch.git
cd yongin-greenwatch
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
```bash
cp .env.local.example .env.local
```

`.env.local` 파일을 열어 다음 값들을 설정하세요:
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Anon 키
- `NEXT_PUBLIC_KAKAO_MAP_KEY`: 카카오맵 JavaScript 키
- `NEXT_PUBLIC_AIR_KOREA_API_KEY`: 에어코리아 API 키
- `ANTHROPIC_API_KEY`: Claude API 키 (Phase 2+)

4. Supabase 마이그레이션 실행

Supabase 대시보드에서 SQL Editor를 열고 `supabase/migrations/001_initial_schema.sql` 파일의 내용을 실행하세요.

5. 데모 계정 및 샘플 데이터 생성 (선택사항)

데모 계정과 샘플 데이터를 자동으로 생성하려면:

```bash
npm run setup-demo
```

이 스크립트는 다음을 자동으로 생성합니다:
- 데모 계정 (demo@yongin-greenwatch.com)
- 6개의 샘플 환경 제보
- AI 분석 데이터
- 포인트 거래 내역
- 대기질 이력 데이터 (24시간)
- 제휴 매장 3개

6. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📁 프로젝트 구조

```
yongin-greenwatch/
├── app/                    # Next.js App Router 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지
│   ├── map/               # 지도 페이지
│   ├── report/            # 제보 관련 페이지
│   └── profile/           # 사용자 프로필
├── components/            # React 컴포넌트
│   ├── ui/               # shadcn/ui 컴포넌트
│   ├── map/              # 지도 관련 컴포넌트
│   └── report/           # 제보 관련 컴포넌트
├── lib/                  # 유틸리티 및 설정
│   ├── supabase/        # Supabase 클라이언트 및 타입
│   ├── api/             # API 클라이언트
│   └── utils/           # 헬퍼 함수
├── supabase/            # Supabase 관련 파일
│   └── migrations/      # 데이터베이스 마이그레이션
├── docs/                # 프로젝트 문서
│   └── prd.md          # 제품 요구사항 명세서
└── public/              # 정적 파일
```

## 📚 문서

- **[⚡ 빠른 시작 가이드](./docs/setup-quick-guide.md)** - 5분 안에 프로젝트 실행하기
- [제품 요구사항 명세서 (PRD)](./docs/prd.md) - 전체 기능 명세
- [개발 현황](./docs/development-status.md) - 현재 진행 상황 및 남은 작업
- [상세 설정 가이드](./docs/setup-guide.md) - API 키 발급 및 설정 방법

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 문의

프로젝트 관련 문의사항은 이슈를 생성하거나 이메일로 연락주세요.

---

Made with 💚 for Yongin City
