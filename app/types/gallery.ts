import type { BreadcrumbItem } from "./innerPageBanner";

export interface GalleryItem {
  id: number;
  category: string;
  title: string;
  location?: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface GalleryPageData {
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
  allFilterLabel: string;
  items: GalleryItem[];
  cta: {
    eyebrow: string;
    title: string;
    description?: string;
    buttonLabel: string;
    buttonHref: string;
  };
}
