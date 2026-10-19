import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogDetailsLayout from "@/app/components/blog/BlogDetailsLayout";

import blog from "@/app/data/blog.json";
import type { Blog } from "@/app/types/blog";
import { Suspense } from "react";
import Loading from "@/app/components/ui/Loading";

const posts = blog.blog as Blog[];

type PageProps = { params: Promise<{ slug: string }> };

// Must live in page.tsx: Next ignores generateStaticParams in any other file.
// Pre-builds one page per post in blog.json.
export function generateStaticParams() {
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = posts.find((p) => p.slug === slug);

    if (!post) return { title: "Story not found" };

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: { title: post.title, description: post.excerpt, images: [post.image] },
    };
}

async function BlogDetailsPageContent({ params }: PageProps) {
    const { slug } = await params;

    // Check here, before anything is rendered, so an unknown slug returns a real 404 status
    if (!posts.some((p) => p.slug === slug)) notFound();

    return (
        <BlogDetailsLayout slug={slug} />
    );
}

function BlogDetailsPage({ params }: PageProps) {
    return (
        <Suspense fallback={<Loading />}>
            <BlogDetailsPageContent params={params} />
        </Suspense>
    );
}

export default BlogDetailsPage;
