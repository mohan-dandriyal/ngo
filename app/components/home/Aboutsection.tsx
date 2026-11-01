"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";
import MainContainer from "../ui/MainContainer";
import { PrimaryButton } from "@/app/components/ui/Button";
import { SectionDescription, SectionBadge, SectionTitle } from "../SectionHeader";
import { aboutSection } from "@/app/types/about";

const viewport = { once: true, amount: 0.2 };
const EASE = [0.22, 1, 0.36, 1] as const;

function AboutSection({
  image,
  badge,
  title,
  description,
  highlights = [],
  buttonText,
  profileImage,
  name,
  role,
  experienceYears = "8+",
  experienceLabel = "Years of Grassroots Impact",
}: aboutSection) {
  const reduce = useReducedMotion();

  const stagger = (gap: number, delay = 0): Variants => ({
    hidden: {},
    show: { transition: { staggerChildren: gap, delayChildren: delay } },
  });

  const fadeUp: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
  };

  const paragraphs = Array.isArray(description) ? description : [description];

  return (
    <section className="overflow-hidden py-18" aria-labelledby="about-heading">
      <MainContainer>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Photo Collage + Floating Badge */}
          <motion.div
            variants={stagger(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="relative mx-auto w-full max-w-xl lg:col-span-5"
          >
            {/* Offset decorative card */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-[#e6efea]"
            />

            <motion.div
              variants={fadeUp}
              className="relative aspect-4/5 w-full overflow-hidden rounded-3xl border border-[#0f291e]/10 bg-[#0f291e] shadow-xl shadow-[#0f291e]/10"
            >
              <Image
                src={image}
                alt={title}
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0f291e]/60 via-transparent to-transparent" />
            </motion.div>

            {/* Floating Experience Badge */}
            <motion.div
              variants={fadeUp}
              className="absolute -bottom-6 -left-3 z-10 flex items-center gap-4 rounded-2xl border border-[#0f291e]/10 bg-white p-5 shadow-xl shadow-[#0f291e]/10 sm:left-6"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#d96b43] font-display text-2xl font-bold text-white">
                {experienceYears}
              </div>
              <div>
                <p className="text-sm font-bold text-[#0f291e]">{experienceLabel}</p>
                <p className="text-xs text-[#0f291e]/65">100% Community Partnered</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Editorial Content */}
          <motion.div
            variants={stagger(0.1, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="lg:col-span-7"
          >
            <motion.div variants={fadeUp}>
              <SectionBadge>{badge}</SectionBadge>
            </motion.div>

            <motion.div variants={fadeUp}>
              <SectionTitle id="about-heading">{title}</SectionTitle>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-3">
              {paragraphs.map((para, i) => (
                <SectionDescription key={i}>{para}</SectionDescription>
              ))}
            </motion.div>

            {highlights.length > 0 && (
              <motion.ul variants={fadeUp} className="mt-7 space-y-3">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm font-medium text-[#0f291e]/85 sm:text-base"
                  >
                    <FiCheckCircle
                      className="mt-0.5 shrink-0 text-[#2d6a4f]"
                      size={18}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </motion.ul>
            )}

            {/* Action + Founder Signature Row */}
            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-wrap items-center gap-8 border-t border-[#0f291e]/12 pt-8"
            >
              {buttonText && (
                <PrimaryButton href="/about">
                  <span>{buttonText}</span>
                  <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:rotate-45" />
                </PrimaryButton>
              )}

              {name && (
                <div className="flex items-center gap-3.5">
                  {profileImage && (
                    <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-[#d96b43]/40 ring-offset-2">
                      <Image
                        src={profileImage}
                        alt={name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-[#0f291e]">{name}</p>
                    <p className="text-xs font-medium text-[#0f291e]/65">{role}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </MainContainer>
    </section>
  );
}

export default AboutSection;
