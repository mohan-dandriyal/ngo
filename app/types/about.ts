import type { BreadcrumbItem } from "./innerPageBanner";

export interface aboutSection {
  image: string;
  badge: string;
  title: string;
  description: string | string[];
  highlights?: string[];
  buttonText?: string;
  profileImage?: string;
  name?: string;
  role?: string;
  experienceYears?: string;
  experienceLabel?: string;
}

export interface WhereBeganSection {
  image_left: string;
  image_right: string;
  badge: string;
  title: string;
  description: string | string[];
  image_left_alt: string;
  image_left_title: string;
  image_left_description: string;
  image_right_alt: string;
  image_right_title: string;
  image_right_description: string;
}

export interface MissionVisionSection {
  image: string;
  imageAlt: string;
  visionImage?: string;
  visionImageAlt?: string;
  mission: {
    badge: string;
    title: string;
    description: string | string[];
    points?: string[];
  };
  vision: {
    badge: string;
    title: string;
    description: string | string[];
    points?: string[];
  };
}

export interface CoreValueItem {
  number: string;
  title: string;
  description: string;
}

export interface AboutBanner {
  aboutBannerTitle: string;
  aboutBannerSubtitle?: string;
  aboutBannerImage: string;
  breadcrumbs?: BreadcrumbItem[];
}
