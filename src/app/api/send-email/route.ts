import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { profile } from "@/data/portfolio";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    const trimmedName = String(name ?? "").trim();
    const trimmedEmail = String(email ?? "").trim();
    const trimmedMessage = String(message ?? "").trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const safeName = escapeHtml(trimmedName);
      const safeEmail = escapeHtml(trimmedEmail);
      const safeMessage = escapeHtml(trimmedMessage);

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: trimmedEmail,
        subject: `New Message from Portfolio: ${trimmedName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #333; text-align: center;">New Portfolio Message</h2>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>Email:</strong> ${safeEmail}</p>
            </div>
            <div style="background-color: #fff; padding: 15px; border: 1px solid #eee; border-radius: 5px;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; color: #555;">${safeMessage}</p>
            </div>
            <p style="font-size: 12px; color: #888; text-align: center; margin-top: 30px;">Sent from your portfolio website</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);

      return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
    }

    const formData = new URLSearchParams();
    formData.append("name", trimmedName);
    formData.append("email", trimmedEmail);
    formData.append("message", trimmedMessage);
    formData.append("_replyto", trimmedEmail);
    formData.append("_subject", `Portfolio message from ${trimmedName}`);
    formData.append("_template", "table");

    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(profile.contacts.email)}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: formData.toString(),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`FormSubmit returned ${response.status}`);
    }

    return NextResponse.json(
      {
        message:
          "Message sent successfully. If this is the first live submission, please confirm the activation email once.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
