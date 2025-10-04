# **제품 요구사항 명세서 (PRD): 용인 그린워치 (Yongin GreenWatch)**

**버전:** 1.0  
**작성일:** 2025년 10월 3일  
**작성자:** 박용환  
**상태:** 초안

---

## **1. 개요 (Overview)**

### **1.1. 문제 정의 (Problem Statement)**

용인시는 인구 110만 명의 경기도 제2도시이자, 삼성전자·SK하이닉스 반도체 클러스터가 위치한 첨단산업 도시이다. 그러나 급격한 산업화와 도시화로 인해 시민들은 다음과 같은 환경 문제에 직면해 있다:

**1) 정보 접근성 문제**
- 대기질, 수질 등 환경 데이터가 에어코리아, 물환경정보시스템 등 여러 플랫폼에 분산되어 있어 통합 확인 불가
- 반도체 클러스터, 산업단지 인근 주민들은 환경 위험에 노출되지만 실시간 정보 부족으로 불안감 가중
- 처인구, 기흥구, 수지구 간 환경 측정 인프라 격차로 인한 정보 불평등

**2) 시민 참여 장벽**
- 악취, 소음, 폐수 등 일상적 환경 불편을 제보할 간편한 공식 창구 부재
- 120다산콜센터, 민원24 등 기존 민원 시스템은 복잡하고 피드백 지연
- 제보 후 처리 과정 및 결과를 확인할 수 없어 '제보해도 소용없다'는 무력감 확산

**3) 정책 의사결정의 한계**
- 시민들의 현장 목소리가 정책에 반영되는 체계 미흡
- 환경 민원이 산발적으로 접수되어 패턴 분석 및 우선순위 결정 어려움
- 데이터 기반 정책 수립보다는 민원 대응식 행정에 그침

### **1.2. 제품 비전 (Vision)**

**"데이터로 숨 쉬는 용인, 시민의 손으로 만드는 투명한 환경도시"**

용인 그린워치는 반도체 클러스터와 친환경 도시가 공존하는 지속가능한 용인을 만들기 위한 시민 참여형 환경 거버넌스 플랫폼이다. 우리는:

1. **투명성**: 모든 시민에게 실시간 환경 데이터를 제공하여 알 권리를 보장한다
2. **참여**: 누구나 쉽게 환경 문제를 제보하고 공감하며 변화를 만드는 주체가 되도록 한다
3. **신뢰**: 제보부터 처리까지 투명한 프로세스로 시민-행정 간 신뢰를 구축한다
4. **지속가능성**: 환경 개선 활동에 보상을 제공하여 친환경 생태계를 만든다

### **1.3. 목표 사용자 (Target Audience)**

**핵심 사용자 (Primary Users)**

| 페르소나 | 특성 | 니즈 | 앱 사용 목적 |
|---------|------|------|-------------|
| **환경 민감 시민** (김미정, 37세, 주부) | - 초등학생 자녀 2명<br>- 기흥구 반도체단지 인근 거주<br>- 아이 천식으로 대기질 민감 | - 우리 동네 실시간 대기질 확인<br>- 미세먼지 나쁨 시 알림 받기<br>- 학교 주변 환경 모니터링 | 매일 대기질 확인, 필요시 제보 |
| **청년 환경운동가** (이준호, 28세, NGO 활동가) | - 용인환경운동연합 간사<br>- 처인구 거주<br>- 환경 정책 모니터링 활동 | - 지역별 환경 데이터 수집<br>- 패턴 분석을 통한 정책 제안<br>- 시민 제보 데이터 활용 | 주 3회 이상, 리포트 다운로드 |
| **산업단지 인근 주민** (박철수, 52세, 자영업) | - 처인구 산업단지 인근 거주<br>- 야간 악취 불편 경험<br>- IT 활용 능력 보통 | - 악취 발생 시 즉시 제보<br>- 같은 문제 겪는 이웃 확인<br>- 민원 처리 결과 확인 | 문제 발생 시 즉시 제보 |

**확장 사용자 (Secondary Users)**

| 페르소나 | 특성 | 니즈 | 앱 사용 목적 |
|---------|------|------|-------------|
| **친환경 소상공인** (최은영, 45세, 제로웨이스트샵 운영) | - 수지구 제로웨이스트샵 운영<br>- 환경 가치 중시<br>- 고객 확보 고민 | - 환경 의식 높은 고객 유치<br>- 상점 홍보 채널 확보<br>- 지역사회 기여 | 월 1회 혜택 등록, 이벤트 |
| **환경정책 공무원** (정민수, 39세, 환경정책과 주무관) | - 용인시청 환경정책과<br>- 대기질 개선 정책 담당<br>- 데이터 기반 의사결정 선호 | - 시민 제보 실시간 모니터링<br>- 지역별 환경 문제 패턴 파악<br>- 정책 효과 측정 | 매일 대시보드 확인 |

### **1.4. 성공 지표 (Success Metrics / KPIs)**

**1단계 (MVP, 6개월 후)**
- 앱 다운로드: 5,000건
- 월간 활성 사용자(MAU): 2,000명
- 누적 제보 건수: 500건
- 제보 평균 처리 시간: 5일 이내

**2단계 (V1.0, 12개월 후)**
- MAU: 10,000명
- 월 평균 제보: 300건
- 제보 공감: 3,000건/월
- 시민 만족도: 70점 이상(100점 만점)

**3단계 (V1.5, 24개월 후)**
- MAU: 50,000명 (시민의 5%)
- 파트너 상점: 50개
- 월간 포인트 사용률: 25%
- 정책 반영 사례: 연 10건

**비즈니스 임팩트**
- 환경 민원 처리 효율 30% 향상
- 시민 환경 만족도 15점 상승
- 친환경 소비 10억 원 유발 효과

---

## **2. 제품 기능 명세 (Features & Requirements)**

### **Epic 1: 실시간 환경 지도 (Real-time Environment Map)**

**Epic Goal**: 시민들이 용인시 전역의 환경 데이터를 직관적인 지도로 한눈에 파악할 수 있다.

#### **User Story 1.1: 지도 기반 대기질 확인**

**As a** 환경 민감 시민  
**I want to** 우리 동네의 실시간 미세먼지 농도를 지도에서 확인하고  
**So that** 외출 여부를 결정하고 자녀 건강을 지킬 수 있다

**Acceptance Criteria:**
- [ ] 용인시 전체 지도에 대기질 측정소가 표시된다
- [ ] 각 측정소는 오염도에 따라 색상이 다르다 (좋음-파랑, 보통-초록, 나쁨-주황, 매우나쁨-빨강)
- [ ] 측정소 마커 클릭 시 상세 정보(PM10, PM2.5, O3, NO2, SO2, CO)가 표시된다
- [ ] 데이터는 5분마다 자동 갱신된다
- [ ] 현재 위치 기준 가장 가까운 측정소가 강조 표시된다

**기능 요구사항 (FR):**

**FR 1.1.1: 카카오맵 통합**
- 카카오맵 Web SDK v2를 사용하여 지도 렌더링
- 지도 레벨: 3~14 (시 전체 ~ 동네 단위)
- 기본 중심좌표: 용인시청(37.2411, 127.1776)
- 현재 위치 추적 버튼 제공

**FR 1.1.2: 에어코리아 API 연동**
```typescript
// API 엔드포인트
const AIR_KOREA_API = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc'

// 용인시 측정소 목록 (실제 측정소명 확인 필요)
const YONGIN_STATIONS = [
  { name: '수지', lat: 37.3242, lng: 127.0973, stationName: '수지' },
  { name: '기흥', lat: 37.2757, lng: 127.1175, stationName: '기흥' },
  // ... 기타 측정소
]

// 실시간 데이터 조회 (5분마다 자동 갱신)
interface AirQualityData {
  stationName: string
  dataTime: string
  pm10Value: number
  pm25Value: number
  o3Value: number
  no2Value: number
  so2Value: number
  coValue: number
  pm10Grade: 1 | 2 | 3 | 4  // 1:좋음, 2:보통, 3:나쁨, 4:매우나쁨
  pm25Grade: 1 | 2 | 3 | 4
}
```

**FR 1.1.3: 마커 시각화**
- SVG 커스텀 마커 사용 (색상 동적 변경)
- 마커 크기: 40x40px
- 호버 시 툴팁으로 PM2.5 수치 표시
- 클릭 시 상세 모달 오픈

**FR 1.1.4: 성능 최적화**
- React Query로 API 캐싱 (5분 TTL)
- 지도 이동 시 디바운싱 (500ms)
- 가시 영역 내 마커만 렌더링

---

#### **User Story 1.2: 오염물질별 히트맵**

**As a** 환경 활동가  
**I want to** 특정 오염물질(예: 미세먼지)의 지역별 농도 분포를 히트맵으로 보고  
**So that** 오염 집중 지역을 파악하고 정책 제안 자료로 활용할 수 있다

**Acceptance Criteria:**
- [ ] 오염물질 선택 드롭다운(PM10, PM2.5, O3, NO2)이 제공된다
- [ ] 선택한 오염물질의 히트맵이 지도에 오버레이된다
- [ ] 히트맵은 측정소 데이터를 보간하여 부드러운 그래디언트로 표시된다
- [ ] 범례가 표시되어 색상별 농도 범위를 알 수 있다

**기능 요구사항 (FR):**

**FR 1.2.1: 히트맵 렌더링**
```typescript
// Leaflet Heatmap.js 또는 카카오맵 오버레이 활용
interface HeatmapPoint {
  lat: number
  lng: number
  value: number  // 오염물질 농도
}

// IDW (Inverse Distance Weighting) 보간법 적용
function interpolateAirQuality(
  stations: StationData[],
  gridResolution: number = 100
): HeatmapPoint[] {
  // 격자 생성 및 보간 로직
}
```

**FR 1.2.2: 범례 UI**
- 그래디언트 바 (파랑 → 초록 → 주황 → 빨강)
- 각 색상 구간의 농도 수치 표시
- 최소/최대값 동적 조정

---

#### **User Story 1.3: 시간대별 데이터 조회**

**As a** 일반 시민  
**I want to** 오늘, 어제, 지난주의 대기질 변화 추이를 확인하고  
**So that** 대기질 개선 여부를 판단하고 패턴을 파악할 수 있다

**Acceptance Criteria:**
- [ ] 시간 필터(실시간, 오늘, 어제, 지난 7일, 지난 30일) 제공
- [ ] 선택한 기간의 평균값이 지도에 표시된다
- [ ] 측정소 클릭 시 해당 기간의 라인 차트가 표시된다

**기능 요구사항 (FR):**

**FR 1.3.1: 시계열 데이터 저장**
```sql
-- Supabase PostgreSQL 스키마
CREATE TABLE air_quality_history (
  id BIGSERIAL PRIMARY KEY,
  station_name VARCHAR(50) NOT NULL,
  measured_at TIMESTAMPTZ NOT NULL,
  pm10_value DECIMAL(5,1),
  pm25_value DECIMAL(5,1),
  o3_value DECIMAL(5,3),
  no2_value DECIMAL(5,3),
  so2_value DECIMAL(5,3),
  co_value DECIMAL(5,1),
  pm10_grade INTEGER,
  pm25_grade INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_station_measured ON air_quality_history(station_name, measured_at DESC);
```

**FR 1.3.2: 시계열 차트**
- Recharts 라이브러리 사용
- X축: 시간, Y축: 오염물질 농도
- 다중 오염물질 동시 표시 (토글 가능)
- 기준선(좋음/보통/나쁨 경계) 표시

---

#### **User Story 1.4: 주요 시설 정보 표시**

**As a** 산업단지 인근 주민  
**I want to** 반도체 공장, 폐기물 처리시설 등 주요 오염원의 위치를 지도에서 확인하고  
**So that** 해당 시설과 우리 집의 거리, 영향 정도를 파악할 수 있다

**Acceptance Criteria:**
- [ ] 반도체 클러스터, 산업단지, 하수처리장 위치가 아이콘으로 표시된다
- [ ] 각 시설은 일반 측정소와 구별되는 디자인이다
- [ ] 시설 클릭 시 명칭, 주소, 운영 정보가 표시된다
- [ ] 레이어 토글로 시설 표시/숨김 가능

**기능 요구사항 (FR):**

**FR 1.4.1: 시설 데이터베이스**
```typescript
interface FacilityInfo {
  id: string
  name: string
  type: 'semiconductor' | 'industrial' | 'wastewater' | 'waste'
  lat: number
  lng: number
  address: string
  operator?: string
  info_url?: string
}

// 시설 목록 (초기 데이터)
const MAJOR_FACILITIES: FacilityInfo[] = [
  {
    id: 'samsung_giheung',
    name: '삼성전자 기흥캠퍼스',
    type: 'semiconductor',
    lat: 37.2745,
    lng: 127.0696,
    address: '경기도 용인시 기흥구 삼성로 1'
  },
  // ... 기타 시설
]
```

**FR 1.4.2: 커스텀 마커 디자인**
- 반도체: 칩 아이콘 (파란색)
- 산업단지: 공장 아이콘 (회색)
- 하수처리장: 물방울 아이콘 (청록색)
- 폐기물: 쓰레기통 아이콘 (주황색)

---

### **Epic 2: 시민 제보 시스템 (Citizen Reporting System)**

**Epic Goal**: 시민들이 환경 문제를 발견했을 때 30초 안에 쉽게 제보하고, 다른 시민들과 공유할 수 있다.

#### **User Story 2.1: 원터치 제보**

**As a** 산업단지 인근 주민  
**I want to** 공장 악취를 발견했을 때 즉시 사진을 찍어 제보하고  
**So that** 담당 부서가 빠르게 대응하고 같은 문제를 겪는 이웃들과 연대할 수 있다

**Acceptance Criteria:**
- [ ] 메인 화면에 '제보하기' 플로팅 버튼이 항상 표시된다
- [ ] 버튼 클릭 시 카메라가 자동 실행된다
- [ ] 사진 촬영 후 위치가 자동 태깅된다
- [ ] 유형 선택 → 설명 입력 → 제출이 3단계로 완료된다
- [ ] 제출 후 "제보가 접수되었습니다" 확인 메시지와 제보 번호가 표시된다

**기능 요구사항 (FR):**

**FR 2.1.1: 제보 UI/UX 플로우**
```
[메인 화면]
    ↓ (플로팅 버튼 클릭)
[Step 1: 사진 촬영]
  - 카메라 권한 요청
  - 촬영 또는 갤러리 선택
  - 최대 5장까지 첨부 가능
    ↓
[Step 2: 위치 확인]
  - GPS 자동 태깅
  - 지도에서 핀 위치 조정 가능
  - 주소 자동 표시
    ↓
[Step 3: 정보 입력]
  - 유형 선택 (악취/폐수/폐기물/소음/대기오염/수질오염/기타)
  - 상세 설명 (선택, 최대 500자)
  - 익명 제보 체크박스
    ↓
[제출 확인]
  - 제보 번호 표시
  - "내 제보 보기" 버튼
  - 공유하기 (SNS)
```

**FR 2.1.2: 데이터베이스 스키마**
```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),  -- null 가능 (익명)
  type VARCHAR(20) NOT NULL CHECK (type IN ('smell', 'wastewater', 'waste', 'noise', 'air', 'water', 'other')),
  description TEXT,
  lat DECIMAL(10, 7) NOT NULL,
  lng DECIMAL(10, 7) NOT NULL,
  address VARCHAR(200),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'resolved', 'rejected')),
  empathy_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE report_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  media_type VARCHAR(10) CHECK (media_type IN ('image', 'video')),
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_reports_status ON reports(status, created_at DESC);
CREATE INDEX idx_reports_location ON reports(lat, lng);
CREATE INDEX idx_reports_type ON reports(type);
```

**FR 2.1.3: 이미지 업로드**
```typescript
// Supabase Storage 활용
async function uploadReportMedia(
  file: File,
  reportId: string
): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${reportId}/${Date.now()}.${fileExt}`
  const filePath = `reports/${fileName}`

  const { data, error } = await supabase.storage
    .from('report-media')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) throw error

  // 공개 URL 반환
  const { data: { publicUrl } } = supabase.storage
    .from('report-media')
    .getPublicUrl(filePath)

  return publicUrl
}
```

**FR 2.1.4: GPS 정확도 처리**
- GPS 정확도 50m 이내일 때만 자동 태깅
- 정확도 낮을 시 "위치를 지도에서 직접 선택해주세요" 안내
- 주소 변환: 카카오 로컬 API 사용

---

#### **User Story 2.2: 제보 피드 및 공감**

**As a** 일반 시민  
**I want to** 다른 사람들의 제보를 지도와 피드에서 확인하고 공감 버튼을 눌러  
**So that** 같은 문제를 겪는 이웃들과 연대하고 문제의 심각성을 알릴 수 있다

**Acceptance Criteria:**
- [ ] 지도에 제보가 오염 마커와 구별되는 아이콘으로 표시된다
- [ ] 제보 마커 클릭 시 사진, 설명, 공감 수가 표시된다
- [ ] '공감하기' 버튼을 누르면 실시간으로 공감 수가 증가한다
- [ ] 하단 탭에서 '제보 피드'로 전환 시 최신 제보 목록이 표시된다
- [ ] 피드는 '최신순', '공감순', '우리 동네' 정렬 옵션이 있다

**기능 요구사항 (FR):**

**FR 2.2.1: 제보 마커 표시**
```typescript
interface ReportMarker {
  id: string
  lat: number
  lng: number
  type: ReportType
  status: ReportStatus
  empathyCount: number
  createdAt: Date
}

// 마커 디자인
const REPORT_MARKER_ICONS = {
  smell: '🤢',      // 악취
  wastewater: '💧', // 폐수
  waste: '🗑️',     // 폐기물
  noise: '🔊',      // 소음
  air: '💨',        // 대기오염
  water: '🌊',      // 수질오염
  other: '⚠️'       // 기타
}

// 상태별 배경색
const STATUS_COLORS = {
  pending: '#FFA500',    // 주황 (처리 대기)
  reviewing: '#4169E1',  // 파랑 (검토 중)
  resolved: '#32CD32',   // 초록 (해결 완료)
  rejected: '#DC143C'    // 빨강 (반려)
}
```

**FR 2.2.2: 공감 기능**
```sql
CREATE TABLE report_empathy (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(report_id, user_id)  -- 중복 공감 방지
);

-- 공감 수 트리거
CREATE OR REPLACE FUNCTION update_empathy_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE reports SET empathy_count = empathy_count + 1 WHERE id = NEW.report_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE reports SET empathy_count = empathy_count - 1 WHERE id = OLD.report_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER empathy_count_trigger
  AFTER INSERT OR DELETE ON report_empathy
  FOR EACH ROW EXECUTE FUNCTION update_empathy_count();
```

**FR 2.2.3: 피드 UI**
```typescript
// 피드 카드 컴포넌트
interface ReportFeedItem {
  id: string
  type: ReportType
  description: string
  images: string[]
  address: string
  empathyCount: number
  status: ReportStatus
  createdAt: Date
  hasEmpathized: boolean  // 현재 사용자의 공감 여부
}

// 정렬 옵션
type SortOption = 'latest' | 'most_empathized' | 'nearby'

// 필터 옵션
interface FeedFilter {
  types?: ReportType[]
  status?: ReportStatus[]
  dateRange?: { start: Date; end: Date }
  radius?: number  // 'nearby' 정렬 시 반경(km)
}
```

---

#### **User Story 2.3: 제보 상태 추적**

**As a** 제보자  
**I want to** 내가 제출한 제보의 처리 현황을 실시간으로 확인하고  
**So that** 담당 부서가 어떻게 대응하고 있는지 알고 신뢰할 수 있다

**Acceptance Criteria:**
- [ ] '내 제보' 탭에서 제보 이력을 확인할 수 있다
- [ ] 각 제보는 상태(접수→검토→해결/반려)가 표시된다
- [ ] 상태 변경 시 푸시 알림을 받는다
- [ ] 해결 완료 시 담당 부서의 조치 내용이 표시된다

**기능 요구사항 (FR):**

**FR 2.3.1: 상태 관리 시스템**
```sql
CREATE TABLE report_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL,
  comment TEXT,
  department VARCHAR(50),  -- 담당 부서
  updated_by UUID,  -- 공무원 ID
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 뷰: 제보별 최신 상태
CREATE VIEW report_with_latest_status AS
SELECT 
  r.*,
  rsh.comment as latest_comment,
  rsh.department,
  rsh.updated_by,
  rsh.created_at as status_updated_at
FROM reports r
LEFT JOIN LATERAL (
  SELECT * FROM report_status_history
  WHERE report_id = r.id
  ORDER BY created_at DESC
  LIMIT 1
) rsh ON true;
```

**FR 2.3.2: 푸시 알림**
```typescript
// Firebase Cloud Messaging 또는 Supabase Realtime
async function notifyReportStatusChange(
  reportId: string,
  userId: string,
  newStatus: ReportStatus,
  comment: string
) {
  const notification = {
    title: '제보 상태가 업데이트되었습니다',
    body: getStatusMessage(newStatus),
    data: {
      type: 'report_status',
      reportId,
      status: newStatus
    }
  }

  // 푸시 알림 전송
  await sendPushNotification(userId, notification)

  // 인앱 알림 저장
  await supabase.from('notifications').insert({
    user_id: userId,
    type: 'report_status',
    title: notification.title,
    body: notification.body,
    data: notification.data
  })
}

function getStatusMessage(status: ReportStatus): string {
  const messages = {
    reviewing: '담당 부서에서 검토 중입니다',
    resolved: '신고하신 문제가 해결되었습니다',
    rejected: '신고가 반려되었습니다. 자세한 내용을 확인해주세요'
  }
  return messages[status] || ''
}
```

---

### **Epic 3: AI 분석 및 인사이트 (AI Analysis & Insights)**

**Epic Goal**: AI가 축적된 제보 데이터를 분석하여 패턴을 찾고, 시민과 공무원에게 유의미한 인사이트를 제공한다.

#### **User Story 3.1: 자동 태깅 및 분류**

**As a** 환경정책 공무원  
**I want to** 시민 제보가 들어왔을 때 AI가 자동으로 키워드를 추출하고 세부 유형으로 분류해서  
**So that** 민원을 빠르게 파악하고 적절한 부서로 배정할 수 있다

**Acceptance Criteria:**
- [ ] 제보 제출 시 Claude AI가 텍스트와 이미지를 분석한다
- [ ] 핵심 키워드(예: '화학약품 냄새', '야간 발생')가 자동 추출된다
- [ ] 세부 유형(예: 악취 → 화학물질 악취)으로 자동 분류된다
- [ ] 이미지에서 폐수, 쓰레기 등을 감지하고 태그를 추가한다

**기능 요구사항 (FR):**

**FR 3.1.1: Claude API 연동**
```typescript
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

async function analyzeReport(
  description: string,
  images: string[]
): Promise<ReportAnalysis> {
  const imageContents = await Promise.all(
    images.map(async (url) => {
      const base64 = await urlToBase64(url)
      return {
        type: 'image' as const,
        source: {
          type: 'base64' as const,
          media_type: 'image/jpeg' as const,
          data: base64
        }
      }
    })
  )

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: [
        {
          type: 'text',
          text: `다음은 용인시 환경 문제에 대한 시민 제보입니다. 아래 항목을 분석하여 JSON으로 응답해주세요:

1. 핵심 키워드 (keywords): 최대 5개의 주요 단어
2. 세부 유형 (detailed_type): 가장 적합한 카테고리 (chemical_smell, sewage_smell, burning_smell, illegal_waste, construction_noise, factory_noise, air_pollution, water_pollution, other)
3. 심각도 (severity): low, medium, high
4. 추천 담당 부서 (department): 환경정책과, 맑은물관리사업소, 청소행정과 중 하나
5. 이미지 내용 (image_description): 이미지에서 발견된 주요 내용

제보 내용: ${description}`,
        },
        ...imageContents
      ]
    }]
  })

  const responseText = message.content[0].type === 'text'
    ? message.content[0].text
    : ''

  return JSON.parse(responseText) as ReportAnalysis
}

interface ReportAnalysis {
  keywords: string[]
  detailed_type: string
  severity: 'low' | 'medium' | 'high'
  department: string
  image_description: string
}
```

**FR 3.1.2: 분석 결과 저장**
```sql
CREATE TABLE report_ai_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID REFERENCES reports(id) ON DELETE CASCADE,
  keywords TEXT[],
  detailed_type VARCHAR(50),
  severity VARCHAR(10),
  recommended_department VARCHAR(50),
  image_description TEXT,
  confidence_score DECIMAL(3, 2),  -- AI 신뢰도 (0.00~1.00)
  analyzed_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

#### **User Story 3.2: 패턴 감지 및 알림**

**As a** 환경정책 공무원  
**I want to** 특정 지역에서 유사한 제보가 단기간에 급증하면 자동으로 알림을 받아  
**So that** 신속하게 현장 조사를 나가고 대응할 수 있다

**Acceptance Criteria:**
- [ ] 같은 읍면동에서 같은 유형의 제보가 24시간 내 5건 이상 접수되면 알림
- [ ] 알림에는 지역, 유형, 제보 건수, 공통 키워드가 포함된다
- [ ] 관리자 대시보드에 '이상 패턴' 섹션이 표시된다
- [ ] 해당 지역 시민들에게도 선택적으로 알림 발송 가능

**기능 요구사항 (FR):**

**FR 3.2.1: 패턴 감지 알고리즘**
```typescript
// Supabase Edge Function (Cron Job: 매 시간 실행)
async function detectAnomalies() {
  const query = `
    WITH recent_reports AS (
      SELECT 
        r.id,
        r.type,
        r.lat,
        r.lng,
        r.created_at,
        ra.keywords,
        ra.detailed_type,
        -- 읍면동 구하기 (카카오 API 또는 사전 지오코딩)
        get_dong_name(r.lat, r.lng) as dong_name
      FROM reports r
      LEFT JOIN report_ai_analysis ra ON r.id = ra.report_id
      WHERE r.created_at >= NOW() - INTERVAL '24 hours'
    ),
    anomaly_candidates AS (
      SELECT 
        dong_name,
        type,
        detailed_type,
        COUNT(*) as report_count,
        ARRAY_AGG(DISTINCT keywords) as common_keywords,
        MIN(created_at) as first_report_at,
        MAX(created_at) as last_report_at
      FROM recent_reports
      GROUP BY dong_name, type, detailed_type
      HAVING COUNT(*) >= 5  -- 임계값
    )
    SELECT * FROM anomaly_candidates
  `

  const { data: anomalies } = await supabase.rpc('detect_anomalies')

  for (const anomaly of anomalies) {
    // 이미 알림 발송했는지 확인
    const { data: existing } = await supabase
      .from('anomaly_alerts')
      .select('id')
      .eq('dong_name', anomaly.dong_name)
      .eq('type', anomaly.type)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000))
      .single()

    if (!existing) {
      await createAnomalyAlert(anomaly)
    }
  }
}

async function createAnomalyAlert(anomaly: AnomalyData) {
  // 1. DB에 저장
  const { data: alert } = await supabase
    .from('anomaly_alerts')
    .insert({
      dong_name: anomaly.dong_name,
      type: anomaly.type,
      detailed_type: anomaly.detailed_type,
      report_count: anomaly.report_count,
      common_keywords: anomaly.common_keywords
    })
    .select()
    .single()

  // 2. 관리자에게 푸시 알림
  await notifyAdmins(alert)

  // 3. 해당 지역 시민들에게 선택적 알림 (설정한 사용자만)
  await notifyLocalResidents(alert)
}
```

---

#### **User Story 3.3: 월간 동향 리포트**

**As a** 환경 활동가  
**I want to** 지난 한 달간의 제보 데이터를 분석한 AI 리포트를 받아  
**So that** 정책 제안서에 객관적 근거로 활용하고 언론 보도 자료를 만들 수 있다

**Acceptance Criteria:**
- [ ] 매월 1일 자동으로 전월 리포트가 생성된다
- [ ] 리포트에는 다음이 포함된다: 총 제보 건수, 지역별 분포, 유형별 분포, 주요 키워드, 전월 대비 증감
- [ ] 그래프와 히트맵이 포함된 PDF로 다운로드 가능하다
- [ ] 특정 기간/지역으로 맞춤 리포트 생성 가능하다

**기능 요구사항 (FR):**

**FR 3.3.1: 리포트 생성 로직**
```typescript
async function generateMonthlyReport(
  year: number,
  month: number
): Promise<MonthlyReport> {
  // 1. 데이터 집계
  const stats = await supabase.rpc('get_monthly_stats', {
    target_year: year,
    target_month: month
  })

  // 2. Claude AI로 인사이트 생성
  const insights = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `다음은 용인시 ${year}년 ${month}월 환경 제보 통계입니다:

총 제보: ${stats.total_reports}건
주요 유형: ${JSON.stringify(stats.type_distribution)}
지역별 분포: ${JSON.stringify(stats.dong_distribution)}
주요 키워드: ${stats.top_keywords.join(', ')}

이 데이터를 분석하여 다음을 작성해주세요:
1. 주요 환경 이슈 요약 (3문장)
2. 전월 대비 변화 분석
3. 지역별 특이사항
4. 정책 제안 (3가지)

보고서 형식으로 작성해주세요.`
    }]
  })

  const analysis = insights.content[0].type === 'text'
    ? insights.content[0].text
    : ''

  // 3. 리포트 객체 생성
  const report: MonthlyReport = {
    period: `${year}-${month.toString().padStart(2, '0')}`,
    stats,
    analysis,
    charts: {
      typeDistribution: generateChartData(stats.type_distribution),
      dongDistribution: generateChartData(stats.dong_distribution),
      timeline: generateTimelineData(stats.daily_counts)
    },
    generatedAt: new Date()
  }

  // 4. DB에 저장
  await supabase.from('monthly_reports').insert({
    period: report.period,
    data: report,
    generated_at: report.generatedAt
  })

  return report
}
```

**FR 3.3.2: PDF 생성**
```typescript
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

async function exportReportToPDF(report: MonthlyReport): Promise<Blob> {
  const pdf = new jsPDF('p', 'mm', 'a4')

  // 1. 표지
  pdf.setFontSize(24)
  pdf.text('용인 그린워치 월간 리포트', 105, 50, { align: 'center' })
  pdf.setFontSize(16)
  pdf.text(report.period, 105, 65, { align: 'center' })

  // 2. 통계 섹션
  pdf.addPage()
  pdf.setFontSize(18)
  pdf.text('환경 제보 통계', 20, 20)
  pdf.setFontSize(12)
  pdf.text(`총 제보: ${report.stats.total_reports}건`, 20, 35)

  // 3. 차트 삽입 (canvas를 이미지로 변환)
  const chartCanvas = await html2canvas(document.getElementById('type-chart'))
  const chartImage = chartCanvas.toDataURL('image/png')
  pdf.addImage(chartImage, 'PNG', 20, 50, 170, 100)

  // 4. AI 분석 섹션
  pdf.addPage()
  pdf.setFontSize(18)
  pdf.text('AI 분석 리포트', 20, 20)
  pdf.setFontSize(11)
  const analysisLines = pdf.splitTextToSize(report.analysis, 170)
  pdf.text(analysisLines, 20, 35)

  return pdf.output('blob')
}
```

---

### **Epic 4: 녹색 보상 마켓플레이스 (Green Rewards Marketplace)**

**Epic Goal**: 환경 개선 활동에 참여한 시민들에게 보상을 제공하고, 친환경 소비 생태계를 조성한다.

#### **User Story 4.1: 포인트 적립**

**As a** 일반 시민  
**I want to** 제보, 공감, 친환경 챌린지 참여 등 활동을 할 때마다 포인트를 받아  
**So that** 모은 포인트로 친환경 상점에서 혜택을 받고 환경 개선에 지속적으로 참여할 동기를 갖는다

**Acceptance Criteria:**
- [ ] 회원가입 시 100P 지급
- [ ] 제보 시 50P, 공감 5회 이상 받으면 추가 50P
- [ ] 다른 제보에 공감 시 5P (1일 최대 5회)
- [ ] 월 1회 이상 활동 시 충성도 보너스 30P
- [ ] 포인트 내역을 '내 포인트' 탭에서 확인 가능

**기능 요구사항 (FR):**

**FR 4.1.1: 포인트 시스템 스키마**
```sql
CREATE TABLE user_points (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  total_points INTEGER DEFAULT 0,
  available_points INTEGER DEFAULT 0,
  used_points INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE point_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  type VARCHAR(30) NOT NULL CHECK (type IN (
    'signup_bonus',
    'report_submitted',
    'report_empathized',
    'empathy_given',
    'monthly_bonus',
    'challenge_completed',
    'point_used',
    'point_refund'
  )),
  amount INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  reference_id UUID,  -- 관련 제보 ID, 챌린지 ID 등
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_point_tx_user ON point_transactions(user_id, created_at DESC);
```

**FR 4.1.2: 포인트 지급 로직**
```typescript
type PointEventType =
  | 'signup_bonus'
  | 'report_submitted'
  | 'report_empathized'
  | 'empathy_given'
  | 'monthly_bonus'
  | 'challenge_completed'

const POINT_RULES: Record<PointEventType, number> = {
  signup_bonus: 100,
  report_submitted: 50,
  report_empathized: 50,  // 공감 5회 이상 시
  empathy_given: 5,       // 1일 최대 5회
  monthly_bonus: 30,      // 월 1회 이상 활동 시
  challenge_completed: 100 // 챌린지별 상이
}

async function addPoints(
  userId: string,
  type: PointEventType,
  amount: number,
  referenceId?: string,
  description?: string
) {
  return await supabase.rpc('add_user_points', {
    p_user_id: userId,
    p_type: type,
    p_amount: amount,
    p_reference_id: referenceId,
    p_description: description
  })
}

// PostgreSQL 함수
CREATE OR REPLACE FUNCTION add_user_points(
  p_user_id UUID,
  p_type VARCHAR,
  p_amount INTEGER,
  p_reference_id UUID DEFAULT NULL,
  p_description TEXT DEFAULT NULL
)
RETURNS void AS $$
DECLARE
  v_new_balance INTEGER;
BEGIN
  -- 1. user_points 업데이트
  UPDATE user_points
  SET 
    total_points = total_points + p_amount,
    available_points = available_points + p_amount,
    updated_at = NOW()
  WHERE user_id = p_user_id
  RETURNING available_points INTO v_new_balance;

  -- 2. 트랜잭션 기록
  INSERT INTO point_transactions (
    user_id, type, amount, balance_after, reference_id, description
  ) VALUES (
    p_user_id, p_type, p_amount, v_new_balance, p_reference_id, p_description
  );
END;
$$ LANGUAGE plpgsql;
```

**FR 4.1.3: 일일 제한 로직**
```typescript
// 공감 포인트는 1일 최대 5회
async function giveEmpathy(userId: string, reportId: string) {
  // 1. 오늘 공감 횟수 확인
  const { data: todayEmpathy } = await supabase
    .from('point_transactions')
    .select('id')
    .eq('user_id', userId)
    .eq('type', 'empathy_given')
    .gte('created_at', new Date().setHours(0, 0, 0, 0))

  if (todayEmpathy && todayEmpathy.length >= 5) {
    throw new Error('오늘의 공감 포인트 적립 한도를 초과했습니다')
  }

  // 2. 공감 처리
  await supabase.from('report_empathy').insert({
    report_id: reportId,
    user_id: userId
  })

  // 3. 포인트 지급
  await addPoints(
    userId,
    'empathy_given',
    5,
    reportId,
    '제보 공감 참여'
  )
}
```

---

#### **User Story 4.2: 파트너 상점 검색**

**As a** 친환경 소비에 관심 있는 시민  
**I want to** 내 위치 근처의 제로웨이스트샵, 친환경 식당 등을 지도에서 찾고  
**So that** 모은 포인트로 할인 받으며 친환경 소비를 실천할 수 있다

**Acceptance Criteria:**
- [ ] '마켓플레이스' 탭에서 파트너 상점 목록과 지도를 볼 수 있다
- [ ] 상점은 카테고리별(제로웨이스트/로컬푸드/친환경식당/중고거래) 필터링 가능
- [ ] 각 상점의 혜택 내용(예: 1000P → 10% 할인)이 표시된다
- [ ] 상점 상세 페이지에서 위치, 영업시간, 혜택 사용법을 확인할 수 있다

**기능 요구사항 (FR):**

**FR 4.2.1: 파트너 상점 스키마**
```sql
CREATE TABLE partner_stores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) CHECK (category IN (
    'zero_waste', 'local_food', 'eco_restaurant', 
    'secondhand', 'eco_cafe', 'other'
  )),
  address VARCHAR(200),
  lat DECIMAL(10, 7),
  lng DECIMAL(10, 7),
  phone VARCHAR(20),
  business_hours JSONB,  -- { "mon": "10:00-20:00", ... }
  description TEXT,
  logo_url TEXT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE store_benefits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_id UUID REFERENCES partner_stores(id) ON DELETE CASCADE,
  title VARCHAR(100),
  description TEXT,
  point_cost INTEGER NOT NULL,  -- 필요 포인트
  discount_type VARCHAR(20) CHECK (discount_type IN ('percent', 'fixed')),
  discount_value DECIMAL(10, 2),  -- 할인율(%) 또는 할인액(원)
  max_usage_per_user INTEGER DEFAULT 1,  -- 사용자당 월 사용 제한
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_stores_location ON partner_stores(lat, lng);
CREATE INDEX idx_stores_category ON partner_stores(category);
```

**FR 4.2.2: 지도 및 리스트 UI**
```typescript
interface PartnerStore {
  id: string
  name: string
  category: StoreCategory
  address: string
  lat: number
  lng: number
  phone: string
  businessHours: BusinessHours
  description: string
  logoUrl?: string
  benefits: StoreBenefit[]
  distance?: number  // 사용자 위치로부터 거리(km)
}

interface StoreBenefit {
  id: string
  title: string
  description: string
  pointCost: number
  discountType: 'percent' | 'fixed'
  discountValue: number
}

// 거리 계산 (Haversine formula)
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371 // 지구 반경 (km)
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
```

---

#### **User Story 4.3: 혜택 사용 (QR코드)**

**As a** 시민  
**I want to** 파트너 상점에서 앱의 QR코드를 보여주고 포인트를 사용해  
**So that** 친환경 제품을 할인된 가격에 구매할 수 있다

**Acceptance Criteria:**
- [ ] 상점 상세 페이지에서 '혜택 사용' 버튼 클릭
- [ ] 일회용 QR코드(60초 유효)가 생성된다
- [ ] 점주는 파트너 앱으로 QR코드를 스캔한다
- [ ] 스캔 성공 시 포인트가 차감되고 영수증 번호가 표시된다
- [ ] 사용 내역이 '내 포인트' 탭에 기록된다

**기능 요구사항 (FR):**

**FR 4.3.1: QR코드 생성**
```typescript
import QRCode from 'qrcode'
import { nanoid } from 'nanoid'

async function generateBenefitQR(
  userId: string,
  benefitId: string,
  storeId: string
): Promise<BenefitQRData> {
  // 1. 포인트 충분한지 확인
  const benefit = await getBenefit(benefitId)
  const userPoints = await getUserPoints(userId)
  
  if (userPoints.available_points < benefit.point_cost) {
    throw new Error('포인트가 부족합니다')
  }

  // 2. 일회용 토큰 생성
  const token = nanoid(32)
  const expiresAt = new Date(Date.now() + 60 * 1000) // 60초 후

  // 3. DB에 저장
  const { data: qrData } = await supabase
    .from('benefit_qr_tokens')
    .insert({
      token,
      user_id: userId,
      benefit_id: benefitId,
      store_id: storeId,
      expires_at: expiresAt,
      status: 'pending'
    })
    .select()
    .single()

  // 4. QR코드 생성
  const qrCodeUrl = await QRCode.toDataURL(token)

  return {
    token,
    qrCodeUrl,
    benefit,
    expiresAt
  }
}
```

**FR 4.3.2: QR코드 스캔 (점주용)**
```typescript
// 파트너 앱 또는 웹 포털
async function scanBenefitQR(
  token: string,
  storeId: string,
  partnerId: string
): Promise<BenefitUsageResult> {
  // 1. 토큰 조회
  const { data: qrData } = await supabase
    .from('benefit_qr_tokens')
    .select('*, benefits(*)')
    .eq('token', token)
    .eq('store_id', storeId)
    .eq('status', 'pending')
    .single()

  if (!qrData) {
    throw new Error('유효하지 않은 QR코드입니다')
  }

  // 2. 만료 확인
  if (new Date() > new Date(qrData.expires_at)) {
    throw new Error('QR코드가 만료되었습니다')
  }

  // 3. 포인트 차감
  const receiptNo = `YGW-${Date.now()}`
  
  await supabase.rpc('use_benefit_points', {
    p_user_id: qrData.user_id,
    p_benefit_id: qrData.benefit_id,
    p_token: token,
    p_receipt_no: receiptNo,
    p_partner_id: partnerId
  })

  return {
    success: true,
    receiptNo,
    benefit: qrData.benefits,
    userId: qrData.user_id
  }
}

// PostgreSQL 함수
CREATE OR REPLACE FUNCTION use_benefit_points(
  p_user_id UUID,
  p_benefit_id UUID,
  p_token VARCHAR,
  p_receipt_no VARCHAR,
  p_partner_id UUID
)
RETURNS void AS $$
DECLARE
  v_point_cost INTEGER;
  v_new_balance INTEGER;
BEGIN
  -- 1. 혜택 정보 조회
  SELECT point_cost INTO v_point_cost
  FROM store_benefits
  WHERE id = p_benefit_id;

  -- 2. 포인트 차감
  UPDATE user_points
  SET 
    available_points = available_points - v_point_cost,
    used_points = used_points + v_point_cost,
    updated_at = NOW()
  WHERE user_id = p_user_id
  RETURNING available_points INTO v_new_balance;

  -- 3. 트랜잭션 기록
  INSERT INTO point_transactions (
    user_id, type, amount, balance_after, reference_id, description
  ) VALUES (
    p_user_id, 'point_used', -v_point_cost, v_new_balance, p_benefit_id, p_receipt_no
  );

  -- 4. 사용 기록
  INSERT INTO benefit_usage_history (
    user_id, benefit_id, token, receipt_no, used_by, used_at
  ) VALUES (
    p_user_id, p_benefit_id, p_token, p_receipt_no, p_partner_id, NOW()
  );

  -- 5. QR 토큰 상태 변경
  UPDATE benefit_qr_tokens
  SET status = 'used', used_at = NOW()
  WHERE token = p_token;
END;
$$ LANGUAGE plpgsql;
```

---

### **Epic 5: 알림 및 커뮤니케이션 (Notifications & Communication)**

#### **User Story 5.1: 맞춤형 환경 알림**

**As a** 호흡기 질환자  
**I want to** 우리 동네 미세먼지가 '나쁨' 단계에 들어가면 즉시 알림을 받아  
**So that** 외출을 자제하고 건강을 지킬 수 있다

**기능 요구사항 (FR):**

**FR 5.1.1: 알림 설정**
```typescript
interface NotificationSettings {
  userId: string
  airQualityAlert: {
    enabled: boolean
    threshold: 'bad' | 'very_bad'  // '나쁨' 또는 '매우나쁨'부터
    locations: string[]  // 관심 지역 (읍면동)
  }
  reportStatusUpdate: boolean
  anomalyAlert: boolean  // 이상 패턴 감지 알림
  monthlyReport: boolean
  marketingConsent: boolean
}
```

**FR 5.1.2: 푸시 알림 시스템**
```typescript
// Firebase Cloud Messaging
import admin from 'firebase-admin'

async function sendAirQualityAlert(
  userId: string,
  location: string,
  pm25Value: number,
  grade: number
) {
  const { data: user } = await supabase
    .from('users')
    .select('fcm_token')
    .eq('id', userId)
    .single()

  if (!user?.fcm_token) return

  const message = {
    token: user.fcm_token,
    notification: {
      title: `${location} 미세먼지 나쁨`,
      body: `현재 PM2.5 농도 ${pm25Value}㎍/㎥ 입니다. 외출 시 마스크를 착용하세요.`,
      imageUrl: 'https://yongin-greenwatch.app/images/air-alert.png'
    },
    data: {
      type: 'air_quality_alert',
      location,
      pm25Value: pm25Value.toString(),
      grade: grade.toString()
    }
  }

  await admin.messaging().send(message)
}
```

---

## **3. 기술 명세 (Technical Specifications)**

### **3.1. 기술 스택**

| 구분 | 기술 | 버전 | 사유 |
|------|------|------|------|
| **프론트엔드** | Next.js | 14.x (App Router) | SSR/SSG 지원, 최적화된 성능, Vercel 배포 간편 |
| | TypeScript | 5.x | 타입 안정성, 개발 생산성 향상 |
| | Tailwind CSS | 3.x | 빠른 UI 개발, 일관된 디자인 시스템 |
| | shadcn/ui | Latest | 재사용 가능한 고품질 컴포넌트 |
| **상태 관리** | Zustand | 4.x | 가벼운 전역 상태 관리 |
| | React Query | 5.x | 서버 상태 캐싱 및 동기화 |
| **지도** | Kakao Map SDK | 2.x | 국내 최적화, 무료 할당량 충분 |
| **백엔드** | Supabase | Latest | PostgreSQL, Auth, Storage, Realtime 통합 |
| **데이터베이스** | PostgreSQL | 15.x | Supabase 기본 제공 |
| **인증** | Supabase Auth | - | 이메일, 소셜 로그인 지원 |
| **스토리지** | Supabase Storage | - | 이미지/동영상 저장 |
| **AI** | Claude API | Sonnet 4 | 텍스트/이미지 분석, 리포트 생성 |
| **푸시 알림** | Firebase CM | Latest | 크로스 플랫폼 푸시 알림 |
| **차트** | Recharts | 2.x | 반응형 차트 라이브러리 |
| **QR코드** | qrcode | 1.x | QR 생성, 경량 라이브러리 |
| **배포** | Vercel | - | 자동 CI/CD, 글로벌 CDN |

### **3.2. 아키텍처**

```
┌─────────────────────────────────────────────────────────┐
│                     사용자 디바이스                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   iOS App    │  │  Android App │  │  Web Browser │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │ HTTPS
                     ▼
┌─────────────────────────────────────────────────────────┐
│                 Vercel (CDN + Edge)                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │          Next.js 14 (App Router)                 │  │
│  │  - SSR/SSG Pages                                 │  │
│  │  - API Routes (/api/*)                           │  │
│  │  - Server Actions                                │  │
│  └──────────────────────────────────────────────────┘  │
└────┬────────┬────────┬────────┬───────────┬────────────┘
     │        │        │        │           │
     ▼        ▼        ▼        ▼           ▼
┌─────────┐ ┌────────────┐ ┌──────────┐ ┌────────┐ ┌──────────┐
│Supabase │ │  Kakao     │ │Air Korea │ │Claude  │ │Firebase  │
│         │ │  Map API   │ │   API    │ │  API   │ │   FCM    │
│-Auth    │ │            │ │          │ │        │ │          │
│-Database│ │            │ │          │ │        │ │          │
│-Storage │ │            │ │          │ │        │ │          │
│-Realtime│ │            │ │          │ │        │ │          │
└─────────┘ └────────────┘ └──────────┘ └────────┘ └──────────┘
```

### **3.3. 데이터베이스 ERD (핵심 테이블)**

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│    users     │       │   reports    │       │report_media  │
├──────────────┤       ├──────────────┤       ├──────────────┤
│ id (PK)      │◄─────┤│ id (PK)      │◄─────┤│ id (PK)      │
│ email        │       │ user_id (FK) │       │ report_id(FK)│
│ name         │       │ type         │       │ media_url    │
│ phone        │       │ description  │       │ media_type   │
│ created_at   │       │ lat          │       └──────────────┘
└──────────────┘       │ lng          │
                       │ address      │
                       │ status       │       ┌──────────────┐
                       │ empathy_count│──────►│report_empathy│
                       │ created_at   │       ├──────────────┤
                       └──────────────┘       │ id (PK)      │
                              │               │ report_id(FK)│
                              │               │ user_id (FK) │
                              ▼               └──────────────┘
                       ┌──────────────┐
                       │report_ai_    │
                       │  analysis    │       ┌──────────────┐
                       ├──────────────┤       │user_points   │
                       │ id (PK)      │       ├──────────────┤
                       │ report_id(FK)│◄─────┤│ user_id (PK) │
                       │ keywords[]   │       │ total_points │
                       │ detailed_type│       │ available_pts│
                       │ severity     │       │ used_points  │
                       │ department   │       └──────────────┘
                       └──────────────┘              │
                                                     │
┌──────────────┐       ┌──────────────┐            ▼
│partner_stores│◄─────┤│store_benefits│       ┌──────────────┐
├──────────────┤       ├──────────────┤       │point_        │
│ id (PK)      │       │ id (PK)      │       │ transactions │
│ name         │       │ store_id (FK)│       ├──────────────┤
│ category     │       │ title        │       │ id (PK)      │
│ lat          │       │ point_cost   │       │ user_id (FK) │
│ lng          │       │ discount_type│       │ type         │
│ address      │       │ discount_val │       │ amount       │
└──────────────┘       └──────────────┘       │ balance_after│
                                               └──────────────┘
```

### **3.4. API 설계**

#### **공공 데이터 API**

**에어코리아 대기질 API**
```typescript
// 측정소별 실시간 대기질 정보
GET https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty
Parameters:
  - serviceKey: 공공데이터포털 인증키
  - stationName: 측정소명 (예: "수지")
  - dataTerm: "DAILY" | "MONTH" | "3MONTH"
  - ver: "1.3"

Response:
{
  "response": {
    "body": {
      "items": [{
        "stationName": "수지",
        "dataTime": "2025-10-03 14:00",
        "pm10Value": "45",
        "pm25Value": "23",
        "o3Value": "0.045",
        "no2Value": "0.032",
        "pm10Grade": "2",
        "pm25Grade": "1"
      }]
    }
  }
}
```

#### **Supabase Edge Functions**

```typescript
// 1. 제보 제출
POST /functions/v1/submit-report
Body: {
  type: string
  description: string
  lat: number
  lng: number
  address: string
  mediaFiles: File[]
  isAnonymous: boolean
}
Response: { reportId: string, status: 'success' }

// 2. AI 분석 트리거
POST /functions/v1/analyze-report
Body: { reportId: string }
Response: { analysis: ReportAnalysis }

// 3. 월간 리포트 생성
POST /functions/v1/generate-monthly-report
Body: { year: number, month: number }
Response: { reportId: string, downloadUrl: string }

// 4. QR 코드 생성
POST /functions/v1/generate-benefit-qr
Body: { benefitId: string, storeId: string }
Response: { token: string, qrCodeUrl: string, expiresAt: Date }
```

---

## **4. 릴리즈 계획 (Release Plan)**

### **Phase 1: MVP (0~6개월)**

**목표**: 핵심 가치 검증 - "시민들이 환경 데이터를 확인하고 제보하는 것"

**개발 일정**:
- 월 1~2: 기획 확정, 디자인 시스템, 프로젝트 셋업
- 월 3~4: 실시간 환경 지도 개발 (Epic 1)
- 월 4~5: 시민 제보 시스템 개발 (Epic 2)
- 월 5~6: 통합 테스트, 베타 테스트, 정식 출시

**주요 기능**:
- ✅ 실시간 대기질 지도 (5종 오염물질)
- ✅ 시민 제보 (사진, 위치, 유형 선택)
- ✅ 제보 피드 및 공감 기능
- ✅ 내 제보 현황 확인
- ✅ 기본 회원가입 및 로그인
- ✅ 관리자 제보 모니터링 대시보드

**성공 지표**:
- 앱 다운로드 5,000건
- MAU 2,000명
- 누적 제보 500건

---

### **Phase 2: V1.0 - AI 및 알림 (7~12개월)**

**목표**: AI 분석으로 인사이트 제공, 알림으로 사용자 재방문 유도

**주요 기능**:
- ✅ Claude AI 자동 태깅 및 분류 (Epic 3.1)
- ✅ 이상 패턴 감지 및 알림 (Epic 3.2)
- ✅ 맞춤형 환경 알림 (Epic 5.1)
- ✅ 시간대별 데이터 조회 및 차트
- ✅ 히트맵 뷰
- ✅ 주요 시설 정보 표시

**성공 지표**:
- MAU 10,000명
- 월 평균 제보 300건
- 푸시 알림 오픈율 30% 이상

---

### **Phase 3: V1.5 - 생태계 확장 (13~24개월)**

**목표**: 녹색 보상으로 지속 가능한 참여 생태계 구축

**주요 기능**:
- ✅ 포인트 시스템 (Epic 4.1)
- ✅ 파트너 상점 마켓플레이스 (Epic 4.2)
- ✅ QR코드 혜택 사용 (Epic 4.3)
- ✅ 월간 AI 리포트 자동 생성 (Epic 3.3)
- ✅ 친환경 챌린지
- ✅ 환경 교육 콘텐츠

**성공 지표**:
- MAU 50,000명 (시민의 5%)
- 파트너 상점 50개
- 월간 포인트 사용률 25%
- 정책 반영 연 10건

---

## **5. User Journey (사용자 여정)**

계속해서 상세한 User Journey를 작성하겠습니다. 다음 메시지에서 계속 이어가겠습니다!