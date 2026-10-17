export interface ProjectItem {
    slug: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    category: string;
    impact: string;
    tint: string;
    featured?: boolean;
    detail: ProjectDetail;
}

export interface ProjectDetail {
    lead: string;
    quote: string;
    sections: { title: string; description: string; image: string }[];
}

export interface ProjectPageData {
    hero: { image: string; title: string };
    intro: { badge: string; title: string; description: string };
    cardLinkLabel: string;
    featuredLabel: string;
    projects: ProjectItem[];
    cta: { eyebrow: string; title: string; description: string; buttonLabel: string; buttonHref: string };
}
