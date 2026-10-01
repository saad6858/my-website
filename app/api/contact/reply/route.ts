import { NextResponse } from "next/server";
import { Resend } from "resend";
import { adminAdd, adminGet } from "@/lib/admin-db";
import { requireAdminApi } from "@/lib/server-auth";
import type { ContactReply, ContactSubmission } from "@/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    await requireAdminApi();
    const body = await req.json().catch(() => ({}));
    const contactId = String(body.contactId ?? "").trim();
    const message = String(body.message ?? "").trim();
    if (!contactId || !message) return NextResponse.json({ error: "Contact and message are required." }, { status: 400 });
    if (message.length > 10000) return NextResponse.json({ error: "Reply is too long." }, { status: 400 });

    const contact = await adminGet<ContactSubmission>("contact_submissions", contactId);
    if (!contact?.email) return NextResponse.json({ error: "Contact email not found." }, { status: 404 });

    let provider: ContactReply["provider"] = "log";
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    if (apiKey && from) {
      const resend = new Resend(apiKey);
      const result = await resend.emails.send({
        from,
        to: contact.email,
        subject: "Re: Your message",
        text: message,
        html: `<div style="font-family:Inter,Arial,sans-serif;line-height:1.7;white-space:pre-wrap">${escapeHtml(message)}</div>`,
      });
      if (result.error) return NextResponse.json({ error: result.error.message }, { status: 502 });
      provider = "resend";
    }

    const id = await adminAdd("contact_replies", { contactId, recipient: contact.email, message, sentAt: new Date(), provider } satisfies Omit<ContactReply, "id">);
    return NextResponse.json({ success: true, id, provider });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to send reply." }, { status: 500 });
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char] as string);
}
