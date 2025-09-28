import { NextRequest, NextResponse } from 'next/server'
import { createSession, updateSessionAnswers } from '@/lib/supabase-queries'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers, source, total_steps } = body as {
      answers?: Record<string, any>
      source?: 'web' | 'telegram' | 'iframe'
      total_steps?: number
    }

    const userAgent = request.headers.get('user-agent') || undefined
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               undefined

    const session = await createSession({
      source: source || 'web',
      total_steps,
      user_agent: userAgent,
      ip_address: ip,
    })

    if (answers && Object.keys(answers).length > 0) {
      await updateSessionAnswers(session.id, answers)
    }

    return NextResponse.json({
      session_id: session.id,
      session,
    })
  } catch (error) {
    console.error('Submit error:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}