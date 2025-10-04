# 용인 그린워치 설정 가이드

## 🔑 필요한 API 키 및 설정

### 1. Supabase 설정

1. **Supabase 계정 생성 및 프로젝트 생성**
   - https://supabase.com 접속
   - 새 프로젝트 생성
   - 프로젝트 이름: `yongin-greenwatch`
   - 데이터베이스 비밀번호 설정

2. **데이터베이스 마이그레이션 실행**
   - Supabase 대시보드 → SQL Editor 이동
   - `supabase/migrations/001_initial_schema.sql` 파일 내용 복사
   - SQL Editor에서 실행

3. **Storage 버킷 생성** (이미 마이그레이션에 포함됨)
   - 버킷 이름: `report-media`
   - Public 버킷으로 설정

4. **환경 변수 설정**
   - Supabase 대시보드 → Settings → API
   - Project URL 복사 → `NEXT_PUBLIC_SUPABASE_URL`
   - Project API keys → anon public 키 복사 → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

### 2. 카카오맵 API 설정

1. **카카오 개발자 계정 생성**
   - https://developers.kakao.com 접속
   - 회원가입 및 로그인

2. **애플리케이션 추가**
   - 내 애플리케이션 → 애플리케이션 추가하기
   - 앱 이름: `용인 그린워치`
   - 회사명: (선택사항)

3. **플랫폼 추가**
   - 앱 설정 → 플랫폼
   - Web 플랫폼 추가
   - 사이트 도메인: `http://localhost:3000` (개발용)

4. **JavaScript 키 발급**
   - 앱 설정 → 앱 키
   - JavaScript 키 복사 → `NEXT_PUBLIC_KAKAO_MAP_KEY`

---

### 3. 에어코리아 API 설정

1. **공공데이터포털 회원가입**
   - https://www.data.go.kr 접속
   - 회원가입 및 로그인

2. **API 신청**
   - 검색창에 "한국환경공단_에어코리아_대기오염정보" 검색
   - "측정소정보 조회 서비스" 활용신청
   - 활용목적: `환경 모니터링 애플리케이션 개발`
   - 상세기능정보: 전체 선택

3. **승인 대기 (보통 즉시 승인)**
   - 마이페이지 → 오픈API → 개발계정
   - 일반 인증키(Encoding) 복사 → `NEXT_PUBLIC_AIR_KOREA_API_KEY`

4. **트래픽 제한**
   - 일일 한도: 10,000회
   - 분당 한도: 100회

---

### 4. Anthropic Claude API 설정 (Phase 2부터 필요)

1. **Anthropic 계정 생성**
   - https://console.anthropic.com 접속
   - 회원가입 및 로그인

2. **API 키 발급**
   - Settings → API Keys
   - Create Key
   - 키 이름: `yongin-greenwatch`
   - API Key 복사 → `ANTHROPIC_API_KEY`

3. **요금제 설정**
   - Claude Sonnet 4: 입력 $3/MTok, 출력 $15/MTok
   - 월 예산 설정 권장

---

### 5. Firebase Cloud Messaging 설정 (Phase 2부터 필요)

1. **Firebase 프로젝트 생성**
   - https://console.firebase.google.com 접속
   - 프로젝트 추가
   - 프로젝트 이름: `yongin-greenwatch`

2. **웹 앱 추가**
   - 프로젝트 설정 → 일반
   - 내 앱 → 웹 앱 추가
   - 앱 닉네임: `용인 그린워치`

3. **환경 변수 설정**
   - Firebase SDK 구성에서 값 복사
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`

4. **Cloud Messaging 활성화**
   - 프로젝트 설정 → Cloud Messaging
   - 서버 키 생성

---

## 📝 .env.local 파일 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 입력하세요:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Kakao Map
NEXT_PUBLIC_KAKAO_MAP_KEY=your-kakao-javascript-key

# Air Korea API
NEXT_PUBLIC_AIR_KOREA_API_KEY=your-air-korea-api-key

# Anthropic Claude API (Phase 2+)
ANTHROPIC_API_KEY=your-anthropic-api-key

# Firebase Cloud Messaging (Phase 2+)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

---

## 🚀 개발 서버 실행

```bash
# 패키지 설치 (최초 1회)
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 http://localhost:3000 을 열어 확인하세요.

---

## ⚠️ 주의사항

1. **API 키 보안**
   - `.env.local` 파일은 절대 Git에 커밋하지 마세요
   - 이미 `.gitignore`에 포함되어 있습니다

2. **CORS 에러 발생 시**
   - 에어코리아 API는 서버에서 호출해야 합니다
   - `/api/air-quality` Route Handler를 사용하세요

3. **카카오맵 도메인 등록**
   - 배포 시 운영 도메인을 카카오 개발자 콘솔에 추가하세요

4. **Supabase RLS 정책**
   - 운영 환경에서는 RLS 정책을 더욱 엄격하게 설정하세요

---

## 🔍 문제 해결

### 지도가 표시되지 않을 때
- 카카오맵 JavaScript 키가 올바른지 확인
- 브라우저 콘솔에서 에러 메시지 확인
- 도메인이 카카오 개발자 콘솔에 등록되었는지 확인

### 대기질 데이터가 표시되지 않을 때
- 에어코리아 API 키가 올바른지 확인
- `/api/air-quality` 엔드포인트를 직접 호출하여 응답 확인
- 네트워크 탭에서 API 호출 상태 확인

### Supabase 연결 오류
- Project URL과 Anon Key가 올바른지 확인
- Supabase 프로젝트가 활성화되어 있는지 확인
- 네트워크 연결 상태 확인

---

## 📚 추가 문서

- [Supabase 문서](https://supabase.com/docs)
- [카카오맵 Web API 문서](https://apis.map.kakao.com/web/)
- [에어코리아 API 가이드](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15073861)
- [Next.js 14 문서](https://nextjs.org/docs)
