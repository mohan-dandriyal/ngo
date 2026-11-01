"use client";

import { useState } from "react";
import Image from "next/image";
import { FiArrowUpRight, FiAward, FiClock, FiMapPin } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import MainContainer from "@/app/components/ui/MainContainer";
import { PrimaryButton } from "@/app/components/ui/Button";
import {
  SectionBadge,
  SectionDescription,
  SectionTitle,
} from "@/app/components/SectionHeader";
import volunteerData from "@/app/data/volunteer.json";
import type { VolunteerPageData } from "@/app/types/volunteer";

const data = volunteerData as VolunteerPageData;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function VolunteerSection() {
  const reduceMotion = useReducedMotion();
  const departments = [
    "All Team",
    ...Array.from(new Set(data.teamSection.members.map((m) => m.department))),
  ];
  const [activeDept, setActiveDept] = useState("All Team");

  const visibleMembers =
    activeDept === "All Team"
      ? data.teamSection.members
      : data.teamSection.members.filter((m) => m.department === activeDept);

  const reveal: Variants = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
  };

  return (
    <div className="bg-[#faf8f5] text-[#0f291e]">
      {/* Section 1: Meet Our Team & Dedicated Volunteers (With Images) */}
      <section className="py-18" aria-labelledby="team-heading">
        <MainContainer>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div className="max-w-3xl">
              <SectionBadge>{data.teamSection.badge}</SectionBadge>
              <SectionTitle id="team-heading">
                {data.teamSection.title}
              </SectionTitle>
              <SectionDescription>
                {data.teamSection.description}
              </SectionDescription>
            </div>

            {/* Department Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => {
                const selected = activeDept === dept;
                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => setActiveDept(dept)}
                    className={`cursor-pointer rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
                      selected
                        ? "bg-[#0f291e] text-white shadow-sm"
                        : "border border-[#0f291e]/12 bg-white text-[#0f291e] hover:bg-[#e6efea]"
                    }`}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Team Member Cards Grid */}
          <motion.div
            layout
            className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {visibleMembers.map((member, index) => (
                <motion.article
                  key={member.id}
                  layout={!reduceMotion}
                  initial={{
                    opacity: reduceMotion ? 1 : 0,
                    y: reduceMotion ? 0 : 28,
                  }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.65,
                    delay: reduceMotion ? 0 : (index % 3) * 0.1,
                  }}
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-[#0f291e]/10 bg-white shadow-xs transition-shadow duration-300 hover:shadow-xl hover:shadow-[#0f291e]/10"
                >
                  {/* Member Image */}
                  <div className="relative aspect-4/3 overflow-hidden bg-[#0f291e]">
                    <Image
                      src={member.image}
                      alt={member.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0f291e]/80 via-transparent to-transparent" />

                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#0f291e] shadow-xs">
                      {member.department}
                    </span>

                    <div className="absolute inset-x-4 bottom-3.5 flex items-center justify-between text-xs font-medium text-white">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 backdrop-blur-xs">
                        <FiMapPin size={12} className="text-[#f4a261]" />
                        {member.location}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#d96b43] px-3 py-1 font-bold text-white">
                        <FiAward size={12} />
                        {member.experience}
                      </span>
                    </div>
                  </div>

                  {/* Member Content */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <div>
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-[#0f291e]">
                        {member.name}
                      </h3>
                      <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[#2d6a4f]">
                        {member.role}
                      </p>

                      <p className="mt-3.5 text-sm leading-relaxed text-[#0f291e]/75 sm:text-base">
                        {member.bio}
                      </p>
                    </div>

                    <blockquote className="mt-6 rounded-2xl bg-[#faf8f5] p-4 border border-[#0f291e]/8">
                      <div className="flex items-start gap-2.5">
                        <FaQuoteLeft
                          size={14}
                          className="mt-1 shrink-0 text-[#d96b43]"
                        />
                        <p className="font-display text-sm italic leading-relaxed text-[#0f291e]/90">
                          “{member.quote}”
                        </p>
                      </div>
                    </blockquote>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </MainContainer>
      </section>

      {/* Section 2: Team & Volunteers In Action Photo Grid */}
      <section
        className="bg-[#f2efe9] py-18"
        aria-labelledby="team-moments-heading"
      >
        <MainContainer>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            className="max-w-3xl"
          >
            <SectionBadge>{data.momentsSection.badge}</SectionBadge>
            <SectionTitle id="team-moments-heading">
              {data.momentsSection.title}
            </SectionTitle>
            <SectionDescription>
              {data.momentsSection.description}
            </SectionDescription>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.momentsSection.moments.map((moment, idx) => (
              <motion.figure
                key={moment.id}
                initial={{
                  opacity: reduceMotion ? 1 : 0,
                  y: reduceMotion ? 0 : 24,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: reduceMotion ? 0 : (idx % 3) * 0.1,
                }}
                className="group relative min-h-80 overflow-hidden rounded-3xl border border-[#0f291e]/10 bg-[#0f291e] shadow-sm"
              >
                <Image
                  src={moment.image}
                  alt={moment.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0f291e]/92 via-[#0f291e]/25 to-transparent" />

                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#0f291e]">
                  {moment.category}
                </span>

                <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f4a261]">
                    <FiMapPin size={12} />
                    {moment.location}
                  </p>
                  <h3 className="font-display mt-1.5 text-2xl font-semibold leading-snug">
                    {moment.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/80">
                    {moment.caption}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </MainContainer>
      </section>

      {/* Section 3: Our Culture of Service & Volunteer Tracks */}
      <section className="py-18" aria-labelledby="volunteer-benefits-heading">
        <MainContainer>
          <div className="max-w-3xl">
            <SectionBadge>{data.benefitsSection.badge}</SectionBadge>
            <SectionTitle id="volunteer-benefits-heading">
              {data.benefitsSection.title}
            </SectionTitle>
            <SectionDescription>
              {data.benefitsSection.description}
            </SectionDescription>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {data.benefitsSection.benefits.map((b, i) => (
              <motion.article
                key={b.number}
                initial={{
                  opacity: reduceMotion ? 1 : 0,
                  y: reduceMotion ? 0 : 24,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.65,
                  delay: reduceMotion ? 0 : i * 0.1,
                }}
                className="rounded-3xl border border-[#0f291e]/10 bg-white p-8 shadow-xs"
              >
                <span className="font-display text-4xl font-bold text-[#d96b43]">
                  {b.number}
                </span>
                <h3 className="font-display mt-5 text-2xl font-semibold text-[#0f291e]">
                  {b.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#0f291e]/75">
                  {b.description}
                </p>
              </motion.article>
            ))}
          </div>

          {/* Fellowship & Volunteer Tracks */}
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {data.rolesSection.roles.map((role) => (
              <div
                key={role.id}
                className="flex flex-col justify-between rounded-3xl border border-[#0f291e]/10 bg-[#f2efe9] p-7 transition-transform duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-[#1b4332]">
                      <FiClock size={12} />
                      {role.commitment}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f9ebe5] px-3.5 py-1 text-[#d96b43]">
                      <FiMapPin size={12} />
                      {role.location}
                    </span>
                  </div>
                  <h3 className="font-display mt-4 text-2xl font-semibold text-[#0f291e]">
                    {role.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#0f291e]/75 sm:text-base">
                    {role.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MainContainer>
      </section>

      {/* Section 4: CTA Banner */}
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
