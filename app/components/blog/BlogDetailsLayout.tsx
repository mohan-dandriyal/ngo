import { notFound } from "next/navigation";

import blog from "@/app/data/blog.json";
import BlogDetails from "@/app/components/blog/BlogDetails";
import type { Blog, BlogDetail } from "@/app/types/blog";
import InnerPagesBanner from "../layouts/InnerPageBanner";

const posts = blog.blog as Blog[];
const blogDetails = blog.blogDetails as Record<string, BlogDetail>;

interface BlogDetailsLayoutProps {
    slug: string;
}

export default async function BlogDetailsLayout({ slug }: BlogDetailsLayoutProps) {
    const index = posts.findIndex((p) => p.slug === slug);

    // The page already checks this; kept as a safety net if the component is used elsewhere
    if (index === -1) notFound();

    const post = posts[index];

    // Previous / next stories wrap around, and are hidden when there is only one post
    const prev = posts.length > 1 ? posts[(index - 1 + posts.length) % posts.length] : null;
    const next = posts.length > 1 ? posts[(index + 1) % posts.length] : null;

    return (
        <>
        <InnerPagesBanner image={blog?.blogDetailsHero?.image}>
           {blog?.blogDetailsHero?.heroTitle}
        </InnerPagesBanner>
        <BlogDetails post={post} prev={prev} next={next} detail={blogDetails[slug]} />
        </>
    );
}
