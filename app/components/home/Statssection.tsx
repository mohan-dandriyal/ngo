"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import CountUp from "react-countup";
import MainContainer from "../ui/MainContainer";
import { SectionBadge, SectionDescription, SectionTitle } from "../SectionHeader";
import homeData from "@/app/data/home.json";
import type { HomePageData } from "@/app/types/home";

const data = homeData as HomePageData;
const statsSection = data.statsSection;
const EASE = [0.22, 1, 0.36, 1] as const;

function StatsSection() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.14 } },
  };

  const floatIn: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <section aria-labelledby="growth-heading">
      <MainContainer>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <SectionBadge light>{statsSection.badge}</SectionBadge>
            <SectionTitle id="growth-heading" light>
              {statsSection.title}
            </SectionTitle>
            <SectionDescription light>
              {statsSection.description}
            </SectionDescription>
          </div>

          <dl className="mt-12 grid gap-6 md:grid-cols-3">
            {statsSection.stats.map((st) => (
              <motion.div
                key={st.label}
                variants={floatIn}
                className="flex flex-col items-center justify-center rounded-3xl border border-white/15 bg-white/8 p-8 text-center backdrop-blur-md transition-transform duration-300 hover:-translate-y-1"
              >
                <dd className="font-display text-5xl font-bold tracking-tight text-[#f4a261] tabular-nums sm:text-6xl lg:text-7xl">
                  <CountUp
                    end={st.end}
                    suffix={st.suffix}
                    duration={reduce ? 0 : 2.4}
                    separator=","
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </dd>
                <dt className="mt-4 text-lg font-bold tracking-tight text-white">
                  {st.label}
                </dt>
                {st.description && (
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/75">
                    {st.description}
                  </p>
                )}
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </MainContainer>
    </section>
  );
}

export default StatsSection;
