"use client";

import Image from "next/image";
import Link from "next/link";
import { Oswald } from "next/font/google";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowLeft, FiArrowUpRight, FiClock, FiMoreVertical, FiUser } from "react-icons/fi";

import type { Blog, BlogDetail } from "@/app/types/blog";

interface BlogDetailsProps {
    post: Blog;
    prev: Blog | null;
    next: Blog | null;
    detail?: BlogDetail;
}

// Condensed heading face, as in the reference design
const heading = Oswald({ subsets: ["latin"], weight: ["400", "500", "600"] });

const EASE = [0.22, 1, 0.36, 1] as const;

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    });

export default function BlogDetails({ post, prev, next, detail }: BlogDetailsProps) {
    const reduce = useReducedMotion();
    const sections = detail?.sections ?? [];
    const author = detail?.profile || post.author;
    const publishedAt = detail?.postDate || post.publishedAt;

    // The pull quote sits between sections, after the first one
    const quoteAfter = sections.length > 1 ? 0 : sections.length - 1;

    const reveal: Variants = {
        hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
    };

    const share = async () => {
        try {
            if (navigator.share) {
                await navigator.share({ title: post.title, url: window.location.href });
            } else {
                await navigator.clipboard.writeText(window.location.href);
            }
        } catch {
            /* user cancelled or clipboard blocked */
        }
    };

    const quote = detail?.quote && (
        <motion.blockquote
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={reveal}
            className="my-12 border-l border-[#0b1635] pl-4 sm:my-14"
        >
            <p className="text-lg leading-8 text-[#0b1635] sm:text-xl">“{detail.quote}”</p>
            <cite className="mt-3 block text-sm not-italic text-[#0b1635]/70">{author}</cite>
        </motion.blockquote>
    );

    return (
        <main className="min-h-screen bg-[#fafafa] text-[#0b1635]">
            <div className="mx-auto w-full max-w-2xl px-5 pb-20 pt-12 sm:px-8 sm:pt-16 md:pb-32 md:pt-20">
                <motion.div initial="hidden" animate="show" variants={reveal}>
                    <Link
                        href="/blog"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-[#476451] transition-colors hover:text-[#0b1635] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b1635]"
                    >
                        <FiArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
                        Back to all stories
                    </Link>

                    {/* Meta row: avatar, author, date, read time, share menu */}
                    <div className="mt-10 flex items-center justify-between gap-4 sm:mt-12">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#0b1635]/70">
                            <span
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d9d9d9] text-white"
                                aria-hidden="true"
                            >
                                <FiUser className="text-lg" />
                            </span>
                            <span className="ml-1 font-medium text-[#0b1635]">{author}</span>
                            <span aria-hidden="true">·</span>
                            <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
                            <span aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1">
                                <FiClock aria-hidden="true" />
                                {post.readTime}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={share}
                            aria-label="Share this story"
                            className="rounded-full p-2 text-[#0b1635]/70 transition-colors hover:bg-[#0b1635]/5 hover:text-[#0b1635] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b1635]"
                        >
                            <FiMoreVertical aria-hidden="true" />
                        </button>
                    </div>

                    <p className="mt-4 text-xs font-medium text-[#0b1635]/60">Updated: {formatDate(publishedAt)}</p>

                    <h1
                        className={`${heading.className} mt-3 text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl md:text-5xl`}
                    >
                        {post.title}
                    </h1>

                    <p className="mt-5 text-sm leading-6 text-[#0b1635]/85 sm:text-base sm:leading-7">
                        {detail?.lead || post.excerpt}
                    </p>

                    <div className="relative mt-6 aspect-[3/2] w-full overflow-hidden bg-[#e6e6e6] sm:mt-8">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            priority
                            sizes="(min-width: 768px) 672px, 100vw"
                            className="object-cover"
                        />
                    </div>
                </motion.div>

                {/* Story sections */}
                <div className="mt-10 sm:mt-12">
                    {sections.map((section, index) => (
                        <div key={section.title}>
                            <motion.section
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={reveal}
                                className={index > 0 ? "mt-10 sm:mt-12" : undefined}
                            >
                                <h2
                                    className={`${heading.className} text-xl font-medium leading-tight tracking-tight sm:text-2xl`}
                                >
                                    {section.title}
                                </h2>

                                <p className="mt-3 text-sm leading-6 text-[#0b1635]/85 sm:text-base sm:leading-7">
                                    {section.description}
                                </p>

                                {section.image && (
                                    <div className="relative mt-5 aspect-[3/2] w-full overflow-hidden bg-[#e6e6e6]">
                                        <Image
                                            src={section.image}
                                            alt={section.title}
                                            fill
                                            sizes="(min-width: 768px) 672px, 100vw"
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                            </motion.section>

                            {index === quoteAfter && quote}
                        </div>
                    ))}

                    {/* No sections: still show the quote */}
                    {sections.length === 0 && quote}
                </div>

                {(prev || next) && (
                    <nav
                        aria-label="More stories"
                        className="mt-16 grid gap-4 border-t border-[#0b1635]/10 pt-8 sm:grid-cols-2 sm:gap-6 sm:pt-10"
                    >
                        {[
                            { story: prev, label: "Previous story" },
                            { story: next, label: "Next story" },
                        ].map(
                            ({ story, label }) =>
                                story && (
                                    <Link
                                        key={label}
                                        href={`/blog/${story.slug}`}
                                        className="group rounded-xl border border-[#0b1635]/10 bg-white p-4 transition-colors hover:bg-[#f0f0f0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b1635]"
                                    >
                                        <span className="text-xs font-semibold text-[#71927b]">{label}</span>
                                        <span className="mt-2 flex items-start justify-between gap-3 text-base font-medium leading-snug">
                                            {story.title}
                                            <FiArrowUpRight
                                                className="mt-0.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </Link>
                                )
                        )}
                    </nav>
                )}
            </div>
        </main>
    );
}