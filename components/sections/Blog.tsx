"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { BlogCard } from "@/components/blog/BlogCard";
import type { Post } from "@/types";
export function Blog(){const [posts,setPosts]=useState<Post[]>([]);useEffect(()=>{fetch("/api/posts?limit=3",{cache:"no-store"}).then(r=>r.ok?r.json():[]).then(setPosts).catch(()=>{})},[]);if(!posts.length)return null;return <SectionWrapper id="blog"><Container><SectionLabel text="BLOG"/><h2 className="mt-5 text-4xl font-bold md:text-5xl">Insights & <span className="text-gradient">Journey</span></h2><p className="mt-4 max-w-2xl text-slate-400">Thoughts on AI, systems, technology, and building in public.</p><div className="mt-10 grid gap-7 lg:grid-cols-3">{posts.map((p,i)=><BlogCard key={p.id} post={p} index={i}/>)}</div><div className="mt-10"><Link href="/blog" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5">View All Posts <ArrowRight size={16}/></Link></div></Container></SectionWrapper>}
