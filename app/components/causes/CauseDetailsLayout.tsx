"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCalendar,
  FiCheckCircle,
  FiHeart,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";
import MainContainer from "@/app/components/ui/MainContainer";
import type { CauseItem } from "@/app/types/causes";
import InnerPagesBanner from "../layouts/InnerPageBanner";
import causesData from "@/app/data/causes.json";

interface CauseDetailsLayoutProps {
  cause: CauseItem;
  related: CauseItem[];
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CauseDetailsLayout({
  cause,
  related,
}: CauseDetailsLayoutProps) {
  const reduce = useReducedMotion();

  const reveal: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
  };

  const staggerContainer: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.05 },
    },
  };

  return (
    <div className="bg-[#faf8f5] text-[#0f291e]">
      <InnerPagesBanner
        image={cause.image || causesData.causeDetailsHero.image}
        badge={`${cause.category} · ${cause.urgency}`}
        description={cause.description}
        breadcrumbs={[
          ...(causesData.causeDetailsHero.breadcrumbs ?? []),
          { label: cause.title },
        ]}
      >
        {cause.title}
      </InnerPagesBanner>

      <main className="py-18">
        <MainContainer>
          {/* Top Navigation & Quick Action */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={reveal}
            className="mb-8 flex flex-wrap items-center justify-between gap-4"
          >
            <Link
              href="/our-causes"
              className="group inline-flex items-center gap-2 rounded-full border border-[#0f291e]/15 bg-white px-5 py-2.5 text-sm font-bold text-[#0f291e] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0f291e] hover:text-white hover:shadow-md"
            >
              <FiArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
              Back to all causes
            </Link>

            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-[#d96b43] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-[#d96b43]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0f291e]"
            >
              <FiHeart size={15} />
              <span>Donate to this Cause</span>
            </Link>
          </motion.div>

          {/* Main Cause Article Card */}
          <article className="overflow-hidden rounded-3xl border border-[#0f291e]/10 bg-white shadow-xl shadow-[#0f291e]/6">
            <header className="grid lg:grid-cols-12">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="flex flex-col justify-center p-8 md:p-12 lg:col-span-6"
                style={{ backgroundColor: cause.tint }}
              >
                <motion.p
                  variants={reveal}
                  className="text-xs font-bold uppercase tracking-[0.18em] text-[#2d6a4f]"
                >
                  {cause.category} · {cause.impact}
                </motion.p>
                <motion.h2
                  variants={reveal}
                  className="font-display mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
                >
                  {cause.title}
                </motion.h2>
                <motion.p
                  variants={reveal}
                  className="mt-4 text-base leading-relaxed text-[#0f291e]/85 sm:text-lg"
                >
                  {cause.detail.lead}
                </motion.p>

                {/* Key Highlights */}
                {cause.detail.highlights?.length > 0 && (
                  <motion.ul
                    variants={reveal}
                    className="mt-6 space-y-2.5 border-t border-[#0f291e]/10 pt-5"
                  >
                    {cause.detail.highlights.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm font-medium text-[#0f291e]/85"
                      >
                        <FiCheckCircle
                          size={16}
                          className="mt-0.5 shrink-0 text-[#2d6a4f]"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </motion.div>

              <div className="group relative min-h-80 overflow-hidden lg:col-span-6 lg:min-h-[30rem]">
                <Image
                  src={cause.image}
                  alt={cause.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              </div>
            </header>

            <div className="p-8 md:p-12 lg:p-16">
              <div className="mx-auto max-w-4xl">
                {/* Key Metadata Cards */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="grid gap-5 sm:grid-cols-3"
                >
                  <motion.div
                    variants={reveal}
                    whileHover={reduce ? undefined : { y: -4 }}
                    className="rounded-2xl bg-[#e6efea] p-5 transition-shadow hover:shadow-md"
                  >
                    <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#2d6a4f]">
                      <FiMapPin size={13} /> Location
                    </p>
                    <p className="font-display mt-2 text-xl font-semibold text-[#0f291e]">
                      {cause.detail.location || cause.location}
                    </p>
                  </motion.div>
                  <motion.div
                    variants={reveal}
                    whileHover={reduce ? undefined : { y: -4 }}
                    className="rounded-2xl bg-[#f9ebe5] p-5 transition-shadow hover:shadow-md"
                  >
                    <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#d96b43]">
                      <FiUsers size={13} /> Direct Impact
                    </p>
                    <p className="font-display mt-2 text-xl font-semibold text-[#0f291e]">
                      {cause.detail.beneficiaries || cause.impact}
                    </p>
                  </motion.div>
                  <motion.div
                    variants={reveal}
                    whileHover={reduce ? undefined : { y: -4 }}
                    className="rounded-2xl bg-[#f2efe9] p-5 transition-shadow hover:shadow-md"
                  >
                    <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#0f291e]/70">
                      <FiCalendar size={13} /> Timeline
                    </p>
                    <p className="font-display mt-2 text-xl font-semibold text-[#0f291e]">
                      {cause.detail.timeline}
                    </p>
                  </motion.div>
                </motion.div>

                {/* Detailed Cause Overview Narrative */}
                {cause.detail.overview && cause.detail.overview.length > 0 && (
                  <motion.section
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={reveal}
                    className="mt-12 rounded-3xl border border-[#0f291e]/10 bg-[#faf8f5] p-7 sm:p-10"
                  >
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#e6efea] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#1b4332]">
                      <span className="h-2 w-2 rounded-full bg-[#d96b43]" />
                      In-Depth Cause Overview
                    </span>
                    <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight text-[#0f291e] sm:text-3xl">
                      Why this cause matters & how your support works
                    </h3>
                    <div className="mt-5 space-y-4 text-base leading-relaxed text-[#0f291e]/80 sm:text-lg">
                      {cause.detail.overview.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>

                    {/* Impact Metrics Strip */}
                    {cause.detail.impactMetrics &&
                      cause.detail.impactMetrics.length > 0 && (
                        <div className="mt-8 grid gap-4 border-t border-[#0f291e]/10 pt-7 sm:grid-cols-3">
                          {cause.detail.impactMetrics.map((metric) => (
                            <div
                              key={metric.label}
                              className="rounded-2xl border border-[#0f291e]/8 bg-white p-4 text-center shadow-2xs"
                            >
                              <p className="font-display text-2xl font-bold text-[#d96b43] sm:text-3xl">
                                {metric.value}
                              </p>
                              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#0f291e]/70">
                                {metric.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                  </motion.section>
                )}

                {/* Story Sections */}
                <div className="mt-14 space-y-14">
                  {cause.detail.sections.map((section, index) => (
                    <motion.section
                      key={section.title}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={reveal}
                      className="grid gap-8 md:grid-cols-12 md:items-center"
                    >
                      <div
                        className={`group relative min-h-72 overflow-hidden rounded-2xl border border-[#0f291e]/10 md:col-span-6 ${
                          index % 2 ? "md:order-2" : ""
                        }`}
                      >
                        <Image
                          src={section.image}
                          alt={section.title}
                          fill
                          sizes="(min-width: 768px) 45vw, 100vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div
                        className={`md:col-span-6 ${
                          index % 2 ? "md:order-1" : ""
                        }`}
                      >
                        <span className="font-display inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f9ebe5] text-lg font-bold text-[#d96b43]">
                          0{index + 1}
                        </span>
                        <h3 className="font-display mt-3 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                          {section.title}
                        </h3>
                        <p className="mt-3 text-base leading-relaxed text-[#0f291e]/78 sm:text-lg">
                          {section.description}
                        </p>
                      </div>
                    </motion.section>
                  ))}
                </div>

                {/* Editorial Pull Quote */}
                <motion.blockquote
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={reveal}
                  className="font-editorial mt-14 rounded-2xl border-l-4 border-[#d96b43] bg-[#f9ebe5]/60 p-7 text-xl italic leading-relaxed text-[#0f291e] sm:text-2xl"
                >
                  “{cause.detail.quote}”
                </motion.blockquote>

                {/* Support Banner Inside Article */}
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={reveal}
                  className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#0f291e] p-7 text-white sm:flex-row sm:items-center sm:p-8"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4a261]">
                      Support This Cause
                    </p>
                    <h4 className="font-display mt-1 text-2xl font-semibold">
                      Help us reach {cause.impact} in {cause.location}
                    </h4>
                  </div>
                  <Link
                    href="#"
                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#d96b43] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f4a261] hover:text-[#0f291e]"
                  >
                    <FiHeart size={15} />
                    <span>Donate Now</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </article>

          {/* Related Causes */}
          {related.length > 0 && (
            <section className="mt-18" aria-labelledby="related-causes-heading">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2d6a4f]">
                    Keep Exploring
                  </p>
                  <h2
                    id="related-causes-heading"
                    className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
                  >
                    More Causes to Champion
                  </h2>
                </div>
                <Link
                  href="/our-causes"
                  className="hidden items-center gap-2 text-sm font-bold text-[#d96b43] hover:text-[#0f291e] sm:inline-flex"
                >
                  View all causes
                  <FiArrowUpRight />
                </Link>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/our-causes/${item.slug}`}
                    className="group overflow-hidden rounded-3xl border border-[#0f291e]/10 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  >
                    <div className="relative aspect-16/9 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6" style={{ backgroundColor: item.tint }}>
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#2d6a4f]">
                        {item.category} · {item.impact}
                      </p>
                      <h3 className="font-display mt-2 text-2xl font-semibold text-[#0f291e] transition-colors group-hover:text-[#d96b43]">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </MainContainer>
      </main>
    </div>
  );
}
