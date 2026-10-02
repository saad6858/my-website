"use client";

import Link from "next/link";
import { ArrowUp, Mail, Send, MessageCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { FadeIn } from "@/components/animations/FadeIn";

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V8.99h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.59 0 4.25 2.36 4.25 5.43v6.32ZM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.13ZM3.56 20.45h3.56V8.99H3.56v11.46Z" />
    </svg>
  );
}

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.22.7-3.9-1.37-3.9-1.37-.53-1.35-1.3-1.71-1.3-1.71-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.04 1.77 2.73 1.26 3.4.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.29-5.27-5.75 0-1.27.45-2.31 1.2-3.12-.12-.3-.52-1.47.11-3.07 0 0 .98-.31 3.2 1.19a11.09 11.09 0 0 1 5.82 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.6.23 2.77.11 3.07.75.81 1.2 1.85 1.2 3.12 0 4.47-2.71 5.46-5.29 5.74.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function Footer() {
  const { settings } = useSiteSettings();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const r = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (r.ok) {
      setDone(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative border-t border-white/5 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-20 flex flex-col justify-between gap-8 rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-500/10 via-transparent to-indigo-500/10 p-8 md:flex-row md:items-end md:p-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-[.25em] text-emerald-400">
                Let’s build
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-bold md:text-5xl">
                Let’s build something extraordinary.
              </h2>
            </div>

            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Start a conversation <Send size={17} />
            </Link>
          </div>
        </FadeIn>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-xl font-black text-gradient">
              {settings.brand.name}
            </div>

            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-400">
              A personal brand platform for AI, automation, systems, learning,
              and building in public.
            </p>

            <div className="mt-5 flex gap-3">
              {settings.contact.linkedin ? (
                <a
                  aria-label="LinkedIn"
                  href={settings.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/10 p-2 text-slate-400 hover:text-white"
                >
                  <LinkedInIcon />
                </a>
              ) : null}

              {settings.contact.github ? (
                <a
                  aria-label="GitHub"
                  href={settings.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/10 p-2 text-slate-400 hover:text-white"
                >
                  <GithubIcon />
                </a>
              ) : null}

              {settings.contact.twitter ? (
                <a
                  aria-label="X / Twitter"
                  href={settings.contact.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/10 p-2 text-slate-400 hover:text-white"
                >
                  <span className="text-xs font-bold">X</span>
                </a>
              ) : null}

              {settings.contact.whatsapp ? (
                <a
                  aria-label="WhatsApp"
                  href={`https://wa.me/${settings.contact.whatsapp.replace(
                    /[^0-9]/g,
                    ""
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/10 p-2 text-slate-400 hover:text-white"
                >
                  <MessageCircle size={16} />
                </a>
              ) : null}

              {settings.contact.email ? (
                <a
                  aria-label="Email"
                  href={`mailto:${settings.contact.email}`}
                  className="rounded-lg border border-white/10 p-2 text-slate-400 hover:text-white"
                >
                  <Mail size={16} />
                </a>
              ) : null}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">Explore</h3>

            <div className="mt-4 space-y-3 text-sm text-slate-400">
              {[
                ["/about", "About", "about"],
                ["/services", "Services", "services"],
                ["/portfolio", "Portfolio", "portfolio"],
                ["/blog", "Blog", "blog"],
                ["/contact", "Contact", "contact"],
              ]
                .filter(
                  ([, , k]) =>
                    settings.sections[k as keyof typeof settings.sections]
                )
                .map(([h, l]) => (
                  <Link
                    className="block hover:text-white"
                    key={h}
                    href={h}
                  >
                    {l}
                  </Link>
                ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">Focus</h3>

            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <p>AI systems</p>
              <p>Workflow automation</p>
              <p>Web platforms</p>
              <p>Cloud engineering</p>
            </div>
          </div>

          <div id="newsletter">
            <h3 className="font-semibold text-white">Newsletter</h3>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Occasional notes on building, learning, and shipping.
            </p>

            <form onSubmit={subscribe} className="mt-4 flex gap-2">
              <input
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-slate-600 focus:border-emerald-500/50"
              />

              <button className="rounded-xl bg-white px-3 py-2 text-slate-950 hover:bg-emerald-300">
                {done ? "✓" : "Go"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/5 pt-6 text-xs text-slate-500 md:flex-row">
          <p>
            © 2026 {settings.brand.name}. Built with Next.js, Firebase, and AI.
          </p>

          <button
            onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 self-start hover:text-white"
          >
            <ArrowUp size={14} /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}