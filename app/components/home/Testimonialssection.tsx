"use client"

import React from "react"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { FaQuoteLeft, FaStar } from "react-icons/fa"
import MainContainer from "../ui/MainContainer"
import homeData from "@/app/data/home.json"

const testimonials = homeData.testimonials

const AUTOPLAY_MS = 6000

// Smooth "expo-out" curve shared by all entrance animations
const EASE = [0.22, 1, 0.36, 1] as const

/** Soft watercolor wash built from layered radial gradients (same as the other sections) */
const cardWash =
  "radial-gradient(60% 55% at 15% 15%, #e9f2d9 0%, transparent 70%), radial-gradient(55% 60% at 90% 85%, #cfe5da 0%, transparent 70%), radial-gradient(40% 40% at 70% 15%, #e9f2d9 0%, transparent 75%), #dcebdd"

function TestimonialsSection() {
  const reduce = useReducedMotion()
  const [[index, direction], setPage] = React.useState<[number, number]>([0, 1])
  const [paused, setPaused] = React.useState(false)

  const paginate = React.useCallback((dir: number) => {
    setPage(([i]) => [(i + dir + testimonials.length) % testimonials.length, dir])
  }, [])

  const goTo = (i: number) => setPage(([cur]) => [i, i > cur ? 1 : -1])

  // Auto-advance, paused on hover/focus and skipped for reduced motion
  React.useEffect(() => {
    if (paused || reduce) return
    const id = setInterval(() => paginate(1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, reduce, paginate, index])

  // Left column: parts reveal one after another
  const column: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  }
  const rise: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 36 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  }

  // Slide change: card content glides in, then its parts follow
  const slide: Variants = {
    enter: (dir: number) => ({ opacity: reduce ? 1 : 0, x: reduce ? 0 : dir * 80 }),
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: EASE,
        when: "beforeChildren",
        staggerChildren: reduce ? 0 : 0.09,
      },
    },
    exit: (dir: number) => ({
      opacity: reduce ? 1 : 0,
      x: reduce ? 0 : dir * -80,
      transition: { duration: 0.35, ease: "easeIn" },
    }),
  }
  const part: Variants = {
    enter: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 },
    center: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
    exit: { opacity: 1 },
  }

  const t = testimonials[index]

  return (
    <section
      className="relative md:mt-28 mt-20 isolate overflow-hidden py-20 text-white md:py-28"
      aria-labelledby="testimonials-heading"
    >
      {/* Background image: fills the whole section behind the content */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        initial={{ scale: reduce ? 1 : 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <Image
          src="/bg-image.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      {/* Linear gradient over the image: darker at the top, fading to clear at the bottom.
          Tweak the from / via / to colors, or use bg-linear-to-r for a left-to-right fade. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-black/80 via-black/40 to-transparent"
      />

      <MainContainer>
        <div className="relative grid items-center gap-14 px-6 md:px-0 lg:grid-cols-5 lg:gap-16">
          {/* Left: heading, rating, controls */}
          <motion.div
            variants={column}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-2"
          >
            <motion.span
              variants={rise}
              className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
            >
              Testimonials
            </motion.span>

            <motion.h2
              variants={rise}
              id="testimonials-heading"
              className="mt-5 text-4xl font-medium italic leading-[1.05] tracking-tight md:text-5xl lg:text-6xl"
            >
              Kind words from people who help us help others
            </motion.h2>

            <motion.div variants={rise} className="mt-6 flex items-center gap-3">
              <div className="flex text-amber-300" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-white/80">
                <strong className="text-white text-lg">4.9</strong> from 2,300+ supporters
              </p>
            </motion.div>

            <motion.div variants={rise} className="mt-10 flex items-center gap-5">
              <div className="flex gap-3">
                <motion.button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => paginate(-1)}
                  whileHover={reduce ? undefined : { scale: 1.08 }}
                  whileTap={reduce ? undefined : { scale: 0.92 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 text-white transition-colors duration-300 hover:bg-white hover:text-[#0b1635] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <FiChevronLeft size={20} />
                </motion.button>
                <motion.button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => paginate(1)}
                  whileHover={reduce ? undefined : { scale: 1.08 }}
                  whileTap={reduce ? undefined : { scale: 0.92 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0b1635] transition-colors duration-300 hover:bg-[#cfe4e0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <FiChevronRight size={20} />
                </motion.button>
              </div>

              <div className="flex gap-2">
                {testimonials.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={i === index}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === index ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: quote card */}
          <motion.div
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 60, scale: reduce ? 1 : 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE, delay: reduce ? 0 : 0.25 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            role="region"
            aria-roledescription="carousel"
            aria-label="Testimonials"
            className="relative lg:col-span-3"
          >
            {/* Offset layer behind for depth */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-white/25 backdrop-blur-sm md:translate-x-5 md:translate-y-5"
            />

            <div
              className="relative overflow-hidden rounded-2xl p-8 text-[#0b1635] shadow-2xl md:p-12"
              style={{ background: cardWash }}
            >
              <FaQuoteLeft aria-hidden="true" className="absolute right-8 top-8 h-16 w-16 text-[#0b1635]/10" />

              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.figure
                  key={index}
                  custom={direction}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative min-h-[18rem]"
                >
                  <motion.span
                    variants={part}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0b1635] text-white"
                  >
                    <FaQuoteLeft aria-hidden="true" size={18} />
                  </motion.span>

                  <motion.blockquote
                    variants={part}
                    className="mt-6 text-xl font-medium leading-relaxed md:text-2xl"
                  >
                    {t.quote}
                  </motion.blockquote>

                  <motion.figcaption
                    variants={part}
                    className="mt-8 flex items-center gap-4 border-t border-[#0b1635]/15 pt-6"
                  >
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-full object-cover ring-2 ring-[#0b1635] ring-offset-2 ring-offset-[#dcebdd]"
                    />
                    <div>
                      <p className="font-bold">{t.name}</p>
                      <p className="text-sm text-[#0b1635]/70">{t.role}</p>
                    </div>
                  </motion.figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </MainContainer>
    </section>
  )
}

export default TestimonialsSection
