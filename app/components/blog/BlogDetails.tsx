"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowLeft, FiArrowUpRight, FiClock, FiShare2 } from "react-icons/fi";

import MainContainer from "@/app/components/ui/MainContainer";
import type { Blog, BlogDetail } from "@/app/types/blog";

interface BlogDetailsProps {
    post: Blog;
    prev: Blog | null;
    next: Blog | null;
    detail?: BlogDetail;
}

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

    const rise: Variants = {
        hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
    };

    const cardVisibility: Variants = {
        hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
    };

    return (
        <main className=" pb-20 pt-8 text-[#0b1635] md:pb-32 md:pt-12">
            <MainContainer>
                <motion.div initial="hidden" animate="show" variants={rise} className="mx-6 mb-10 md:mx-0">
                    <Link href="/blog" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#476451] transition-colors hover:text-[#0b1635] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b1635]">
                        <FiArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
                        Back to all stories
                    </Link>
                </motion.div>

                <article className=" mx-1 px-4 overflow-hidden rounded-[2rem] py-6 border border-[#0b1635]/10 shadow-[0_24px_70px_rgba(11,22,53,0.08)] md:mx-0">
                    <header className="grid lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="flex flex-col justify-center p-2  md:p-12 lg:p-16">
                            <motion.span variants={rise} initial="hidden" animate="show" className="text-xs font-bold uppercase tracking-[0.22em] text-[#71927b]">{post.category}</motion.span>

                            <motion.h1 variants={rise} initial="hidden" animate="show" className="mt-5 text-4xl font-black leading-[1.03] tracking-[-0.04em] md:text-6xl">{post.title}</motion.h1>

                            <motion.p variants={rise} initial="hidden" animate="show" className="mt-7 text-base leading-7 text-[#0b1635]/65">{detail?.lead || post.excerpt}
                            </motion.p>

                            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#0b1635]/10 pt-5 text-xs font-medium text-[#0b1635]/60">
                                <span>{formatDate(post.publishedAt)}
                                </span>
                                <span>By {post.author}</span>
                                <span className="inline-flex items-center gap-1.5">
                                    <FiClock />
                                    {post.readTime}
                                </span>
                            </div>
                        </div>

                        <div className="relative min-h-[22rem] bg-[#dcebdd] lg:min-h-[35rem]">
                            <Image src={post.image} alt={post.title} fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                            <div className="absolute inset-0 bg-linear-to-t from-[#0b1635]/35 to-transparent" />
                        </div>
                    </header>

                    <div className="grid gap-12 p-0 md:p-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-20 lg:p-16">
                        <div>
                            <p className="text-xl font-semibold leading-8 tracking-tight md:text-2xl md:leading-9">
                                {post.excerpt}
                            </p>

                            <div className="mt-10 space-y-12">
                                {sections.map((section, index) => (
                                    <motion.section key={section.title} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={cardVisibility}>
                                        <div className="mb-5 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-[#71927b]">
                                            <span>0{index + 1}</span><span className="h-px flex-1 bg-[#71927b]/30" />
                                        </div>
                                        <div className="grid overflow-hidden rounded-2xl border border-[#0b1635]/10 bg-[#f5f7f2] md:grid-cols-[0.9fr_1.1fr]">
                                            <div className="relative min-h-60">
                                                <Image src={section.image} alt={section.title} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                                            </div>
                                            <div className="p-7 md:p-9">
                                                <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{section.title}

                                                </h2>
                                                <p className="mt-4 leading-7 text-[#0b1635]/70">{section.description}</p>
                                            </div>
                                        </div>
                                    </motion.section>
                                ))}
                            </div>
                            {detail?.quote && <blockquote className="mt-12 border-l-4 border-[#71927b] bg-[#e9f2e6] px-6 py-5 text-lg font-semibold italic leading-8 text-[#385340] md:px-8">“{detail.quote}”</blockquote>}
                        </div>

                        <aside className="lg:border-l lg:border-[#0b1635]/10 lg:pl-8">
                            <div className="sticky top-8 space-y-6">
                                <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#71927b]">In this story</p><p className="mt-3 text-sm leading-6 text-[#0b1635]/65">A closer look at the people, moments and small decisions behind the impact.</p></div>
                                <div className="flex items-center gap-3 border-t border-[#0b1635]/10 pt-5 text-sm font-semibold"><FiShare2 /> Share this story</div>
                            </div>
                        </aside>
                    </div>
                </article>

                {(prev || next) && (
                    <nav aria-label="More stories" className="mx-6 mt-16 grid gap-4 sm:grid-cols-2 md:mx-0 md:mt-24 md:gap-5">
                        {[
                            { story: prev, label: "Previous story" },
                            { story: next, label: "Next story" },
                        ].map(({ story, label }) => story && (
                            <motion.div key={label} variants={cardVisibility} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="">
                                <Link href={`/blog/${story.slug}`} className="group relative block min-h-100 overflow-hidden rounded-2xl border border-[#0b1635]/10 bg-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b1635]">
                                    <Image src={story.image} alt="" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#0b1635]/90 via-[#0b1635]/25 to-transparent" />
                                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">{label}</p>
                                            <h2 className="mt-2 line-clamp-2 text-xl font-extrabold leading-snug">{story.title}</h2>
                                        </div>
                                        <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0b1635] transition-transform duration-300 group-hover:rotate-45">
                                            <FiArrowUpRight size={20} />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </nav>
                )}
            </MainContainer>
        </main>
    );
}
