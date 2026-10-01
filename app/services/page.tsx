import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";
export const metadata={title:"Services",description:"AI systems, automation workflows, and polished web platforms."};
export default function ServicesPage(){return <main className="pt-24"><section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><p className="font-mono text-xs uppercase tracking-[.25em] text-emerald-400">CAPABILITIES</p><h1 className="mt-5 text-5xl font-black md:text-7xl">Services</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">From workflow design to production deployment, every build starts with the problem behind the feature.</p></section><Services/><Process/><Pricing/><FAQ/><CTABanner/></main>}
