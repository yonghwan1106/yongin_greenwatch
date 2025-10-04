import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();

    // Supabase 쿠키 이름 찾기 (프로젝트마다 다름)
    const allCookies = cookieStore.getAll();
    console.log('=== 모든 쿠키 ===');
    allCookies.forEach(cookie => {
      if (cookie.name.includes('supabase') || cookie.name.includes('sb-')) {
        console.log(`${cookie.name}: ${cookie.value.substring(0, 20)}...`);
      }
    });

    // Authorization 헤더에서 토큰 가져오기 (클라이언트에서 전달)
    const authHeader = request.headers.get('authorization');
    console.log('Authorization header:', authHeader ? 'EXISTS' : 'NONE');

    // Supabase 클라이언트 생성 (인증용 - anon key)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Service role 클라이언트 생성 (RLS 우회용 - 포인트 지급에 사용)
    console.log('Service Role Key exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
    console.log('Service Role Key prefix:', process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20));

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined in environment variables');
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // 헤더에서 토큰이 있으면 사용
    let session = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const { data, error } = await supabase.auth.getUser(token);
      if (!error && data.user) {
        session = { user: data.user };
        console.log('Session from Authorization header - User:', data.user.id);
      }
    }

    // 토큰이 없으면 쿠키에서 가져오기
    if (!session) {
      const { data } = await supabase.auth.getSession();
      session = data.session;
    }

    const formData = await request.formData();

    console.log('=== 제보 API 시작 ===');
    console.log('Session:', session ? 'EXISTS' : 'NULL');
    console.log('User ID:', session?.user?.id || 'NONE');
    console.log('User email:', session?.user?.email || 'NONE');

    const type = formData.get('type') as string;
    const description = formData.get('description') as string;
    const lat = parseFloat(formData.get('lat') as string);
    const lng = parseFloat(formData.get('lng') as string);
    const address = formData.get('address') as string;
    const isAnonymous = formData.get('isAnonymous') === 'true';

    // 디버깅: 사용자 정보 로그
    console.log('isAnonymous checkbox:', isAnonymous);
    console.log('Will save user_id as:', isAnonymous ? 'NULL (익명)' : session?.user?.id || 'NULL (세션없음)');

    // 제보 데이터 삽입
    const { data: report, error: reportError } = await supabase
      .from('reports')
      .insert({
        user_id: isAnonymous ? null : session?.user?.id,
        type,
        description,
        lat,
        lng,
        address,
        status: 'pending',
      })
      .select()
      .single();

    if (reportError) {
      console.error('Report insert error:', reportError);
      throw reportError;
    }

    console.log('Report created:', report);

    // 이미지 업로드 처리 (Service Role Key 사용)
    const imageFiles = formData.getAll('images') as File[];
    const uploadedMedia = [];

    for (const file of imageFiles) {
      if (file.size > 0) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${report.id}/${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        // Supabase Storage에 업로드 (Admin 클라이언트 사용 - RLS 우회)
        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from('report-media')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          continue;
        }

        // 공개 URL 생성
        const {
          data: { publicUrl },
        } = supabaseAdmin.storage.from('report-media').getPublicUrl(filePath);

        // report_media 테이블에 저장 (Admin 클라이언트 사용)
        const { data: mediaData, error: mediaError } = await supabaseAdmin
          .from('report_media')
          .insert({
            report_id: report.id,
            media_url: publicUrl,
            media_type: 'image',
          })
          .select()
          .single();

        if (!mediaError && mediaData) {
          uploadedMedia.push(mediaData);
          console.log('Image uploaded successfully:', publicUrl);
        } else {
          console.error('Media insert error:', mediaError);
        }
      }
    }

    // 포인트 지급 (로그인한 사용자만)
    if (session?.user?.id && !isAnonymous) {
      console.log('=== 포인트 지급 시도 ===');
      console.log('User ID:', session.user.id);
      console.log('Report ID:', report.id);

      // Service role 클라이언트로 RPC 호출 (RLS 우회)
      const { data: pointsResult, error: pointsError } = await supabaseAdmin.rpc('add_user_points', {
        p_user_id: session.user.id,
        p_type: 'report_submitted',
        p_amount: 50,
        p_reference_id: report.id,
        p_description: '환경 제보 작성',
      });

      if (pointsError) {
        console.error('포인트 지급 실패:', pointsError);
      } else {
        console.log('포인트 지급 성공:', pointsResult);
      }
    } else {
      console.log('=== 포인트 지급 건너뜀 ===');
      console.log('Session exists:', !!session?.user?.id);
      console.log('Is anonymous:', isAnonymous);
    }

    console.log('=== 제보 완료 ===');
    console.log('Saved report ID:', report.id);
    console.log('Saved user_id:', report.user_id || '(익명)');

    // AI 분석 호출 (비동기, 결과를 기다리지 않음)
    if (process.env.ANTHROPIC_API_KEY) {
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/ai-analysis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportId: report.id,
          description,
          type,
          imageUrls: uploadedMedia.map(m => m.media_url),
        }),
      }).catch(error => console.error('AI analysis failed:', error));
    }

    return NextResponse.json({
      success: true,
      data: {
        report,
        media: uploadedMedia,
      },
      debug: {
        user_id: report.user_id,
        session_user_id: session?.user?.id,
        is_anonymous: isAnonymous,
      }
    });
  } catch (error: any) {
    console.error('Error creating report:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create report',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const searchParams = request.nextUrl.searchParams;
    const sortBy = searchParams.get('sortBy') || 'latest';
    const limit = parseInt(searchParams.get('limit') || '20');

    let query = supabase
      .from('reports')
      .select(`
        *,
        report_media(media_url, media_type)
      `);

    if (sortBy === 'latest') {
      query = query.order('created_at', { ascending: false });
    } else if (sortBy === 'empathy') {
      query = query.order('empathy_count', { ascending: false });
    }

    const { data, error } = await query.limit(limit);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch reports',
      },
      { status: 500 }
    );
  }
}
