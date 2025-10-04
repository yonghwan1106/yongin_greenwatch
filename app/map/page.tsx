'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { YONGIN_STATIONS, AirQualityData } from '@/lib/types/air-quality';
import { AirQualityMarker } from '@/components/map/AirQualityMarker';
import { ReportMarker } from '@/components/map/ReportMarker';
import { Header } from '@/components/layout/Header';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [map, setMap] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [airQualityData, setAirQualityData] = useState<Record<string, AirQualityData>>({});
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [reports, setReports] = useState<any[]>([]);
  const [showReports, setShowReports] = useState(true);

  // 카카오맵 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsLoaded(true);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 지도 생성
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    // URL 파라미터에서 위치 정보 가져오기
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const reportId = searchParams.get('reportId');

    const centerLat = lat ? parseFloat(lat) : 37.2411;
    const centerLng = lng ? parseFloat(lng) : 127.1776;
    const zoomLevel = (lat && lng) ? 5 : 8; // 특정 위치로 이동하면 더 확대

    const options = {
      center: new window.kakao.maps.LatLng(centerLat, centerLng),
      level: zoomLevel,
    };

    const kakaoMap = new window.kakao.maps.Map(mapRef.current, options);
    setMap(kakaoMap);

    // 특정 제보 위치에 마커 추가
    if (lat && lng && reportId) {
      const markerPosition = new window.kakao.maps.LatLng(centerLat, centerLng);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: kakaoMap,
      });

      // 인포윈도우 추가
      const infowindow = new window.kakao.maps.InfoWindow({
        content: '<div style="padding:10px;">📍 제보 위치</div>',
      });
      infowindow.open(kakaoMap, marker);
    }
  }, [isLoaded, searchParams]);

  // 대기질 데이터 로드
  useEffect(() => {
    const fetchAirQuality = async () => {
      try {
        setIsLoadingData(true);
        const response = await fetch('/api/air-quality');
        const result = await response.json();

        if (result.success) {
          setAirQualityData(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch air quality:', error);
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchAirQuality();

    // 5분마다 자동 갱신
    const interval = setInterval(fetchAirQuality, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // 제보 데이터 로드
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('/api/reports?limit=100');
        const result = await response.json();

        if (result.success) {
          setReports(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      }
    };

    fetchReports();

    // 5분마다 갱신
    const interval = setInterval(fetchReports, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <div className="relative w-full h-screen">
        {/* 상태 표시 */}
        {isLoadingData && (
          <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm shadow-md rounded-lg px-4 py-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
              <span>업데이트 중...</span>
            </div>
          </div>
        )}

      {/* 지도 */}
      <div ref={mapRef} className="w-full h-full" />

      {/* 대기질 마커 */}
      {map && YONGIN_STATIONS.map((station) => (
        <AirQualityMarker
          key={station.stationName}
          map={map}
          position={{ lat: station.lat, lng: station.lng }}
          stationName={station.name}
          data={airQualityData[station.stationName] || null}
        />
      ))}

      {/* 제보 마커 */}
      {map && showReports && reports.map((report) => (
        <ReportMarker
          key={report.id}
          map={map}
          report={report}
        />
      ))}

      {/* 로딩 상태 */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
            <p className="text-muted-foreground">지도를 불러오는 중...</p>
          </div>
        </div>
      )}

      {/* 하단 컨트롤 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white rounded-full shadow-lg px-6 py-3 flex items-center gap-4">
          <button
            onClick={() => window.location.href = '/report/new'}
            className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition"
          >
            제보하기
          </button>
          <button
            onClick={() => setShowReports(!showReports)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              showReports
                ? 'bg-primary text-white'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            제보 {showReports ? '숨김' : '표시'}
          </button>
          <button
            onClick={() => {
              if (map && location) {
                const moveLatLon = new window.kakao.maps.LatLng(location.lat, location.lng);
                map.setCenter(moveLatLon);
                map.setLevel(5);
              }
            }}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-secondary/80 transition"
          >
            내 위치
          </button>
        </div>
      </div>

      {/* 범례 */}
      <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg p-4 w-48">
        <h3 className="font-semibold text-sm mb-3">대기질 등급</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500" />
            <span className="text-xs">좋음 (0-30)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <span className="text-xs">보통 (31-80)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-500" />
            <span className="text-xs">나쁨 (81-150)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <span className="text-xs">매우나쁨 (151+)</span>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
