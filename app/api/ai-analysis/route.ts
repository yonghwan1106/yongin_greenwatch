import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { reportId, description, type, imageUrls } = await request.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Claude API key not configured' },
        { status: 500 }
      );
    }

    // Claude에게 제보 분석 요청
    const prompt = `당신은 환경 문제 전문가입니다. 다음 시민 제보를 분석해주세요:

제보 유형: ${type}
설명: ${description || '(설명 없음)'}

다음 항목을 JSON 형식으로 분석해주세요:
1. keywords: 핵심 키워드 3-5개 (배열)
2. detailed_type: 구체적인 문제 유형 (예: "불법 폐기물 투기", "악취 발생")
3. severity: 심각도 (low, medium, high 중 하나)
4. recommended_department: 담당 부서 추천 (예: "환경정책과", "청소행정과")
5. summary: 한 줄 요약 (30자 이내)
6. confidence_score: 분석 신뢰도 (0.0 ~ 1.0)

JSON만 응답해주세요.`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].type === 'text'
      ? message.content[0].text
      : '';

    // JSON 파싱
    const analysisResult = JSON.parse(responseText);

    // Supabase에 분석 결과 저장
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from('report_ai_analysis')
      .insert({
        report_id: reportId,
        keywords: analysisResult.keywords,
        detailed_type: analysisResult.detailed_type,
        severity: analysisResult.severity,
        recommended_department: analysisResult.recommended_department,
        confidence_score: analysisResult.confidence_score,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving AI analysis:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: {
        ...data,
        summary: analysisResult.summary,
      },
    });
  } catch (error: any) {
    console.error('AI analysis error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to analyze report',
      },
      { status: 500 }
    );
  }
}
