import { About } from "@/components/sections/About";
import { CTABanner } from "@/components/sections/CTABanner";
export const metadata={title:"About",description:"The story, systems thinking, and technical journey behind my-platform."};
export default function AboutPage(){return <main className="pt-24"><section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><p className="font-mono text-xs uppercase tracking-[.25em] text-emerald-400">THE PERSON BEHIND THE PLATFORM</p><h1 className="mt-5 text-5xl font-black md:text-7xl">About <span className="text-gradient">Me</span></h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">A student-builder learning in public and turning the lessons into real software.</p></section><About/><CTABanner/></main>}
