import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Log env vars to make sure they're set on Vercel
  console.log("RESEND_API_KEY is set:", !!process.env.RESEND_API_KEY);
  console.log("RESEND_SENDER:", process.env.RESEND_SENDER);

  const { name, email, message } = req.body;

  // Validate inputs
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields: name, email, or message" });
  }

  try {
    const response = await resend.emails.send({
      from: process.env.RESEND_SENDER || "onboarding@resend.dev",
      to: "giahung1510200519@gmail.com",
      subject: `New Message from ${name} at ${new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    console.log("Email sent successfully:", response);

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    // Log the full error so we can see what’s wrong
    console.error("Error sending email:", error);

    // Try to get a meaningful error message
    const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "Failed to send email";

    return res.status(500).json({ error: errorMessage });
  }
}
