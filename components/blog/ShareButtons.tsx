"use client";

import { Check, Copy, Send } from "lucide-react";
import { useState } from "react";

function LinkedInIcon({ size = 17 }: { size?: number }) {
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

export function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex items-center gap-2">
      <a
        aria-label="Share on LinkedIn"
        target="_blank"
        rel="noreferrer"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`}
        className="rounded-xl border border-white/10 bg-white/[.03] p-3 text-slate-300 hover:text-white"
      >
        <LinkedInIcon />
      </a>

      <a
        aria-label="Share on X"
        target="_blank"
        rel="noreferrer"
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}`}
        className="rounded-xl border border-white/10 bg-white/[.03] p-3 text-slate-300 hover:text-white"
      >
        <span className="text-sm font-bold">X</span>
      </a>

      <a
        aria-label="Share on WhatsApp"
        target="_blank"
        rel="noreferrer"
        href={`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`}
        className="rounded-xl border border-white/10 bg-white/[.03] p-3 text-slate-300 hover:text-white"
      >
        <Send size={17} />
      </a>

      <button
        onClick={copy}
        className="relative rounded-xl border border-white/10 bg-white/[.03] p-3 text-slate-300 hover:text-white"
      >
        {copied ? <Check size={17} /> : <Copy size={17} />}

        {copied ? (
          <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs text-white">
            Copied!
          </span>
        ) : null}
      </button>
    </div>
  );
}