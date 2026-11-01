import type { BreadcrumbItem } from "./innerPageBanner";

export interface ProjectDetailSection {
  title: string;
  description: string;
  image: string;
}

export interface ProjectImpactMetric {
  value: string;
  label: string;
}

export interface ProjectDetail {
  lead: string;
  overview?: string[];
  highlights?: string[];
  impactMetrics?: ProjectImpactMetric[];
  quote: string;
  location?: string;
  timeline?: string;
  beneficiaries?: string;
  sections: ProjectDetailSection[];
}

export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  category: string;
  impact: string;
  location?: string;
  year?: string;
  tint: string;
  featured?: boolean;
  detail: ProjectDetail;
}

export interface ProjectPageData {
  hero: {
    image: string;
    badge?: string;
    title: string;
    description?: string;
    breadcrumbs?: BreadcrumbItem[];
  };
  projectDetailsHero: {
    image: string;
    badge?: string;
    title: string;
    description?: string;
    breadcrumbs?: BreadcrumbItem[];
  };
  intro: {
    badge: string;
    title: string;
    description: string;
  };
  cardLinkLabel: string;
  featuredLabel: string;
  projects: ProjectItem[];
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
  };
}
