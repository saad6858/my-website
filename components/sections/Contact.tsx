"use client";

import { FormEvent, useState } from "react";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function Contact() {
  const { settings } = useSiteSettings();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "Workflow Automation", message: "" });
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("loading");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to send message");
      setState("done");
      setForm({ name: "", email: "", phone: "", service: "Workflow Automation", message: "" });
      window.setTimeout(() => setState("idle"), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send message");
      setState("idle");
    }
  };

  return (
    <SectionWrapper id="contact">
      <Container>
        <SectionLabel text="CONTACT" />
        <h2 className="mt-5 text-4xl font-bold md:text-5xl">
          Let’s Work <span className="text-gradient">Together</span>
        </h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div className="space-y-7">
            <p className="max-w-md leading-8 text-slate-400">
              Tell me what you’re trying to build, automate, or improve. I’ll turn the first conversation into a clear next step.
            </p>
            <div className="space-y-5">
              {settings.contact.whatsapp ? (
                <a href={`https://wa.me/${settings.contact.whatsapp.replace(/[^0-9]/g, "")}`} className="flex gap-4 text-slate-300 transition hover:text-white">
                  <MessageCircle className="text-emerald-400" />
                  <span>{settings.contact.whatsapp}</span>
                </a>
              ) : null}
              {settings.contact.email ? (
                <a href={`mailto:${settings.contact.email}`} className="flex gap-4 text-slate-300 transition hover:text-white">
                  <Mail className="text-emerald-400" />
                  <span>{settings.contact.email}</span>
                </a>
              ) : null}
              {settings.contact.location ? (
                <div className="flex gap-4 text-slate-300">
                  <MapPin className="text-emerald-400" />
                  <span>{settings.contact.location}</span>
                </div>
              ) : null}
            </div>
            <div className="flex gap-3 pt-2">
              {settings.contact.linkedin ? <a aria-label="LinkedIn" href={settings.contact.linkedin} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-400 transition hover:border-emerald-500/30 hover:text-emerald-300">in</a> : null}
              {settings.contact.github ? <a aria-label="GitHub" href={settings.contact.github} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-400 transition hover:border-emerald-500/30 hover:text-emerald-300">GH</a> : null}
              {settings.contact.twitter ? <a aria-label="X / Twitter" href={settings.contact.twitter} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-400 transition hover:border-emerald-500/30 hover:text-emerald-300">X</a> : null}
            </div>
          </div>

          <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-slate-900/55 p-6 backdrop-blur-xl md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm text-slate-400">Name
                <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.03] px-4 py-3 text-white outline-none focus:border-emerald-500/50" />
              </label>
              <label className="text-sm text-slate-400">Email
                <input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.03] px-4 py-3 text-white outline-none focus:border-emerald-500/50" />
              </label>
              <label className="text-sm text-slate-400">Phone
                <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.03] px-4 py-3 text-white outline-none focus:border-emerald-500/50" />
              </label>
              <label className="text-sm text-slate-400">Service
                <select value={form.service} onChange={(event) => setForm({ ...form, service: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none">
                  <option>Workflow Automation</option>
                  <option>Agentic AI Systems</option>
                  <option>AI-Powered Web Platforms</option>
                  <option>Other</option>
                </select>
              </label>
            </div>
            <label className="mt-5 block text-sm text-slate-400">Message
              <textarea required minLength={10} rows={7} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-white/[.03] px-4 py-3 text-white outline-none focus:border-emerald-500/50" />
            </label>
            {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
            <MagneticButton className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 font-semibold text-slate-950 hover:bg-emerald-400">
              {state === "loading" ? "Sending…" : state === "done" ? "Message Sent ✓" : <>Send Message <Send size={17} /></>}
            </MagneticButton>
          </form>
        </div>
      </Container>
    </SectionWrapper>
  );
}
