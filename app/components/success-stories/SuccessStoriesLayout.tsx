"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";
import InnerPagesBanner from "@/app/components/layouts/InnerPageBanner";
import MainContainer from "@/app/components/ui/MainContainer";
import { PrimaryButton } from "@/app/components/ui/Button";
import { SectionBadge, SectionDescription, SectionTitle } from "../SectionHeader";
import SuccessStories from "../programs/SuccessStories";
import TestimonialsSection from "../home/Testimonialssection";
import storiesData from "@/app/data/success-stories.json";
import type { SuccessStoriesPageData } from "@/app/types/success-stories";

const data = storiesData as SuccessStoriesPageData;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function SuccessStoriesLayout() {
  const reduce = useReducedMotion();

  const reveal: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
  };

  const featured = data.featuredStory;

  return (
    <main className="overflow-hidden bg-[#faf8f5] text-[#0f291e]">
      <InnerPagesBanner
        image={data.hero.image}
        badge={data.hero.badge}
        description={data.hero.description}
        breadcrumbs={data.hero.breadcrumbs}
      >
        {data.hero.title}
      </InnerPagesBanner>

      {/* Section 1: Intro + Featured Community Spotlight */}
      <section className="py-18" aria-labelledby="spotlight-heading">
        <MainContainer>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            className="max-w-3xl"
          >
            <SectionBadge>{data.intro.badge}</SectionBadge>
            <SectionTitle id="spotlight-heading">{data.intro.title}</SectionTitle>
            <SectionDescription>{data.intro.description}</SectionDescription>
          </motion.div>

          {/* Key Impact Metrics */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {data.impactMetrics.map((m) => (
              <motion.div
                key={m.label}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                className="rounded-3xl border border-[#0f291e]/10 bg-white p-7 shadow-xs"
              >
                <p className="font-display text-4xl font-bold text-[#d96b43] sm:text-5xl">
                  {m.value}
                </p>
                <h3 className="font-display mt-3 text-xl font-semibold text-[#0f291e]">
                  {m.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#0f291e]/70">
                  {m.detail}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Featured Spotlight Card */}
          <motion.article
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={reveal}
            className="mt-12 grid overflow-hidden rounded-3xl border border-[#0f291e]/10 bg-white shadow-xl shadow-[#0f291e]/8 lg:grid-cols-12"
          >
            <div className="relative min-h-80 lg:col-span-6 lg:min-h-full">
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <span className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-[#0f291e]/85 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                <FiMapPin size={12} className="text-[#f4a261]" />
                {featured.location}
              </span>
            </div>

            <div className="flex flex-col justify-between p-8 md:p-12 lg:col-span-6">
              <div>
                <span className="inline-block rounded-full bg-[#e6efea] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#1b4332]">
                  {featured.badge}
                </span>

                <h2 className="font-display mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#0f291e] sm:text-4xl">
                  {featured.title}
                </h2>

                <div className="mt-5 space-y-3 text-base leading-relaxed text-[#0f291e]/75">
                  {featured.description.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                <blockquote className="mt-6 rounded-2xl bg-[#f9ebe5]/70 p-5">
                  <FaQuoteLeft className="text-[#d96b43]" size={18} />
                  <p className="font-display mt-2 text-lg font-medium italic text-[#0f291e]">
                    “{featured.quote}”
                  </p>
                  <footer className="mt-2 text-xs font-bold text-[#2d6a4f]">
                    — {featured.person} ({featured.role})
                  </footer>
                </blockquote>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#0f291e]/10 pt-6">
                {featured.metrics.map((item) => (
                  <div key={item.label}>
                    <p className="font-display text-lg font-bold text-[#0f291e] sm:text-xl">
                      {item.value}
                    </p>
                    <p className="text-xs text-[#0f291e]/65">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        </MainContainer>
      </section>

      {/* Section 2: All 6 Community Impact Stories */}
      <SuccessStories
        stories={data.stories}
        badge="Field Milestones"
        title="More stories of resilience across our partner villages"
        description="Every program is co-created with local families so the impact endures for generations."
      />

      {/* Section 3: Testimonials Carousel */}
      <TestimonialsSection />

      {/* Section 4: CTA */}
      <section className="py-18">
        <MainContainer>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-[#0f291e] p-8 text-white md:flex-row md:items-center md:p-12"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f4a261]">
                {data.cta.badge}
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                {data.cta.title}
              </h2>
              <p className="mt-2 text-base text-white/75">
                {data.cta.description}
              </p>
            </div>
            <PrimaryButton href={data.cta.buttonHref}>
              <span>{data.cta.buttonLabel}</span>
              <FiArrowUpRight size={18} />
            </PrimaryButton>
          </motion.div>
        </MainContainer>
      </section>
    </main>
  );
}
