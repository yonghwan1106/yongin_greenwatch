# Supabase 설정 가이드

## 1단계: Supabase 프로젝트 생성

1. **Supabase 웹사이트 접속**
   - https://supabase.com 접속
   - "Start your project" 클릭

2. **계정 생성/로그인**
   - GitHub, Google 등으로 로그인

3. **새 프로젝트 생성**
   - "New Project" 클릭
   - 조직(Organization) 선택 또는 생성
   - 프로젝트 정보 입력:
     - **Name**: `yongin_greenwatch`
     - **Database Password**: 강력한 비밀번호 설정 (저장 필수!)
     - **Region**: `Northeast Asia (Seoul)` 선택
     - **Pricing Plan**: Free 선택
   - "Create new project" 클릭

4. **프로젝트 생성 대기**
   - 약 2-3분 소요
   - 프로젝트가 준비될 때까지 대기

---

## 2단계: 데이터베이스 스키마 생성

1. **SQL Editor 접속**
   - 좌측 사이드바에서 "SQL Editor" 클릭
   - 또는 직접 URL: `https://supabase.com/dashboard/project/YOUR-PROJECT-ID/sql`

2. **스키마 SQL 복사**
   - 아래 전체 SQL을 복사하세요

3. **SQL 실행**
   - SQL Editor에 붙여넣기
   - "Run" 버튼 클릭 (또는 Ctrl + Enter)
   - 성공 메시지 확인

---

## 3단계: API 키 설정

1. **프로젝트 설정 접속**
   - 좌측 사이드바 하단의 "Settings" 클릭
   - "API" 메뉴 선택

2. **Project URL 복사**
   - `Project URL` 값 복사
   - `.env.local` 파일의 `NEXT_PUBLIC_SUPABASE_URL`에 붙여넣기

3. **API Keys 복사**
   - `Project API keys` 섹션에서
   - `anon public` 키 복사
   - `.env.local` 파일의 `NEXT_PUBLIC_SUPABASE_ANON_KEY`에 붙여넣기

---

## 4단계: Storage 버킷 확인

1. **Storage 메뉴 접속**
   - 좌측 사이드바에서 "Storage" 클릭

2. **report-media 버킷 확인**
   - 마이그레이션 스크립트가 자동으로 생성했는지 확인
   - 없다면 수동 생성:
     - "New bucket" 클릭
     - Name: `report-media`
     - Public bucket: ✅ 체크
     - "Create bucket" 클릭

---

## 5단계: 테이블 확인

1. **Table Editor 접속**
   - 좌측 사이드바에서 "Table Editor" 클릭

2. **생성된 테이블 확인**
   - ✅ reports
   - ✅ report_media
   - ✅ report_empathy
   - ✅ report_ai_analysis
   - ✅ report_status_history
   - ✅ air_quality_history
   - ✅ user_points
   - ✅ point_transactions
   - ✅ partner_stores
   - ✅ store_benefits

---

## 6단계: Row Level Security (RLS) 확인

1. **Authentication 메뉴**
   - 좌측 사이드바에서 "Authentication" 클릭
   - "Policies" 탭 선택

2. **정책 확인**
   - reports 테이블에 정책이 활성화되어 있는지 확인

---

## ✅ 완료 확인

설정이 완료되면:

1. `.env.local` 파일 확인:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

2. 개발 서버 재시작:
```bash
# 터미널에서
npm run dev
```

3. 브라우저에서 테스트:
   - http://localhost:3002/auth/signup 접속
   - 테스트 계정 생성
   - 로그인 테스트

---

## 🐛 문제 해결

### 테이블이 생성되지 않은 경우
- SQL Editor에서 에러 메시지 확인
- UUID extension 활성화 확인
- SQL을 한 번에 전체 실행했는지 확인

### RLS 정책 오류
- Authentication > Policies에서 수동으로 정책 추가
- 또는 SQL Editor에서 정책 SQL 재실행

### Storage 접근 오류
- Storage > report-media > Policies 확인
- Public 설정 확인

---

## 📞 도움이 필요하신가요?

- Supabase 공식 문서: https://supabase.com/docs
- 커뮤니티: https://github.com/supabase/supabase/discussions
