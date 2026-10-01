import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#030712",
        "bg-secondary": "#0f172a",
        "bg-tertiary": "#1e293b",
        "bg-card": "rgba(15, 23, 42, 0.8)",
        "accent-primary": "#10b981",
        "accent-secondary": "#34d399",
        "accent-tertiary": "#f59e0b",
        "accent-quaternary": "#6366f1",
        "text-primary": "#f8fafc",
        "text-secondary": "#94a3b8",
        "text-muted": "#64748b",
        border: "#334155",
        "border-light": "#475569",
        danger: "#ef4444",
        success: "#22c55e",
        warning: "#f59e0b"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      spacing: { section: "clamp(4rem, 8vw, 8rem)", container: "1280px", gap: "1.5rem" },
      borderRadius: { card: "1rem", button: "0.75rem", input: "0.5rem" },
      boxShadow: { glow: "0 0 40px rgba(16, 185, 129, 0.15)" },
      animation: {
        "fade-in": "fade-in 0.8s cubic-bezier(0.16,1,0.3,1) both",
        "slide-up": "slide-up 0.8s cubic-bezier(0.16,1,0.3,1) both",
        "scale-in": "scale-in 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        aurora: "aurora 20s linear infinite",
        "mesh-gradient": "mesh-gradient 30s ease-in-out infinite",
        float: "float 8s ease-in-out infinite",
        "bounce-slow": "bounce-slow 2.5s ease-in-out infinite"
      },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "slide-up": { from: { opacity: "0", transform: "translateY(40px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "scale-in": { from: { opacity: "0", transform: "scale(0.92)" }, to: { opacity: "1", transform: "scale(1)" } },
        "glow-pulse": { "0%,100%": { boxShadow: "0 0 0 rgba(16,185,129,0)" }, "50%": { boxShadow: "0 0 40px rgba(16,185,129,.16)" } },
        shimmer: { "0%": { backgroundPosition: "200% 0" }, "100%": { backgroundPosition: "-200% 0" } },
        aurora: { "0%": { transform: "translate3d(-5%, -2%, 0) rotate(0deg)" }, "50%": { transform: "translate3d(4%, 2%, 0) rotate(180deg)" }, "100%": { transform: "translate3d(-5%, -2%, 0) rotate(360deg)" } },
        "mesh-gradient": { "0%,100%": { transform: "translate3d(0,0,0) scale(1)" }, "50%": { transform: "translate3d(2%,-2%,0) scale(1.05)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
        "bounce-slow": { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(8px)" } }
      }
    }
  },
  plugins: []
};

export default config;
