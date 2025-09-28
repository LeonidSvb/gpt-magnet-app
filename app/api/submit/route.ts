import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { supabase } from '@/lib/supabase'
import type { Answer } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers } = body as { answers: Answer[] }

    const sessionId = nanoid()

    const { data, error } = await supabase
      .from('sessions')
      .insert({
        id: sessionId,
        answers: answers,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ session_id: sessionId, data })
  } catch (error) {
    console.error('Submit error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}