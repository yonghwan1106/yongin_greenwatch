# 용인 그린워치 빠른 시작 가이드

## 🚀 5분 안에 시작하기

### 1단계: 환경 변수 설정

1. `.env.local.example` 파일을 복사하여 `.env.local` 생성:
   ```bash
   cp .env.local.example .env.local
   ```

2. 각 API 키를 발급받아 `.env.local` 파일에 입력:

#### 필수 API 키

**Supabase (필수)**
- https://supabase.com 에서 프로젝트 생성
- Project Settings > API 에서 URL과 anon key 복사
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**카카오 맵 API (필수)**
- https://developers.kakao.com 에서 앱 생성
- 내 애플리케이션 > 앱 키 > JavaScript 키 복사
- 플랫폼 설정에서 `http://localhost:3000` 추가
```
NEXT_PUBLIC_KAKAO_MAP_KEY=your_javascript_key
```

**에어코리아 API (필수)**
- https://data.go.kr 에서 회원가입
- "한국환경공단_에어코리아_대기오염정보" 검색 후 활용신청
- 승인 후 일반 인증키(Encoding) 복사
```
NEXT_PUBLIC_AIR_KOREA_API_KEY=your_encoded_key
```

---

### 2단계: Supabase 데이터베이스 설정

1. Supabase 대시보드로 이동: https://supabase.com/dashboard

2. SQL Editor 탭 클릭

3. `supabase/migrations/001_initial_schema.sql` 파일 내용 복사

4. SQL Editor에 붙여넣기 후 **Run** 클릭

5. Storage 탭에서 `report-media` 버킷 생성 확인
   - 없다면 New Bucket → Name: `report-media`, Public 체크

---

### 3단계: 프로젝트 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 http://localhost:3000 접속

---

## ✅ 작동 확인 체크리스트

### 1. 회원가입/로그인
- [ ] `/auth/signup` 에서 회원가입 성공
- [ ] 이메일 확인 링크 클릭 (Supabase 대시보드 > Authentication에서 확인)
- [ ] `/auth/login` 에서 로그인 성공

### 2. 환경 지도
- [ ] `/map` 에서 카카오맵 로드됨
- [ ] 대기질 측정소 마커가 표시됨 (파란색/초록색/주황색/빨간색)
- [ ] 마커 클릭 시 PM10, PM2.5 등 정보 표시

### 3. 제보 작성
- [ ] `/report/new` 에서 사진 업로드 가능
- [ ] GPS 위치 자동 태깅
- [ ] 제보 유형 선택 (악취, 폐수 등)
- [ ] 제보 제출 성공 → 50 포인트 지급 메시지
- [ ] `/reports` 에서 방금 작성한 제보 확인

### 4. 지도에서 제보 확인
- [ ] `/map` 에서 제보 마커 표시 (이모지 아이콘)
- [ ] 제보 마커 클릭 시 인포윈도우 표시
- [ ] 이미지, 설명, 공감 수 표시

---

## 🐛 문제 해결

### 지도가 표시되지 않아요
- 카카오 맵 API 키가 올바른지 확인
- 카카오 개발자센터 > 내 애플리케이션 > 플랫폼 설정에 `http://localhost:3000` 추가

### 대기질 데이터가 안 나와요
- 에어코리아 API 키가 올바른지 확인
- 브라우저 콘솔에서 에러 메시지 확인
- 측정소명이 올바른지 확인 (`lib/types/air-quality.ts`)

### 제보 제출이 안 돼요
- Supabase 마이그레이션이 실행되었는지 확인
- Supabase Storage에 `report-media` 버킷이 있는지 확인
- 브라우저 콘솔에서 에러 메시지 확인

### 로그인 후에도 사용자 정보가 안 나와요
- Supabase 이메일 확인 링크를 클릭했는지 확인
- 브라우저 쿠키가 활성화되어 있는지 확인

---

## 📚 다음 단계

MVP 출시를 위한 남은 작업은 `docs/development-status.md`를 참고하세요.

**주요 남은 작업:**
- 제보 상세 페이지
- 내 제보 목록 페이지
- 에러 핸들링 개선
- Vercel 배포

---

**도움이 필요하신가요?**
- 전체 문서: `docs/setup-guide.md`
- PRD: `docs/prd.md`
- 개발 현황: `docs/development-status.md`
