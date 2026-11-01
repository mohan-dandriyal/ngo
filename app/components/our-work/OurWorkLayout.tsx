"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import ourWorkData from "@/app/data/our-work.json";
import type { OurWorkPageData } from "@/app/types/our-work";
import InnerPagesBanner from "@/app/components/layouts/InnerPageBanner";
import MainContainer from "@/app/components/ui/MainContainer";
import { PrimaryButton } from "@/app/components/ui/Button";
import { SectionBadge, SectionDescription, SectionTitle } from "../SectionHeader";

const data = ourWorkData as OurWorkPageData;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function OurWorkLayout() {
  const reduce = useReducedMotion();

  const reveal: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
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

      {/* Section 1: Three Interconnected Pillars */}
      <section className="py-18" aria-labelledby="our-work-heading">
        <MainContainer>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            className="max-w-3xl"
          >
            <SectionBadge>{data.intro.badge}</SectionBadge>
            <SectionTitle id="our-work-heading">{data.intro.title}</SectionTitle>
            <SectionDescription>{data.intro.description}</SectionDescription>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {data.pillars.map((pillar) => (
              <motion.article
                key={pillar.number}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={reveal}
                className="flex flex-col justify-between rounded-3xl border border-[#0f291e]/10 bg-white p-8 shadow-xs transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  <span className="font-display text-4xl font-bold text-[#d96b43]">
                    {pillar.number}
                  </span>
                  <h3 className="font-display mt-5 text-2xl font-semibold text-[#0f291e]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#0f291e]/75">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#0f291e]/10 pt-4">
                  <span className="inline-block rounded-full bg-[#e6efea] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#1b4332]">
                    {pillar.stat}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </MainContainer>
      </section>

      {/* Section 2: Interactive Hub Cards */}
      <section className="bg-[#f2efe9] py-18" aria-label="Explore our work areas">
        <MainContainer>
          <div className="grid gap-8 md:grid-cols-2">
            {data.cards.map((card) => (
              <motion.article
                key={card.label}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={reveal}
                className="group flex flex-col overflow-hidden rounded-3xl border border-[#0f291e]/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-[#0f291e]">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#0f291e]">
                    {card.label}
                  </span>
                  {card.metric && (
                    <span className="absolute right-5 top-5 rounded-full bg-[#0f291e]/85 px-3.5 py-1 text-xs font-semibold text-[#f4a261] backdrop-blur-sm">
                      {card.metric}
                    </span>
                  )}
                </div>

                <div
                  className="flex flex-1 flex-col justify-between p-8"
                  style={{ backgroundColor: card.tint }}
                >
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-[#0f291e] sm:text-3xl">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-[#0f291e]/80">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-7">
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-2.5 rounded-full bg-[#0f291e] px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#d96b43]"
                    >
                      {card.buttonLabel}
                      <FiArrowUpRight size={17} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </MainContainer>
      </section>

      {/* Section 3: CTA */}
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
                {data.cta.eyebrow}
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                {data.cta.title}
              </h2>
              {data.cta.description && (
                <p className="mt-2 text-base text-white/75">
                  {data.cta.description}
                </p>
              )}
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
