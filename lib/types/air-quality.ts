export interface AirQualityData {
  stationName: string;
  dataTime: string;
  pm10Value: number | null;
  pm25Value: number | null;
  o3Value: number | null;
  no2Value: number | null;
  so2Value: number | null;
  coValue: number | null;
  pm10Grade: 1 | 2 | 3 | 4 | null; // 1:좋음, 2:보통, 3:나쁨, 4:매우나쁨
  pm25Grade: 1 | 2 | 3 | 4 | null;
}

export interface AirStation {
  name: string;
  lat: number;
  lng: number;
  stationName: string; // 에어코리아 API 측정소명
}

export const YONGIN_STATIONS: AirStation[] = [
  { name: '수지', lat: 37.3242, lng: 127.0973, stationName: '수지' },
  { name: '기흥', lat: 37.2757, lng: 127.1175, stationName: '기흥' },
  { name: '처인구', lat: 37.2351, lng: 127.2022, stationName: '용인' },
];

export function getAirQualityGrade(value: number | null, type: 'pm10' | 'pm25' | 'o3' | 'no2' | 'so2' | 'co'): 1 | 2 | 3 | 4 {
  if (value === null) return 1;

  switch (type) {
    case 'pm10':
      if (value <= 30) return 1;
      if (value <= 80) return 2;
      if (value <= 150) return 3;
      return 4;
    case 'pm25':
      if (value <= 15) return 1;
      if (value <= 35) return 2;
      if (value <= 75) return 3;
      return 4;
    case 'o3':
      if (value <= 0.03) return 1;
      if (value <= 0.09) return 2;
      if (value <= 0.15) return 3;
      return 4;
    case 'no2':
      if (value <= 0.03) return 1;
      if (value <= 0.06) return 2;
      if (value <= 0.2) return 3;
      return 4;
    case 'so2':
      if (value <= 0.02) return 1;
      if (value <= 0.05) return 2;
      if (value <= 0.15) return 3;
      return 4;
    case 'co':
      if (value <= 2) return 1;
      if (value <= 9) return 2;
      if (value <= 15) return 3;
      return 4;
    default:
      return 1;
  }
}

export function getGradeColor(grade: 1 | 2 | 3 | 4 | null): string {
  switch (grade) {
    case 1:
      return '#3b82f6'; // 파랑 (좋음)
    case 2:
      return '#22c55e'; // 초록 (보통)
    case 3:
      return '#f59e0b'; // 주황 (나쁨)
    case 4:
      return '#ef4444'; // 빨강 (매우나쁨)
    default:
      return '#9ca3af'; // 회색
  }
}

export function getGradeText(grade: 1 | 2 | 3 | 4 | null): string {
  switch (grade) {
    case 1:
      return '좋음';
    case 2:
      return '보통';
    case 3:
      return '나쁨';
    case 4:
      return '매우나쁨';
    default:
      return '정보없음';
  }
}
