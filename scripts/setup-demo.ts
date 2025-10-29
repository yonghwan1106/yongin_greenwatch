import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables!');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'OK' : 'Missing');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'OK' : 'Missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Demo account credentials
const DEMO_EMAIL = 'demo@yongin-greenwatch.com';
const DEMO_PASSWORD = 'demo1234!@';

async function setupDemoAccount() {
  console.log('🚀 용인 그린워치 데모 계정 설정 시작...\n');

  try {
    // Step 1: Check if demo account exists
    console.log('1️⃣  데모 계정 확인 중...');
    const { data: existingUser } = await supabase.auth.admin.listUsers();
    const demoUser = existingUser?.users.find(u => u.email === DEMO_EMAIL);

    let userId: string;

    if (demoUser) {
      console.log('✅ 기존 데모 계정 발견:', DEMO_EMAIL);
      userId = demoUser.id;

      // Delete existing demo data
      console.log('🗑️  기존 데모 데이터 삭제 중...');
      await supabase.from('report_empathy').delete().eq('user_id', userId);
      await supabase.from('reports').delete().eq('user_id', userId);
      await supabase.from('point_transactions').delete().eq('user_id', userId);
      await supabase.from('user_points').delete().eq('user_id', userId);
      console.log('✅ 기존 데모 데이터 삭제 완료');
    } else {
      console.log('📝 새 데모 계정 생성 중...');
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
        email_confirm: true,
        user_metadata: {
          name: '데모 사용자',
          is_demo: true
        }
      });

      if (createError || !newUser.user) {
        throw new Error(`계정 생성 실패: ${createError?.message}`);
      }

      userId = newUser.user.id;
      console.log('✅ 데모 계정 생성 완료:', DEMO_EMAIL);
    }

    // Step 2: Initialize user points
    console.log('\n2️⃣  포인트 초기화 중...');
    const { error: pointsError } = await supabase
      .from('user_points')
      .upsert({
        user_id: userId,
        total_points: 1500,
        available_points: 1500,
        used_points: 0
      });

    if (pointsError) throw pointsError;
    console.log('✅ 포인트 초기화 완료: 1,500P');

    // Step 3: Create sample reports with various types
    console.log('\n3️⃣  샘플 제보 생성 중...');
    const sampleReports = [
      {
        user_id: userId,
        type: 'smell',
        description: '처인구 김량장동 근처에서 악취가 심하게 납니다. 공장에서 나오는 것 같습니다.',
        lat: 37.2419,
        lng: 127.2089,
        address: '경기도 용인시 처인구 김량장동',
        status: 'reviewing',
        empathy_count: 12,
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        type: 'wastewater',
        description: '기흥구 보정동 하수구에서 오염수가 흘러나오고 있습니다.',
        lat: 37.2888,
        lng: 127.1156,
        address: '경기도 용인시 기흥구 보정동',
        status: 'pending',
        empathy_count: 8,
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        type: 'waste',
        description: '수지구 동천동 공원에 쓰레기가 많이 버려져 있습니다. 청소가 필요합니다.',
        lat: 37.3216,
        lng: 127.0987,
        address: '경기도 용인시 수지구 동천동',
        status: 'resolved',
        empathy_count: 24,
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        type: 'air',
        description: '처인구 역북동에서 미세먼지가 심합니다. 건설 현장 때문인 것 같습니다.',
        lat: 37.2341,
        lng: 127.2012,
        address: '경기도 용인시 처인구 역북동',
        status: 'reviewing',
        empathy_count: 15,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        type: 'noise',
        description: '기흥구 구갈동 야간 소음이 심합니다. 새벽까지 공사를 하고 있습니다.',
        lat: 37.2656,
        lng: 127.1123,
        address: '경기도 용인시 기흥구 구갈동',
        status: 'pending',
        empathy_count: 18,
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        type: 'water',
        description: '수지구 상현동 하천에 물고기가 떼죽음하고 수질이 이상합니다.',
        lat: 37.2978,
        lng: 127.0721,
        address: '경기도 용인시 수지구 상현동',
        status: 'reviewing',
        empathy_count: 32,
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    const { data: reports, error: reportsError } = await supabase
      .from('reports')
      .insert(sampleReports)
      .select();

    if (reportsError) throw reportsError;
    console.log(`✅ ${reports?.length || 0}개의 샘플 제보 생성 완료`);

    // Step 4: Add AI analysis to reports
    if (reports && reports.length > 0) {
      console.log('\n4️⃣  AI 분석 데이터 추가 중...');
      const aiAnalyses = [
        {
          report_id: reports[0].id,
          keywords: ['악취', '공장', '대기오염'],
          detailed_type: '산업 악취',
          severity: 'high',
          recommended_department: '환경정책과',
          image_description: '공장 지역의 악취 발생',
          confidence_score: 0.92
        },
        {
          report_id: reports[1].id,
          keywords: ['오염수', '하수구', '수질오염'],
          detailed_type: '하수 오염',
          severity: 'high',
          recommended_department: '수질관리과',
          image_description: '하수구에서 오염수 유출',
          confidence_score: 0.88
        },
        {
          report_id: reports[2].id,
          keywords: ['쓰레기', '공원', '불법투기'],
          detailed_type: '불법 쓰레기 투기',
          severity: 'medium',
          recommended_department: '청소행정과',
          image_description: '공원 내 쓰레기 투기',
          confidence_score: 0.95
        },
        {
          report_id: reports[3].id,
          keywords: ['미세먼지', '건설현장', '대기질'],
          detailed_type: '건설 미세먼지',
          severity: 'medium',
          recommended_department: '대기질관리과',
          image_description: '건설 현장 미세먼지 발생',
          confidence_score: 0.85
        },
        {
          report_id: reports[4].id,
          keywords: ['소음', '야간공사', '건설'],
          detailed_type: '건설 소음',
          severity: 'high',
          recommended_department: '소음진동과',
          image_description: '야간 건설 소음',
          confidence_score: 0.91
        },
        {
          report_id: reports[5].id,
          keywords: ['수질오염', '물고기', '하천'],
          detailed_type: '하천 수질 오염',
          severity: 'high',
          recommended_department: '수질관리과',
          image_description: '하천 수질 오염 및 생태계 피해',
          confidence_score: 0.93
        }
      ];

      const { error: aiError } = await supabase
        .from('report_ai_analysis')
        .insert(aiAnalyses);

      if (aiError) throw aiError;
      console.log(`✅ ${aiAnalyses.length}개의 AI 분석 추가 완료`);
    }

    // Step 5: Add point transactions
    console.log('\n5️⃣  포인트 거래 내역 생성 중...');
    const pointTransactions = [
      {
        user_id: userId,
        type: 'signup_bonus',
        amount: 500,
        balance_after: 500,
        description: '회원가입 축하 보너스',
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        type: 'report_submitted',
        amount: 100,
        balance_after: 600,
        description: '환경 제보 작성',
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        type: 'report_submitted',
        amount: 100,
        balance_after: 700,
        description: '환경 제보 작성',
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        type: 'report_empathized',
        amount: 200,
        balance_after: 900,
        description: '내 제보에 공감 20개 달성',
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        type: 'monthly_bonus',
        amount: 300,
        balance_after: 1200,
        description: '이달의 우수 시민 보너스',
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        type: 'report_submitted',
        amount: 100,
        balance_after: 1300,
        description: '환경 제보 작성',
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        type: 'report_submitted',
        amount: 100,
        balance_after: 1400,
        description: '환경 제보 작성',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        user_id: userId,
        type: 'report_submitted',
        amount: 100,
        balance_after: 1500,
        description: '환경 제보 작성',
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    const { error: txError } = await supabase
      .from('point_transactions')
      .insert(pointTransactions);

    if (txError) throw txError;
    console.log(`✅ ${pointTransactions.length}개의 포인트 거래 내역 생성 완료`);

    // Step 6: Add air quality history data
    console.log('\n6️⃣  대기질 이력 데이터 생성 중...');
    const stations = ['용인시청', '기흥구청', '수지구청', '처인구청'];
    const airQualityData = [];

    for (let i = 0; i < 24; i++) {
      const timestamp = new Date(Date.now() - i * 60 * 60 * 1000);
      for (const station of stations) {
        airQualityData.push({
          station_name: station,
          measured_at: timestamp.toISOString(),
          pm10_value: Math.floor(Math.random() * 50) + 20,
          pm25_value: Math.floor(Math.random() * 30) + 10,
          o3_value: Math.random() * 0.05 + 0.01,
          no2_value: Math.random() * 0.03 + 0.01,
          so2_value: Math.random() * 0.005 + 0.001,
          co_value: Math.random() * 0.5 + 0.3,
          pm10_grade: Math.floor(Math.random() * 3) + 1,
          pm25_grade: Math.floor(Math.random() * 3) + 1
        });
      }
    }

    const { error: airError } = await supabase
      .from('air_quality_history')
      .insert(airQualityData);

    if (airError) throw airError;
    console.log(`✅ ${airQualityData.length}개의 대기질 데이터 생성 완료`);

    // Step 7: Add partner stores
    console.log('\n7️⃣  제휴 매장 생성 중...');
    const partnerStores = [
      {
        name: '에코마켓 용인점',
        category: 'zero_waste',
        address: '경기도 용인시 기흥구 중부대로 1',
        lat: 37.2750,
        lng: 127.1158,
        phone: '031-123-4567',
        business_hours: { weekday: '10:00-21:00', weekend: '10:00-20:00' },
        description: '친환경 생활용품 전문 매장입니다.',
        status: 'active'
      },
      {
        name: '로컬푸드 직매장',
        category: 'local_food',
        address: '경기도 용인시 처인구 금학로 100',
        lat: 37.2350,
        lng: 127.2100,
        phone: '031-234-5678',
        business_hours: { weekday: '09:00-20:00', weekend: '09:00-19:00' },
        description: '용인 지역 농산물 직거래 장터입니다.',
        status: 'active'
      },
      {
        name: '그린카페',
        category: 'eco_cafe',
        address: '경기도 용인시 수지구 포은대로 400',
        lat: 37.3200,
        lng: 127.0950,
        phone: '031-345-6789',
        business_hours: { weekday: '08:00-22:00', weekend: '09:00-22:00' },
        description: '다회용 컵 사용 카페입니다.',
        status: 'active'
      }
    ];

    const { data: stores, error: storesError } = await supabase
      .from('partner_stores')
      .insert(partnerStores)
      .select();

    if (storesError) throw storesError;
    console.log(`✅ ${stores?.length || 0}개의 제휴 매장 생성 완료`);

    // Success summary
    console.log('\n' + '='.repeat(50));
    console.log('✨ 데모 계정 설정 완료! ✨');
    console.log('='.repeat(50));
    console.log('\n📋 데모 계정 정보:');
    console.log(`   이메일: ${DEMO_EMAIL}`);
    console.log(`   비밀번호: ${DEMO_PASSWORD}`);
    console.log('\n📊 생성된 데이터:');
    console.log(`   - 환경 제보: ${reports?.length || 0}개`);
    console.log(`   - AI 분석: ${reports?.length || 0}개`);
    console.log(`   - 포인트 거래: ${pointTransactions.length}개`);
    console.log(`   - 대기질 데이터: ${airQualityData.length}개`);
    console.log(`   - 제휴 매장: ${stores?.length || 0}개`);
    console.log(`   - 사용자 포인트: 1,500P\n`);

  } catch (error: any) {
    console.error('\n❌ 오류 발생:', error.message);
    process.exit(1);
  }
}

// Run the setup
setupDemoAccount();
