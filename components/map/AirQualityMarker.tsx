'use client';

import { useEffect, useState } from 'react';
import { AirQualityData, getGradeColor, getGradeText } from '@/lib/types/air-quality';

interface AirQualityMarkerProps {
  map: any;
  position: { lat: number; lng: number };
  stationName: string;
  data: AirQualityData | null;
}

export function AirQualityMarker({
  map,
  position,
  stationName,
  data,
}: AirQualityMarkerProps) {
  const [marker, setMarker] = useState<any>(null);
  const [infowindow, setInfowindow] = useState<any>(null);

  useEffect(() => {
    if (!map || !window.kakao) return;

    const markerPosition = new window.kakao.maps.LatLng(position.lat, position.lng);

    // 커스텀 오버레이 생성
    const grade = data?.pm25Grade || null;
    const color = getGradeColor(grade);
    const gradeText = getGradeText(grade);
    const pm25Value = data?.pm25Value || '-';

    const content = document.createElement('div');
    content.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
    `;

    content.innerHTML = `
      <div style="
        background: ${color};
        color: white;
        border-radius: 20px;
        padding: 8px 16px;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        white-space: nowrap;
      ">
        ${stationName}: ${pm25Value}
      </div>
      <div style="
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid ${color};
        margin-top: -1px;
      "></div>
    `;

    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: markerPosition,
      content: content,
      yAnchor: 1.5,
    });

    customOverlay.setMap(map);
    setMarker(customOverlay);

    // 인포윈도우 생성
    const iwContent = `
      <div style="padding: 16px; min-width: 200px; font-family: system-ui;">
        <div style="font-weight: bold; font-size: 16px; margin-bottom: 12px; color: #333;">
          ${stationName} 측정소
        </div>
        <div style="font-size: 12px; color: #666; margin-bottom: 8px;">
          ${data?.dataTime || '-'}
        </div>
        <div style="display: grid; gap: 8px;">
          <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #eee;">
            <span style="color: #666;">PM2.5</span>
            <span style="font-weight: 600; color: ${color};">
              ${pm25Value} ㎍/㎥ (${gradeText})
            </span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #eee;">
            <span style="color: #666;">PM10</span>
            <span style="font-weight: 600;">
              ${data?.pm10Value || '-'} ㎍/㎥
            </span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #eee;">
            <span style="color: #666;">오존(O₃)</span>
            <span style="font-weight: 600;">
              ${data?.o3Value || '-'} ppm
            </span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0;">
            <span style="color: #666;">이산화질소(NO₂)</span>
            <span style="font-weight: 600;">
              ${data?.no2Value || '-'} ppm
            </span>
          </div>
        </div>
      </div>
    `;

    const iw = new window.kakao.maps.InfoWindow({
      content: iwContent,
      removable: true,
    });

    setInfowindow(iw);

    // 클릭 이벤트
    content.addEventListener('click', () => {
      iw.open(map, customOverlay);
    });

    return () => {
      customOverlay.setMap(null);
    };
  }, [map, position, stationName, data]);

  return null;
}
