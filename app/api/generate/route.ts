import { NextRequest, NextResponse } from 'next/server'
import { generateSchema } from '@/lib/schema'
import { generateResult } from '@/lib/openai'
import { buildPrompt, DEFAULT_RESULT_TEMPLATE } from '@/lib/prompts'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = generateSchema.parse(body)

    const prompt = buildPrompt(validatedData.answers, DEFAULT_RESULT_TEMPLATE)
    const result = await generateResult(prompt)

    const { error } = await supabase
      .from('sessions')
      .update({ result })
      .eq('id', validatedData.session_id)

    if (error) {
      console.error('Supabase error:', error)
    }

    return NextResponse.json({
      result,
      session_id: validatedData.session_id,
    })
  } catch (error) {
    console.error('Generate error:', error)
    return NextResponse.json(
      { error: 'Failed to generate result' },
      { status: 500 }
    )
  }
}