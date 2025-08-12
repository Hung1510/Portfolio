// pages/api/send-email.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_SENDER || "onboarding@resend.dev",
      to: "giahung1510200519@gmail.com",
      subject: `New Message from ${name} at ${new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
}
