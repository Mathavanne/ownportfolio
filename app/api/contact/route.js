import axios from "axios";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ✅ Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSKEY,
  },
});

// ✅ Helper: Send message via Telegram
async function sendTelegramMessage(token, chatId, text) {
  try {
    const res = await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
    });
    return res.data.ok;
  } catch (error) {
    console.error("Error sending Telegram message:", error.response?.data || error.message);
    return false;
  }
}

// ✅ HTML email template
function generateEmailTemplate(name, email, userMessage) {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #007BFF;">New Message Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
          ${userMessage}
        </blockquote>
        <p style="font-size: 12px; color: #888;">Click reply to respond to the sender.</p>
      </div>
    </div>
  `;
}

// ✅ Helper: Send email
async function sendEmail({ name, email, message: userMessage }, plainTextMessage) {
  const mailOptions = {
    from: `"Portfolio" <${process.env.EMAIL_ADDRESS}>`,
    to: process.env.EMAIL_ADDRESS,
    subject: `New Message From ${name}`,
    text: plainTextMessage,
    html: generateEmailTemplate(name, email, userMessage),
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error while sending email:", error.message);
    return false;
  }
}

// ✅ API Route
export async function POST(request) {
  try {
    const payload = await request.json();
    const { name, email, message: userMessage } = payload;

    if (!name || !email || !userMessage) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json(
        { success: false, message: "Telegram token or chat ID is missing." },
        { status: 500 }
      );
    }

    const plainTextMessage = `📩 New Portfolio Message\n\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Message:\n${userMessage}`;

    const telegramSuccess = await sendTelegramMessage(token, chatId, plainTextMessage);
    const emailSuccess = await sendEmail(payload, plainTextMessage);

    if (telegramSuccess) {
      return NextResponse.json(
        { success: true, message: "✅ Message sent successfully!" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "❌ Failed to send Telegram." },
      { status: 500 }
    );
  } catch (error) {
    console.error("API Error:", error.message);
    return NextResponse.json(
      { success: false, message: "❌ Server error occurred." },
      { status: 500 }
    );
  }
}
