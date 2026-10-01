import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
export const metadata={title:"Contact",description:"Start a conversation about your AI, automation, or web platform project."};
export default function ContactPage(){return <main className="pt-24"><section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><p className="font-mono text-xs uppercase tracking-[.25em] text-emerald-400">START HERE</p><h1 className="mt-5 text-5xl font-black md:text-7xl">Get in <span className="text-gradient">Touch</span></h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">Have a problem worth solving? Send the context and I’ll take it from there.</p></section><Contact/><FAQ/></main>}
