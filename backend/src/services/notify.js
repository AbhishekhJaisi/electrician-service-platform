const twilio = require("twilio");

const TWILIO_SID   = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM  = process.env.TWILIO_WHATSAPP_FROM;
const ADMIN_WA     = process.env.ADMIN_WHATSAPP_NUMBER;

const isConfigured = TWILIO_SID && TWILIO_TOKEN && TWILIO_FROM && ADMIN_WA;

function buildMessage(booking) {
  const issueMap = {
    wiring:      "⚡ Wiring Issue",
    fan_install: "🌀 Fan Installation",
    switchboard: "🔌 Switchboard Repair",
    other:       "🔧 Other",
  };

  return [
    `━━━━━━━━━━━━━━━━━━━━━`,
    `⚡ *NEW SERVICE BOOKING*`,
    `━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `👤 *${booking.name}*`,
    `📞 ${booking.phone}`,
    `📍 ${booking.address}`,
    ``,
    `🔧 *Service Needed*`,
    `   ${booking.notes || issueMap[booking.issueType] || booking.issueType}`,
    booking.preferredTime ? `\n🕐 *Preferred Time*\n   ${booking.preferredTime}` : null,
    booking.availability  ? `\n📅 *Availability*\n   ${booking.availability}`   : null,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━`,
    `📲 Reply here to confirm`,
    `━━━━━━━━━━━━━━━━━━━━━`,
  ].filter(Boolean).join("\n");
}

async function notifyAdmin(booking) {
  const message = buildMessage(booking);

  if (!isConfigured) {
    console.log(`[Booking Notification]\n${message}`);
    return;
  }

  try {
    await twilio(TWILIO_SID, TWILIO_TOKEN).messages.create({
      body: message,
      from: `whatsapp:${TWILIO_FROM}`,
      to:   `whatsapp:${ADMIN_WA}`,
    });
    console.log(`[Booking] WhatsApp sent to ${ADMIN_WA}`);
  } catch (err) {
    console.error(`[Booking] WhatsApp failed:`, err.message);
    console.log(`[Booking Message]\n${message}`);
  }
}

module.exports = { notifyAdmin };
