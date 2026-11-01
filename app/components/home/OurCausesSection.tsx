"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowUpRight, FiHeart, FiMapPin, FiUsers } from "react-icons/fi";
import MainContainer from "../ui/MainContainer";
import { OutlineButton } from "../ui/Button";
import { SectionBadge, SectionDescription, SectionTitle } from "../SectionHeader";
import causesData from "@/app/data/causes.json";
import type { CausesPageData } from "@/app/types/causes";

const data = causesData as CausesPageData;
const featuredCauses = data.causes.slice(0, 3);
const EASE = [0.22, 1, 0.36, 1] as const;

export default function OurCausesSection() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: 0.05 },
    },
  };

  const item: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <section
      className="relative overflow-hidden bg-[#f2efe9] py-18"
      aria-labelledby="our-causes-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-[#d96b43]/8 blur-3xl"
      />

      <MainContainer>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Section Header */}
          <motion.div
            variants={item}
            className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
          >
            <div className="max-w-3xl">
              <SectionBadge>{data.homeSection.badge}</SectionBadge>
              <SectionTitle id="our-causes-heading">
                {data.homeSection.title}
              </SectionTitle>
              <SectionDescription>
                {data.homeSection.description}
              </SectionDescription>
            </div>

            <OutlineButton href={data.homeSection.buttonHref}>
              <span>{data.homeSection.buttonLabel}</span>
              <FiArrowUpRight
                aria-hidden="true"
                className="text-lg transition-transform duration-300 group-hover:rotate-45"
              />
            </OutlineButton>
          </motion.div>

          {/* Causes Grid */}
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredCauses.map((cause) => (
              <motion.article
                key={cause.slug}
                variants={item}
                whileHover={
                  reduce
                    ? undefined
                    : { y: -8, transition: { duration: 0.3, ease: "easeOut" } }
                }
                className="group flex flex-col overflow-hidden rounded-3xl border border-[#0f291e]/10 bg-white shadow-sm transition-shadow duration-500 hover:border-[#d96b43]/35 hover:shadow-2xl hover:shadow-[#0f291e]/12"
              >
                {/* Image Header */}
                <Link
                  href={`/our-causes/${cause.slug}`}
                  className="relative aspect-16/10 w-full overflow-hidden bg-[#0f291e]"
                >
                  <Image
                    src={cause.image}
                    alt={cause.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0f291e]/65 via-transparent to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#0f291e] shadow-xs">
                    {cause.category}
                  </span>

                  <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 text-xs font-medium text-white/90">
                    <FiMapPin size={12} className="text-[#f4a261]" />
                    {cause.location}
                  </span>
                </Link>

                {/* Card Body */}
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

                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#0f291e]/10 pt-5">
                    <Link
                      href={`/our-causes/${cause.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0f291e] transition-colors hover:text-[#d96b43]"
                    >
                      <span>Cause Details</span>
                      <FiArrowUpRight size={15} />
                    </Link>

                    <Link
                      href="#"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#0f291e] px-4 py-2 text-xs font-bold text-white transition-all duration-300 hover:bg-[#d96b43]"
                    >
                      <FiHeart size={12} className="text-[#f4a261]" />
                      <span>Donate</span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </MainContainer>
    </section>
  );
}
