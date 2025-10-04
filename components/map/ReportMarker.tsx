'use client';

import { useEffect } from 'react';
import { ReportType, getReportTypeInfo, STATUS_COLORS } from '@/lib/types/report';

interface ReportMarkerProps {
  map: any;
  report: {
    id: string;
    lat: number;
    lng: number;
    type: ReportType;
    description: string | null;
    address: string | null;
    status: string;
    empathy_count: number;
    created_at: string;
    report_media?: { media_url: string }[];
  };
  onClick?: (reportId: string) => void;
}

export function ReportMarker({ map, report, onClick }: ReportMarkerProps) {
  useEffect(() => {
    if (!map || !window.kakao) return;

    const typeInfo = getReportTypeInfo(report.type);
    const statusColor = STATUS_COLORS[report.status as keyof typeof STATUS_COLORS];

    const markerPosition = new window.kakao.maps.LatLng(report.lat, report.lng);

    // 커스텀 오버레이 생성
    const content = document.createElement('div');
    content.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      position: relative;
    `;

    content.innerHTML = `
      <div style="
        background: white;
        border: 3px solid ${statusColor};
        border-radius: 50%;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: transform 0.2s;
      " class="report-marker-icon">
        ${typeInfo.emoji}
      </div>
      <div style="
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 12px solid ${statusColor};
        margin-top: -3px;
      "></div>
      <div style="
        position: absolute;
        top: -8px;
        right: -8px;
        background: ${statusColor};
        color: white;
        border-radius: 10px;
        padding: 2px 6px;
        font-size: 10px;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      ">
        ${report.empathy_count}
      </div>
    `;

    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: markerPosition,
      content: content,
      yAnchor: 1.5,
    });

    customOverlay.setMap(map);

    // 호버 효과
    content.addEventListener('mouseenter', () => {
      const icon = content.querySelector('.report-marker-icon') as HTMLElement;
      if (icon) {
        icon.style.transform = 'scale(1.1)';
      }
    });

    content.addEventListener('mouseleave', () => {
      const icon = content.querySelector('.report-marker-icon') as HTMLElement;
      if (icon) {
        icon.style.transform = 'scale(1)';
      }
    });

    // 클릭 이벤트
    content.addEventListener('click', () => {
      if (onClick) {
        onClick(report.id);
      } else {
        // 인포윈도우 표시
        const iwContent = `
          <div style="padding: 16px; min-width: 250px; font-family: system-ui;">
            <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px; color: #333;">
              ${typeInfo.emoji} ${typeInfo.label}
            </div>
            ${report.description ? `
              <p style="font-size: 14px; color: #666; margin-bottom: 8px; line-height: 1.4;">
                ${report.description.length > 100 ? report.description.substring(0, 100) + '...' : report.description}
              </p>
            ` : ''}
            ${report.address ? `
              <p style="font-size: 12px; color: #999; margin-bottom: 8px;">
                📍 ${report.address}
              </p>
            ` : ''}
            ${report.report_media && report.report_media.length > 0 ? `
              <img
                src="${report.report_media[0].media_url}"
                alt="제보 이미지"
                style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;"
              />
            ` : ''}
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px; border-top: 1px solid #eee;">
              <span style="font-size: 12px; color: #666;">
                ❤️ 공감 ${report.empathy_count}
              </span>
              <span style="font-size: 11px; color: #999;">
                ${new Date(report.created_at).toLocaleDateString('ko-KR')}
              </span>
            </div>
            <a
              href="/reports?highlight=${report.id}"
              style="
                display: block;
                margin-top: 12px;
                padding: 8px;
                background: ${statusColor};
                color: white;
                text-align: center;
                border-radius: 6px;
                text-decoration: none;
                font-size: 13px;
                font-weight: 500;
              "
            >
              상세보기
            </a>
          </div>
        `;

        const infowindow = new window.kakao.maps.InfoWindow({
          content: iwContent,
          removable: true,
        });

        infowindow.open(map, customOverlay);
      }
    });

    return () => {
      customOverlay.setMap(null);
    };
  }, [map, report, onClick]);

  return null;
}
