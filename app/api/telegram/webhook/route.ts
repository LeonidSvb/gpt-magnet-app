import { NextRequest, NextResponse } from 'next/server';

interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      username?: string;
    };
    chat: {
      id: number;
      type: string;
    };
    text?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: TelegramUpdate = await request.json();

    // Verify webhook token
    const token = request.nextUrl.searchParams.get('token');
    if (token !== process.env.TELEGRAM_WEBHOOK_TOKEN) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    if (!body.message) {
      return NextResponse.json({ ok: true });
    }

    const { message } = body;
    const chatId = message.chat.id;
    const userId = message.from.id;
    const text = message.text || '';

    // Handle /start command
    if (text === '/start') {
      await sendTelegramMessage(
        chatId,
        'Welcome to GPT Lead Magnet Generator! 🚀\n\n' +
        'I can help you create personalized lead magnets based on your business needs.\n\n' +
        'To get started, please visit: ' + process.env.NEXT_PUBLIC_APP_URL + '?source=telegram&user_id=' + userId
      );
      return NextResponse.json({ ok: true });
    }

    // Handle other messages with a helpful response
    await sendTelegramMessage(
      chatId,
      'Thanks for your message! To create your lead magnet, please visit:\n\n' +
      process.env.NEXT_PUBLIC_APP_URL + '?source=telegram&user_id=' + userId + '\n\n' +
      'Or type /start to begin.'
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Telegram webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function sendTelegramMessage(chatId: number, text: string) {
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    console.error('TELEGRAM_BOT_TOKEN not configured');
    return;
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.status}`);
    }
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
  }
}