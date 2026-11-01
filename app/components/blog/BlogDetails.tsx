"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiShare2,
  FiUser,
} from "react-icons/fi";
import MainContainer from "../ui/MainContainer";
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

export default function BlogDetails({
  post,
  prev,
  next,
  detail,
}: BlogDetailsProps) {
  const reduce = useReducedMotion();
  const sections = detail?.sections ?? [];
  const author = detail?.profile || post.author;
  const authorRole = detail?.authorRole || post.authorRole || "Field Editorial Team";
  const publishedAt = detail?.postDate || post.publishedAt;
  const takeaways = detail?.keyTakeaways ?? [];

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
      /* user cancelled */
    }
  };

  const quote = detail?.quote && (
    <motion.blockquote
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={reveal}
      className="my-12 rounded-3xl border-l-4 border-[#d96b43] bg-[#f9ebe5]/70 p-7 sm:p-9"
    >
      <p className="font-display text-xl font-medium italic leading-relaxed text-[#0f291e] sm:text-2xl">
        “{detail.quote}”
      </p>
      <cite className="mt-4 block text-sm font-bold not-italic text-[#2d6a4f]">
        — {author}, {authorRole}
      </cite>
    </motion.blockquote>
  );

  return (
    <main className="bg-[#faf8f5] py-18 text-[#0f291e]">
      <MainContainer>
        <div className="mx-auto max-w-3xl">
          <motion.div initial="hidden" animate="show" variants={reveal}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 rounded-full border border-[#0f291e]/15 bg-white px-5 py-2.5 text-sm font-bold text-[#0f291e] transition-colors hover:bg-[#0f291e] hover:text-white"
              >
                <FiArrowLeft
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                  aria-hidden="true"
                />
                Back to Field Journal
              </Link>

              <button
                type="button"
                onClick={share}
                aria-label="Share this story"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#0f291e]/15 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#0f291e] transition-colors hover:bg-[#e6efea]"
              >
                <FiShare2 size={14} />
                Share Dispatch
              </button>
            </div>

            {/* Author & Meta bar */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#0f291e]/10 bg-white p-5">
              <div className="flex items-center gap-3.5">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e6efea] text-[#1b4332]"
                  aria-hidden="true"
                >
                  <FiUser className="text-lg" />
                </span>
                <div>
                  <p className="text-sm font-bold text-[#0f291e]">{author}</p>
                  <p className="text-xs text-[#0f291e]/65">{authorRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold text-[#0f291e]/70">
                <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
                <span>·</span>
                <span className="inline-flex items-center gap-1 text-[#d96b43]">
                  <FiClock aria-hidden="true" />
                  {post.readTime}
                </span>
              </div>
            </div>

            {/* Lead Paragraph */}
            <p className="font-display mt-8 text-xl leading-relaxed text-[#0f291e] sm:text-2xl">
              {detail?.lead || post.excerpt}
            </p>

            {/* Key Takeaways Box */}
            {takeaways.length > 0 && (
              <div className="mt-8 rounded-3xl border border-[#2d6a4f]/25 bg-[#e6efea]/70 p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1b4332]">
                  Key Field Highlights
                </p>
                <ul className="mt-4 space-y-2.5">
                  {takeaways.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm font-semibold text-[#0f291e] sm:text-base"
                    >
                      <FiCheckCircle
                        size={18}
                        className="mt-0.5 shrink-0 text-[#2d6a4f]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Main Featured Photo */}
            <div className="relative mt-8 aspect-16/10 w-full overflow-hidden rounded-3xl border border-[#0f291e]/10 bg-[#0f291e] shadow-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Story Sections */}
          <div className="mt-12 space-y-12">
            {sections.map((section, index) => (
              <div key={section.title}>
                <motion.section
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={reveal}
                >
                  <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight text-[#0f291e] sm:text-3xl">
                    {section.title}
                  </h2>

                  <p className="mt-4 text-base leading-relaxed text-[#0f291e]/80 sm:text-lg">
                    {section.description}
                  </p>

                  {section.image && (
                    <div className="relative mt-6 aspect-16/10 w-full overflow-hidden rounded-3xl border border-[#0f291e]/10 bg-[#0f291e]">
                      <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        sizes="(min-width: 768px) 768px, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                </motion.section>

                {index === quoteAfter && quote}
              </div>
            ))}

            {sections.length === 0 && quote}
          </div>

          {/* Previous / Next Navigation */}
          {(prev || next) && (
            <nav
              aria-label="More stories"
              className="mt-16 grid gap-5 border-t border-[#0f291e]/12 pt-10 sm:grid-cols-2"
            >
              {[
                { story: prev, label: "Previous Dispatch" },
                { story: next, label: "Next Dispatch" },
              ].map(
                ({ story, label }) =>
                  story && (
                    <Link
                      key={label}
                      href={`/blog/${story.slug}`}
                      className="group rounded-2xl border border-[#0f291e]/10 bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#d96b43]/50 hover:shadow-lg"
                    >
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#d96b43]">
                        {label}
                      </span>
                      <span className="font-display mt-2 flex items-start justify-between gap-3 text-lg font-semibold leading-snug text-[#0f291e]">
                        {story.title}
                        <FiArrowUpRight
                          className="mt-1 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  )
              )}
            </nav>
          )}
        </div>
      </MainContainer>
    </main>
  );
}
