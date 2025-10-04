# 용인 그린워치 개발 현황

**최종 업데이트:** 2025년 10월 4일

## 📊 전체 진행 상황

### Phase 1: MVP (0~6개월) - **완료 (100%)** 🎉✨

---

## ✅ 완료된 기능

### 1. 프로젝트 기반 설정
- [x] Next.js 14 (App Router) + TypeScript 설정
- [x] Tailwind CSS 커스텀 테마 (녹색 환경 테마)
- [x] shadcn/ui 컴포넌트 통합
- [x] 프로젝트 구조 및 폴더 구성
- [x] Git 저장소 설정

### 2. 데이터베이스 및 백엔드
- [x] Supabase 프로젝트 스키마 설계
- [x] PostgreSQL 마이그레이션 파일 작성
  - [x] reports (제보) 테이블
  - [x] report_media (제보 미디어) 테이블
  - [x] report_empathy (공감) 테이블
  - [x] report_ai_analysis (AI 분석) 테이블
  - [x] air_quality_history (대기질 히스토리) 테이블
  - [x] user_points (포인트) 테이블
  - [x] partner_stores (파트너 상점) 테이블
- [x] Row Level Security (RLS) 정책
- [x] 트리거 함수 (공감 수 자동 업데이트)
- [x] Storage 버킷 설정 (report-media)

### 3. 실시간 환경 지도 (Epic 1)
- [x] 카카오맵 SDK 통합
- [x] 용인시 측정소 위치 마커 표시
- [x] 에어코리아 API 연동
- [x] 실시간 대기질 데이터 조회 (`/api/air-quality`)
- [x] 커스텀 대기질 마커 (색상 코딩)
- [x] 인포윈도우 상세 정보 표시
- [x] 5분 자동 갱신
- [x] 대기질 등급 범례
- [x] 내 위치 버튼

### 4. 시민 제보 시스템 (Epic 2) ✅ 완료
- [x] 3단계 제보 프로세스
  - [x] Step 1: 사진 촬영/업로드 (최대 5장)
  - [x] Step 2: GPS 자동 위치 태깅
  - [x] Step 3: 제보 유형 선택 및 설명 입력
- [x] 7가지 제보 유형 (악취, 폐수, 폐기물, 소음, 대기오염, 수질오염, 기타)
- [x] 익명 제보 옵션
- [x] 이미지 미리보기 및 삭제
- [x] Supabase Storage 이미지 업로드
- [x] 제보 데이터 DB 저장
- [x] 포인트 자동 지급 (50P)

### 5. 제보 피드 및 공감 (Epic 2) ✅ 완료
- [x] 제보 목록 조회 (`/reports`)
- [x] 최신순/공감순 정렬
- [x] 제보 카드 UI (이미지, 유형, 설명, 위치, 공감 수)
- [x] 공감 버튼 (로그인 필요)
- [x] 공감 추가/취소 기능
- [x] 제보 상태 표시 (접수, 검토중, 해결, 반려)
- [x] 지도에 제보 마커 표시 (이모지 + 색상 코딩)
- [x] 마커 클릭 시 인포윈도우 (이미지, 설명, 공감 수, 상세보기 버튼)

### 6. 사용자 인증 (Auth)
- [x] Supabase Auth 통합
- [x] AuthContext 및 AuthProvider
- [x] 회원가입 페이지 (`/auth/signup`)
- [x] 로그인 페이지 (`/auth/login`)
- [x] 이메일 인증 플로우
- [x] 세션 관리

### 7. 랜딩 페이지 ✅ 완료
- [x] 홈페이지 디자인
- [x] 주요 기능 소개 카드
- [x] 지도 보기 / 제보 보기 버튼
- [x] 반응형 레이아웃
- [x] Header 컴포넌트 (네비게이션, 로그인/로그아웃)

### 8. 문서화
- [x] README.md
- [x] PRD (제품 요구사항 명세서)
- [x] API 설정 가이드 (`docs/setup-guide.md`)
- [x] 개발 현황 문서 (이 파일)

### 9. 버그 수정 및 개선사항 (2025년 10월 4일)
- [x] **제보 등록 인증 버그 수정**
  - Authorization Bearer token 방식으로 변경
  - Session NULL 문제 해결
- [x] **포인트 시스템 수정**
  - Service Role Key를 통한 RLS 우회
  - 포인트 지급 API 라우트 생성 (`/api/empathy`)
  - `.single()` → `.maybeSingle()` 변경으로 406 에러 해결
- [x] **GPS 좌표 정밀도 개선**
  - DECIMAL(10,7) → DOUBLE PRECISION 마이그레이션
  - enableHighAccuracy 옵션 추가
  - GPS 정확도 표시 추가
- [x] **제보 피드 → 상세 페이지 네비게이션 추가**
  - 카드 클릭 시 상세 페이지 이동
  - 공감 버튼 이벤트 버블링 방지
- [x] **지도 위치 확인 기능 추가**
  - URL 파라미터로 제보 위치 전달
  - 지도 중심 및 줌 레벨 조정
  - 제보 위치 마커 및 인포윈도우 표시

---

## 🚧 진행 중인 작업

### ✅ 제보 제출 완성 (완료!)
- [x] Supabase Storage에 이미지 업로드 구현
- [x] 제보 데이터 DB 저장
- [x] 제보 제출 성공 시 포인트 지급 (50P)
- [x] PostgreSQL `add_user_points` 함수 구현

### ✅ 지도에 제보 마커 표시 (완료!)
- [x] 제보 위치 마커 렌더링
- [x] 대기질 마커와 구별되는 디자인 (이모지 + 상태별 색상)
- [x] 제보 상세 정보 인포윈도우
- [x] 공감 수 표시 배지

---

## 🎯 Phase 1 MVP 완료!

### ✅ 추가 완료된 기능 (2025년 10월 4일)
- [x] **제보 상세 페이지** (`/reports/[id]`)
  - 제보 이미지 갤러리
  - 상세 내용 표시
  - 공감하기/공감 취소 기능
  - 공감 포인트 지급 (5P, 하루 최대 5회)
  - 지도에서 위치 확인 버튼

- [x] **내 제보 목록 페이지** (`/my-reports`)
  - 내가 작성한 제보 목록
  - 통계 카드 (총 제보, 처리 대기, 해결 완료, 받은 공감)
  - 제보 카드 UI
  - 빈 상태 처리

- [x] **사용자 프로필 페이지** (`/profile`)
  - 포인트 현황 (보유/누적/사용)
  - 포인트 거래 내역
  - 빠른 메뉴 (내 제보, 제보하기, 환경 지도)
  - 포인트 적립 방법 안내

- [x] **Toast 알림 시스템**
  - Toast UI 컴포넌트
  - ToastProvider 및 useToast 훅
  - 성공/오류/정보/경고 타입

- [x] **Header 개선**
  - 프로필 링크 추가
  - 내 제보 링크 추가 (로그인 시)
  - 모바일 네비게이션 개선

### 선택 기능 (Phase 2에서 구현)
- [ ] 제보 수정/삭제
- [ ] 댓글 기능
- [ ] 푸시 알림 (제보 상태 변경 시)
- [ ] 검색 및 필터링 고도화
- [ ] 관리자 대시보드
- [ ] 통계 대시보드

---

## 🎯 Phase 2: AI 분석 및 알림 (진행 중)

### ✅ AI 분석 (Epic 3) - 기본 구현 완료
- [x] Claude API 통합 (Anthropic SDK)
- [x] 제보 자동 분석 API (`/api/ai-analysis`)
  - [x] 핵심 키워드 추출
  - [x] 상세 문제 유형 분류
  - [x] 심각도 판정 (low/medium/high)
  - [x] 담당 부서 추천
  - [x] 분석 신뢰도 점수
- [x] 제보 상세 페이지에 AI 분석 결과 표시
  - [x] 키워드 태그
  - [x] 심각도 배지 (색상 구분)
  - [x] 추천 담당 부서
  - [x] 신뢰도 프로그레스바

### 🚧 AI 분석 고도화 (예정)
- [ ] 이미지 분석 (Claude Vision API)
- [ ] 이상 패턴 감지
- [ ] 월간 리포트 자동 생성
- [ ] 유사 제보 추천

### 알림 시스템 (Epic 5)
- [ ] Firebase Cloud Messaging 설정
- [ ] 대기질 알림 (나쁨/매우나쁨 시)
- [ ] 제보 상태 업데이트 알림
- [ ] 이상 패턴 감지 알림

### 고급 지도 기능
- [ ] 시간대별 데이터 조회 (오늘, 어제, 지난주)
- [ ] 오염물질별 히트맵
- [ ] 시계열 차트
- [ ] 주요 시설 정보 표시

---

## 🚀 Phase 3 계획 (V1.5 - 생태계 확장)

### 녹색 보상 마켓플레이스 (Epic 4)
- [ ] 포인트 시스템 완성
- [ ] 파트너 상점 등록
- [ ] QR코드 혜택 사용
- [ ] 친환경 챌린지

---

## 📊 현재 구조

```
yongin-greenwatch/
├── app/
│   ├── page.tsx                    # ✅ 랜딩 페이지
│   ├── layout.tsx                  # ✅ 루트 레이아웃 (AuthProvider)
│   ├── map/
│   │   └── page.tsx               # ✅ 실시간 환경 지도
│   ├── report/
│   │   └── new/page.tsx           # ✅ 제보 작성
│   ├── reports/
│   │   └── page.tsx               # ✅ 제보 피드
│   ├── auth/
│   │   ├── login/page.tsx         # ✅ 로그인
│   │   └── signup/page.tsx        # ✅ 회원가입
│   └── api/
│       └── air-quality/route.ts   # ✅ 대기질 API
├── components/
│   ├── ui/
│   │   ├── button.tsx             # ✅ 버튼 컴포넌트
│   │   └── input.tsx              # ✅ 입력 컴포넌트
│   └── map/
│       └── AirQualityMarker.tsx   # ✅ 대기질 마커
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # ✅ Supabase 클라이언트
│   │   └── database.types.ts      # ✅ 타입 정의
│   ├── contexts/
│   │   └── AuthContext.tsx        # ✅ 인증 컨텍스트
│   ├── api/
│   │   └── air-korea.ts           # ✅ 에어코리아 API
│   ├── types/
│   │   ├── air-quality.ts         # ✅ 대기질 타입
│   │   └── report.ts              # ✅ 제보 타입
│   └── utils/
│       └── cn.ts                  # ✅ 유틸리티
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql # ✅ DB 스키마
└── docs/
    ├── prd.md                     # ✅ PRD
    ├── setup-guide.md             # ✅ 설정 가이드
    └── development-status.md      # ✅ 개발 현황
```

---

## 🐛 알려진 이슈

### ✅ 해결된 이슈
1. ~~**제보 등록 시 user_id NULL 저장**~~ → 해결 (Authorization header 사용)
2. ~~**포인트 지급 403 Forbidden**~~ → 해결 (Service Role Key 사용)
3. ~~**GPS 좌표 정밀도 낮음**~~ → 해결 (DOUBLE PRECISION 마이그레이션)
4. ~~**제보 상세 페이지 접근 불가**~~ → 해결 (네비게이션 링크 추가)

### 📝 현재 이슈
1. **에어코리아 API 응답 간헐적 실패**
   - 원인: Internal Server Error (500)
   - 상태: API 서버 문제로 추정, 재시도 로직 필요

2. **Next.js 개발 모드 경고**
   - "Skipping auto-scroll behavior due to position: fixed"
   - 상태: 기능상 문제 없음, 개발 모드 전용 경고

---

## 🔧 기술 스택

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **Map**: Kakao Map SDK
- **API**: 에어코리아 공공데이터 API
- **AI**: Anthropic Claude API (Phase 2+)
- **Deploy**: Vercel

---

## 📞 다음 단계 (MVP 출시 준비)

### 1. 환경 설정 및 배포 준비
- [ ] `.env.local` 파일 생성 및 API 키 설정
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_KAKAO_MAP_KEY`
  - `AIR_KOREA_API_KEY`
- [ ] Supabase 프로젝트 생성
- [ ] Supabase에서 마이그레이션 실행 (`001_initial_schema.sql`)
- [ ] Supabase Storage 버킷 확인 (`report-media`)

### 2. 필수 기능 추가
- [ ] 제보 상세 페이지 (`/reports/[id]`)
- [ ] 내 제보 목록 페이지 (`/my-reports`)
- [ ] 사용자 프로필 페이지
- [ ] 에러 핸들링 개선 (Toast 알림 추가)

### 3. 테스트 및 최적화
- [ ] 전체 기능 테스트 (제보 작성 → 지도 확인 → 공감)
- [ ] 반응형 디자인 개선 (모바일)
- [ ] 이미지 최적화 (Next.js Image 컴포넌트)
- [ ] 로딩 상태 개선

### 4. 배포
- [ ] Vercel에 배포
- [ ] 환경 변수 설정
- [ ] 도메인 연결 (선택)

---

**개발자:** Claude Code
**프로젝트 관리자:** 박용환
