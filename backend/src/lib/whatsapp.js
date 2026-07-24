/**
 * WhatsApp notification via Twilio
 *
 * Setup (free sandbox — good for demo/testing):
 * 1. Sign up at https://www.twilio.com (free, no credit card for sandbox)
 * 2. Go to Messaging → Try it out → Send a WhatsApp message
 * 3. Follow the sandbox join instructions on your phone
 * 4. Copy Account SID, Auth Token, and sandbox number into .env
 *
 * For production (real number):
 * - Apply for a Twilio WhatsApp sender number (~$1/month)
 * - Same code, just change TWILIO_WHATSAPP_FROM to your approved number
 */

const twilio = require("twilio");

const isConfigured =
  process.env.TWILIO_ACCOUNT_SID &&
  process.env.TWILIO_AUTH_TOKEN &&
  process.env.TWILIO_WHATSAPP_FROM &&
  process.env.ADMIN_WHATSAPP_NUMBER;

/**
 * Send a WhatsApp message to the admin when a new enquiry comes in.
 * Silently skips if Twilio is not configured (so the app doesn't crash).
 */
async function notifyAdminNewEnquiry({ name, phone, service, message, email }) {
  if (!isConfigured) {
    console.log("[WhatsApp] Not configured — skipping notification.");
    return;
  }

  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  const body = [
    `━━━━━━━━━━━━━━━━━━━━━`,
    `⚡ *NEW ENQUIRY*`,
    `━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `👤 *${name}*`,
    `📞 ${phone}`,
    email ? `📧 ${email}` : null,
    ``,
    `🔧 *Service Needed*`,
    `   ${service}`,
    message ? `\n💬 *Message*\n   ${message}` : null,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━`,
    `📲 Reply here to confirm`,
    `━━━━━━━━━━━━━━━━━━━━━`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
      to:   `whatsapp:${process.env.ADMIN_WHATSAPP_NUMBER}`,
      body,
    });
    console.log("[WhatsApp] Admin notification sent.");
  } catch (err) {
    // Never crash the request if WhatsApp fails
    console.error("[WhatsApp] Failed to send notification:", err.message);
  }
}

module.exports = { notifyAdminNewEnquiry };
