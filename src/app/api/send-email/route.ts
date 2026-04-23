import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { profile } from "@/data/portfolio";
import dns from "dns/promises";

/**
 * Verify that the email domain has valid MX (mail exchange) records,
 * meaning the domain actually exists and can receive emails.
 */
async function isEmailDomainValid(email: string): Promise<boolean> {
  try {
    const domain = email.split("@")[1];
    if (!domain) return false;

    const mxRecords = await dns.resolveMx(domain);
    return mxRecords.length > 0;
  } catch {
    return false;
  }
}

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

    // Verify the sender's email domain actually exists
    const domainValid = await isEmailDomainValid(trimmedEmail);
    if (!domainValid) {
      return NextResponse.json(
        { error: "This email domain does not exist. Please enter a valid email address." },
        { status: 400 }
      );
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
        // Gmail forces authenticated email as "from", but we set the display
        // name so you can immediately see who sent the message.
        from: `${trimmedName} via Portfolio <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: `${trimmedName} <${trimmedEmail}>`,
        subject: `Portfolio Message from ${trimmedName} (${trimmedEmail})`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px 20px; text-align: center;">
              <h2 style="color: #fff; margin: 0; font-size: 20px;">📬 New Portfolio Message</h2>
            </div>
            <div style="padding: 24px 20px;">
              <div style="background-color: #f0f4ff; padding: 16px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #667eea;">
                <p style="margin: 0 0 8px; font-size: 14px; color: #555;"><strong>👤 From:</strong> ${safeName}</p>
                <p style="margin: 0; font-size: 14px; color: #555;"><strong>📧 Email:</strong> <a href="mailto:${safeEmail}" style="color: #667eea;">${safeEmail}</a></p>
              </div>
              <div style="background-color: #fafafa; padding: 16px; border-radius: 8px; border: 1px solid #eee;">
                <p style="margin: 0 0 8px; font-size: 14px; color: #333;"><strong>💬 Message:</strong></p>
                <p style="white-space: pre-wrap; color: #555; margin: 0; font-size: 14px; line-height: 1.6;">${safeMessage}</p>
              </div>
            </div>
            <div style="background-color: #f9f9f9; padding: 12px 20px; text-align: center; border-top: 1px solid #eee;">
              <p style="font-size: 11px; color: #aaa; margin: 0;">Sent from your portfolio website · Hit reply to respond directly to ${safeName}</p>
            </div>
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
