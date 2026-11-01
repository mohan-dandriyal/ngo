import type { BreadcrumbItem } from "./innerPageBanner";
import type { SuccessStory } from "./programs";

export interface ImpactMetric {
  value: string;
  label: string;
  detail: string;
}

export interface FeaturedImpactStory {
  badge: string;
  title: string;
  location: string;
  quote: string;
  person: string;
  role: string;
  description: string[];
  image: string;
  imageAlt: string;
  metrics: { label: string; value: string }[];
}

export interface SuccessStoriesPageData {
  hero: {
    image: string;
    badge: string;
    title: string;
    description: string;
    breadcrumbs?: BreadcrumbItem[];
  };
  intro: {
    badge: string;
    title: string;
    description: string;
  };
  impactMetrics: ImpactMetric[];
  featuredStory: FeaturedImpactStory;
  stories: SuccessStory[];
  cta: {
    badge: string;
    title: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
  };
}
