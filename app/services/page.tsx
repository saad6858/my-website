import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTABanner } from "@/components/sections/CTABanner";
export const metadata={title:"Services",description:"AI assistants, customer-support and appointment automation, and connected web platforms."};
export default function ServicesPage(){return <main data-public-page="services" className="pt-20"><header className="services-page-hero relative isolate overflow-hidden border-b border-[var(--cine-border)] px-5 py-20 sm:px-8 md:py-32"><div className="services-page-hero__glow absolute inset-0 -z-10"/><div className="mx-auto max-w-[1320px]"><p className="font-mono text-[10px] uppercase tracking-[.24em] text-[var(--cine-accent)]">CAPABILITIES / 03</p><h1 className="mt-6 max-w-[12ch] text-[clamp(3.2rem,9vw,8rem)] font-semibold leading-[.86] tracking-[-.085em]">Tools are useful. <span className="text-gradient">Systems are better.</span></h1><p className="mt-7 max-w-2xl text-base leading-8 text-[var(--cine-muted)] sm:text-lg">AI assistants, workflow automation, customer support, booking flows, and web platforms—scoped around the real work your team needs to get done.</p></div></header><Services/><Process/><Pricing/><FAQ/><CTABanner/></main>}
