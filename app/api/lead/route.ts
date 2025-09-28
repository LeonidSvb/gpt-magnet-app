import { NextRequest, NextResponse } from 'next/server';
import { createLead, getSessionWithResult } from '@/lib/supabase-queries';
import { sendToN8N } from '@/lib/n8n';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sessionId,
      name,
      contactType,
      contactValue,
    } = body as {
      sessionId: string;
      name: string;
      contactType: 'email' | 'telegram';
      contactValue: string;
    };

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
        { status: 400 }
      );
    }

    if (!name || !contactType || !contactValue) {
      return NextResponse.json(
        { error: 'name, contactType, and contactValue are required' },
        { status: 400 }
      );
    }

    // Create lead based on contact type
    const leadData = {
      session_id: sessionId,
      name,
      ...(contactType === 'email'
        ? { email: contactValue }
        : { telegram_id: parseInt(contactValue) || contactValue }
      )
    };

    const lead = await createLead(leadData);

    // Get session data with result for webhook
    const sessionData = await getSessionWithResult(sessionId);

    if (sessionData) {
      try {
        await sendToN8N(
          {
            id: lead.id,
            email: lead.email || undefined,
            telegram_id: lead.telegram_id || undefined,
            name: lead.name || undefined,
            contact_type: contactType,
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
        );
      } catch (n8nError) {
        console.error('n8n webhook error:', n8nError);
      }
    }

    return NextResponse.json({
      success: true,
      lead_id: lead.id,
    });
  } catch (error) {
    console.error('Lead submit error:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    );
  }
}