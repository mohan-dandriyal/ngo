"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { FiSearch } from "react-icons/fi";

import blogData from "@/app/data/blog.json";
import BlogCard from "@/app/components/blog/BlogCard";
import type { Blog } from "@/app/types/blog";
import MainContainer from "@/app/components/ui/MainContainer";
import { SectionBadge, SectionTitle } from "../SectionHeader";

const {  blog: posts } = blogData as { hero: typeof blogData.hero; blog: Blog[] };

// Computed once: the data is static, so there is no need for useMemo or console.log here
const categories = ["All Posts", ...Array.from(new Set(posts.map((post) => post.category)))];
const featuredBlog = posts.find((post) => post.featured);

// Smooth "expo-out" curve shared by all entrance animations
const EASE = [0.22, 1, 0.36, 1] as const;

/** Soft watercolor wash built from layered radial gradients (same as the other sections) */
const watercolor = (base: string, a: string, b: string) =>
    `radial-gradient(60% 55% at 15% 20%, ${a} 0%, transparent 70%),
   radial-gradient(55% 60% at 85% 75%, ${b} 0%, transparent 70%),
   radial-gradient(40% 40% at 70% 15%, ${a} 0%, transparent 75%),
   ${base}`;

const tealWash = watercolor("#cfe4e0", "#dcefe9", "#bcd6dc");

export default function BlogSection() {
    const reduce = useReducedMotion();
    const [activeCategory, setActiveCategory] = useState("All Posts");
    const [search, setSearch] = useState("");

    const filteredBlogs = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        return posts.filter((post) => {
            const matchesCategory = activeCategory === "All Posts" || post.category === activeCategory;

            const matchesSearch =
                !searchText ||
                post.title.toLowerCase().includes(searchText) ||
                post.excerpt.toLowerCase().includes(searchText) ||
                post.category.toLowerCase().includes(searchText) ||
                post.author.toLowerCase().includes(searchText);

            return matchesCategory && matchesSearch && post.id !== featuredBlog?.id;
        });
    }, [activeCategory, search]);

    const stagger = (gap: number, delay = 0): Variants => ({
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : gap, delayChildren: delay } },
    });

    const floatIn: Variants = {
        hidden: {
            opacity: reduce ? 1 : 0,
            y: reduce ? 0 : 40,
            filter: reduce ? "blur(0px)" : "blur(8px)",
        },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
    };

    return (
        <main className="min-h-screen bg-white text-[#0b1635]">
        
            {/* All posts */}
            <section id="all-posts" className="py-16 sm:py-20 md:py-28" aria-labelledby="latest-heading">
                <MainContainer>
                    <div className="px-6 md:px-0">
                        <motion.div
                            variants={stagger(0.12)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.3 }}
                            className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between"
                        >
                            <motion.div variants={floatIn}>
                                <SectionBadge>All Posts</SectionBadge>

                                <SectionTitle>
                                    Latest Articles
                                </SectionTitle>
                            </motion.div>

                            <motion.label
                                variants={floatIn}
                                className="flex w-full items-center gap-3 rounded-full border border-[#0b1635]/15 bg-white px-5 py-3 transition-shadow duration-300 focus-within:border-[#0b1635] focus-within:shadow-md lg:max-w-xs"
                            >
                                <FiSearch aria-hidden="true" size={18} className="shrink-0 text-[#0b1635]/60" />

                                <span className="sr-only">Search articles</span>

                                <input
                                    type="search"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search stories..."
                                    className="w-full bg-transparent text-sm outline-none placeholder:text-[#0b1635]/50"
                                />
                            </motion.label>
                        </motion.div>

                        {/* Category filters */}
                        <div className="flex flex-wrap gap-3 py-8">
                            {categories.map((category) => {
                                const selected = activeCategory === category;

                                return (
                                    <motion.button
                                        key={category}
                                        type="button"
                                        onClick={() => setActiveCategory(category)}
                                        aria-pressed={selected}
                                        whileTap={reduce ? undefined : { scale: 0.95 }}
                                        className={`relative rounded-full px-4 py-3 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b1635] sm:px-5 sm:py-4 sm:text-base ${
                                            selected ? "text-white" : "bg-[#e9f2e6] text-[#0b1635] hover:bg-[#d6e8dc]"
                                        }`}
                                    >
                                        {selected && (
                                            <motion.span
                                                layoutId="blog-tab"
                                                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                                                className="absolute inset-0 rounded-full bg-[#0b1635]"
                                            />
                                        )}
                                        <span className="relative">{category}</span>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Blog cards */}
                        {filteredBlogs.length > 0 ? (
                            <motion.div layout className="mt-8 space-y-8 sm:mt-10 sm:space-y-10 md:mt-12 md:space-y-12">
                                <AnimatePresence mode="popLayout">
                                    {filteredBlogs.map((post, index) => (
                                        <motion.div
                                            key={post.id}
                                            layout={!reduce}
                                            exit={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.92, transition: { duration: 0.3 } }}
                                        >
                                            <BlogCard blog={post} index={index} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <div className="rounded-2xl px-6 py-16 text-center" style={{ background: tealWash }}>
                                <h3 className="text-2xl font-extrabold tracking-tight">No stories found</h3>

                                <p className="mt-3 text-sm text-[#0b1635]/80">
                                    Try another search term or choose a different category.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch("");
                                        setActiveCategory("All Posts");
                                    }}
                                    className="mt-6 rounded-full border border-[#0b1635] px-6 py-2.5 text-sm font-medium transition-colors duration-300 hover:bg-[#0b1635] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b1635]"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>
                </MainContainer>
            </section>

            {/* Call to action */}
            {/* <section className="pb-6 pt-4 md:pb-8" aria-labelledby="blog-cta-heading">
                <MainContainer>
                    <motion.div
                        variants={stagger(0.12)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className="mx-6 flex flex-col items-center rounded-2xl px-6 py-16 text-center md:mx-0 md:py-24"
                        style={{ background: tealWash }}
                    >
                        <motion.span
                            variants={floatIn}
                            className="inline-flex items-center gap-2 rounded-full border border-[#0b1635]/15 bg-white px-4 py-1.5 text-sm font-medium shadow-sm"
                        >
                            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#0b1635]" />
                            Never miss a story
                        </motion.span>

                        <motion.h2
                            variants={floatIn}
                            id="blog-cta-heading"
                            className="mt-5 text-4xl tracking-tight md:text-6xl"
                        >
                            Stay in the loop
                        </motion.h2>

                        <motion.p variants={floatIn} className="mx-auto mt-5 max-w-lg text-xl leading-7 text-[#0b1635]/80">
                            Fresh stories, impact reports and updates from the people your support helps.
                        </motion.p>

                        <motion.div variants={floatIn} className="mt-8">
                            <PrimaryButton href="#all-posts">
                                <div className="flex items-center gap-2">
                                    Explore articles
                                    <FiArrowUpRight
                                        aria-hidden="true"
                                        className="text-xl transition-transform duration-300 group-hover:rotate-45"
                                    />
                                </div>
                            </PrimaryButton>
                        </motion.div>
                    </motion.div>
                </MainContainer>
            </section> */}
        </main>
    );
}
