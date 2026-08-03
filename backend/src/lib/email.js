const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = process.env.EMAIL_FROM || "noreply@sagарelectricals.com";

async function sendOTP(email, otp) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[Email] OTP for ${email}: ${otp}  (RESEND_API_KEY not set)`);
    return;
  }
  await resend.emails.send({
    from:    FROM,
    to:      email,
    subject: "Your login code — Sagar Electricals",
    html: `
      <div style="font-family:monospace;max-width:420px;margin:0 auto;padding:32px;background:#101216;color:#F4F1EA;border-radius:8px">
        <p style="color:#C1662F;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 16px">Sagar Electricals</p>
        <h2 style="margin:0 0 8px;font-size:22px">Your login code</h2>
        <p style="color:#B8BCC4;margin:0 0 24px;font-size:14px">Use this code to access your booking portal. Valid for 10 minutes.</p>
        <div style="background:#1B1E24;border:1px solid #C1662F;border-radius:6px;padding:20px;text-align:center;font-size:36px;letter-spacing:0.3em;font-weight:700;color:#E08A55">
          ${otp}
        </div>
        <p style="color:#9BA0A9;font-size:12px;margin:24px 0 0">If you didn't request this, ignore this email.</p>
      </div>
    `,
  });
}

async function sendBookingConfirmation(email, booking) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[Email] Booking confirmation for ${email}: #${booking.id}`);
    return;
  }
  await resend.emails.send({
    from:    FROM,
    to:      email,
    subject: `Booking confirmed — #${booking.id}`,
    html: `
      <div style="font-family:monospace;max-width:480px;margin:0 auto;padding:32px;background:#101216;color:#F4F1EA;border-radius:8px">
        <p style="color:#C1662F;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 16px">Sagar Electricals</p>
        <h2 style="margin:0 0 4px;font-size:20px">Booking Received</h2>
        <p style="color:#B8BCC4;font-size:13px;margin:0 0 24px">We'll contact you shortly to confirm the appointment.</p>
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <tr><td style="color:#9BA0A9;padding:6px 0;border-bottom:1px solid #1B1E24">Booking ID</td><td style="padding:6px 0;border-bottom:1px solid #1B1E24;text-align:right">#${booking.id}</td></tr>
          <tr><td style="color:#9BA0A9;padding:6px 0;border-bottom:1px solid #1B1E24">Name</td><td style="padding:6px 0;border-bottom:1px solid #1B1E24;text-align:right">${booking.name}</td></tr>
          <tr><td style="color:#9BA0A9;padding:6px 0;border-bottom:1px solid #1B1E24">Service</td><td style="padding:6px 0;border-bottom:1px solid #1B1E24;text-align:right">${booking.issueType}</td></tr>
          <tr><td style="color:#9BA0A9;padding:6px 0;border-bottom:1px solid #1B1E24">Address</td><td style="padding:6px 0;border-bottom:1px solid #1B1E24;text-align:right">${booking.address}</td></tr>
          <tr><td style="color:#9BA0A9;padding:6px 0">Status</td><td style="padding:6px 0;text-align:right;color:#C1662F">NEW</td></tr>
        </table>
        <p style="color:#9BA0A9;font-size:12px;margin:24px 0 0">Track your booking at <a href="${process.env.FRONTEND_URL || "https://sagar-electricals.vercel.app"}/portal" style="color:#E08A55">sagar-electricals.vercel.app/portal</a></p>
      </div>
    `,
  });
}

module.exports = { sendOTP, sendBookingConfirmation };
