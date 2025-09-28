import { NextRequest, NextResponse } from 'next/server'
import { createLead, getSessionWithResult } from '@/lib/supabase-queries'
import { sendToN8N } from '@/lib/n8n'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      session_id,
      email,
      telegram_id,
      name,
      phone,
      company,
    } = body as {
      session_id: string
      email?: string
      telegram_id?: number
      name?: string
      phone?: string
      company?: string
    }

    if (!session_id) {
      return NextResponse.json(
        { error: 'session_id is required' },
        { status: 400 }
      )
    }

    if (!email && !telegram_id) {
      return NextResponse.json(
        { error: 'Either email or telegram_id is required' },
        { status: 400 }
      )
    }

    const lead = await createLead({
      session_id,
      email,
      telegram_id,
      name,
      phone,
      company,
    })

    const sessionData = await getSessionWithResult(session_id)

    if (sessionData) {
      try {
        await sendToN8N(
          {
            id: lead.id,
            email: lead.email || undefined,
            telegram_id: lead.telegram_id || undefined,
            name: lead.name || undefined,
            phone: lead.phone || undefined,
            company: lead.company || undefined,
            platform: sessionData.session.source || 'web',
            created_at: lead.created_at,
          },
          Object.entries(sessionData.session.answers as Record<string, unknown>).map(
            ([key, value]) => ({
              question_id: key,
              question_text: key,
              answer: value,
            })
          ),
          sessionData.result?.markdown
        )
      } catch (n8nError) {
        console.error('n8n webhook error:', n8nError)
      }
    }

    return NextResponse.json({
      success: true,
      lead_id: lead.id,
    })
  } catch (error) {
    console.error('Lead submit error:', error)
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    )
  }
}