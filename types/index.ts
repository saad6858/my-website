import type { FieldValue, Timestamp } from "firebase/firestore";

export type DateLike = Date | Timestamp | FieldValue;

export type SiteVersion = "v1-dark" | "v2-paper" | "v3-swiss" | "v4-studio" | "v5-blueprint";

export type LeadSource = "zameen" | "facebook" | "instagram" | "referral" | "website" | "linkedin" | "other";
export type LeadStatus = "new" | "contacted" | "replied" | "sample_sent" | "negotiating" | "converted" | "lost" | "follow_up";
export type ProjectStatus = "pending" | "in_progress" | "review" | "delivered" | "paid" | "cancelled";
export type PostStatus = "draft" | "published" | "scheduled";
export type ContentStatus = "idea" | "draft" | "scheduled" | "published";

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: "admin" | "visitor";
  createdAt: Date;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export interface SiteSettings {
  id: string;
  siteVersion: SiteVersion;
  brand: {
    name: string;
    tagline: string;
    logoText: string;
  };
  sections: {
    hero: boolean;
    about: boolean;
    services: boolean;
    portfolio: boolean;
    blog: boolean;
    contact: boolean;
    stats: boolean;
    process: boolean;
    pricing: boolean;
    testimonials: boolean;
    faq: boolean;
  };
  appearance: {
    accentColor: string;
    fontFamily: string;
    enableCustomCursor: boolean;
    enableParticles: boolean;
    enableAurora: boolean;
    enableMeshGradient: boolean;
  };
  announcement: {
    enabled: boolean;
    text: string;
    link: string;
    bgColor: string;
    textColor: string;
  };
  seo: {
    title: string;
    description: string;
    ogImage: string;
    keywords: string;
    robots: string;
  };
  pricing: {
    currency: string;
    tiers: PricingTier[];
  };
  contact: {
    whatsapp: string;
    email: string;
    location: string;
    linkedin: string;
    github: string;
    twitter: string;
  };
  notifications: {
    emailEnabled: boolean;
    newLead: boolean;
    newContact: boolean;
    dailySummary: boolean;
    notificationEmail: string;
  };
  whatsappTemplates: {
    outreach: string;
    followUp: string;
    sampleResponse: string;
    pricingResponse: string;
  };
  stats: Array<{ id: string; value: string; label: string }>;
  updatedAt: Date;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  status: PostStatus;
  publishedAt: Date | null;
  scheduledAt: Date | null;
  author: string;
  readTime: number;
  views: number;
  likes: number;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lead {
  id: string;
  name: string;
  agency: string;
  phone: string;
  email: string;
  source: LeadSource;
  status: LeadStatus;
  dateContacted: Date;
  dateFollowUp: Date;
  notes: string;
  messages: Array<{ text: string; date: Date; direction: "outbound" | "inbound" }>;
  interest: string;
  budgetQuoted: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  projectName: string;
  projectDescription: string;
  status: ProjectStatus;
  price: number;
  amountPaid: number;
  progress: number;
  notes: string;
  dateStarted: Date | null;
  dateDelivered: Date | null;
  dateDue: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: "project_payment" | "software" | "equipment" | "marketing" | "hosting" | "education" | "other";
  description: string;
  clientName?: string;
  projectId?: string;
  date: Date;
  createdAt: Date;
}

export interface ContentItem {
  id: string;
  title: string;
  type: "blog" | "linkedin" | "instagram" | "whatsapp_status" | "twitter";
  status: ContentStatus;
  platform: string;
  content: string;
  scheduledDate: Date | null;
  publishedDate: Date | null;
  url: string;
  engagement: { views: number; likes: number; comments: number; shares: number };
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  date: Date;
}

export interface ContactReply {
  id: string;
  contactId: string;
  recipient: string;
  message: string;
  sentAt: Date;
  provider: "resend" | "log";
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string;
  status: "active" | "unsubscribed";
  date: Date;
}

export interface PageView {
  id: string;
  page: string;
  sessionId: string;
  userAgent: string;
  timestamp: Date;
  durationMs?: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price: string;
  cta: string;
  badge?: string;
  enabled: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  location: string;
  category: string;
  description: string;
  coverImage: string;
  gallery: string[];
  videoUrl: string;
  tech: string[];
  status: "complete" | "in_progress" | "planned";
  featured: boolean;
  date: Date;
}

export interface FileRecord {
  id: string;
  publicId: string;
  secureUrl: string;
  resourceType: "image" | "video" | "raw";
  format: string;
  bytes: number;
  originalFilename: string;
  folder: string;
  width?: number;
  height?: number;
  createdAt: Date;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  rating: number;
  enabled: boolean;
}
