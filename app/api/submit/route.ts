import { NextRequest, NextResponse } from 'next/server';
import { createSession, updateSessionAnswers } from '@/lib/supabase-queries';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessType, answers, source } = body as {
      businessType: string;
      answers: Record<string, unknown>;
      source?: 'web' | 'telegram';
    };

    // Validate required fields
    if (!businessType || !answers) {
      return NextResponse.json(
        { error: 'Missing required fields: businessType, answers' },
        { status: 400 }
      );
    }

    const userAgent = request.headers.get('user-agent') || undefined;
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               undefined;

    // Create session with category and niche
    const session = await createSession({
      source: source || 'web',
      user_agent: userAgent,
      ip_address: ip,
    });

    // Update session with answers and businessType
    await updateSessionAnswers(session.id, {
      ...answers,
      businessType
    });

    return NextResponse.json({
      sessionId: session.id,
      session,
    });
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}