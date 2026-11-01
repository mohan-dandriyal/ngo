"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import projectsData from "@/app/data/projects.json";
import type { ProjectPageData } from "@/app/types/project";
import InnerPagesBanner from "@/app/components/layouts/InnerPageBanner";
import MainContainer from "@/app/components/ui/MainContainer";
import { PrimaryButton } from "@/app/components/ui/Button";
import { SectionBadge, SectionDescription, SectionTitle } from "../SectionHeader";

const data = projectsData as ProjectPageData;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProjectLayout() {
  const reduce = useReducedMotion();
  const featured =
    data.projects.find((project) => project.featured) ?? data.projects[0];
  const remaining = data.projects.filter((project) => project?.title);

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

      {/* Main Projects Section */}
      <section className="py-18" aria-labelledby="projects-heading">
        <MainContainer>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            className="max-w-3xl"
          >
            <SectionBadge>{data.intro.badge}</SectionBadge>
            <SectionTitle id="projects-heading">{data.intro.title}</SectionTitle>
            <SectionDescription>{data.intro.description}</SectionDescription>
          </motion.div>

          {/* Flagship Featured Project */}
          {featured && (
            <motion.article
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={reveal}
              className="mt-12 grid overflow-hidden rounded-3xl border border-[#0f291e]/10 bg-white shadow-xl shadow-[#0f291e]/8 lg:grid-cols-12"
            >
              <div className="relative min-h-80 lg:col-span-7 lg:min-h-[28rem]">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                {featured.location && (
                  <span className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-[#0f291e]/85 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                    <FiMapPin size={12} className="text-[#f4a261]" />
                    {featured.location}
                  </span>
                )}
              </div>

              <div
                className="flex flex-col justify-center p-8 md:p-12 lg:col-span-5"
                style={{ backgroundColor: featured.tint }}
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2d6a4f]">
                  {data.featuredLabel} · {featured.category}
                </span>
                <h2 className="font-display mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#0f291e] sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#0f291e]/80 sm:text-lg">
                  {featured.description}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <span className="rounded-full bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0f291e]">
                    {featured.impact}
                  </span>
                  <Link
                    href={`/our-programs/${featured.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full bg-[#0f291e] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#d96b43]"
                  >
                    {data.cardLinkLabel}
                    <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          )}

          {/* All Programs Grid (3 cards in one row) */}
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {remaining.map((project) => (
              <motion.article
                key={project.slug}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={reveal}
                className="group flex flex-col overflow-hidden rounded-3xl border border-[#0f291e]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0f291e]/10"
              >
                <Link
                  href={`/our-programs/${project.slug}`}
                  className="flex flex-1 flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0f291e]"
                >
                  <div className="relative aspect-16/10 overflow-hidden bg-[#0f291e]">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#0f291e] shadow-xs">
                      {project.category}
                    </span>
                    {project.location && (
                      <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full bg-[#0f291e]/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        <FiMapPin size={12} className="text-[#f4a261]" />
                        {project.location}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight text-[#0f291e] transition-colors group-hover:text-[#d96b43]">
                          {project.title}
                        </h3>
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e6efea] text-[#0f291e] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#d96b43] group-hover:text-white">
                          <FiArrowUpRight size={17} />
                        </span>
                      </div>

                      <p className="mt-2.5 text-sm leading-relaxed text-[#0f291e]/75">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-[#0f291e]/10 pt-4">
                      <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#2d6a4f]">
                        {project.impact}
                      </span>
                      {project.year && (
                        <span className="text-xs font-medium text-[#0f291e]/60">
                          {project.year}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
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
