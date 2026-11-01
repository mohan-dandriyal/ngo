import type { BreadcrumbItem } from "./innerPageBanner";

export interface Blog {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole?: string;
  publishedAt: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export interface BlogCardProps {
  blog: Blog;
  index?: number;
}

export interface DetailSection {
  image: string;
  title: string;
  description: string;
}

export interface BlogDetail {
  postDate?: string;
  profile?: string;
  authorRole?: string;
  lead?: string;
  quote?: string;
  keyTakeaways?: string[];
  sections: DetailSection[];
}

export interface BlogPageData {
  hero: {
    image: string;
    badge?: string;
    heroTitle: string;
    description?: string;
    breadcrumbs?: BreadcrumbItem[];
  };
  blogDetailsHero: {
    image: string;
    badge?: string;
    heroTitle: string;
    description?: string;
    breadcrumbs?: BreadcrumbItem[];
  };
  intro: {
    badge: string;
    title: string;
    description: string;
    searchPlaceholder: string;
    allPostsLabel: string;
    emptyTitle: string;
    emptyDescription: string;
    resetLabel: string;
  };
  blog: Blog[];
  blogDetails: Record<string, BlogDetail>;
}
