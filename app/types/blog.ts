import { ReactNode } from "react";


export interface innerPagesBannerProps {
    image: string,
    children: ReactNode
}

export interface Blog {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    publishedAt: string;
    readTime: string;
    image: string;
    featured?: boolean;
}

export interface BlogCardProps {
    blog: Blog;
    index?: number;
}

/** One image with its own title and small description */
export interface DetailSection {
    image: string;
    title: string;
    description: string;
}
 
/** Extra data for the details page, stored in blog.json under blogDetails and keyed by the post's slug */
export interface BlogDetail {
    postDate?: string;
    profile?: string;
    lead?: string;
    quote?: string;
    sections: DetailSection[];
}
 
