"use client";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { Portfolio } from "@/components/sections/Portfolio";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { Testimonials } from "@/components/sections/Testimonials";
import { useSiteSettings } from "@/hooks/useSiteSettings";
export default function Home(){const {settings,loading}=useSiteSettings();if(loading)return <div className="min-h-screen"/>;return <main>{settings.sections.hero?<Hero/>:null}{settings.sections.stats?<Stats/>:null}{settings.sections.about?<About/>:null}{settings.sections.services?<Services/>:null}{settings.sections.process?<Process/>:null}{settings.sections.pricing?<Pricing/>:null}{settings.sections.portfolio?<Portfolio/>:null}{settings.sections.testimonials?<Testimonials/>:null}{settings.sections.blog?<Blog/>:null}{settings.sections.faq?<FAQ/>:null}{settings.sections.contact?<Contact/>:null}</main>}
