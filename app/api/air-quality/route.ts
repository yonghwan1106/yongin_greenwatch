import { NextRequest, NextResponse } from 'next/server';
import { getAllStationsAirQuality } from '@/lib/api/air-korea';
import { YONGIN_STATIONS } from '@/lib/types/air-quality';

export async function GET(request: NextRequest) {
  try {
    const stationNames = YONGIN_STATIONS.map((s) => s.stationName);
    const airQualityData = await getAllStationsAirQuality(stationNames);

    // Map을 객체로 변환
    const result: Record<string, any> = {};
    airQualityData.forEach((data, stationName) => {
      result[stationName] = data;
    });

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in air-quality API:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch air quality data',
      },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 300; // 5분마다 갱신
