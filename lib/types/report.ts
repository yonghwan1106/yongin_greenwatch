export type ReportType = 'smell' | 'wastewater' | 'waste' | 'noise' | 'air' | 'water' | 'other';
export type ReportStatus = 'pending' | 'reviewing' | 'resolved' | 'rejected';

export interface Report {
  id: string;
  user_id: string | null;
  type: ReportType;
  description: string | null;
  lat: number;
  lng: number;
  address: string | null;
  status: ReportStatus;
  empathy_count: number;
  created_at: string;
  updated_at: string;
}

export interface ReportMedia {
  id: string;
  report_id: string;
  media_url: string;
  media_type: 'image' | 'video';
  uploaded_at: string;
}

export interface CreateReportData {
  type: ReportType;
  description?: string;
  lat: number;
  lng: number;
  address?: string;
  mediaFiles?: File[];
  isAnonymous?: boolean;
}

export const REPORT_TYPES: { value: ReportType; label: string; emoji: string }[] = [
  { value: 'smell', label: '악취', emoji: '🤢' },
  { value: 'wastewater', label: '폐수', emoji: '💧' },
  { value: 'waste', label: '폐기물', emoji: '🗑️' },
  { value: 'noise', label: '소음', emoji: '🔊' },
  { value: 'air', label: '대기오염', emoji: '💨' },
  { value: 'water', label: '수질오염', emoji: '🌊' },
  { value: 'other', label: '기타', emoji: '⚠️' },
];

export const STATUS_COLORS: Record<ReportStatus, string> = {
  pending: '#FFA500',    // 주황 (처리 대기)
  reviewing: '#4169E1',  // 파랑 (검토 중)
  resolved: '#32CD32',   // 초록 (해결 완료)
  rejected: '#DC143C',   // 빨강 (반려)
};

export const STATUS_TEXT: Record<ReportStatus, string> = {
  pending: '접수',
  reviewing: '검토중',
  resolved: '해결',
  rejected: '반려',
};

export function getReportTypeInfo(type: ReportType) {
  return REPORT_TYPES.find((t) => t.value === type) || REPORT_TYPES[6];
}
