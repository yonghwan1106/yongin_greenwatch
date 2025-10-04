import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { userId, reportId, action } = await request.json();

    if (!userId || !reportId || !action) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Service role 클라이언트로 포인트 지급
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

    if (action === 'add') {
      // 공감 포인트 지급
      const { data, error } = await supabaseAdmin.rpc('add_user_points', {
        p_user_id: userId,
        p_type: 'empathy_given',
        p_amount: 5,
        p_reference_id: reportId,
        p_description: '제보 공감 참여',
      });

      if (error) {
        console.error('Points error:', error);
        // 한도 초과 에러는 무시
        if (error.message?.includes('한도')) {
          return NextResponse.json({
            success: true,
            limitExceeded: true,
            message: '오늘의 공감 포인트 적립 한도를 초과했습니다.'
          });
        }
        throw error;
      }

      return NextResponse.json({
        success: true,
        data,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Empathy API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to process empathy',
      },
      { status: 500 }
    );
  }
}
