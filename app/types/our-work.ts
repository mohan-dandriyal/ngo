import type { BreadcrumbItem } from "./innerPageBanner";

export interface OurWorkCard {
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  buttonLabel: string;
  tint: string;
  metric?: string;
}

export interface WorkPillar {
  number: string;
  title: string;
  description: string;
  stat: string;
}

export interface OurWorkPageData {
  hero: {
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
  pillars: WorkPillar[];
  cards: OurWorkCard[];
  cta: {
    eyebrow: string;
    title: string;
    description?: string;
    buttonLabel: string;
    buttonHref: string;
  };
}
