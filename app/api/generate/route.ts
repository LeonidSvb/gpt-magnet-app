import { NextRequest, NextResponse } from 'next/server';
import { generateResult } from '@/lib/openai';
import { buildPrompt, DEFAULT_RESULT_TEMPLATE } from '@/lib/prompts';
import { getSession, createResult, completeSession } from '@/lib/supabase-queries';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId } = body as { sessionId: string };

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
        { status: 400 }
      );
    }

    const session = await getSession(sessionId);
    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    const answers = session.answers as Record<string, unknown>;
    const category = answers.category as string;
    const niche = answers.niche as string;

    // Build prompt with category and niche context
    const prompt = buildPrompt(
      Object.entries(answers)
        .filter(([key]) => !['category', 'niche'].includes(key))
        .map(([key, value]) => ({
          question_id: key,
          question_text: key,
          answer: value,
        })),
      DEFAULT_RESULT_TEMPLATE,
      category,
      niche
    );

    const startTime = Date.now();
    const markdown = await generateResult(prompt);
    const generationTime = Date.now() - startTime;

    const result = await createResult({
      session_id: sessionId,
      markdown,
      prompt_used: prompt,
      model: 'gpt-4o-mini',
      generation_time_ms: generationTime,
    });

    await completeSession(sessionId);

    return NextResponse.json({
      markdown,
      sessionId,
      result_id: result.id,
      generation_time_ms: generationTime,
    });
  } catch (error) {
    console.error('Generate error:', error);
    return NextResponse.json(
      { error: 'Failed to generate result' },
      { status: 500 }
    );
  }
}