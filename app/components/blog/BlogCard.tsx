"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

import type { Blog } from "@/app/types/blog";

interface BlogCardProps {
    blog: Blog;
    index?: number;
}

// Smooth "expo-out" curve shared by all entrance animations
const EASE = [0.22, 1, 0.36, 1] as const;

/** Soft watercolor wash built from layered radial gradients (same as the other sections) */
const watercolor = (base: string, a: string, b: string) =>
    `radial-gradient(60% 55% at 15% 20%, ${a} 0%, transparent 70%),
   radial-gradient(55% 60% at 85% 75%, ${b} 0%, transparent 70%),
   radial-gradient(40% 40% at 70% 15%, ${a} 0%, transparent 75%),
   ${base}`;

// Cards alternate between the two pastel washes
const tints = [
    watercolor("#dcebdd", "#e9f2d9", "#cfe5da"),
    watercolor("#cfe4e0", "#dcefe9", "#bcd6dc"),
];

// "2026-10-12" -> "Oct 12, 2026". Pinned to UTC so server and browser always agree.
const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    });

export default function BlogCard({ blog, index = 0 }: BlogCardProps) {
    const reduceMotion = useReducedMotion();

    // Card floats up, then its parts reveal one after another
    const card: Variants = {
        hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 50 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: EASE,
                delay: reduceMotion ? 0 : (index % 3) * 0.12,
                when: "beforeChildren",
                staggerChildren: reduceMotion ? 0 : 0.1,
            },
        },
    };

    // Image zooms out slowly as it reveals
    const imageReveal: Variants = {
        hidden: { scale: reduceMotion ? 1 : 1.25 },
        show: { scale: 1, transition: { duration: 1.4, ease: EASE } },
    };

    const chip: Variants = {
        hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : -14, scale: reduceMotion ? 1 : 0.9 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
    };

    const rise: Variants = {
        hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
    };

    return (
        <motion.article
            variants={card}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            whileHover={
                reduceMotion
                    ? undefined
                    : { y: -8, transition: { type: "spring", stiffness: 300, damping: 22 } }
            }
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl text-[#0b1635] shadow-lg shadow-[#0b1635]/5 transition-shadow duration-500 hover:shadow-2xl hover:shadow-[#0b1635]/15"
            style={{ background: tints[index % tints.length] }}
        >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <motion.div variants={imageReveal} className="absolute inset-0">
                    <Image
                        src={blog.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                </motion.div>

                <motion.span
                    variants={chip}
                    className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0b1635] shadow-sm"
                >
                    {blog.category}
                </motion.span>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-6 md:p-8">
                <motion.p variants={rise} className="text-xs text-[#0b1635]/70">
                    {formatDate(blog.publishedAt)}
                    <span className="px-2">·</span>
                    {blog.readTime}
                </motion.p>

                <motion.h3
                    variants={rise}
                    className="mt-3 text-2xl font-extrabold leading-snug tracking-tight"
                >
                    {/* The whole card is clickable through this link */}
                    <Link
                        href={`/blog/${blog.slug}`}
                        className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b1635]"
                    >
                        {blog.title}
                    </Link>
                </motion.h3>

                <motion.p variants={rise} className="mt-3 text-sm leading-7 text-[#0b1635]/80">
                    {blog.excerpt}
                </motion.p>

                <motion.div
                    variants={rise}
                    className="mt-auto flex items-center justify-between border-t border-[#0b1635]/15 pt-4"
                >
                    <span className="text-xs text-[#0b1635]/70">By {blog.author}</span>

                    <span
                        aria-hidden="true"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0b1635] text-white transition-transform duration-300 group-hover:rotate-45"
                    >
                        <FiArrowUpRight size={16} />
                    </span>
                </motion.div>
            </div>
        </motion.article>
    );
}