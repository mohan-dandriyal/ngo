import type { BreadcrumbItem } from "./innerPageBanner";

export type ContactIcon = "mail" | "phone" | "location";

export interface ContactDetail {
  icon: ContactIcon;
  label: string;
  value: string;
  subtext?: string;
  href: string;
}

export interface ContactReason {
  value: string;
  label: string;
}

export interface ContactPageData {
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
  contactDetails: ContactDetail[];
  officeHours: {
    badge: string;
    title: string;
    schedule: string;
    note: string;
  };
  form: {
    eyebrow: string;
    title: string;
    description?: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    reasonLabel: string;
    reasons: ContactReason[];
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    successTitle: string;
    successDescription: string;
    resetLabel: string;
  };
}
