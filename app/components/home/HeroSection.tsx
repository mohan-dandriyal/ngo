"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import type { Swiper as SwiperType } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade, Navigation } from "swiper/modules"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import CountUp from "react-countup"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-fade"

import Header from "../layouts/Header"

const heroSlides = [
  {
    id: 1,
    line1: "Lend the",
    line2: "Helping Hand",
    line3: "Get Involved.",
    description:
      "We are here to support you every step of the way, empowering communities and changing lives.",
  },
  {
    id: 2,
    line1: "Bring Hope",
    line2: "To Children",
    line3: "Make A Change.",
    description:
      "Your small contribution can provide education, food, and a brighter future for those in need.",
  },
  {
    id: 3,
    line1: "Together We",
    line2: "Can Build A",
    line3: "Better Tomorrow.",
    description:
      "Join our global community of volunteers and donors dedicated to making a lasting impact.",
  },
]

// Placeholder numbers: replace with your real figures
const stats = [
  { end: 12500, suffix: "+", label: "Children supported" },
  { end: 340, suffix: "+", label: "Active volunteers" },
  { end: 28, suffix: "", label: "Communities reached" },
]

// Smooth "expo-out" curve shared by all entrance animations
const EASE = [0.22, 1, 0.36, 1] as const

/** Same soft watercolor wash as the cards in the other sections */
const statsBackground = `radial-gradient(60% 55% at 15% 20%, #e9f2d9 0%, transparent 70%),
   radial-gradient(55% 60% at 85% 75%, #cfe5da 0%, transparent 70%),
   #f4f8f2`

// Reveal animation: children float up and un-blur when their slide becomes active
const reveal =
  "translate-y-10 opacity-0 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-0 motion-reduce:transition-none " +
  "group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:opacity-100 group-[.swiper-slide-active]:blur-0"

function HeroSection() {
  const reduce = useReducedMotion()
  const swiperRef = React.useRef<SwiperType | null>(null)
  const [active, setActive] = React.useState(0)

  return (
    <section className="relative h-dvh w-full overflow-hidden bg-[#0b1635] text-white">
      {/* Header stays in the hero (it is fixed, so it still sticks on scroll) */}
      <Header />

      <h1 className="sr-only">Lend a Helping Hand</h1>

      {/* Background: slowly zooms out on load */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: reduce ? 1 : 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
        >
          <Image
            src="/home-hero.jpg"
            fill
            priority
            sizes="100vw"
            alt=""
            className="object-cover object-center opacity-60 grayscale"
          />
        </motion.div>
        {/* Darkens the right (text side) */}
        <div className="absolute inset-0 bg-linear-to-l from-[#0b1635]/90 via-[#0b1635]/50 to-transparent" />
        {/* Darkens the bottom so stats and controls stay readable */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-[#0b1635]/85 to-transparent" />
        {/* Soft mint glow behind the headline */}
        <div className="absolute -right-32 top-1/4 h-112 w-md rounded-full bg-[#cfe4e0]/15 blur-3xl" />
      </div>

      {/* Slider */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-end px-6 pb-28 pt-28 md:px-20">
        <div className="w-full max-w-2xl">
          <Swiper
            modules={[Autoplay, Navigation, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={{ prevEl: ".hero-prev-btn", nextEl: ".hero-next-btn" }}
            loop
            onSwiper={(s) => (swiperRef.current = s)}
            onSlideChange={(s) => setActive(s.realIndex)}
            className="w-full"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id} className="group">
                <div className="space-y-6 py-4 text-right">
                  <h2 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
                    <span className={`block ${reveal}`}>{slide.line1}</span>
                    <span className={`block delay-150 ${reveal}`}>
                      {slide.line2}
                      <span aria-hidden="true" className="ml-2 inline-block">
                        ❤️
                      </span>
                    </span>
                    <span
                      className={`block text-transparent delay-300 [-webkit-text-stroke:2px_#fff] ${reveal}`}
                    >
                      {slide.line3}
                    </span>
                  </h2>

                  <p className={`ml-auto max-w-xl text-lg font-light text-white/85 delay-500 md:text-xl ${reveal}`}>
                    {slide.description}
                  </p>

                  <div className={`flex items-center justify-end gap-6 pt-4 delay-700 ${reveal}`}>
                    <svg
                      aria-hidden="true"
                      className="hidden h-12 w-16 text-white/80 sm:block"
                      viewBox="0 0 100 60"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M10 50 Q 50 10 80 40" strokeLinecap="round" />
                      <path d="M68 38 L 80 40 L 82 28" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <Link
                      href="/discover"
                      className="group/cta relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-base font-semibold text-[#0b1635] shadow-lg shadow-black/20 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-95"
                    >
                      {/* Mint fill slides up on hover */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 translate-y-full rounded-full bg-[#cfe4e0] transition-transform duration-500 ease-out group-hover/cta:translate-y-0"
                      />
                      <span className="relative">Discover More</span>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Bottom bar: stats (left) + slide controls (right) */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-6 pb-8 md:px-20">
          {/* Stats: pastel watercolor card, same style as the other cards */}
          <motion.dl
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: reduce ? 0 : 0.8 }}
            className="hidden gap-8 rounded-2xl px-8 py-4 text-[#0b1635] shadow-lg shadow-black/10 md:flex"
            style={{ background: statsBackground }}
          >
            {stats.map((st, i) => (
              <div
                key={st.label}
                className={`pr-8 ${i < stats.length - 1 ? "border-r border-[#0b1635]/15" : "pr-0"}`}
              >
                <dd className="text-3xl font-extrabold tracking-tight text-[#0b1635]">
                  <CountUp
                    end={st.end}
                    suffix={st.suffix}
                    duration={2.5}
                    separator=","
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </dd>
                <dt className="text-sm text-[#0b1635]/70">{st.label}</dt>
              </div>
            ))}
          </motion.dl>

          {/* Controls */}
          <motion.div
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: reduce ? 0 : 1 }}
            className="ml-auto flex items-center gap-5"
          >
            <span className="text-sm tabular-nums text-white/80">
              {String(active + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
            </span>

            {/* Clickable slide indicators */}
            <div className="flex gap-2">
              {heroSlides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === active}
                  onClick={() => swiperRef.current?.slideToLoop(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === active ? "w-10 bg-white" : "w-5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Previous slide"
                className="hero-prev-btn flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-[#0b1635] shadow-md transition-all duration-300 hover:scale-110 hover:bg-[#cfe4e0] active:scale-95"
              >
                <FiChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                className="hero-next-btn flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition-all duration-300 hover:scale-110 hover:border-white hover:bg-white hover:text-[#0b1635] active:scale-95"
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection