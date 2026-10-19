"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { FiArrowUpRight, FiCalendar, FiClock } from "react-icons/fi"
import MainContainer from "../ui/MainContainer"

import { OutlineButton } from '@/app/components/ui/Button'
import { SectionTitle, SectionDescription, SectionBadge } from "../SectionHeader"
import { Paragraf, CardTitleLink } from "../ui/Layout"
import blogData from "@/app/data/blog.json"
import homeData from "@/app/data/home.json"
import type { Blog } from "@/app/types/blog"

const posts = (blogData.blog as Blog[]).map((post) => ({
  ...post,
  date: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(
    new Date(post.publishedAt),
  ),
}))

// Smooth "expo-out" curve shared by all entrance animations
const EASE = [0.22, 1, 0.36, 1] as const

/** Soft watercolor wash built from layered radial gradients (same as the other sections) */
const watercolor = (base: string, a: string, b: string) =>
  `radial-gradient(60% 55% at 15% 20%, ${a} 0%, transparent 70%),
   radial-gradient(55% 60% at 85% 75%, ${b} 0%, transparent 70%),
   radial-gradient(40% 40% at 70% 15%, ${a} 0%, transparent 75%),
   ${base}`

// Small post cards alternate between the two pastel washes
const tints = [
  watercolor("#dcebdd", "#e9f2d9", "#cfe5da"),
  watercolor("#cfe4e0", "#dcefe9", "#bcd6dc"),
]

function BlogSection() {
  const reduce = useReducedMotion()
  const [featured, ...rest] = posts

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.15 } },
  }
  const fadeUp: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  }

  // Featured card: wipes open from the bottom, then its parts follow
  const featuredReveal: Variants = {
    hidden: {
      opacity: reduce ? 1 : 0,
      clipPath: reduce ? "inset(0% 0% 0% 0% round 16px)" : "inset(100% 0% 0% 0% round 16px)",
    },
    show: {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0% round 16px)",
      transition: {
        duration: 1.1,
        ease: EASE,
        when: "beforeChildren",
        staggerChildren: reduce ? 0 : 0.1,
      },
    },
  }
  const imageZoom: Variants = {
    hidden: { scale: reduce ? 1 : 1.25 },
    show: { scale: 1, transition: { duration: 1.6, ease: EASE } },
  }
  const chipDrop: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : -14, scale: reduce ? 1 : 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
  }
  const textRise: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  }

  // Small cards: glide in from the right, one after another
  const slideIn: Variants = {
    hidden: { opacity: reduce ? 1 : 0, x: reduce ? 0 : 60 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: EASE,
        when: "beforeChildren",
        staggerChildren: reduce ? 0 : 0.08,
      },
    },
  }
  const smallImage: Variants = {
    hidden: { scale: reduce ? 1 : 1.2 },
    show: { scale: 1, transition: { duration: 1.2, ease: EASE } },
  }

  return (
    <section className="overflow-hidden bg-white pt-20 md:pt-28" aria-labelledby="blog-heading">
      <MainContainer>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="px-6 md:px-0"
        >
          {/* Heading row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
          >
            <div className="max-w-4xl">


              <SectionBadge>{homeData.blogSection.badge}</SectionBadge>

              <SectionTitle>{homeData.blogSection.title}</SectionTitle>

              <SectionDescription>{homeData.blogSection.description}</SectionDescription>
            </div>

            <OutlineButton href={homeData.blogSection.buttonHref}>
              <div className="flex items-center gap-3">
                {homeData.blogSection.buttonLabel}
                <FiArrowUpRight aria-hidden="true" className=" text-xl transition-transform duration-200 group-hover:rotate-45" />
              </div>
            </OutlineButton>
          </motion.div>

          <div className="mt-12">
            {/* Featured post */}
            {/* <motion.article
              variants={featuredReveal}
              className="group relative min-h-112 overflow-hidden rounded-2xl bg-[#0b1635] shadow-xl shadow-[#0b1635]/10 lg:min-h-full"
            >
              <motion.div variants={imageZoom} className="absolute inset-0">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </motion.div>
              <div className="absolute inset-0 bg-linear-to-t from-[#0b1635] via-[#0b1635]/50 to-transparent" />

              <motion.span
                variants={chipDrop}
                className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0b1635] shadow-sm"
              >
                {featured.category}
              </motion.span>

              <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                <motion.div
                  variants={textRise}
                  className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-white/80"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <FiCalendar aria-hidden="true" size={14} />
                    {featured.date}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <FiClock aria-hidden="true" size={14} />
                    {featured.readTime}
                  </span>

                </motion.div>
                <motion.h3
                  variants={textRise}
                  className="mt-3 text-2xl font-medium italic leading-snug tracking-tight md:text-4xl"
                >
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {featured.title}
                  </Link>
                </motion.h3>

                <motion.p variants={textRise} className="mt-3 max-w-xl text-white/85 text-lg">
                  {featured.excerpt}
                </motion.p>
                <motion.p variants={textRise} className="mt-5 inline-flex items-center gap-2 font-semibold">
                  Read story
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0b1635] transition-transform duration-300 group-hover:rotate-45">
                    <FiArrowUpRight aria-hidden="true" size={18} />
                  </span>
                </motion.p>
              </div>
            </motion.article> */}

            {/* Smaller posts */}
            <div className="lg:w-10/12 grid md:grid-cols-2  mx-auto gap-15">
              {rest?.slice(0, 4)?.map((post, i) => (
                <motion.article
                  key={post.slug}
                  variants={slideIn}
                  whileHover={reduce ? undefined : { y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } }}
                  className="group relative text-[#0b1635] duration-500 sm:flex-row"
                 
                >
                  <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden">
                    <motion.div variants={smallImage} className="absolute inset-0">
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 160px, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </motion.div>
                  </div>

                  <div className="flex flex-1 w-10/12 mx-auto flex-col justify-center p-10 relative -top-20"   style={{ background: tints[i % tints.length] }}>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#0b1635]/70">
                      <span className="rounded-full bg-white px-2.5 py-1 font-semibold text-[#0b1635]">
                        {post.category}
                      </span>
                      <span>{post.date}</span>
                      {/* <span aria-hidden="true">•</span>
                      <span>{post.readTime}</span> */}
                    </div>

                    <CardTitleLink>
                      <Link
                        href={`/blog/${post.slug}`}
                        className=" tracking-tight text-[#0b1635] after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b1635]"
                      >
                        {post.title}
                      </Link>
                    </CardTitleLink>

                    <Paragraf>
                      <span className="text-[#0b1635]">{post.excerpt}</span>
                    </Paragraf>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </MainContainer>
    </section>
  )
}

export default BlogSection
