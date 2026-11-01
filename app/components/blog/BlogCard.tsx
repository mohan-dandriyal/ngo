"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowUpRight, FiClock } from "react-icons/fi";
import type { Blog } from "@/app/types/blog";

interface BlogCardProps {
  blog: Blog;
  index?: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export default function BlogCard({ blog, index = 0 }: BlogCardProps) {
  const reduceMotion = useReducedMotion();

  const card: Variants = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: EASE,
        delay: reduceMotion ? 0 : (index % 2) * 0.1,
      },
    },
  };

  return (
    <motion.article
      variants={card}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#0f291e]/10 bg-white text-[#0f291e] shadow-xs transition-shadow duration-300 hover:shadow-xl hover:shadow-[#0f291e]/10"
    >
      {/* Image */}
      <div className="relative aspect-16/10 overflow-hidden bg-[#0f291e]">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#0f291e] shadow-xs">
          {blog.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-medium text-[#0f291e]/65">
          <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <FiClock size={12} className="text-[#d96b43]" />
            {blog.readTime}
          </span>
        </div>

        <h3 className="font-display mt-3 text-2xl font-semibold leading-snug tracking-tight text-[#0f291e] transition-colors group-hover:text-[#d96b43]">
          <Link
            href={`/blog/${blog.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0f291e]"
          >
            {blog.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 text-base leading-relaxed text-[#0f291e]/75">
          {blog.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-[#0f291e]/10 pt-5 mt-6">
          <div>
            <p className="text-sm font-bold text-[#0f291e]">{blog.author}</p>
            {blog.authorRole && (
              <p className="text-xs text-[#0f291e]/60">{blog.authorRole}</p>
            )}
          </div>

          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e6efea] text-[#0f291e] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#d96b43] group-hover:text-white"
          >
            <FiArrowUpRight size={17} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
