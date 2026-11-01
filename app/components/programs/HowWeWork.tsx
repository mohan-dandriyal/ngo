"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionBadge, SectionDescription, SectionTitle } from "@/app/components/SectionHeader";
import MainContainer from "@/app/components/ui/MainContainer";
import programsData from "@/app/data/programs.json";
import type { ProgramsData } from "@/app/types/programs";

const data = programsData as ProgramsData;

export default function HowWeWork() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="overflow-hidden bg-[#faf8f5] py-18"
      aria-labelledby="how-we-work-heading"
    >
      <MainContainer>
        <motion.div
          initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75 }}
          className="grid gap-6 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-6">
            <SectionBadge>{data.howWeWork.badge}</SectionBadge>
            <SectionTitle id="how-we-work-heading">
              {data.howWeWork.title}
            </SectionTitle>
          </div>
          <div className="lg:col-span-6">
            <SectionDescription>{data.howWeWork.description}</SectionDescription>
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {data.howWeWork.steps
            .filter((step) => step.title)
            .map((step, index) => (
              <motion.article
                key={step.number}
                initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: reduceMotion ? 0 : index * 0.1,
                }}
                whileHover={reduceMotion ? undefined : { y: -6 }}
                className="group relative overflow-hidden rounded-3xl border border-[#0f291e]/10 bg-white p-8 shadow-xs transition-shadow duration-300 hover:shadow-xl hover:shadow-[#0f291e]/8"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl font-bold text-[#d96b43]/25 transition-colors group-hover:text-[#d96b43] md:text-6xl">
                    {step.number}
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#2d6a4f]" />
                </div>

                <h3 className="font-display mt-6 text-2xl font-semibold tracking-tight text-[#0f291e] sm:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#0f291e]/75">
                  {step.description}
                </p>
              </motion.article>
            ))}
        </div>
      </MainContainer>
    </section>
  );
}
