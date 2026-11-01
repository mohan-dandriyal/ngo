import type { BreadcrumbItem } from "./innerPageBanner";

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  location: string;
  experience: string;
  image: string;
  imageAlt: string;
  bio: string;
  quote: string;
}

export interface TeamMoment {
  id: number;
  title: string;
  category: string;
  location: string;
  image: string;
  imageAlt: string;
  caption: string;
}

export interface VolunteerRole {
  id: string;
  title: string;
  commitment: string;
  location: string;
  description: string;
}

export interface VolunteerBenefit {
  number: string;
  title: string;
  description: string;
}

export interface VolunteerPageData {
  hero: {
    image: string;
    badge: string;
    title: string;
    description: string;
    breadcrumbs?: BreadcrumbItem[];
  };
  teamSection: {
    badge: string;
    title: string;
    description: string;
    members: TeamMember[];
  };
  momentsSection: {
    badge: string;
    title: string;
    description: string;
    moments: TeamMoment[];
  };
  benefitsSection: {
    badge: string;
    title: string;
    description: string;
    benefits: VolunteerBenefit[];
  };
  rolesSection: {
    badge: string;
    title: string;
    description: string;
    roles: VolunteerRole[];
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
  };
}
