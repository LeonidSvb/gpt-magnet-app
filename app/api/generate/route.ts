import { NextRequest, NextResponse } from 'next/server'
import { generateResult } from '@/lib/openai'
import { buildPrompt, DEFAULT_RESULT_TEMPLATE } from '@/lib/prompts'
import { getSession, createResult, completeSession } from '@/lib/supabase-queries'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { session_id } = body as { session_id: string }

    if (!session_id) {
      return NextResponse.json(
        { error: 'session_id is required' },
        { status: 400 }
      )
    }

    const session = await getSession(session_id)
    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    const answers = session.answers as Record<string, any>
    const prompt = buildPrompt(
      Object.entries(answers).map(([key, value]) => ({
        question_id: key,
        question_text: key,
        answer: value,
      })),
      DEFAULT_RESULT_TEMPLATE
    )

    const startTime = Date.now()
    const markdown = await generateResult(prompt)
    const generationTime = Date.now() - startTime

    const result = await createResult({
      session_id,
      markdown,
      prompt_used: prompt,
      model: 'gpt-4o-mini',
      generation_time_ms: generationTime,
    })

    await completeSession(session_id)

    return NextResponse.json({
      result: markdown,
      session_id,
      result_id: result.id,
      generation_time_ms: generationTime,
    })
  } catch (error) {
    console.error('Generate error:', error)
    return NextResponse.json(
      { error: 'Failed to generate result' },
      { status: 500 }
    )
  }
}