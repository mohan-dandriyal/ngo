import { ReactNode } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface innerPagesBannerProps {
  children: ReactNode;
  image: string;
  badge?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
}
