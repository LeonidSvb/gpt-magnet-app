import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { leadSubmitSchema } from '@/lib/schema'
import { supabase } from '@/lib/supabase'
import { sendToN8N } from '@/lib/n8n'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = leadSubmitSchema.parse(body)

    const leadId = nanoid()

    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        id: leadId,
        email: validatedData.email,
        telegram_id: validatedData.telegram_id,
        telegram_username: validatedData.telegram_username,
        name: validatedData.name,
        platform: validatedData.platform,
      })
      .select()
      .single()

    if (leadError) {
      console.error('Lead insert error:', leadError)
      return NextResponse.json({ error: leadError.message }, { status: 500 })
    }

    const { error: sessionError } = await supabase
      .from('sessions')
      .update({ lead_id: leadId, completed_at: new Date().toISOString() })
      .eq('id', validatedData.session_id)

    if (sessionError) {
      console.error('Session update error:', sessionError)
    }

    const { data: session } = await supabase
      .from('sessions')
      .select('result')
      .eq('id', validatedData.session_id)
      .single()

    try {
      await sendToN8N(lead, validatedData.answers, session?.result || undefined)
    } catch (n8nError) {
      console.error('n8n webhook error:', n8nError)
    }

    return NextResponse.json({
      success: true,
      lead_id: leadId,
    })
  } catch (error) {
    console.error('Lead submit error:', error)
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    )
  }
}