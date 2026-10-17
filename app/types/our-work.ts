export interface OurWorkCard {
    label: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    href: string;
    buttonLabel: string;
    tint: string;
}

export interface OurWorkPageData {
    hero: { image: string; title: string };
    intro: { badge: string; title: string; description: string };
    cards: OurWorkCard[];
    cta: { eyebrow: string; title: string; buttonLabel: string; buttonHref: string };
}
