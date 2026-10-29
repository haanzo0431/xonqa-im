import { NextResponse } from 'next/server';

/**
 * Helper to parse admin Telegram IDs from process.env.ADMIN_TELEGRAM_IDS
 * Supports comma-separated IDs (e.g. "8032502879,123456789")
 */
function getAdminIds() {
  const rawAdminIds = process.env.ADMIN_TELEGRAM_IDS || '';
  return rawAdminIds
    .split(',')
    .map((id) => id.replace(/^"|"$/g, '').trim())
    .filter((id) => id.length > 0);
}

/**
 * Helper to send a message to a single Telegram Chat ID via Telegram Bot API
 */
async function sendTelegramMessage(botToken, chatId, text, parseMode = 'HTML') {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: parseMode,
    }),
  });
  return response.json();
}

/**
 * Escape HTML special characters for Telegram HTML parse_mode
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN?.replace(/^"|"$/g, '').trim();
    const adminIds = getAdminIds();

    if (!botToken) {
      console.error('Xonqa IM Error: TELEGRAM_BOT_TOKEN environment variable is missing.');
      return NextResponse.json(
        { error: 'Server configuration error: TELEGRAM_BOT_TOKEN is not set.' },
        { status: 500 }
      );
    }

    if (adminIds.length === 0) {
      console.error('Xonqa IM Error: ADMIN_TELEGRAM_IDS environment variable is missing or empty.');
      return NextResponse.json(
        { error: 'Server configuration error: ADMIN_TELEGRAM_IDS is not set.' },
        { status: 500 }
      );
    }

    const body = await request.json();

    // ------------------------------------------------------------------------
    // CASE 1: TELEGRAM BOT WEBHOOK INTERACTION
    // Triggered when a user sends a message or command to the bot on Telegram
    // ------------------------------------------------------------------------
    if (body.update_id !== undefined || body.message || body.callback_query) {
      const telegramMessage = body.message || body.callback_query?.message;
      const sender = body.message?.from || body.callback_query?.from;
      const senderId = sender?.id ? String(sender.id) : null;
      const chatId = telegramMessage?.chat?.id ? String(telegramMessage.chat.id) : senderId;

      // Whitelist Verification
      const isAuthorized = senderId && adminIds.includes(senderId);

      if (!isAuthorized) {
        console.warn(`Xonqa IM Security: Unauthorized bot interaction from Telegram ID: ${senderId}`);

        // Reply to the unauthorized user directly on Telegram
        if (chatId) {
          await sendTelegramMessage(
            botToken,
            chatId,
            '🚫 <b>Unauthorized Access</b>\n\nSorry, your Telegram ID is not on the administrator whitelist for Xonqa IM.'
          );
        }

        return NextResponse.json(
          { error: 'Unauthorized: Telegram ID is not in the administrator whitelist.' },
          { status: 403 }
        );
      }

      // Handle Authorized Administrator Commands
      const incomingText = body.message?.text || '';
      let replyText = `👋 Hello Administrator <b>${escapeHtml(sender?.first_name || 'Admin')}</b>!\n\nYour Telegram ID (<code>${senderId}</code>) is verified on the Xonqa IM whitelist.`;

      if (incomingText.startsWith('/start')) {
        replyText += '\n\nNotification service is active. You will receive real-time website alerts here.';
      } else if (incomingText.startsWith('/status')) {
        replyText += '\n\n✅ <b>System Status:</b> Xonqa IM Notification Service is Online.';
      }

      if (chatId) {
        await sendTelegramMessage(botToken, chatId, replyText);
      }

      return NextResponse.json({ status: 'Webhook processed successfully.' });
    }

    // ------------------------------------------------------------------------
    // CASE 2: WEBSITE NOTIFICATION / CONTACT FORM SUBMISSION
    // Dispatches alerts to all whitelisted school administrators
    // ------------------------------------------------------------------------
    const { name, email, message, title, type } = body;

    let formattedMessage = '';

    if (message) {
      formattedMessage = `
🔔 <b>${escapeHtml(title || 'New Xonqa IM Notification')}</b>

👤 <b>Name:</b> ${escapeHtml(name || 'Anonymous')}
📧 <b>Email:</b> ${escapeHtml(email || 'N/A')}
📌 <b>Type:</b> ${escapeHtml(type || 'General Contact')}

💬 <b>Message:</b>
${escapeHtml(message)}

⏰ <i>Sent via Xonqa IM Official Website</i>
      `.trim();
    } else if (body.text) {
      formattedMessage = escapeHtml(body.text);
    } else {
      return NextResponse.json(
        { error: 'Invalid payload: "message" or "text" field is required.' },
        { status: 400 }
      );
    }

    // Send notifications to all whitelisted admin Telegram IDs in parallel
    const sendResults = await Promise.allSettled(
      adminIds.map((adminId) =>
        sendTelegramMessage(botToken, adminId, formattedMessage)
      )
    );

    const successfulDeliveries = sendResults.filter(
      (res) => res.status === 'fulfilled' && res.value?.ok
    ).length;

    if (successfulDeliveries === 0) {
      console.error('Failed to deliver notification to any admin Telegram ID:', sendResults);
      return NextResponse.json(
        { error: 'Failed to deliver notification to designated admin Telegram IDs.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Notification sent successfully to ${successfulDeliveries} administrator(s).`,
      deliveries: successfulDeliveries,
    });
  } catch (error) {
    console.error('Error in /api/telegram-notify:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing Telegram notification.' },
      { status: 500 }
    );
  }
}
