export interface GalleryItem {
    id: number;
    category: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
}

export interface GalleryPageData {
    hero: { image: string; title: string };
    intro: { badge: string; title: string; description: string };
    allFilterLabel: string;
    items: GalleryItem[];
    cta: { eyebrow: string; title: string; buttonLabel: string; buttonHref: string };
}
