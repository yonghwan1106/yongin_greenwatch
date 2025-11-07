import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 최근 30일간의 제보 데이터 조회
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: recentReports, error } = await supabase
      .from('reports')
      .select(`
        id,
        type,
        lat,
        lng,
        address,
        created_at,
        report_ai_analysis (
          detailed_type,
          severity,
          keywords
        )
      `)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (!recentReports || recentReports.length === 0) {
      return NextResponse.json({
        success: true,
        anomalies: [],
        summary: '최근 30일간 제보가 없습니다.',
        report_count: 0,
        period: '최근 30일',
      });
    }

    // Claude에게 패턴 분석 요청
    const analysisPrompt = `당신은 경기도 용인시의 환경 데이터 분석 전문가입니다. 다음은 용인시에서 최근 30일간 접수된 환경 제보 데이터입니다:

${JSON.stringify(recentReports, null, 2)}

다음 이상 패턴을 감지해주세요:
1. 용인시 내 특정 지역에 제보가 집중된 경우 (같은 주소 또는 0.01도 이내 좌표)
2. 같은 유형의 제보가 반복되는 경우
3. 심각도가 'high'인 제보가 여러 건인 경우
4. 특정 키워드가 반복 출현하는 경우

**중요: 모든 분석과 설명에서 "용인시" 또는 "용인 지역"이라고 명시해주세요. 다른 지역명(예: 서울, 경기도 등)을 언급하지 마세요.**

다음 JSON 형식으로 응답해주세요:
{
  "anomalies": [
    {
      "type": "cluster" | "repeated_type" | "high_severity" | "keyword_pattern",
      "description": "이상 패턴 설명 (한글, 100자 이내, 용인시 맥락 포함)",
      "severity": "low" | "medium" | "high",
      "affected_reports": ["report_id1", "report_id2"],
      "recommendation": "조치 권장사항 (한글, 100자 이내)"
    }
  ],
  "summary": "전체 요약 (한글, 200자 이내, 용인시 맥락 포함)"
}

JSON만 응답해주세요.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: analysisPrompt,
        },
      ],
    });

    const responseText = message.content[0].type === 'text'
      ? message.content[0].text
      : '';

    // Extract JSON from response (handle cases where Claude adds extra text)
    let jsonText = responseText.trim();

    // Try to find JSON block in the response
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    }

    // Remove markdown code blocks if present
    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');

    const analysisResult = JSON.parse(jsonText);

    return NextResponse.json({
      success: true,
      ...analysisResult,
      report_count: recentReports.length,
      period: '최근 30일',
    });
  } catch (error: any) {
    console.error('Anomaly detection error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to detect anomalies',
      },
      { status: 500 }
    );
  }
}
