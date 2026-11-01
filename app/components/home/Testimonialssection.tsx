"use client";

import React from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiMapPin } from "react-icons/fi";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import MainContainer from "../ui/MainContainer";
import homeData from "@/app/data/home.json";
import type { HomePageData } from "@/app/types/home";

const data = homeData as HomePageData;
const testimonials = data.testimonials;
const sectionInfo = data.testimonialsSection;

const AUTOPLAY_MS = 6500;
const EASE = [0.22, 1, 0.36, 1] as const;

function TestimonialsSection() {
  const reduce = useReducedMotion();
  const [[index, direction], setPage] = React.useState<[number, number]>([0, 1]);
  const [paused, setPaused] = React.useState(false);

  const paginate = React.useCallback((dir: number) => {
    setPage(([i]) => [(i + dir + testimonials.length) % testimonials.length, dir]);
  }, []);

  const goTo = (i: number) => setPage(([cur]) => [i, i > cur ? 1 : -1]);

  React.useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => paginate(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reduce, paginate, index]);

  const column: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
  };
  const rise: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
  };

  const slide: Variants = {
    enter: (dir: number) => ({ opacity: reduce ? 1 : 0, x: reduce ? 0 : dir * 50 }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: EASE },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: reduce ? 0 : dir * -50,
      transition: { duration: 0.3, ease: "easeIn" },
    }),
  };

  const t = testimonials[index];

  return (
    <section
      className="relative isolate overflow-hidden bg-[#0f291e] py-18 text-white"
      aria-labelledby="testimonials-heading"
    >
      {/* Background image with rich emerald overlay */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Image
          src="/volunteer-team.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-[#0f291e] via-[#0f291e]/92 to-[#1b4332]/85"
      />

      <MainContainer>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Heading, Rating & Controls */}
          <motion.div
            variants={column}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="lg:col-span-5"
          >
            <motion.span
              variants={rise}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#f4a261] backdrop-blur-sm"
            >
              <span className="h-2 w-2 rounded-full bg-[#d96b43]" />
              {sectionInfo.badge}
            </motion.span>

            <motion.h2
              variants={rise}
              id="testimonials-heading"
              className="font-display mt-5 text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl"
            >
              {sectionInfo.title}
            </motion.h2>

            <motion.p variants={rise} className="mt-4 text-base text-white/75">
              {sectionInfo.description}
            </motion.p>

            <motion.div variants={rise} className="mt-6 flex items-center gap-3">
              <div className="flex gap-1 text-[#f4a261]" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} size={16} />
                ))}
              </div>
              <p className="text-sm text-white/85">
                <strong className="font-bold text-white">{sectionInfo.rating}</strong>{" "}
                from {sectionInfo.supportersCount}
              </p>
            </motion.div>

            <motion.div variants={rise} className="mt-8 flex items-center gap-5">
              <div className="flex gap-2.5">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => paginate(-1)}
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/5 text-white transition hover:border-[#f4a261] hover:bg-[#f4a261] hover:text-[#0f291e]"
                >
                  <FiChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => paginate(1)}
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#d96b43] text-white transition hover:bg-[#f4a261] hover:text-[#0f291e]"
                >
                  <FiChevronRight size={18} />
                </button>
              </div>

              <div className="flex gap-2">
                {testimonials.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={i === index}
                    onClick={() => goTo(i)}
                    className={`h-1.5 cursor-pointer rounded-full transition-all duration-500 ${
                      i === index
                        ? "w-8 bg-[#f4a261]"
                        : "w-4 bg-white/35 hover:bg-white/65"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Quote Card */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            role="region"
            aria-roledescription="carousel"
            aria-label="Supporter Testimonials"
            className="relative lg:col-span-7"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-[#d96b43]/25 backdrop-blur-sm"
            />

            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#faf8f5] p-8 text-[#0f291e] shadow-2xl sm:p-10 md:p-12">
              <FaQuoteLeft
                aria-hidden="true"
                className=" absolute right-8 top-8 h-16 w-16 text-[#0f291e]/8"
              />

              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.figure
                  key={index}
                  custom={direction}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative flex min-h-64 flex-col justify-between"
                >
                  <div>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d96b43] text-white shadow-md shadow-[#d96b43]/25">
                      <FaQuoteLeft aria-hidden="true" size={18} />
                    </span>

                    <blockquote className="font-display mt-6 text-xl font-medium leading-relaxed text-[#0f291e] sm:text-2xl">
                      “{t.quote}”
                    </blockquote>
                  </div>

                  <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#0f291e]/12 pt-6">
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-[#d96b43] ring-offset-2 ring-offset-[#faf8f5]">
                        <Image
                          src={t.avatar}
                          alt={t.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-base font-bold text-[#0f291e]">{t.name}</p>
                        <p className="text-xs font-medium text-[#0f291e]/70">
                          {t.role}
                        </p>
                      </div>
                    </div>

                    {t.location && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e6efea] px-3.5 py-1.5 text-xs font-semibold text-[#1b4332]">
                        <FiMapPin size={12} />
                        {t.location}
                      </span>
                    )}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </MainContainer>
    </section>
  );
}

export default TestimonialsSection;
