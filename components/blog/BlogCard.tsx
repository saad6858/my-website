"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Post } from "@/types";
import { formatDate } from "@/lib/utils";
export function BlogCard({post,index=0}:{post:Post;index?:number}){return <motion.article initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.1}} transition={{delay:index*.08}}><Link href={`/blog/${post.slug}`} className="group block overflow-hidden rounded-2xl border border-white/10 bg-slate-900/55 backdrop-blur-xl"><div className="relative aspect-[16/10] overflow-hidden bg-slate-800">{post.coverImage?<Image src={post.coverImage} alt={post.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105"/>:<div className="h-full w-full bg-gradient-to-br from-emerald-500/15 to-indigo-500/15"/>}<span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs text-emerald-300">{post.category}</span></div><div className="p-6"><h3 className="text-xl font-semibold text-white transition group-hover:text-emerald-300">{post.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">{post.excerpt}</p><div className="mt-5 flex items-center justify-between text-xs text-slate-500"><span>{post.publishedAt?formatDate(post.publishedAt):""} · {post.readTime} min</span><span className="inline-flex items-center gap-1 text-emerald-400">Read More <ArrowUpRight size={14}/></span></div></div></Link></motion.article>}
