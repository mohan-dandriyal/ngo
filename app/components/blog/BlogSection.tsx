"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import blogData from "@/app/data/blog.json";
import BlogCard from "@/app/components/blog/BlogCard";
import type { BlogPageData } from "@/app/types/blog";
import MainContainer from "@/app/components/ui/MainContainer";
import { SectionBadge, SectionDescription, SectionTitle } from "../SectionHeader";

const data = blogData as BlogPageData;
const posts = data.blog;
const allLabel = data.intro.allPostsLabel || "All Posts";
const categories = [
  allLabel,
  ...Array.from(new Set(posts.map((post) => post.category))),
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BlogSection() {
  const reduce = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState(allLabel);
  const [search, setSearch] = useState("");

  const filteredBlogs = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === allLabel || post.category === activeCategory;

      const matchesSearch =
        !searchText ||
        post.title.toLowerCase().includes(searchText) ||
        post.excerpt.toLowerCase().includes(searchText) ||
        post.category.toLowerCase().includes(searchText) ||
        post.author.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const stagger = (gap: number, delay = 0): Variants => ({
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : gap, delayChildren: delay },
    },
  });

  const floatIn: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
  };

  return (
    <main className="bg-[#faf8f5] text-[#0f291e]">
      <section
        id="all-posts"
        className="py-18"
        aria-labelledby="latest-heading"
      >
        <MainContainer>
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <motion.div variants={floatIn} className="max-w-3xl">
              <SectionBadge>{data.intro.badge}</SectionBadge>
              <SectionTitle id="latest-heading">{data.intro.title}</SectionTitle>
              <SectionDescription>{data.intro.description}</SectionDescription>
            </motion.div>

            <motion.label
              variants={floatIn}
              className="flex w-full items-center gap-3 rounded-full border border-[#0f291e]/15 bg-white px-5 py-3.5 shadow-xs transition-all duration-300 focus-within:border-[#2d6a4f] focus-within:ring-4 focus-within:ring-[#2d6a4f]/10 lg:max-w-xs"
            >
              <FiSearch
                aria-hidden="true"
                size={18}
                className="shrink-0 text-[#0f291e]/55"
              />
              <span className="sr-only">Search articles</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={data.intro.searchPlaceholder}
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#0f291e]/45"
              />
            </motion.label>
          </motion.div>

          {/* Category filters */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            {categories.map((category) => {
              const selected = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={selected}
                  className={`relative cursor-pointer rounded-full px-5 py-2.5 text-sm font-bold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f291e] ${
                    selected
                      ? "bg-[#0f291e] text-white shadow-sm"
                      : "border border-[#0f291e]/12 bg-white text-[#0f291e] hover:bg-[#e6efea]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Blog cards (3 in one row) */}
          {filteredBlogs.length > 0 ? (
            <motion.div
              layout
              className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredBlogs.map((post, index) => (
                  <motion.div
                    key={post.id}
                    layout={!reduce}
                    exit={{
                      opacity: reduce ? 1 : 0,
                      scale: reduce ? 1 : 0.95,
                      transition: { duration: 0.25 },
                    }}
                  >
                    <BlogCard blog={post} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="mt-10 rounded-3xl border border-[#0f291e]/10 bg-[#e6efea] px-6 py-16 text-center">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-[#0f291e]">
                {data.intro.emptyTitle}
              </h3>
              <p className="mt-2 text-sm text-[#0f291e]/75">
                {data.intro.emptyDescription}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory(allLabel);
                }}
                className="mt-6 cursor-pointer rounded-full bg-[#0f291e] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#d96b43]"
              >
                {data.intro.resetLabel}
              </button>
            </div>
          )}
        </MainContainer>
      </section>
    </main>
  );
}
