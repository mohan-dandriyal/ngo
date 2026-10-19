"use client"

import React from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import type { Swiper as SwiperType } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-fade"

import Header from "../layouts/Header"
import homeData from "@/app/data/home.json"

const heroSlides = homeData.heroSlides
const EASE = [0.22, 1, 0.36, 1] as const

const reveal =
  "translate-y-10 opacity-0 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none " +
  "group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:opacity-100"

function HeroSection() {
  const reduce = useReducedMotion()
  const swiperRef = React.useRef<SwiperType | null>(null)
  const [active, setActive] = React.useState(0)

  return (
    <section className="relative h-dvh w-full overflow-hidden bg-[#0b1635] text-white">
      <Header />
      <h1 className="sr-only">Lend a Helping Hand</h1>

      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActive(swiper.realIndex)}
        className="absolute inset-0 z-0 h-full w-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="group relative h-full w-full overflow-hidden">
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reduce ? 1 : 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.4, ease: EASE }}
            >
              <Image
                src={slide.image}
                fill
                priority={index === 0}
                sizes="100vw"
                alt=""
                className="object-cover object-center opacity-60 grayscale"
              />
            </motion.div>

            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-l from-[#0b1635]/95 via-[#0b1635]/55 to-transparent" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-[#0b1635]/90 to-transparent" />
            <div aria-hidden="true" className="absolute -right-32 top-1/4 h-112 w-md rounded-full bg-[#cfe4e0]/15 blur-3xl" />

            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-end px-6 pb-28 pt-28 md:px-20">
              <div className="w-full max-w-2xl text-right">
                <div className="space-y-6 py-4">
                  <h2 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
                    <span className={`block ${reveal}`}>{slide.line1}</span>
                    <span className={`block delay-150 ${reveal}`}>
                      {slide.line2}
                      <span aria-hidden="true" className="ml-2 inline-block">♥</span>
                    </span>
                    <span className={`block text-transparent delay-300 [-webkit-text-stroke:2px_#fff] ${reveal}`}>
                      {slide.line3}
                    </span>
                  </h2>

                  <p className={`ml-auto max-w-xl text-lg font-light text-white/85 delay-500 md:text-xl ${reveal}`}>
                    {slide.description}
                  </p>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-6 pb-8 md:px-20">
          <motion.div
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: reduce ? 0 : 1 }}
            className="ml-auto flex items-center gap-5"
          >
            <span className="text-sm tabular-nums text-white/80">{String(active + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}</span>
            <div className="flex gap-2">
              {heroSlides.map((slide, index) => (
                <button key={slide.id} type="button" aria-label={`Go to slide ${index + 1}`} aria-current={index === active} onClick={() => swiperRef.current?.slideToLoop(index)} className={`h-1 rounded-full transition-all duration-500 ${index === active ? "w-10 bg-white" : "w-5 bg-white/40 hover:bg-white/70"}`} />
              ))}
            </div>
            <div className="flex gap-3">
              <button type="button" aria-label="Previous slide" onClick={() => swiperRef.current?.slidePrev()} className="hero-prev-btn flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0b1635] shadow-md transition hover:scale-110 hover:bg-[#cfe4e0] active:scale-95"><FiChevronLeft size={20} /></button>
              <button type="button" aria-label="Next slide" onClick={() => swiperRef.current?.slideNext()} className="hero-next-btn flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:scale-110 hover:border-white hover:bg-white hover:text-[#0b1635] active:scale-95"><FiChevronRight size={20} /></button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
