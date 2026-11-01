import type { BreadcrumbItem } from "./innerPageBanner";

export interface CauseDetailSection {
  title: string;
  description: string;
  image: string;
}

export interface CauseImpactMetric {
  value: string;
  label: string;
}

export interface CauseDetail {
  lead: string;
  overview: string[];
  quote: string;
  location: string;
  timeline: string;
  beneficiaries: string;
  highlights: string[];
  impactMetrics?: CauseImpactMetric[];
  sections: CauseDetailSection[];
}

export interface CauseItem {
  slug: string;
  title: string;
  category: string;
  location: string;
  impact: string;
  supporters: string;
  urgency: string;
  image: string;
  imageAlt: string;
  description: string;
  tint: string;
  featured?: boolean;
  detail: CauseDetail;
}

export interface CausesPageData {
  hero: {
    image: string;
    badge: string;
    title: string;
    description: string;
    breadcrumbs?: BreadcrumbItem[];
  };
  causeDetailsHero: {
    image: string;
    badge: string;
    title: string;
    description: string;
    breadcrumbs?: BreadcrumbItem[];
  };
  homeSection: {
    badge: string;
    title: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
  };
  intro: {
    badge: string;
    title: string;
    description: string;
  };
  cardLinkLabel: string;
  featuredLabel: string;
  causes: CauseItem[];
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
  };
}
