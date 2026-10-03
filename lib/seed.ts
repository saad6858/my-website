import { adminDb } from "./firebase-admin";
import { defaultSiteSettings } from "./site-defaults";
import { slugify } from "./utils";
import type { DocumentData } from "firebase-admin/firestore";

const now = new Date();

export const seedServices = [
  {
    title: "Workflow Automation",
    description: "Turn repetitive business processes into reliable systems with APIs, webhooks, notifications, and human handoffs.",
    icon: "Workflow",
    features: ["Process mapping", "API + webhook integrations", "Workflow orchestration", "Notifications + handoffs", "Maintenance-ready architecture"],
    price: "Custom",
    cta: "Discuss a Workflow",
    enabled: true,
    sortOrder: 1,
  },
  {
    title: "Agentic AI Systems",
    description: "Design multi-step AI workflows that research, reason, transform, and hand off work with clear guardrails.",
    icon: "BrainCircuit",
    features: ["Agent orchestration", "Tool calling", "Knowledge workflows", "Human-in-the-loop controls", "Observability + fallbacks"],
    price: "Custom",
    cta: "Plan an AI System",
    enabled: true,
    sortOrder: 2,
  },
  {
    title: "AI-Powered Web Platforms",
    description: "Build polished web products where AI, analytics, dashboards, and operations work together as one experience.",
    icon: "Bot",
    features: ["Next.js applications", "Admin dashboards", "Firebase backends", "Analytics + SEO", "Production deployment"],
    price: "Custom",
    cta: "Build a Platform",
    enabled: true,
    sortOrder: 3,
  },
];

export const defaultSettings = { ...defaultSiteSettings, updatedAt: now };

const posts = [
  {
    title: "Building in Public Without a Blueprint",
    slug: slugify("Building in Public Without a Blueprint"),
    excerpt: "What changes when you document the process instead of pretending you had a perfect plan.",
    content: "## Build, test, document\n\nA public build is useful because it turns learning into a trail of decisions, experiments, and lessons.\n\n## Keep the trail useful\n\nShow the constraints, the trade-offs, and the parts that still need work. The point is not to look finished; it is to make the work understandable.",
    category: "Learning Journey",
    tags: ["learning", "building in public"],
    status: "published",
    publishedAt: now,
    scheduledAt: null,
    author: "Admin",
    readTime: 3,
    views: 0,
    likes: 0,
    metaTitle: "Building in Public Without a Blueprint",
    metaDescription: "Notes on learning, building, and documenting the process.",
    ogImage: "",
    featured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    title: "Good Automation Starts With the Workflow",
    slug: slugify("Good Automation Starts With the Workflow"),
    excerpt: "Automation is rarely about adding more tools. It is about removing unnecessary handoffs.",
    content: "## Start with the workflow\n\nMap the human steps, inputs, outputs, failure states, and only then choose the automation primitives.\n\n## Design the exception path\n\nA workflow that works only on the happy path is a demo. Build the place where a human can review, override, retry, or stop the system.",
    category: "Automation",
    tags: ["automation", "workflows"],
    status: "published",
    publishedAt: now,
    scheduledAt: null,
    author: "Admin",
    readTime: 3,
    views: 0,
    likes: 0,
    metaTitle: "Good Automation Starts With the Workflow",
    metaDescription: "Why workflow design should come before tool selection.",
    ogImage: "",
    featured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    title: "AI Features vs AI Systems",
    slug: slugify("AI Features vs AI Systems"),
    excerpt: "A feature answers a narrow request. A system coordinates work across steps, data, and decisions.",
    content: "## Feature to system\n\nA durable AI system needs clear interfaces, permissions, observability, fallbacks, and room to evolve.\n\n## The interface matters\n\nOnce multiple agents, tools, or people interact, the quality of the handoff becomes part of the product.",
    category: "Agentic AI",
    tags: ["agentic AI", "systems"],
    status: "published",
    publishedAt: now,
    scheduledAt: null,
    author: "Admin",
    readTime: 3,
    views: 0,
    likes: 0,
    metaTitle: "AI Features vs AI Systems",
    metaDescription: "Understanding the architectural difference between AI features and systems.",
    ogImage: "",
    featured: false,
    createdAt: now,
    updatedAt: now,
  },
];

const portfolio = [
  {
    title: "Agentic Research Workspace",
    location: "Remote",
    category: "Agentic AI",
    description: "A modular workspace for research, synthesis, and publishing workflows.",
    coverImage: "",
    gallery: [],
    videoUrl: "",
    tech: ["Next.js", "Firebase", "Agentic AI"],
    status: "in_progress",
    featured: true,
    date: now,
  },
  {
    title: "Lead Operations Dashboard",
    location: "Remote",
    category: "Automation",
    description: "A CRM-style workspace for leads, follow-ups, notes, and reporting.",
    coverImage: "",
    gallery: [],
    videoUrl: "",
    tech: ["Next.js", "Firestore", "Automation"],
    status: "complete",
    featured: true,
    date: now,
  },
  {
    title: "Content Systems Lab",
    location: "Remote",
    category: "Automation",
    description: "A content planning system designed around repeatable creation and publishing flows.",
    coverImage: "",
    gallery: [],
    videoUrl: "",
    tech: ["Next.js", "Markdown"],
    status: "planned",
    featured: false,
    date: now,
  },
];

const leads = [
  { name: "Example Contact", agency: "Example Company", phone: "", email: "", source: "website", status: "new", dateContacted: now, dateFollowUp: now, notes: "Demo data. Replace from the dashboard.", messages: [], interest: "Automation", budgetQuoted: 0, createdAt: now, updatedAt: now },
  { name: "Example Recruiter", agency: "Example Studio", phone: "", email: "", source: "linkedin", status: "contacted", dateContacted: now, dateFollowUp: now, notes: "Demo data.", messages: [], interest: "Web platform", budgetQuoted: 0, createdAt: now, updatedAt: now },
];

const transactions = [
  { type: "expense", amount: 0, category: "software", description: "Example software cost", date: now, createdAt: now },
  { type: "expense", amount: 0, category: "hosting", description: "Example hosting cost", date: now, createdAt: now },
];

const content = [
  { title: "Launch note", type: "blog", status: "idea", platform: "Website", content: "Write a launch note about the new platform.", scheduledDate: null, publishedDate: null, url: "", engagement: { views: 0, likes: 0, comments: 0, shares: 0 }, createdAt: now, updatedAt: now },
  { title: "What I learned building this", type: "linkedin", status: "draft", platform: "LinkedIn", content: "Draft a post about a real architecture lesson.", scheduledDate: null, publishedDate: null, url: "", engagement: { views: 0, likes: 0, comments: 0, shares: 0 }, createdAt: now, updatedAt: now },
  { title: "Automation principle", type: "twitter", status: "idea", platform: "X", content: "A concise systems lesson.", scheduledDate: null, publishedDate: null, url: "", engagement: { views: 0, likes: 0, comments: 0, shares: 0 }, createdAt: now, updatedAt: now },
];

export async function seedDatabase() {
  const report: Record<string, number> = {};
  const settingsRef = adminDb.collection("site_settings").doc("main");
  if (!(await settingsRef.get()).exists) {
    await settingsRef.set(defaultSettings);
    report.site_settings = 1;
  }
  const collections: Record<string, DocumentData[]> = {
  services: seedServices,
  posts,
  portfolio,
  leads,
  transactions,
  content_calendar: content,
};
  for (const [collection, items] of Object.entries(collections)) {
    const exists = !(await adminDb.collection(collection).limit(1).get()).empty;
    if (exists) continue;
    for (const item of items) await adminDb.collection(collection).add(item);
    report[collection] = items.length;
  }
  return report;
}
