import { AirQualityData } from '@/lib/types/air-quality';

const API_BASE_URL = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc';
const API_KEY = process.env.NEXT_PUBLIC_AIR_KOREA_API_KEY || '';

export async function getRealtimeAirQuality(
  stationName: string
): Promise<AirQualityData | null> {
  try {
    const url = new URL(`${API_BASE_URL}/getMsrstnAcctoRltmMesureDnsty`);
    url.searchParams.append('serviceKey', API_KEY);
    url.searchParams.append('returnType', 'json');
    url.searchParams.append('numOfRows', '1');
    url.searchParams.append('pageNo', '1');
    url.searchParams.append('stationName', stationName);
    url.searchParams.append('dataTerm', 'DAILY');
    url.searchParams.append('ver', '1.3');

    const response = await fetch(url.toString(), {
      next: { revalidate: 300 }, // 5분 캐시
    });

    if (!response.ok) {
      console.error('Air Korea API error:', response.statusText);
      return null;
    }

    const data = await response.json();
    const items = data.response?.body?.items;

    if (!items || items.length === 0) {
      return null;
    }

    const item = items[0];

    return {
      stationName: item.stationName,
      dataTime: item.dataTime,
      pm10Value: item.pm10Value ? parseFloat(item.pm10Value) : null,
      pm25Value: item.pm25Value ? parseFloat(item.pm25Value) : null,
      o3Value: item.o3Value ? parseFloat(item.o3Value) : null,
      no2Value: item.no2Value ? parseFloat(item.no2Value) : null,
      so2Value: item.so2Value ? parseFloat(item.so2Value) : null,
      coValue: item.coValue ? parseFloat(item.coValue) : null,
      pm10Grade: item.pm10Grade ? parseInt(item.pm10Grade) : null,
      pm25Grade: item.pm25Grade ? parseInt(item.pm25Grade) : null,
    } as AirQualityData;
  } catch (error) {
    console.error('Error fetching air quality data:', error);
    return null;
  }
}

export async function getAllStationsAirQuality(
  stationNames: string[]
): Promise<Map<string, AirQualityData>> {
  const results = new Map<string, AirQualityData>();

  await Promise.all(
    stationNames.map(async (stationName) => {
      const data = await getRealtimeAirQuality(stationName);
      if (data) {
        results.set(stationName, data);
      }
    })
  );

  return results;
}
