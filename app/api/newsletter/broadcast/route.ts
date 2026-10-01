import { NextResponse } from "next/server";
import { Resend } from "resend";
import { adminAdd } from "@/lib/admin-db";
import { requireAdminApi } from "@/lib/server-auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    await requireAdminApi();
    const body = await req.json().catch(() => ({}));
    const subject = typeof body.subject === "string" ? body.subject.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const recipients = Array.isArray(body.recipients) ? body.recipients : [];
    const cleanRecipients = [...new Set(recipients
      .filter((email): email is string => typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      .map((email) => email.trim().toLowerCase()))].slice(0, 500);

    if (!subject || !message || !cleanRecipients.length) return NextResponse.json({ error: "Subject, message, and at least one valid recipient are required." }, { status: 400 });
    if (subject.length > 200 || message.length > 30000) return NextResponse.json({ error: "Broadcast content is too long." }, { status: 400 });

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    if (!apiKey || !from) return NextResponse.json({ error: "Email sending is not configured. Add RESEND_API_KEY and RESEND_FROM_EMAIL." }, { status: 503 });

    const resend = new Resend(apiKey);
    let sent = 0;
    const failed: Array<{ email: string; error: string }> = [];
    for (let i = 0; i < cleanRecipients.length; i += 8) {
      const batch = cleanRecipients.slice(i, i + 8);
      const results = await Promise.all(batch.map(async (email) => {
        try {
          const result = await resend.emails.send({ from, to: email, subject, text: message, html: `<div style="font-family:Inter,Arial,sans-serif;line-height:1.7;white-space:pre-wrap">${escapeHtml(message)}</div>` });
          if (result.error) throw new Error(result.error.message);
          return { email, ok: true as const };
        } catch (error) {
          return { email, ok: false as const, error: error instanceof Error ? error.message : "Unknown email error" };
        }
      }));
      for (const result of results) {
        if (result.ok) sent += 1;
        else failed.push({ email: result.email, error: result.error });
      }
    }

    const id = await adminAdd("broadcasts", { subject, recipientsCount: cleanRecipients.length, sentCount: sent, failedCount: failed.length, createdAt: new Date(), status: failed.length ? "partial" : "sent" });
    return NextResponse.json({ success: failed.length === 0, id, sent, failedCount: failed.length, failed: failed.slice(0, 20) }, { status: failed.length ? 207 : 200 });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to send broadcast." }, { status: 500 });
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char] as string);
}
