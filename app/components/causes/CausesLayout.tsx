"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowUpRight, FiHeart, FiMapPin, FiUsers } from "react-icons/fi";
import causesData from "@/app/data/causes.json";
import type { CausesPageData } from "@/app/types/causes";
import InnerPagesBanner from "@/app/components/layouts/InnerPageBanner";
import MainContainer from "@/app/components/ui/MainContainer";
import { PrimaryButton } from "@/app/components/ui/Button";
import { SectionBadge, SectionDescription, SectionTitle } from "../SectionHeader";

const data = causesData as CausesPageData;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function CausesLayout() {
  const reduce = useReducedMotion();
  const [activeCategory, setActiveCategory] = React.useState<string>("All");

  const categories = React.useMemo(() => {
    const unique = Array.from(new Set(data.causes.map((c) => c.category)));
    return ["All", ...unique];
  }, []);

  const filteredCauses = React.useMemo(() => {
    if (activeCategory === "All") return data.causes;
    return data.causes.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  const featured =
    data.causes.find((cause) => cause.featured) ?? data.causes[0];

  const reveal: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <div className="bg-[#faf8f5] text-[#0f291e]">
      <InnerPagesBanner
        image={data.hero.image}
        badge={data.hero.badge}
        description={data.hero.description}
        breadcrumbs={data.hero.breadcrumbs}
      >
        {data.hero.title}
      </InnerPagesBanner>

      {/* Main Causes Section */}
      <section className="py-18" aria-labelledby="causes-page-heading">
        <MainContainer>
          {/* Intro + Category Filter */}
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              className="max-w-2xl"
            >
              <SectionBadge>{data.intro.badge}</SectionBadge>
              <SectionTitle id="causes-page-heading">
                {data.intro.title}
              </SectionTitle>
              <SectionDescription>{data.intro.description}</SectionDescription>
            </motion.div>

            {/* Filter Pills */}
            <div
              role="tablist"
              aria-label="Filter causes by category"
              className="flex flex-wrap gap-2"
            >
              {categories.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCategory(cat)}
                    className={`cursor-pointer rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-all ${
                      active
                        ? "bg-[#0f291e] text-white shadow-sm"
                        : "border border-[#0f291e]/15 bg-white text-[#0f291e]/75 hover:border-[#0f291e] hover:text-[#0f291e]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority Featured Cause */}
          {featured && activeCategory === "All" && (
            <motion.article
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={reveal}
              className="mt-12 grid overflow-hidden rounded-3xl border border-[#0f291e]/10 bg-white shadow-xl shadow-[#0f291e]/8 lg:grid-cols-12"
            >
              <div className="relative min-h-80 lg:col-span-7 lg:min-h-[26rem]">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <span className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-[#0f291e]/85 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                  <FiMapPin size={12} className="text-[#f4a261]" />
                  {featured.location}
                </span>
              </div>

              <div
                className="flex flex-col justify-center p-8 md:p-12 lg:col-span-5"
                style={{ backgroundColor: featured.tint }}
              >
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#2d6a4f]">
                  {data.featuredLabel} · {featured.category}
                </span>
                <h2 className="font-display mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#0f291e] sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#0f291e]/80">
                  {featured.detail.lead}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-white/85 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#0f291e]">
                    {featured.impact}
                  </span>
                  <span className="rounded-full bg-white/85 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#2d6a4f]">
                    {featured.supporters}
                  </span>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/our-causes/${featured.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full bg-[#0f291e] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#d96b43]"
                  >
                    <span>{data.cardLinkLabel}</span>
                    <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 rounded-full border border-[#0f291e]/20 bg-white px-5 py-3 text-sm font-bold text-[#0f291e] transition-colors hover:bg-[#d96b43] hover:text-white"
                  >
                    <FiHeart size={14} className="text-[#d96b43]" />
                    <span>Donate Now</span>
                  </Link>
                </div>
              </div>
            </motion.article>
          )}

          {/* All Causes Grid */}
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCauses.map((cause) => (
              <motion.article
                key={cause.slug}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={reveal}
                className="group flex flex-col overflow-hidden rounded-3xl border border-[#0f291e]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#0f291e]/10"
              >
                <Link
                  href={`/our-causes/${cause.slug}`}
                  className="relative aspect-16/10 overflow-hidden bg-[#0f291e]"
                >
                  <Image
                    src={cause.image}
                    alt={cause.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#0f291e] shadow-xs">
                    {cause.category}
                  </span>
                  <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full bg-[#0f291e]/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    <FiMapPin size={12} className="text-[#f4a261]" />
                    {cause.location}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-[#e6efea] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#2d6a4f]">
                        {cause.impact}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f291e]/60">
                        <FiUsers size={12} className="text-[#d96b43]" />
                        {cause.supporters}
                      </span>
                    </div>

                    <Link href={`/our-causes/${cause.slug}`}>
                      <h3 className="font-display mt-4 text-2xl font-semibold leading-snug tracking-tight text-[#0f291e] transition-colors group-hover:text-[#d96b43]">
                        {cause.title}
                      </h3>
                    </Link>

                    <p className="mt-2.5 text-sm leading-relaxed text-[#0f291e]/72">
                      {cause.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#0f291e]/10 pt-5">
                    <Link
                      href={`/our-causes/${cause.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0f291e] transition-colors hover:text-[#d96b43]"
                    >
                      <span>{data.cardLinkLabel}</span>
                      <FiArrowUpRight size={15} />
                    </Link>
                    <Link
                      href="#"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#0f291e] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#d96b43]"
                    >
                      <FiHeart size={12} className="text-[#f4a261]" />
                      <span>Donate</span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </MainContainer>
      </section>

      {/* CTA Section */}
      <section className="bg-[#f2efe9] py-18">
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
                {data.cta.eyebrow}
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
    </div>
  );
}
