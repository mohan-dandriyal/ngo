"use client";

import React, { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

interface SectionTitleProps {
  children: ReactNode;
  id?: string;
  light?: boolean;
}

interface SectionDescriptionProps {
  children: ReactNode;
  light?: boolean;
}

interface SectionBadgeProps {
  children: ReactNode;
  light?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const useFloatIn = (distance: number, duration: number): Variants => {
  const reduce = useReducedMotion();

  return {
    hidden: {
      opacity: reduce ? 1 : 0,
      y: reduce ? 0 : distance,
      filter: reduce ? "blur(0px)" : "blur(6px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, ease: EASE },
    },
  };
};

const stagger = (gap: number, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const SectionTitle = ({
  children,
  id = "section-heading",
  light = false,
}: SectionTitleProps) => {
  const floatIn = useFloatIn(32, 0.85);

  return (
    <motion.h2
      id={id}
      variants={stagger(0.06)}
      className={`font-display mt-4 max-w-4xl text-3xl font-medium leading-[1.08] tracking-[-0.035em] sm:text-4xl lg:text-5xl ${
        light ? "text-[#faf8f5]" : "text-[#0f291e]"
      }`}
    >
      <motion.span variants={floatIn} className="inline-block">
        {children}
      </motion.span>
    </motion.h2>
  );
};

export const SectionDescription = ({
  children,
  light = false,
}: SectionDescriptionProps) => {
  const floatIn = useFloatIn(22, 0.75);

  return (
    <motion.p
      variants={stagger(0.06)}
      className={`mt-4 max-w-2xl text-base font-normal leading-[1.75] tracking-[-0.01em] md:text-lg ${
        light ? "text-[#faf8f5]/80" : "text-[#0f291e]/72"
      }`}
    >
      <motion.span variants={floatIn} className="inline-block">
        {children}
      </motion.span>
    </motion.p>
  );
};

export const SectionBadge = ({
  children,
  light = false,
}: SectionBadgeProps) => {
  const floatIn = useFloatIn(16, 0.65);

  return (
    <motion.span
      variants={floatIn}
      className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] shadow-2xs ${
        light
          ? "border-white/20 bg-white/10 text-[#faf8f5] backdrop-blur-md"
          : "border-[#0f291e]/12 bg-white text-[#1b4332]"
      }`}
    >
      <span
        aria-hidden="true"
        className="animate-pulse-soft h-2 w-2 rounded-full bg-[#d96b43]"
      />
      {children}
    </motion.span>
  );
};
