"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowUpRight, FiClock, FiMapPin } from "react-icons/fi";
import MainContainer from "../ui/MainContainer";
import { SectionTitle, SectionDescription, SectionBadge } from "@/app/components/SectionHeader";
import { OutlineButton } from "../ui/Button";
import programsData from "@/app/data/programs.json";
import type { ProgramCampaign, ProgramCategory, ProgramsData } from "@/app/types/programs";

const data = programsData as ProgramsData;
const EASE = [0.22, 1, 0.36, 1] as const;

interface ActiveCampaignsProps {
  campaignsData: ProgramCampaign[];
  isShow: boolean;
}

function ActiveCampaigns({ campaignsData, isShow }: ActiveCampaignsProps) {
  const reduce = useReducedMotion();
  const campaigns = campaignsData;

  const availableCategories = Array.from(
    new Set(campaigns.map((c) => c.category))
  ) as ProgramCategory[];
  const filters: ("All" | ProgramCategory)[] = ["All", ...availableCategories];

  const [filter, setFilter] = React.useState<"All" | ProgramCategory>("All");
  const visible =
    filter === "All" ? campaigns : campaigns.filter((c) => c.category === filter);

  const card: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 32 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: EASE,
        delay: reduce ? 0 : (i % 3) * 0.1,
      },
    }),
  };

  return (
    <section
      className="overflow-hidden bg-[#f2efe9] py-18"
      aria-labelledby="campaigns-heading"
    >
      <MainContainer>
        {/* Heading row */}
        <motion.div
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-3xl">
            <SectionBadge>{data.campaignsSection.badge}</SectionBadge>
            <SectionTitle id="campaigns-heading">
              {data.campaignsSection.title}
            </SectionTitle>
            <SectionDescription>
              {data.campaignsSection.description}
            </SectionDescription>
          </div>

          {isShow && (
            <OutlineButton href={data.campaignsSection.buttonHref}>
              <span>{data.campaignsSection.buttonLabel}</span>
              <FiArrowUpRight
                aria-hidden="true"
                className="text-lg transition-transform duration-300 group-hover:rotate-45"
              />
            </OutlineButton>
          )}
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE, delay: reduce ? 0 : 0.1 }}
          role="tablist"
          aria-label="Filter campaigns by category"
          className="mt-10 flex flex-wrap gap-3"
        >
          {filters.map((f) => {
            const selected = filter === f;
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(f)}
                className={`cursor-pointer rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f291e] ${
                  selected
                    ? "bg-[#0f291e] text-white shadow-md shadow-[#0f291e]/15"
                    : "border border-[#0f291e]/12 bg-white text-[#0f291e] hover:bg-[#e6efea]"
                }`}
              >
                {f}
              </button>
            );
          })}
        </motion.div>

        {/* Campaign Cards Grid (No Range / Progress Bar Section) */}
        <motion.div layout className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((c, i) => (
              <motion.article
                key={c.id}
                custom={i}
                layout={!reduce}
                variants={card}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                exit={{
                  opacity: reduce ? 1 : 0,
                  scale: reduce ? 1 : 0.95,
                  transition: { duration: 0.25 },
                }}
                whileHover={reduce ? undefined : { y: -6 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#0f291e]/10 bg-white shadow-xs transition-all duration-300 hover:shadow-xl hover:shadow-[#0f291e]/10"
              >
                {/* Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-[#0f291e]">
                  <Image
                    src={c.image}
                    alt={c.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0f291e]/65 via-transparent to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#0f291e] shadow-xs backdrop-blur-sm">
                    {c.category}
                  </span>

                  <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#0f291e]/85 px-3 py-1 text-xs font-semibold text-[#f4a261] backdrop-blur-sm">
                    <FiClock aria-hidden="true" size={12} />
                    {c.daysLeft} days left
                  </span>

                  {c.location && (
                    <span className="absolute bottom-3.5 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-3 py-1 text-xs font-medium text-white backdrop-blur-xs">
                      <FiMapPin size={12} className="text-[#f4a261]" />
                      {c.location}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight text-[#0f291e] transition-colors group-hover:text-[#d96b43]">
                      {c.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-[#0f291e]/75 sm:text-base">
                      {c.description}
                    </p>
                  </div>

                  {/* Clean Action Footer */}
                  <div className="mt-6 flex items-center justify-between border-t border-[#0f291e]/10 pt-5">
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#2d6a4f]">
                      Community Program
                    </span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#0f291e] transition-colors group-hover:text-[#d96b43] after:absolute after:inset-0"
                    >
                      Join Initiative
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e6efea] text-[#0f291e] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#d96b43] group-hover:text-white">
                        <FiArrowUpRight size={16} />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </MainContainer>
    </section>
  );
}

export default ActiveCampaigns;
