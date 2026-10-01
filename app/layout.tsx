import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { SiteSettingsProvider } from "@/components/providers/SiteSettingsProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { CustomCursorGate } from "@/components/animations/CustomCursorGate";
import { PageTracking } from "@/components/analytics/PageTracking";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["300", "400", "500", "600", "700", "800", "900"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", weight: ["400", "500"] });

export const metadata: Metadata = {
  title: { default: "my-platform", template: "%s | my-platform" },
  description: "A premium personal brand platform for AI, automation, systems, and building in public.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  openGraph: { title: "my-platform", description: "AI, automation, systems, and building in public.", type: "website" },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="dark">
    <body className={`${inter.variable} ${mono.variable} bg-bg-primary text-text-primary antialiased overflow-x-hidden`}>
      <AuthProvider><SiteSettingsProvider><ThemeProvider><PageTracking /><AnnouncementBar /><ScrollProgress /><CustomCursorGate /><Navbar />{children}<Footer /></ThemeProvider></SiteSettingsProvider></AuthProvider>
    </body>
  </html>;
}
