export interface HeroSlide {
  id: number;
  badge: string;
  image: string;
  line1: string;
  line2: string;
  line3: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface StatItem {
  end: number;
  suffix: string;
  label: string;
  description?: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  location?: string;
  avatar: string;
  quote: string;
}

export interface SectionHeaderContent {
  badge: string;
  title: string;
  description: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export interface HomePageData {
  heroSlides: HeroSlide[];
  heroStats: StatItem[];
  statsSection: {
    badge: string;
    title: string;
    description: string;
    stats: StatItem[];
  };
  worksSection: SectionHeaderContent;
  blogSection: SectionHeaderContent;
  testimonialsSection: {
    badge: string;
    title: string;
    description: string;
    rating: string;
    supportersCount: string;
  };
  testimonials: TestimonialItem[];
  ctaSection: {
    badge: string;
    title: string;
    description: string;
    primaryButton: { label: string; href: string };
    secondaryButton: { label: string; href: string };
  };
}
