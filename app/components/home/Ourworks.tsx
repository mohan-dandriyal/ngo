"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import MainContainer from "../ui/MainContainer";
import { SectionBadge, SectionDescription, SectionTitle } from "@/app/components/SectionHeader";
import { OutlineButton } from "../ui/Button";
import projectsData from "@/app/data/projects.json";
import homeData from "@/app/data/home.json";
import type { ProjectPageData } from "@/app/types/project";

const data = projectsData as ProjectPageData;
const works = data.projects.slice(0, 3);

function OurWorks() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const fadeUp: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
  };

  return (
    <section className="overflow-hidden py-18" aria-labelledby="works-heading">
      <MainContainer>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Heading row */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
          >
            <div className="max-w-3xl">
              <SectionBadge>{homeData.worksSection.badge}</SectionBadge>
              <SectionTitle id="works-heading">{homeData.worksSection.title}</SectionTitle>
              <SectionDescription>{homeData.worksSection.description}</SectionDescription>
            </div>

            {homeData.worksSection.buttonHref && (
              <OutlineButton href={homeData.worksSection.buttonHref}>
                <span>{homeData.worksSection.buttonLabel}</span>
                <FiArrowUpRight
                  aria-hidden="true"
                  className="text-lg transition-transform duration-300 group-hover:rotate-45"
                />
              </OutlineButton>
            )}
          </motion.div>

          {/* Alternating Checkerboard Rows */}
          <div className="mt-12 flex flex-col gap-8">
            {works.map((w, i) => {
              const imageFirst = i % 2 === 0;

              return (
                <div
                  key={w.slug}
                  className="grid grid-cols-1 gap-6 lg:grid-cols-12"
                >
                  {/* Image card */}
                  <motion.div
                    variants={fadeUp}
                    className={`group relative min-h-80 overflow-hidden rounded-3xl border border-[#0f291e]/10 bg-[#0f291e] md:min-h-96 lg:col-span-7 ${
                      imageFirst ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <Image
                      src={w.image}
                      alt={w.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0f291e]/60 via-transparent to-transparent" />
                    <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#0f291e] shadow-xs">
                      {w.category}
                    </span>
                    {w.location && (
                      <span className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-[#0f291e]/80 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                        <FiMapPin size={12} className="text-[#f4a261]" />
                        {w.location}
                      </span>
                    )}
                  </motion.div>

                  {/* Text card */}
                  <motion.article
                    variants={fadeUp}
                    className={`flex flex-col justify-between rounded-3xl border border-[#0f291e]/10 p-8 md:p-10 lg:col-span-5 ${
                      imageFirst ? "lg:order-2" : "lg:order-1"
                    }`}
                    style={{ background: w.tint }}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="rounded-full bg-white/85 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#2d6a4f]">
                          {w.impact}
                        </span>
                        {w.year && (
                          <span className="text-xs font-semibold text-[#0f291e]/60">
                            {w.year}
                          </span>
                        )}
                      </div>

                      <h3 className="font-display mt-6 text-3xl font-semibold leading-tight tracking-tight text-[#0f291e] sm:text-4xl">
                        {w.title}
                      </h3>

                      <p className="mt-4 text-base leading-relaxed text-[#0f291e]/80 sm:text-lg">
                        {w.description}
                      </p>
                    </div>

                    <div className="mt-8 border-t border-[#0f291e]/12 pt-6">
                      <Link
                        href={`/our-programs/${w.slug}`}
                        className="group/btn inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.14em] text-[#0f291e] transition-colors hover:text-[#d96b43]"
                      >
                        Read full program report
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0f291e] text-white transition-all duration-300 group-hover/btn:rotate-45 group-hover/btn:bg-[#d96b43]">
                          <FiArrowUpRight size={16} />
                        </span>
                      </Link>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </motion.div>
      </MainContainer>
    </section>
  );
}

export default OurWorks;
