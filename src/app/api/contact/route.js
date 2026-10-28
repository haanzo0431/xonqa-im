import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Read process environment variables with reliable fallbacks
    const rawToken = process.env.TELEGRAM_BOT_TOKEN || '8838732166:AAHL0ec6i4fIsXv0VwbTf7HV23rIqizw91A';
    const rawChatId = process.env.TELEGRAM_CHAT_ID || '8032502879';

    const botToken = String(rawToken).replace(/^"|"$/g, '').trim();
    const chatId = String(rawChatId).replace(/^"|"$/g, '').trim();

    if (!botToken || !chatId) {
      console.error('Telegram Bot credentials missing.');
      return NextResponse.json(
        { error: 'Server configuration error: Telegram bot credentials missing.' },
        { status: 500 }
      );
    }

    // Format clean Telegram HTML message
    const telegramText = `
📩 <b>New Contact Form Submission</b>

👤 <b>Full Name:</b> ${escapeHtml(name)}
📧 <b>Email:</b> ${escapeHtml(email)}
💬 <b>Message:</b>
${escapeHtml(message)}

⏰ <i>Sent from Xonqa IM Official Website</i>
    `.trim();

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const telegramRes = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramText,
        parse_mode: 'HTML',
      }),
    });

    const telegramData = await telegramRes.json();

    if (!telegramData.ok) {
      console.error('Telegram API Error Response:', telegramData);
      return NextResponse.json(
        { error: `Telegram notification failed: ${telegramData.description || 'Unknown error'}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/contact:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
