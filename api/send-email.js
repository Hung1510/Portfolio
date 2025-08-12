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
      console.error("Resend error:", error);
      return res.status(500).json({ error: error.message || "Email sending failed" });
    }

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: error.message || "Failed to send email" });
  }
}
