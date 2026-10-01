import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import Link from "next/link";
import { getPostBySlug, getPosts } from "@/lib/actions";
import { formatDate } from "@/lib/utils";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { BlogCard } from "@/components/blog/BlogCard";
import { MarkdownContent } from "@/lib/markdown";
import type { Post } from "@/types";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: post.ogImage ? [post.ogImage] : post.coverImage ? [post.coverImage] : [] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fetched = await getPostBySlug(slug);
  if (!fetched || fetched.status !== "published") notFound();
  const post: Post = fetched;
  const related = (await getPosts(20, post.category)).filter((item) => item.id !== post.id).slice(0, 3);
  const url = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/blog/${post.slug}`;

  return <main className="pb-20 pt-24">
    <div className="relative h-[44vh] min-h-[330px] overflow-hidden bg-gradient-to-br from-emerald-500/10 via-slate-950 to-indigo-500/10">
      {post.coverImage ? <img src={post.coverImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" /> : null}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent" />
    </div>
    <article className="relative z-10 mx-auto -mt-24 max-w-3xl px-4">
      <div className="rounded-3xl border border-white/10 bg-slate-900/95 p-7 shadow-2xl backdrop-blur-xl md:p-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white"><ArrowLeft size={15} /> All posts</Link>
        <div className="mt-7 flex flex-wrap items-center gap-3 text-xs text-slate-500"><span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300">{post.category}</span><span className="inline-flex items-center gap-1"><CalendarDays size={14} />{post.publishedAt ? formatDate(post.publishedAt) : ""}</span><span>{post.readTime} min read</span><span>{post.author}</span></div>
        <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">{post.title}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-400">{post.excerpt}</p>
        <div className="mt-8 border-y border-white/10 py-5"><ShareButtons url={url} title={post.title} /></div>
        <div className="prose prose-invert mt-10 max-w-none prose-headings:font-semibold prose-headings:text-white prose-p:text-slate-300 prose-p:leading-8 prose-a:text-emerald-400 prose-code:rounded prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-1 prose-blockquote:border-emerald-500 prose-blockquote:text-slate-400 prose-li:text-slate-300"><MarkdownContent content={post.content} /></div>
      </div>
    </article>
    {related.length ? <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8"><h2 className="text-3xl font-bold">Related <span className="text-gradient">Posts</span></h2><div className="mt-8 grid gap-7 lg:grid-cols-3">{related.map((item, index) => <BlogCard key={item.id} post={item} index={index} />)}</div></section> : null}
    <section className="mx-auto mt-20 max-w-3xl px-4"><div className="rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-500/10 to-indigo-500/10 p-8 text-center"><h3 className="text-2xl font-bold">Enjoyed this? Subscribe for more.</h3><p className="mt-3 text-slate-400">Occasional notes, experiments, and lessons from building.</p><Link href="/#newsletter" className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950">Back to the newsletter</Link></div></section>
  </main>;
}
